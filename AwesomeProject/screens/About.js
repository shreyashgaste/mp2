import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function About({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Hello About</Text>
      <StatusBar style="auto" />
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Text>Go to Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
