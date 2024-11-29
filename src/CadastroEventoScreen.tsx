import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const BlueRunCard = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('./img/bluerun.png')}
        style={styles.image}
      />
      <View></View>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.card}>
          <Text style={styles.description}>
            Inscrições até <Text style={styles.bold}>30/10/2024 23:59</Text> ou <Text style={styles.bold}>até o limite de vagas.</Text>
          </Text>

          <FlatList
            data={[
              {
                id: '1',
                icon: require('./img/imgEventos/001-calendar.png'), 
                text: '02/11/2024',
              },
              {
                id: '2',
                icon: require('./img/imgEventos/002-pin.png'),
                text: 'Jardim de Alah: Avenida Octávio Mangabeira, Salvador-BA',
              },
              {
                id: '3',
                icon: require('./img/imgEventos/003-bandeiras.png'),
                text: 'Sport',
              },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.iconWithText}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.infoText}>{item.text}</Text>
              </View>
            )}
          />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>✅  Inscreva-se</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    fontFamily: 'Arial, sans-serif',
    borderRadius: 10,
    elevation: 5,
    marginTop: -10,
    width: 420,
    height: '58%',
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
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '93%',
    height: 400,
    borderRadius: 10,
    elevation: 3,
    marginTop: 30,
  },
  details: {
    marginVertical: 16,
  },
  description: {
    fontSize: 12,
    color: '#333',
    marginTop: 13,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 15,
  },
  icon: {
    width: 40,
    height: 28, 
    marginRight: 8,
    resizeMode: 'contain', // Ajusta o ícone ao tamanho especificado
  },
  infoText: {
    fontSize: 17,
    color: '#555',
    marginTop: 5,
  },
  button: {
    width: '50%',
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: '25%',
    marginBottom: 28,
    elevation: 3
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BlueRunCard;
