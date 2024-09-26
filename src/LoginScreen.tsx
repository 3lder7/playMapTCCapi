import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  navigation: NavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    console.log('Login button clicked');
    fetch('http://10.0.0.7:3000/login', {//tem q ser a mesma do server.js
      // Verifique se o endereço está correto
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login response:', data);
        if (data.message === 'Login bem-sucedido') {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          // Redirecionar para a tela principal ou dashboard
          
        } else {
          Alert.alert('Erro', data.message);
        }
      })
      .catch(error => {
        console.error('Erro ao realizar login:', error);
        Alert.alert('Erro', 'Não foi possível realizar o login');
      });
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
