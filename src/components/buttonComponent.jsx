import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ButtonComponent({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Ver Lista de Personagens</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fcc200',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});