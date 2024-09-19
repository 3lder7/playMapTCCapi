import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

interface CadastroScreenProps {
  navigation: any;  // Propriedade para navegação entre telas
}

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Verificar se os campos estão preenchidos
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Realizar a requisição POST para o backend de cadastro , LEMBRAR DE ALTERAR O ENDEREÇO IPV4!!!
    fetch('http://10.0.0.114:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Usuário cadastrado com sucesso') {
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
          // Redirecionar o usuário para a tela de login após o cadastro
          navigation.navigate('Login');
        } else {
          Alert.alert('Erro', data.message);
        }
      })
      .catch((error) => {
        console.error('Erro durante o cadastro:', error);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
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
      <Button title="Cadastrar" onPress={handleCadastro} />
      {/* Botão para alternar para a tela de login */}
      <Text style={styles.switchText}>Já possui conta?</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
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
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  switchText: {
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default CadastroScreen;

