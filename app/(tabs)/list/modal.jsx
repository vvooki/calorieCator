import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import styles from '../../index.style';
import { COLORS } from '../../../constants';
import Toast from 'react-native-toast-message';

const Modal = () => {
  const userId = auth.currentUser?.email;
  const todaysDate = new Date().toLocaleDateString('de-DE');
  const [foodName, setFoodName] = useState('');
  const [weight, setWeight] = useState('250');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('10');
  const [carbs, setCarbs] = useState('10');
  const [fats, setFats] = useState('10');
  const [day, setDay] = useState({});
  const [data, setData] = useState([]);

  const handleAddFood = async () => {
    const res = await addDoc(collection(db, 'food'), {
      name: foodName,
      weight: weight,
      calories: calories,
      protein: protein,
      carbs: carbs,
      fats: fats,
    });
    console.log('dodane', res.id);
    handleAddToDay(res.id);
    fetchFood();
  };

  const handleAddToDay = async (id) => {
    try {
      console.log('TO JEST ID JEDZENIA: ', id);
      const data = {
        id_day: day.id,
        id_food: id,
      };
      const res = await addDoc(collection(db, 'foodForDay'), data);
      showToast();
    } catch (error) {
      alert(error.message);
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sukces',
      text2: 'Posiłek został dodany do twojej listy 👋',
    });
  };

  const fetchFood = async () => {
    try {
      let list = [];
      const querySnapshot = await getDocs(collection(db, 'food'));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchDay = async () => {
      const days = collection(db, 'days');

      const q1 = query(days, where('date', '==', todaysDate));
      const q2 = query(days, where('id_user', '==', userId));
      const querySnapshot = await getDocs(q1, q2);

      let dayData;
      if (querySnapshot.docs.length > 0) {
        console.log('TAK ISTNIEJE');
        querySnapshot.forEach((doc) => {
          dayData = { id: doc.id, ...doc.data() };
        });
        setDay(dayData);
      } else {
        console.log('nie istnieje');
        const objData = {
          date: todaysDate,
          id_user: userId,
          timestamp: serverTimestamp(),
        };
        const res = await addDoc(collection(db, 'days'), objData);
        setDay({ id: res.id, ...objData });
      }
    };
    fetchFood();
    fetchDay();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: 'flex',
          gap: 25,
        }}
      >
        <View style={styles.formContainer2}>
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              color: COLORS.blankPurple,
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            Search previousle added products
          </Text>
          {data.map((item, index) => {
            return (
              <Pressable
                style={styles.foodCard}
                key={index}
                onPress={() => handleAddToDay(item.id)}
              >
                <Text>
                  {item.name} ({item.weight}g, {item.calories} kcal)
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.blankPurple,
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          Add new product
        </Text>
        <View style={styles.formContainer2}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food name:</Text>
            <TextInput
              value={foodName}
              onChangeText={(text) => setFoodName(text)}
              placeholder="chicken"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight (in grams):</Text>
            <TextInput
              value={weight}
              onChangeText={(text) => setWeight(text)}
              placeholder="100 g"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Calories:</Text>
            <TextInput
              value={calories}
              onChangeText={(text) => setCalories(text)}
              placeholder="2000 kcal"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Protein:</Text>
            <TextInput
              value={protein}
              onChangeText={(text) => setProtein(text)}
              placeholder="15 g"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fats:</Text>
            <TextInput
              value={fats}
              onChangeText={(text) => setFats(text)}
              placeholder="30 g"
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Carbs:</Text>
            <TextInput
              value={carbs}
              onChangeText={(text) => setCarbs(text)}
              placeholder="40 g"
              style={styles.input}
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={handleAddFood}>
            <Text style={styles.loginBtnText}>Dodaj jedzenie</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Modal;
