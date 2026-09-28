import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import BackButton from '../../components/BackButton';

export default function CharacterDetails({ route }) {
  // Recebe os dados do personagem passados pela navegação
  const { character } = route.params;

  // Monta a URL completa da imagem (ajuste o domínio base se necessário)
  const imageUri = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`;

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Imagem do Personagem */}
      {character.portrait_path && (
        <Image 
          source={{ uri: imageUri }} 
          style={styles.portrait} 
          resizeMode="contain"
        />
      )}

      {/* Nome e Status */}
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.badgeContainer}>
        <Text style={[
          styles.badge, 
          character.status === 'Alive' ? styles.alive : styles.deceased
        ]}>
          {character.status || 'Desconhecido'}
        </Text>
      </View>

      {/* Bloco de Informações Gerais */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Idade:</Text> {character.age ? `${character.age} anos` : 'N/A'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Data de Nascimento:</Text> {character.birthdate || 'N/A'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Gênero:</Text> {character.gender || 'N/A'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Ocupação:</Text> {character.occupation || 'N/A'}
        </Text>
      </View>

      {/* Lista de Frases Marcantes */}
      {character.phrases && character.phrases.length > 0 && (
        <View style={styles.phrasesSection}>
          <Text style={styles.sectionTitle}>Frases Marcantes do Personagem</Text>
          {character.phrases.map((phrase, index) => (
            <View key={index} style={styles.phraseBubble}>
              <Text style={styles.phraseText}>"{phrase}"</Text>
            </View>
          ))}
        </View>
      )}

        <BackButton/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  portrait: {
    width: 180,
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  badgeContainer: {
    marginVertical: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  alive: {
    backgroundColor: '#4CAF50',
  },
  deceased: {
    backgroundColor: '#F44336',
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  phrasesSection: {
    width: '100%',
    marginTop: 10,
    marginBottom:14
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  phraseBubble: {
    backgroundColor: '#fcc200',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  phraseText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#000',
  },
});