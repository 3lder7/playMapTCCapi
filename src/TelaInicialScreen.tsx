import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Localize sua área esportiva</Text>
        <Text style={styles.subtitle}>
          Encontre os melhores lugares para praticar sua atividade física favorita.
        </Text>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.solidBackground}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWhite}>
            <Text style={styles.buttonWhiteText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlack}>
            <Text style={styles.buttonBlackText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f3e',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
    marginHorizontal: 5,
  },
  solidBackground: {
    width: '100%',
    backgroundColor: '#FF621F', // Cor sólida substituindo o LinearGradient
    paddingHorizontal: 20,
    paddingBottom: 120,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    marginTop: 60,
  },
  buttonWhite: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 0,
    elevation: 3,
    marginBottom: 30,
  },
  buttonWhiteText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  buttonBlack: {
    backgroundColor: '#000000',
    borderRadius: 10,
    elevation: 4,
    marginBottom: -20,
    borderWidth: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonBlackText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});