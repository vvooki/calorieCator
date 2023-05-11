import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { Stack, Link, useRouter } from 'expo-router';
import { COLORS, SIZES } from '../constants';
import { auth } from '../firebase';

import styles from './index.style';
const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSignUp = () => {
    if (password === password2) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user.email);
          alert('Pomyślnie stworzono nowe konto, zaloguj się');
          router.replace('/');
        })
        .catch((error) => alert(error.message));
    } else {
      alert('entered passwords must be the same');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <View style={styles.formContainer}>
        <Text style={styles.loginHeader}>Sign up</Text>

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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Repeat Password:</Text>
          <TextInput
            value={password2}
            onChangeText={(text) => setPassword2(text)}
            secureTextEntry={true}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.loginBtn} onPress={handleSignUp}>
          <Text style={styles.loginBtnText}>Sign up</Text>
        </Pressable>
        <Text>
          Already have an accout?{' '}
          <Link href={'/'} style={{ fontWeight: '600', color: COLORS.purple }}>
            Sign in!
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;
