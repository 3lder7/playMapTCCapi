import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from "./SearchScreen.styles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Neighborhood } from '../navigation/types'; // Importando os tipos corretos
import { fetchNeighborhoodSuggestions } from './MapScreen.functions';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Neighborhood[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Efeito para atualizar as sugestões quando o termo de pesquisa muda
  useEffect(() => {
    fetchNeighborhoodSuggestions(searchQuery, setSuggestions);
  }, [searchQuery]);

  const renderSuggestionItem = ({ item }: { item: Neighborhood }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => navigation.navigate("Mapa", { selectedNeighborhood: item })}
    >
      <Image source={require('../icons/Maps.png')} style={styles.locationIcon} />
      <View style={styles.recentInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../icons/Back.png')}  />
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

export default SearchScreen;
