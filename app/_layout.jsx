import { Stack } from 'expo-router';
import { COLORS } from '../constants';
import { StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      onLayout={onLayoutRootView}
      screenOptions={{
        headerStyle: styles.container,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        headerTitle: 'CalorieCator',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: COLORS.lightWhite,
    borderBottomWidth: 20,
  },
  headerTitle: {
    color: COLORS.purple,
  },
});

export default Layout;
