import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonComponent from '../../components/buttonComponent';
import CharactersList from '../CharactersList';



export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>API Pública</Text>
        </View>

        <Text style={styles.title}>Simpsons App</Text>

        <Image source={require('../../../assets/image.png')} style={styles.img} />

        <Text style={styles.description}>
          Bem-vindo! Esta aplicação consome a API pública dos Simpsons
        </Text>

        
        
        <ButtonComponent
          onPress={() => navigation.navigate('CharactersList')}
        />

        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0dc67', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  badgeContainer: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },

  img:{
    borderRadius: 15,
    marginBottom: 25,
    


  }
});