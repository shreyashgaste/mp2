import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Navbar from './components/Navbar';
export default function App() {
  return (
    <Navbar/>
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
