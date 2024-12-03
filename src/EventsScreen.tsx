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

export default function EventsScreen({ navigation }: { navigation: any }) {
  const events: Event[] = [
    {
      id: '1',
      title: 'BLUE RUN SALVADOR',
      date: '02/11/2014',
      location: 'Salvador - BA',
      category: 'Sport',
      buttonText: 'Inscrições Abertas',
      image: 'https://cdn.ticketsports.com.br/ticketagora/images/FLYS63JBOKRFM60RQG3RHQWBA62HDTUK0I9MN1RP5WRUIAW1V9.png',
    },
    {
      id: '2',
      title: '4ª Corrida de Prevenção ao AVC',
      date: '03/11/2014',
      location: 'Feira de Santana - BA',
      category: 'Olimpio organização',
      buttonText: 'Inscrições Abertas',
      image: 'https://storage.googleapis.com/corridinhas-production/race-images%2Fab53586f-0e58-475b-88bf-61ccbc9f26e6.webp',
    },
    {
      id: '3',
      title: 'AMARIDER DESAFIO XCM - 5° EDIÇÃO 2024',
      date: '06/11/2014',
      location: 'Armagosa - BA',
      category: 'Amarider',
      buttonText: 'Inscrições Abertas',
      image: 'https://www.costasulfm.com.br/listas/posts/198005.png',
    },
    {
    id: '4',
    title: '13° VOLTA DOS 3 FARÓIS',
    date: '01/12/2024',
    location: 'Salvador - BA',
    category: 'Mural de AVENTURAS',
    buttonText: 'Inscrições Abertas',
    image: 'https://cdn.ticketsports.com.br/ticketagora/images/thumb/6W8KBKQ2LI43SCUJ22F0DZAM7TEYGY3ZYL127739OL651OIG59.png',
    },
    {
    id: '5',
    title: '4° Corrida da FAI',
    date: '20/10/2024',
    location: 'Irecê - BA',
    category: 'Mega Eventos',
    buttonText: 'Inscrições Fechadas',
    image: 'https://storage.googleapis.com/corridinhas-production/race-images%2Fc9be49cc-45b5-4d9d-b47d-724f17f73c70.webp',
    },
    {
      id: '6',
      title: 'CIRCUITO ASSAÍ 50 ANOS - SALVADOR',
      date: '17/11/2024',
      location: 'Salvador - BA',
      category: 'Assaí',
      buttonText: 'Inscrições Abertas',
      image: 'https://storage.googleapis.com/corridinhas-production/race-images%2Fff625cb0-758b-4545-b441-146403d6d75b.webp',
      },
  ];

  const renderEvent = ({ item, index }: { item: Event; index: number }) => (
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
        <TouchableOpacity
          style={[
            styles.eventButton,
            item.buttonText === 'Inscrições Fechadas' && styles.eventButtonClosed,
          ]}
          onPress={() => {
            if (index === 0) {
              navigation.navigate('CadastroEvento');
            }
          }}
        >
          <Text
            style={[
              styles.eventButtonText,
              item.buttonText === 'Inscrições Fechadas' && styles.eventButtonTextClosed,
              index !== 0 && styles.eventButtonTextDisabled, // Estilo para texto desabilitado
            ]}
          >
            {item.buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos Disponíveis</Text>
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
  eventButtonClosed: {
    backgroundColor: '#dc3545', // Vermelho para "Inscrições Fechadas"
  },
  eventButtonTextDisabled: {
    color: '#fff', // Cor mais clara para texto desabilitado
  },
  eventButtonTextClosed: {
    color: '#fff', 
  },
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
