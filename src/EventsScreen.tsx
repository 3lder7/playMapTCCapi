import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  buttonText: string;
  image: string;
};

export default function EventsScreen() {
  const events: Event[] = [
    {
      id: '1',
      title: 'BLUE RUN SALVADOR',
      date: '02/11/2014',
      location: 'Salvador - BA',
      category: 'Sport',
      buttonText: 'Inscrições abertas',
      image: 'https://cdn.ticketsports.com.br/ticketagora/images/FLYS63JBOKRFM60RQG3RHQWBA62HDTUK0I9MN1RP5WRUIAW1V9.png',
    },
    {
      id: '2',
      title: '4ª Corrida de Prevenção ao AVC',
      date: '03/11/2014',
      location: 'Feira de Santana - BA',
      category: 'Olimpio organização',
      buttonText: 'Inscrições abertas',
      image: 'https://storage.googleapis.com/corridinhas-production/race-images%2Fab53586f-0e58-475b-88bf-61ccbc9f26e6.webp',
    },
  ];

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventInfoContainer}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventRow}>
          <Image
            source={require('./img/imgEventos/001-calendar.png')}
            style={styles.icon}
          />
          <Text style={styles.eventText}>{item.date}</Text>
        </View>
        <View style={styles.eventRow}>
          <Image
            source={require('./img/imgEventos/002-pin.png')}
            style={styles.icon}
          />
          <Text style={styles.eventText}>{item.location}</Text>
        </View>
        <View style={styles.eventRow}>
          <Image
            source={require('./img/imgEventos/003-bandeiras.png')}
            style={styles.icon}
          />
          <Text style={styles.eventText}>{item.category}</Text>
        </View>
        <TouchableOpacity style={styles.eventButton}>
          <Text style={styles.eventButtonText}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
  },
  list: {
    paddingHorizontal: 16,
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventInfoContainer: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  eventText: {
    fontSize: 14,
    color: '#666',
  },
  eventButton: {
    marginTop: 12,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
