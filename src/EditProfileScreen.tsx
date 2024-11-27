// EditProfileScreen.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';  // Importando os tipos do arquivo de navegação

// Tipando a navegação para a tela de Configurações (EditProfileScreen)
type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Configurações'>;

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('./img/perfil-img.png')}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.optionList}>
        {[ // Exemplo de opções do perfil
          { label: 'Nome' },
          { label: 'Pronomes' },
          { label: 'Privacidade' },
          { label: 'Altera capa' },
          { label: 'Instagram', value: 'Alex.VS' },
          { label: 'Tiktok', value: 'Alex.VS' },
          { label: 'Twitter', value: 'Alex.VS' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.option}>
            <Text style={styles.optionLabel}>{item.label}</Text>
            <View style={styles.optionRight}>
              {item.value && <Text style={styles.optionValue}>{item.value}</Text>}
              <Text style={styles.optionArrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    color: '#000',
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FF5722',
  },
  optionList: {
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
  },
  optionLabel: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'normal',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    color: '#555',
    marginRight: 10,
  },
  optionArrow: {
    fontSize: 18,
    color: '#000000',
  },
});
