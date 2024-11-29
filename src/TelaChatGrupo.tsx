import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://static.wikia.nocookie.net/jjba/images/9/9e/Sports_Maxx_Anime.png/revision/latest?cb=20221202205133&path-prefix=pt-br' }}
          style={styles.groupImage}
        />
        <Text style={styles.groupName}>JOJO Workout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        
        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#0000FF' }]}>Giovane</Text>
          <Text style={styles.messageText}>Gente, cadê a foto da corrida de hoje?</Text>
          <Text style={styles.messageTime}>10:12</Text>
        </View>

        <View style={[styles.messageContainer, styles.userMessage]}>
          <Text style={styles.messageText}>Acho que ficou com a chat da Mandy 😜</Text>
          <Text style={styles.messageTime}>10:12</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#FF00FF' }]}>Mista</Text>
          <Text style={styles.messageText}>Não</Text>
          <Text style={styles.messageTime}>10:14</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#FFA500' }]}>Bucciarati</Text>
          <Text style={styles.messageText}>A foto está comigo, daqui a pouco eu envio</Text>
          <Text style={styles.messageTime}>10:16</Text>
        </View>

        <View style={[styles.messageContainer, styles.userMessage]}>
          <Text style={styles.messageText}>Manda logo Sam 😂</Text>
          <Text style={styles.messageTime}>10:20</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#FFA500' }]}>Bucciarati</Text>
          <Image
             source={{ uri: 'https://www.acidadeon.com/ribeiraopreto/wp-content/uploads/sites/3/2023/08/grupo_poderosas_1200x675_04062022153222.jpg' }}
            style={styles.messageImage}
          />
          <Text style={styles.messageTime}>10:21</Text>
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Message" />
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4175/4175199.png' }}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    padding: 15,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#D9FDD3',
    alignSelf: 'flex-end',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#AAA',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
    tintColor: '#FF5722',
  },
});

export default ChatScreen;
