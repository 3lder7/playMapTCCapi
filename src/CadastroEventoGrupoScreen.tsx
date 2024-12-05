import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

type Participant = {
  id: string;
  name: string;
  avatar: string;
};

const participants: Participant[] = [
  { id: '2', name: 'Robin', avatar: 'https://i.pinimg.com/236x/fa/c0/43/fac04382be00644bcdb7282ea127de09.jpg' },
  { id: '3', name: 'Sandy', avatar: 'https://i.pinimg.com/736x/8b/fb/8d/8bfb8db72030cce6c4c7505b8915e877.jpg' },
  { id: '4', name: 'Jerry', avatar: 'https://i.pinimg.com/564x/d1/f4/ae/d1f4ae435543549c89ba8090a1a788b4.jpg' },
];

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false); // Estado para controlar a inscrição

  const handleParticipate = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setIsRegistered(true); // Marca a inscrição como confirmada
    }, 2000); // Fecha o modal após 2 segundos e confirma a inscrição
  };

  const renderParticipant = ({ item }: { item: Participant }) => (
    <View style={styles.participant}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Treino de Salto</Text>
        <Text style={styles.time}>11:00</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Data</Text>
        <View style={styles.infoRow}>
          <Image
            source={require('./img/imgEventos/001-calendar.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Segunda 26/10/2024</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Local</Text>
        <View style={styles.infoRow}>
          <Image
            source={require('./img/imgEventos/002-pin.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Av. Milton Santos - Ondina</Text>
        </View>
        <TouchableOpacity style={styles.mapButton}>
          <Ionicons name="map" size={20} color="#fff" />
          <Text style={styles.mapText}>Ver no mapa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.participateButton} onPress={handleParticipate}>
        <Text style={styles.participateText}>Participar</Text>
      </TouchableOpacity>

      <Text style={styles.confirmedLabel}>Pessoas confirmadas ✅</Text>
      <FlatList
        data={isRegistered ? [{ id: '1', name: 'Você', avatar: 'https://i.pinimg.com/736x/f7/91/0e/f7910e574c496611ebb30a88ee52e50c.jpg' }, ...participants] : participants} 
        renderItem={renderParticipant}
        keyExtractor={(item) => item.id}
        style={styles.participantsList}
      />

      <Modal transparent visible={modalVisible} animationType="fade">
        <BlurView intensity={50} style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#04A57F" />
            <Text style={styles.modalText}>Inscrição Confirmada!</Text>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: -10,
    marginRight: -80,
  },
  backText: {
    fontSize: 40,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
    marginBottom: 5,
  },
  info: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
    marginTop: -75,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04A57F',
    borderRadius: 25,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  mapText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  participateButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  participateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmedLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  participantsList: {
    marginTop: 10,
    flexGrow: 0,
  },
  participant: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
