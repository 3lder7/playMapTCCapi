import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types'; // Importando os tipos de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipando a navegação com o RootStackParamList
type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConfigGeral'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>(); // Usando a navegação tipada

  const options = [
    { id: '1', title: 'Central de Conta' },
    { id: '2', title: 'Editar Perfil' },
    { id: '3', title: 'Geral' },
    { id: '4', title: 'Cadastre sua área esportiva' },
    { id: '5', title: 'Central de ajuda' },
  ];

  const renderOption = ({ item }: { item: { title: string } }) => (
    <TouchableOpacity style={styles.option}
      onPress={() => {
        if (item.title === 'Editar Perfil') {
          navigation.navigate('Configurações'); // Navega para a tela de "Configurações de Perfil"
        }else if (item.title === 'Central de Conta'){
          navigation.navigate('CentralConta');
        }
        else if(item.title === 'Geral'){
          navigation.navigate('AlterarTema');
        }
      }}
    >
      <Text style={styles.optionText}>{item.title}</Text>
      <Text style={styles.arrow}>➔</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuração</Text>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumText}>Seja premium</Text>
        </TouchableOpacity>
      </View>

      {/* List of options */}
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerText}>Termo de uso</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerText}>Política de Privacidade</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100, // Conteúdo geral mais para baixo
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 40, // Espaço abaixo do cabeçalho
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: -60, // Seta de voltar bem mais para cima
  },
  backArrow: {
    fontSize: 40,
    color: '#000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20, // Espaço entre o título e o botão "Seja premium"
  },
  premiumButton: {
    position: 'absolute',
    right: 10, // Botão mais para a direita
    top: 50, // Botão mais abaixo
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumText: {
    color: '#fff',
    fontSize: 12, // Fonte menor
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  footer: {
    marginTop: 150, // Espaço extra acima do rodapé
    paddingHorizontal: 16, // Alinhamento com a margem esquerda
    paddingBottom: 30, // Espaço extra no final
  },
  footerText: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 10, // Espaçamento entre os textos
  },
});

export default SettingsScreen;
