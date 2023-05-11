import { View, Text } from 'react-native';
import React from 'react';
import { useSearchParams } from 'expo-router';
import { Stack } from 'expo-router';

const NewsDetailsPage = () => {
  const { id } = useSearchParams();
  return (
    <View>
      <Stack.Screen options={{ headerTitle: `News ${id}` }} />
      <Text>My News: {id}</Text>
    </View>
  );
};

export default NewsDetailsPage;
