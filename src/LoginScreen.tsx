import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

interface LoginScreenProps {
  navigation: any;  // Propriedade para navegação entre telas
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Verificar se os campos de email e senha estão preenchidos
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Realizar a requisição POST para o backend de login
    fetch('http://10.0.0.7:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login bem-sucedido') {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
          // Aqui você pode redirecionar o usuário para outra tela
        } else {
          Alert.alert('Erro', data.message);
        }
      })
      .catch((error) => {
        console.error('Erro durante o login:', error);
        Alert.alert('Erro', 'Não foi possível realizar o login');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
      {/* Botão para alternar para a tela de cadastro */}
      <Text style={styles.switchText}>Não tem uma conta?</Text>
      <Button
        title="Cadastre-se"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  switchText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default LoginScreen;
