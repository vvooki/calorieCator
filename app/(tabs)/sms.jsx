import { View, Text, Button, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import * as SMS from 'expo-sms';
import styles from '../index.style';
import { COLORS } from '../../constants';

const Sms = () => {
  const [phoneNumber, setPhoneNumber] = useState('511853929');
  const [message, setMessage] = useState('Testowa wiadomość');

  const handleSend = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) await SMS.sendSMSAsync([phoneNumber], message);
    else alert('brak uprawnień');
  };

  useEffect(() => {
    const checkSMS = async () => {
      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        alert('brak uprawnień');
      }
    };
    checkSMS();
  }, []);

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          color: COLORS.blankPurple,
          fontWeight: '600',
          fontSize: 25,
          marginVertical: 15,
        }}
      >
        Wyślij sms
      </Text>
      <View style={styles.formContainer2}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number:</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="chicken"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Message:</Text>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="100 g"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.loginBtn} onPress={handleSend}>
          <Text style={styles.loginBtnText}>Wyślij wiadomość</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Sms;
