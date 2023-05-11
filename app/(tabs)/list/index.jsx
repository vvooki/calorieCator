import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
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
import { COLORS, SIZES } from '../../../constants';
import { db, auth } from '../../../firebase';
import styles from '../../index.style';
import Toast from 'react-native-toast-message';
// import CircularProgress from 'react-native-circular-progress-indicator';

const Home = () => {
  const userId = auth.currentUser?.email;
  const [macros, setMacros] = useState({});
  const [profileData, setProfileData] = useState({});

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sukces',
      text2: 'Posiłek został dodany do twojej listy 👋',
    });
  };

  const [day, setDay] = useState({});
  const [consumedFood, setConsumedFood] = useState([]);
  let todaysDate = new Date().toLocaleDateString('de-DE');

  const fetchEatenFood = async (id) => {
    try {
      const consumedFoodQuery = collection(db, 'foodForDay');
      const q3 = query(consumedFoodQuery, where('id_day', '==', id));
      const querySnapshot2 = await getDocs(q3);

      if (querySnapshot2.docs.length > 0) {
        let consumedFoodList = [];
        querySnapshot2.forEach((doc) => {
          consumedFoodList.push(doc.data());
        });

        let consumedFoodListDetails = [];
        let macro = { calories: 0, fats: 0, protein: 0, carbs: 0 };
        for (let i = 0; i < consumedFoodList.length; i++) {
          const q4 = await getDoc(doc(db, 'food', consumedFoodList[i].id_food));
          consumedFoodListDetails.push(q4.data());
          macro.calories = macro.calories + Number(q4.data().calories);
          macro.fats =
            macro.fats +
            Number(q4.data()?.fats !== undefined ? q4.data()?.fats : '0');
          macro.protein =
            macro.protein +
            Number(q4.data()?.fats !== undefined ? q4.data()?.fats : '0');
          macro.carbs =
            macro.carbs +
            Number(q4.data()?.fats !== undefined ? q4.data()?.fats : '0');
        }
        setMacros(macro);
        setConsumedFood(consumedFoodListDetails);
      } else setConsumedFood([]);
    } catch (error) {
      alert(error.message);
    }
  };

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

      fetchEatenFood(dayData.id);
    } else {
      console.log('nie istnieje');
      const objData = {
        date: todaysDate,
        id_user: userId,
        timestamp: serverTimestamp(),
      };
      const res = await addDoc(collection(db, 'days'), objData);
      setIsDayFetched(true);
      setDay({ id: res.id, ...objData });
    }
  };

  const fetchProfile = async () => {
    try {
      const days = collection(db, 'preferances');
      const q = query(days, where('id_user', '==', auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);

      let pref;
      if (querySnapshot.docs.length > 0) {
        console.log('TAK ISTNIEJE');
        querySnapshot.forEach((doc) => {
          pref = { ...doc.data() };
        });
        setProfileData(pref);
      } else {
        alert('Najpierw ustaw swój dzienny cel w zakładce Profil 1');
      }
    } catch (error) {
      alert('Najpierw ustaw swój dzienny cel w zakładce Profil');
    }
  };

  useEffect(() => {
    fetchDay();
    fetchProfile();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDay();
    fetchProfile();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: 'flex',
          gap: 25,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 25,
            marginTop: 20,
          }}
        >
          DAY: {day.date}
        </Text>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            paddingBottom: 15,
          }}
        >
          <Text style={styles.foodCard}>
            🔥 {macros.calories} / {profileData.calories} kcal
          </Text>
          <Text style={styles.foodCard}>
            🥛 Protein: {macros.protein} / {profileData.protein} g
          </Text>
          <Text style={styles.foodCard}>
            🥩 Fats {macros.fats} / {profileData.fats} g
          </Text>
          <Text style={styles.foodCard}>
            🥔 Carbs {macros.carbs} / {profileData.carbs} g
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.blankPurple,
            fontWeight: '600',
            fontSize: 25,
          }}
        >
          Eaten today:
        </Text>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            paddingBottom: 15,
          }}
        >
          {consumedFood.map((food, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '80%',
                  backgroundColor: COLORS.white,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={[
                    styles.foodItemDetails,
                    {
                      color: COLORS.blankPurple,
                      fontSize: 18,
                      marginBottom: 3,
                    },
                  ]}
                >
                  {food.name} ({food.calories} kcal)
                </Text>
                <Text style={styles.foodItemDetails}>
                  Weight: {food.weight} g
                </Text>
                <Text style={styles.foodItemDetails}>
                  Protein: {food?.protein} g
                </Text>
                <Text style={styles.foodItemDetails}>Fats: {food?.fats} g</Text>
                <Text style={styles.foodItemDetails}>
                  Carbs: {food?.carbs} g
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Home;
