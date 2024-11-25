import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../firebaseConfig'; //arquivo de configuração Firebase
import { collection, addDoc } from 'firebase/firestore';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function CadastroScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleRegister = async () => {
    if (!nome || !email || !senha || senha !== confirmarSenha) {
      showAlert('Erro', 'Verifique se todos os campos estão preenchidos e se as senhas coincidem');
      return;
    }

    try {
      await addDoc(collection(db, 'usuarios'), {
        nome,
        email,
        senha,
      });
      showAlert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      showAlert('Erro', 'Erro ao registrar. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./img/playmap.png')} style={styles.logo} />
      </View>

      <Text style={styles.header}>Novo Usuário</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Digite seu nome completo"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OU</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require('./img/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./img/tiktok.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./img/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Já possui conta?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
          Faça o login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#FF5722', 
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#aaa',
    padding:10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  footerText: {
    textAlign: 'center',
    color: '#333',
  },
  footerLink: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
});
