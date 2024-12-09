import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
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

  const handleLogin = () => {
    if (!email && !senha) {
      // se ambos os campos estiverem vazios, navega para a próxima página
      navigation.navigate('Main');
      return;
    }
  
    // validação para entradas inadequadas
    if (!validateEmail(email) || senha.length < 6) {
      showAlert('Erro', 'Por favor, preencha os campos corretamente.');
      return;
    }
  
    // caso esteja tudo preenchido corretamente
    showAlert('Sucesso', 'Login bem-sucedido');
    navigation.navigate('Main');
  };
  
    // função para validar o email (simples)
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  

  return (
    <View style={styles.container}>
      <Image source={require('./img/playmap.png')} style={styles.logo} />

      <Text style={styles.header}>Entrar</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={24} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={28} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueçeu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Continuar</Text>
      </TouchableOpacity>

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

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerText}>
          Ainda não possui uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.linkMapaBox}>
          <Text style={styles.linkMapa}>MAPA</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 100,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
   inputContainer: {
    width: "100%",
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    alignItems: 'center',
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    color: '#549bd6',
    marginBottom: 40,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 60,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  registerText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: -50,
  },
  registerLink: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  linkMapaBox:{
    marginTop: -20,
  },
  linkMapa:{
    color: '#FF5722',
    textDecorationLine:'underline',
  }
});
