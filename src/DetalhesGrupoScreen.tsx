import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhesGrupo'>;

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

type Event = { id: string; title: string; time: string };
type Events = {
  'SEG 25': Event[];
  'TER 26': Event[];
  'QUA 30': Event[];
  'QUI 31': Event[];
  'SEX 01': Event[];
  'SÁB 02': Event[];
};

const allEvents: Events = {
  'SEG 25': [
    { id: '1', title: 'Treino de Ritmo', time: '12:20' },
    { id: '2', title: 'Corrida Intervalada', time: '14:40' },
    { id: '3', title: 'Corrida de Resistência', time: '15:30' },
    { id: '4', title: 'Funcional', time: '16:00' },
    { id: '5', title: 'Corrida em Subida', time: '16:30' },
    { id: '6', title: 'Sprint 200m', time: '17:45' },
  ],
  'TER 26': [
    { id: '8', title: 'Treino de Salto', time: '11:00' },
    { id: '9', title: 'Treino de Técnica de Passada', time: '12:00' },
    { id: '10', title: 'Treino de Velocidade Progressiva ', time: '14:00' },
  ],
  'QUA 30': [
    { id: '11', title: 'Aquecimento', time: '8:00' },
    { id: '12', title: 'Corrida Longa', time: '11:00' },
    { id: '13', title: 'Corrida em Descanso Ativo (Pace Leve)', time: '14:00' },
    { id: '14', title: 'Funcional com Elásticos', time: '18:00' },
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

export default function App({ navigation }: Props) {
  const [selectedDate, setSelectedDate] = useState<keyof Events>('TER 26');
  const dates: (keyof Events)[] = ['SEG 25', 'TER 26', 'QUA 30', 'QUI 31', 'SEX 01', 'SÁB 02'];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText} onPress={() => navigation.goBack()}>←</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.buttonText}>Conversas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MembrosGrupo')}>
          <Text style={styles.buttonText}>Membros</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Eventos do Grupo</Text>
      <View style={styles.dateScroll}>
        {dates.map((date, index) => (
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
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => {
              if (item.title === 'Treino de Salto') {
                navigation.navigate('TelaCadastroEventoGrupo');
              }
            }}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: -5,
    marginTop: -10,
    marginLeft: 15,
  },
  backText: {
    fontSize: 40,
    color: '#000',
  },
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
    paddingBottom: 15,
    marginLeft: -18,
    marginRight: -18,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  caixaInfos: {
    marginTop: 10,
    flexDirection: 'row',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  groupInfo1: {
    fontSize: 14,
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#22BE0E',
    marginRight: 8,
  },
  groupInfo2: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  optionsIcon: {
    fontSize: 24,
    color: '#000',
    marginRight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF621F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateItem: {
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 6,
    backgroundColor: '#E0E0E0',
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
    fontWeight: 'bold',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#E0E0E0', // Botão destacado
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c', // Texto branco para contraste
  },
  eventTime: {
    fontSize: 16,
    color: 'gray', // Texto branco
  },
  eventItemPressed: {
    backgroundColor: '#D5531A', // Cor ao pressionar
  },
});

