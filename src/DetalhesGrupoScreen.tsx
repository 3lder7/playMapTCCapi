import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const allEvents = {
  'SEG 25': [
    { id: '1', title: 'Treino de Ritmo', time: '12:20' },
    { id: '2', title: 'Funcional', time: '14:40' },
  ],
  'TER 26': [
    { id: '3', title: 'Meia Maratona', time: '07:30' },
    { id: '4', title: 'Treino de Salto', time: '11:00' },
  ],
  'QUA 30': [
    { id: '5', title: 'Aquecimento', time: '8:00' },
    { id: '6', title: 'Corrida Longa', time: '11:00' },
  ],
  'QUI 31': [
    { id: '5', title: 'Posteriores', time: '10:00' },
    { id: '6', title: 'Salto na praia', time: '13:00' },
  ],
  'SEX 01': [
    { id: '7', title: 'Em Breve', time: '' },
  ],
  'SÁB 02': [
    { id: '8', title: 'Em Breve', time: '' },
  ],
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState('TER 26'); // Data inicial selecionada

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.groupImage}
          source={{
            uri: 'https://i.pinimg.com/originals/78/12/a7/7812a76820f4d5269dadd571ff759174.jpg', 
          }}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.groupName}>Perna Longa</Text>
          <View style={styles.caixaInfos}>
            <Text style={styles.groupInfo1}>Membro</Text>
            <Text style={styles.groupInfo2}>Corrida 🏃‍♀️</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.optionsIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Conversas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Membros</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Eventos do Grupo</Text>
      <View style={styles.dateScroll}>
        {['SEG 25', 'TER 26', 'QUA 30', 'QUI 31', 'SEX 01', 'SÁB 02', 'DOM 03'].map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dateItem, date === selectedDate && styles.activeDate]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.dateText, date === selectedDate && styles.activeDateText]}>{date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={allEvents[selectedDate] || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 1,
    paddingBottom: 25,
    marginLeft: -18,
    marginRight: -18,
    marginTop: 30,
    borderBottomColor: '#000',
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    marginLeft: 15,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 1,
    flexDirection: 'column',
  },
  caixaInfos: {
    marginTop: 10,
    flexDirection: 'row',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  groupInfo1: {
    fontSize: 14,
    color: '#000',
    width: '18%',
    padding: 2,
    borderRadius: 5,
    elevation: 1,
    borderWidth: 0.5,
    marginLeft: 10,
    backgroundColor: '#22BE0E',
  },
  groupInfo2: {
    fontSize: 14,
    width: '25.5%',
    padding: 2,
    elevation: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
  },
  optionsIcon: {
    fontSize: 29,
    color: '#000',
    marginRight: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '10%',
    marginTop: 35,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 6,
    borderWidth: 0.5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  dateScroll: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  dateItem: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#C6C2C2',
  },
  activeDate: {
    backgroundColor: '#000',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  activeDateText: {
    color: '#fff',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#ddd',
    borderTopColor: '#ddd',
    borderTopWidth: 1.5,
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 20,
    color: '#000',
  },
  eventTime: {
    fontSize: 20,
    color: '#000',
    marginRight: 30,
  },
});
