import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<MainTabParamList, 'VisibiPerfil'>;

const ProfileVisibilityScreen = ({ navigation }: Props) => {
  const [selectedOption, setSelectedOption] = useState('public'); 
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Visibilidade do perfil</Text>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setSelectedOption('public')}
      >
        <Text style={styles.optionText}>Perfil Público</Text>
        <View style={styles.radioCircle}>
          {selectedOption === 'public' && <View style={styles.selectedCircle} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setSelectedOption('private')}
      >
        <Text style={styles.optionText}>Perfil Privado</Text>
        <View style={styles.radioCircle}>
          {selectedOption === 'private' && <View style={styles.selectedCircle} />}
        </View>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  backText: {
    fontSize: 40,
    color: '#000',
    marginTop: -30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32, 
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16, 
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

export default ProfileVisibilityScreen;
