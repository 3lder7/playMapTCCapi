import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const groupEvents = [
  { id: '1', title: 'Treino de superior', time: '14:20' },
  { id: '2', title: 'Treino costa', time: '14:40' },
  { id: '3', title: 'Treino Inferior', time: '07:00' },
  { id: '4', title: 'Treino superior', time: '07:00' },
];

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.groupImage}
          source={{
            uri: 'https://via.placeholder.com/60', // Insira a URL da imagem desejada
          }}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.groupName}>JOJO Workout</Text>
          <Text style={styles.groupInfo}>Membro | 6 membros</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.optionsIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Group Tag */}
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>Musculação</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Conversas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Membros</Text>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <Text style={styles.sectionTitle}>Eventos do Grupo</Text>
      <View style={styles.dateScroll}>
        {['SEG 25', 'TER 26', 'QUA 30', 'QUI 31', 'SEX 01', 'SÁB 02', 'DOM 03'].map((date, index) => (
          <TouchableOpacity key={index} style={[styles.dateItem, date === 'QUA 30' && styles.activeDate]}>
            <Text style={[styles.dateText, date === 'QUA 30' && styles.activeDateText]}>{date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={groupEvents}
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
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  groupInfo: {
    fontSize: 14,
    color: '#666',
  },
  optionsIcon: {
    fontSize: 24,
    color: '#000',
  },
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateItem: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#f5f5f5',
  },
  activeDate: {
    backgroundColor: '#ff5722',
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  eventTitle: {
    fontSize: 16,
    color: '#000',
  },
  eventTime: {
    fontSize: 16,
    color: '#666',
  },
});
