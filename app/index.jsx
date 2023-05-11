import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, Link, useRouter } from 'expo-router';
import { COLORS, SIZES } from '../constants';
import { db, auth } from '../firebase';
import { query, where, getDocs, collection, getDoc } from 'firebase/firestore';

import styles from './index.style';
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('123456');

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     router.replace('home');
    //   }
    // });
    const fetch = async () => {
      const days = collection(db, 'days');
      const q1 = query(days, where('date', '==', '6.5.2023'));
      const q2 = query(
        days,
        where('id_user', '==', 'IcHkmFHfzwPSUAGS1TLhddOMVH83')
      );
      const querySnapshot = await getDocs(q1, q2);
      console.log(querySnapshot.docs.length);
      querySnapshot.forEach((doc) => {
        // dayData = { id: doc.id, ...doc.data() };
        console.log('TUTAJ ', doc.id, '=>', doc.data().date);
      });
    };
    fetch();
  }, []);

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged as', user.email);
        router.replace('profile');
      })
      .catch((error) => alert(error.message));
    // router.replace('home');
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <View style={styles.formContainer}>
        <Text style={styles.loginHeader}>Sign in</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="john@mail.com"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.loginBtn} onPress={handleSignIn}>
          <Text style={styles.loginBtnText}>Sign in</Text>
        </Pressable>
        <Text>
          Don't have an account?{' '}
          <Link
            href="./register"
            style={{ fontWeight: '600', color: COLORS.purple }}
          >
            Sign Up!
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
