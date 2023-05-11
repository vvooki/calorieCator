import { Tabs, Stack, useRouter, modal } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants';
import { auth } from '../../firebase';
export default () => {
  const router = useRouter();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        router.replace('/');
      })
      .catch((error) => alert(error.message));
  };

  var login = auth.currentUser?.email.slice(
    0,
    auth.currentUser?.email.indexOf('@')
  );

  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          tabsBarLabel: 'Account',
          headerTitle: 'Account',
          headerStyle: styles.container,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabsBarLabel: 'News',
          headerTitle: 'News',
          headerStyle: styles.container,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gps"
        options={{
          tabsBarLabel: 'GPS',
          headerTitle: 'Lokalizacja GPS',
          headerStyle: styles.container,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sms"
        options={{
          tabsBarLabel: 'SMS',
          headerTitle: 'Wyślij wiadomość SMS',
          headerStyle: styles.container,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
  },
  headerTitle: {
    color: COLORS.purple,
  },
});
