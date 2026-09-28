import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';


const IMAGE_BASE_URL = 'https://cdn.thesimpsonsapi.com/500'; //define a url base para consultar as imagens dos personagens (documentação da api)

export default function CharactersList({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadCharacters = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await api.get(`/characters?page=${pageNumber}`);
      
      // A API retorna um array de personagens diretamente ou dentro de um objeto 'data'
      const data = Array.isArray(response.data) ? response.data : response.data.data;
      
      setCharacters(data || []);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const renderCharacterCard = ({ item }) => {
    const imageUrl = item.portrait_path 
      ? `${IMAGE_BASE_URL}${item.portrait_path}` 
      : null;

    const isAlive = item.status?.toLowerCase() === 'alive';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('CardCaracter', { character: item })}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>Sem foto</Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.detailText}><Text style={styles.label}>Idade:</Text> {item.age || 'N/A'}</Text>
          <Text style={styles.detailText}><Text style={styles.label}>Gênero:</Text> {item.gender}</Text>
          <Text style={styles.detailText}><Text style={styles.label}>Ocupação:</Text> {item.occupation || 'N/A'}</Text>
          
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: isAlive ? '#4CAF50' : '#F44336' }]} />
            <Text style={styles.statusText}>{isAlive ? 'Vivo' : 'Falecido / Indeterminado'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FED90F" />
          <Text style={styles.loadingText}>Carregando personagens...</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCharacterCard}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Controles de Paginação */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, page === 1 && styles.disabledButton]}
          onPress={handlePrevPage}
          disabled={page === 1 || loading}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>Página {page}</Text>

        <TouchableOpacity
          style={[styles.pageButton, loading && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 90,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  pageButton: {
    backgroundColor: '#FED90F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});