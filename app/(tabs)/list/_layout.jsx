import { Stack, useRouter } from 'expo-router';
import { Button, StyleSheet, Pressable, Text } from 'react-native';
import { COLORS } from '../../../constants';
import { auth } from '../../../firebase';
const Layout2 = () => {
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
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          tabsBarLabel: 'CalorieCator',
          headerTitle: 'CalorieCator',
          headerStyle: styles.container,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={handleSignOut}>
              <Text style={[styles.headerButton, { backgroundColor: 'red' }]}>
                Sign out
              </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push('list/modal');
              }}
            >
              <Text style={styles.headerButton}>Dodaj jedzenie</Text>
            </Pressable>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          headerTitle: 'Add food',
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
  },
  headerTitle: {
    color: COLORS.purple,
  },
  headerButton: {
    backgroundColor: COLORS.blankPurple,
    marginLeft: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: COLORS.white,
  },
});

export default Layout2;
