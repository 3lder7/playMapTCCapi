import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Perfil: undefined;
};
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Perfil'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText} onPress={() => navigation.navigate('Perfil')}>←</Text>
        
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
           source={require('./img/perfil-img.png')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Alterar Foto</Text>
        <Text style={styles.emailText}>AlexVasquez.@gmail.com</Text>
      </View>

      <View style={styles.optionList}>
        {[
          { label: 'Nome', value: 'Alex VAsquez' },
          { label: 'Pronomes', value: 'Ela/Dela' },
          { label: 'Privacidade', value: 'Público' },
          { label: 'Bio', value: '22 anos - Vol...' },
          { label: 'Status', value: 'O esporte é a fé' },
          { label: 'Instagram', value: 'Alex.VS' },
          { label: 'Tiktok', value: 'Alex.VS' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.option}>
            <Text style={styles.optionLabel}>{item.label}</Text>
            <Text style={styles.optionValue}>{item.value}</Text>
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
    padding: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 18,
    color: '#000',
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
    borderWidth: 7,
    borderColor: '#f58742',
  },
  changePhotoText: {
    color: '#000000',
    marginTop: 8,
    fontWeight: 'bold',
  },
  emailText: {
    color: '#666',
    marginTop: 4,
  },
  optionList: {
    marginTop: 20,
    borderRadius: 18,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f58742',
    borderRadius: 25,
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, 
  },
  optionLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 180,
  },
  optionValue: {
    color: '#fff',
    flexShrink: 1, //permite que o texto se ajuste sem empurrar o restante
  },
});
