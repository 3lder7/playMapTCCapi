import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import { db } from '../firebaseConfig'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      showAlert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
  
    try {
      const userRef = query(collection(db, 'usuarios'), where('email', '==', email), where('senha', '==', senha));
      const querySnapshot = await getDocs(userRef);

      if (!querySnapshot.empty) {
        showAlert('Sucesso', 'Login bem-sucedido');
        navigation.navigate('Main');
      } else {
        showAlert('Erro', 'Email ou senha inválidos');
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      showAlert('Erro', 'Erro ao fazer login. Tente novamente mais tarde.');
    }
  };  


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./img/playmap.png')} style={styles.logo} />
      </View>

      <Text style={styles.header}>Login</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
        <TextInput 
          placeholder="Digite Seu Email" 
          style={styles.input} 
          keyboardType="email-address" 
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
        <TextInput 
          placeholder="Digite Sua Senha" 
          style={styles.input} 
          secureTextEntry 
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OU</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require('./img/facebook.png')} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./img/google.png')} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./img/tiktok.png')} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.registerText}>
          Tela Teste MAPA <Text style={styles.registerLink}>Mapa</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 10,
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
  loginButton: {
    backgroundColor: '#3b5998',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#aaa',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#3b5998',
    marginBottom: 20,
  },
  registerText: {
    textAlign: 'center',
    color: '#333',
  },
  registerLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});
