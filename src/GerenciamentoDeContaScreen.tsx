import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types'; // Importando os tipos de navegação
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GerenciaConta'>;

const AccountManagementScreen = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>(); // Tipando a navegação
  return (
    <View style={styles.container}>
      {/* Seta para voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Título da tela */}
      <Text style={styles.title}>Gerenciamento de Conta</Text>
      <Text style={styles.subtitle}>Faça alterações nas suas informações pessoais ou tipo de conta</Text>

      {/* Seções de gerenciamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleMain}>Sua conta</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Email</Text>
          <Text style={styles.rowValue}>AlexVaz@gmail.com</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Senha</Text>
          <Text style={styles.rowValue}>Alterar senha</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitleMain}>Informações pessoais</Text>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Data Nascimento</Text>
          <Text style={styles.rowValue}>24 de jul de</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Gênero</Text>
          <Text style={styles.rowValue}>Feminino</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>País/região</Text>
          <Text style={styles.rowValue}>Brasil</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* Seção para Desativar e Excluir dados - Alinhado com o resto */}
      <View style={styles.sectionBottom}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Desativar Conta</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.rowDescription}>Suspender temporariamente o uso da conta sem excluí-la permanentemente.</Text>
        
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Excluir seus dados da conta</Text>
          <Ionicons name="chevron-forward" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.rowDescription}>Exclua permanentemente seus dados e tudo o que estiver associado a sua conta.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#808080',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitleMain: {
    fontSize: 18, // Aumentei o tamanho da fonte para "Sua conta" e "Informações pessoais"
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14, // Diminuí o tamanho da fonte para as outras seções
    fontWeight: '600',
    color: '#808080',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowText: {
    fontSize: 14, // Diminuí o tamanho da fonte das opções
    fontWeight: '400',
  },
  rowValue: {
    fontSize: 14, // Diminuí o tamanho da fonte dos valores
    color: '#808080',
    marginRight: 8,
  },
  sectionBottom: {
    marginTop: 20, // Ajustei o espaçamento para subir um pouco
  },
  rowDescription: {
    fontSize: 12, // Fonte menor para as descrições
    color: '#808080',
    marginLeft: 16, // Alinhei com a margem da descrição anterior
    marginBottom: 12, // Adicionei espaço entre as descrições
  },
});

export default AccountManagementScreen;
