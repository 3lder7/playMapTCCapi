import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const BlueRunCard = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.date}>02/NOV</Text>
        <Text style={styles.title}>NO RITMO DA PREVENÇÃO</Text>
      </View>

      {/* Image and Title */}
      <View style={styles.imageContainer}>
        {/* Insira a URL de uma imagem se necessário */}
        <Image
          source={{ uri: 'https://via.placeholder.com/300x150' }} 
          style={styles.image}
        />
        <Text style={styles.subtitle}>BLUE RUN</Text>
        <Text style={styles.location}>SALVADOR</Text>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.description}>
          Inscrições até <Text style={styles.bold}>30/10/2024 00:00</Text> ou até o limite de vagas.
        </Text>

        <FlatList
          data={[
            { id: '1', icon: '📅', text: '02/11/2024' },
            { id: '2', icon: '📍', text: 'Jardim de Alah: Avenida Octávio Mangabeira, Salvador-BA' },
            { id: '3', icon: '🏃‍♂️', text: 'Sport' },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.iconWithText}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Inscreva-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 3, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0073e6',
  },
  title: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0073e6',
  },
  location: {
    fontSize: 16,
    color: '#555',
  },
  details: {
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BlueRunCard;
