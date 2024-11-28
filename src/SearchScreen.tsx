import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Neighborhood } from './navigation/types'; // Importando os tipos corretos

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Neighborhood[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Função para buscar sugestões de bairros no Firestore
  const fetchNeighborhoodSuggestions = async (queryText: string) => {
    const trimmedQuery = queryText.trim();
    if (!trimmedQuery) {
      setSuggestions([]);
      return;
    }

    const capitalizedQuery = trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1).toLowerCase();

    try {
      const neighborhoodsQuery = query(
        collection(db, "neighborhood"),
        where("name", ">=", capitalizedQuery),
        where("name", "<=", capitalizedQuery + '\uf8ff')
      );
      const querySnapshot = await getDocs(neighborhoodsQuery);
      const neighborhoods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Neighborhood[];
      setSuggestions(neighborhoods);
    } catch (error) {
      console.error("Erro ao buscar sugestões de bairros: ", error);
    }
  };

  // Efeito para atualizar as sugestões quando o termo de pesquisa muda
  useEffect(() => {
    fetchNeighborhoodSuggestions(searchQuery);
  }, [searchQuery]);

  const renderSuggestionItem = ({ item }: { item: Neighborhood }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => navigation.navigate("Mapa", { selectedNeighborhood: item })}
    >
      <Image source={require('./icons/Maps.png')} style={styles.locationIcon} />
      <View style={styles.recentInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./icons/Back.png')}  />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do Bairro"
          placeholderTextColor="#8e8e8e"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.recentSection}>
        <Text style={styles.recentTitle}>Resultados</Text>
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={renderSuggestionItem}
          ListEmptyComponent={<Text style={styles.noSuggestions}>Nenhuma sugestão encontrada.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
  recentSection: {
    marginTop: 16,
    paddingHorizontal: 10,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    elevation: 1,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  locationIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  noSuggestions: {
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
});

export default SearchScreen;
