// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   RefreshControl,
// } from 'react-native';
// import { useState, useEffect, useCallback } from 'react';
// import {
//   doc,
//   addDoc,
//   collection,
//   serverTimestamp,
//   query,
//   where,
//   getDocs,
//   getDoc,
// } from 'firebase/firestore';
// import { COLORS } from '../../constants';
// import { db, auth } from '../../firebase';
// import styles from '../index.style';
// import Toast from 'react-native-toast-message';

// const HomePage = () => {
//   const userId = auth.currentUser?.email;
//   // DODAWANIE NOWEGO JEDZENIA DO BAZY
//   const [foodName, setFoodName] = useState('');
//   const [calories, setCalories] = useState('');
//   const [weight, setWeight] = useState('');
//   const [data, setData] = useState([]);

//   const handleAddFood = async () => {
//     const res = await addDoc(collection(db, 'food'), {
//       name: foodName,
//       weight: weight,
//       calories: calories,
//     });
//     console.log('dodane', res.id);
//   };

//   const handleAdd = async () => {
//     Toast.show({
//       type: 'success',
//       text1: 'Hello',
//       text2: 'This is some something 👋',
//     });
//   };

//   const [day, setDay] = useState({});
//   const [consumedFood, setConsumedFood] = useState([]);
//   const [isDayFetched, setIsDayFetched] = useState(false);
//   let todaysDate = new Date().toLocaleDateString('de-DE');

//   const fetchEatenFood = async (id) => {
//     const consumedFoodQuery = collection(db, 'foodForDay');
//     const q3 = query(consumedFoodQuery, where('id_day', '==', id));
//     const querySnapshot2 = await getDocs(q3);

//     if (querySnapshot2.docs.length > 0) {
//       let consumedFoodList = [];
//       querySnapshot2.forEach((doc) => {
//         consumedFoodList.push(doc.data());
//       });

//       // if (consumedFoodList.length > 0) {
//       let consumedFoodListDetails = [];
//       for (let i = 0; i < consumedFoodList.length; i++) {
//         const q4 = await getDoc(doc(db, 'food', consumedFoodList[i].id_food));

//         consumedFoodListDetails.push(q4.data());
//       }
//       setConsumedFood(consumedFoodListDetails);
//       console.log('fetchuje zjedzone zarcie');
//       // }
//     } else setConsumedFood([]);
//   };

//   console.log(consumedFood);

//   const handleAddToDay = async (id) => {
//     try {
//       console.log('TO JEST ID JEDZENIA: ', id);
//       const data = {
//         id_day: day.id,
//         id_food: id,
//       };
//       const res = await addDoc(collection(db, 'foodForDay'), data);
//       fetchEatenFood(day.id);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   useEffect(() => {
//     console.log('useEffect');
//     const fetchFood = async () => {
//       try {
//         let list = [];
//         const querySnapshot = await getDocs(collection(db, 'food'));
//         querySnapshot.forEach((doc) => {
//           // console.log(doc.id, ' => ', doc.data());
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       } catch (error) {
//         alert(error.message);
//       }
//     };

//     const fetchDay = async () => {
//       const days = collection(db, 'days');

//       const q1 = query(days, where('date', '==', todaysDate));
//       const q2 = query(days, where('id_user', '==', userId));
//       const querySnapshot = await getDocs(q1, q2);

//       let dayData;
//       if (querySnapshot.docs.length > 0 || isDayFetched) {
//         console.log('TAK ISTNIEJE');
//         querySnapshot.forEach((doc) => {
//           dayData = { id: doc.id, ...doc.data() };
//         });
//         setDay(dayData);

//         fetchEatenFood(dayData.id);
//       } else {
//         console.log('nie istnieje');
//         const objData = {
//           date: todaysDate,
//           id_user: userId,
//           timestamp: serverTimestamp(),
//         };
//         const res = await addDoc(collection(db, 'days'), objData);
//         setIsDayFetched(true);
//         setDay({ id: res.id, ...objData });
//       }
//     };
//     // fetchFood();
//     fetchDay();
//   }, []);

//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchEatenFood(day.id);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);

//   return (
//     <SafeAreaView style={{}}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           display: 'flex',
//           gap: 25,
//         }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <Text
//           style={{
//             textAlign: 'center',
//             color: COLORS.blankPurple,
//             fontWeight: '600',
//             fontSize: 25,
//           }}
//         >
//           DAY: {day.date}
//         </Text>
//         <Text
//           style={{
//             textAlign: 'center',
//             color: COLORS.blankPurple,
//             fontWeight: '600',
//             fontSize: 25,
//           }}
//         >
//           Eaten today:
//         </Text>
//         {consumedFood.map((food, index) => {
//           return (
//             <Text
//               key={index}
//               style={{
//                 textAlign: 'center',
//                 color: COLORS.blankPurple,
//                 fontSize: 17,
//               }}
//             >
//               {food.name}
//               {food.calories}
//             </Text>
//           );
//         })}

//         <Pressable style={styles.randomButton} onPress={handleAdd}>
//           <Text>add something</Text>
//         </Pressable>

//         <View>
//           {data.map((item, index) => {
//             return (
//               <Pressable key={index} onPress={() => handleAddToDay(item.id)}>
//                 <Text>{item.name}</Text>
//               </Pressable>
//             );
//           })}
//         </View>

//         <View style={styles.formContainer2}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Food name:</Text>
//             <TextInput
//               value={foodName}
//               onChangeText={(text) => setFoodName(text)}
//               placeholder="chicken"
//               style={styles.input}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Weight (in grams):</Text>
//             <TextInput
//               value={weight}
//               onChangeText={(text) => setWeight(text)}
//               placeholder="100 g"
//               style={styles.input}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Calories:</Text>
//             <TextInput
//               value={calories}
//               onChangeText={(text) => setCalories(text)}
//               placeholder="2000 kcal"
//               style={styles.input}
//             />
//           </View>

//           <Pressable style={styles.loginBtn} onPress={handleAddFood}>
//             <Text style={styles.loginBtnText}>Dodaj jedzenie</Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//       <Toast />
//     </SafeAreaView>
//   );
// };

// export default HomePage;
