import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, Link } from 'expo-router';
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { COLORS } from '../../constants';
import { db, auth } from '../../firebase';
import Toast from 'react-native-toast-message';

import styles from '../index.style';
const Preferances = () => {
  const userId = auth.currentUser?.uid;
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');
  const [prefId, setPrefId] = useState('');
  const [exists, setExists] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sukces! Zaktualizowałeś swoje preferencje 👋',
    });
  };

  const handleUpdatePreferances = async () => {
    if (exists) {
      try {
        const pref = doc(db, 'preferances', prefId);
        await updateDoc(pref, { calories, protein, fats, carbs });
        showToast();
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const data = {
          id_user: userId,
          calories,
          protein,
          fats,
          carbs,
        };
        const res = await addDoc(collection(db, 'preferances'), data);
        setExists(true);
        showToast();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    console.log('fetch pref');
    const fetchPreferances = async () => {
      const pref = collection(db, 'preferances');
      const q = query(pref, where('id_user', '==', userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        console.log('TAK ISTNIEJE');
        querySnapshot.forEach((doc) => {
          setPrefId(doc.id);
          setCalories(doc.data().calories);
          setProtein(doc.data().protein);
          setFats(doc.data().fats);
          setCarbs(doc.data().carbs);
        });
        setExists(true);
      }
    };
    fetchPreferances();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          gap: 25,
        }}
      >
        <Text style={styles.loginHeader}>Set up your goals</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Daily calories:</Text>
          <TextInput
            placeholder="2000 kcal"
            style={styles.input}
            keyboardType="numeric"
            value={calories}
            onChangeText={(text) => setCalories(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Protein:</Text>
          <TextInput
            placeholder="80 g"
            keyboardType="numeric"
            style={styles.input}
            value={protein}
            onChangeText={(text) => setProtein(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fats:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="50 g"
            style={styles.input}
            value={fats}
            onChangeText={(text) => setFats(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Carbs:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="150 g"
            style={styles.input}
            value={carbs}
            onChangeText={(text) => setCarbs(text)}
          />
        </View>

        <Pressable style={styles.loginBtn} onPress={handleUpdatePreferances}>
          <Text style={styles.loginBtnText}>Save</Text>
        </Pressable>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Preferances;
