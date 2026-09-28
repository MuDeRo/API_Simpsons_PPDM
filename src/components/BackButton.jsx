import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BackButton({ title = "← Voltar" }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fcc200',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});