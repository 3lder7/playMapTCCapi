import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types'; // Importando os tipos de navegação

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CentralConta'>;

// Definindo o tipo para o item
interface Option {
  id: string;
  title: string;
}

const AccountCenter = () => {
  const options: Option[] = [
    { id: '1', title: 'Gerenciamento de Conta' },
    { id: '2', title: 'Visibilidade do perfil' },
    { id: '3', title: 'Notificações' },
  ];

  // Tipando a função renderOption
  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity style={styles.option}>
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Central de Conta</Text>
      </View>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80, // Aumenta ainda mais o espaçamento no topo
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12, // Espaçamento adicional para posicionar bem o título
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: -30, // Sobe a seta para ficar destacada
  },
  backArrow: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    flex: 1, // Centraliza o título horizontalmente
  },
  list: {
    padding: 16,
  },
  option: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default AccountCenter;
