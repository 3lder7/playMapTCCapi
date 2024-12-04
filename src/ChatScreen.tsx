import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation(); // Hook para navegação

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/78/12/a7/7812a76820f4d5269dadd571ff759174.jpg' }}
          style={styles.groupImage}
        />
        <TouchableOpacity onPress={() => navigation.navigate('DetalhesGrupo')}>
          <Text style={styles.groupName}>Perna Longa</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal do chat */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#0000FF' }]}>Giovane</Text>
          <Text style={styles.messageText}>Gente, cadê a foto da corrida de hoje?</Text>
          <Text style={styles.messageTime}>10:12</Text>
        </View>

        <View style={[styles.messageContainer, styles.userMessage]}>
          <Text style={styles.messageText}>Acho que ficou com a chat da Marie 😜</Text>
          <Text style={styles.messageTime}>10:12</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#FF00FF' }]}>Marie</Text>
          <Text style={styles.messageText}>Não</Text>
          <Text style={styles.messageTime}>10:14</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#FFA500' }]}>Rebbeca</Text>
          <Text style={styles.messageText}>A foto está comigo, daqui a pouco eu envio</Text>
          <Text style={styles.messageTime}>10:16</Text>
        </View>

        <View style={[styles.messageContainer, styles.userMessage]}>
          <Text style={styles.messageText}>Manda logo Beca 😂</Text>
          <Text style={styles.messageTime}>10:20</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={[styles.senderName, { color: '#FFA500' }]}>Rebbeca</Text>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/15/4a/22/154a2223e76a53a98df408158e3b781d.jpg' }}
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
    padding: 11,
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    fontSize: 40,
    color: '#FFF',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
    marginRight: 15,
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
