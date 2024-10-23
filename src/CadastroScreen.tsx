import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
    if (!email || !nome || !senha || senha !== confirmarSenha) {
      showAlert('Erro', 'Verifique se todos os campos estão preenchidos e se as senhas coincidem');
      return;
    }
  
    try {
      const response = await fetch('https://supreme-fiesta-wpp7wrg7pxqc54w-3000.app.github.dev/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
      });
  
      const data = await response.json();
      
      if (response.status === 201) {
        showAlert('Sucesso', data.message);
        navigation.navigate('Login');
      } else {
        showAlert('Erro', data.message);
      }
    } catch (error) {
      console.log('Erro ao registrar:', error);
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
        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        <TextInput 
          placeholder="Digite Seu Nome Completo" 
          style={styles.input} 
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
        <TextInput 
          placeholder="Digite Seu Email" 
          style={styles.input} 
          keyboardType="email-address"
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

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
        <TextInput 
          placeholder="Confirme Sua Senha" 
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

      

      <Text style={styles.loginText}>
        Já possui conta? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Faça o login</Text>
      </Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: '#3b5998',
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
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  loginText: {
    textAlign: 'center',
    color: '#333',
  },
  loginLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});
