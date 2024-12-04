import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<RootStackParamList, 'MembrosGrupo'>;

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const members = [
  { id: '1', name: 'Sam', avatar: 'https://pics.craiyon.com/2023-10-04/ea1d7c2f085647cb812df273e091d6b3.webp' },
  { id: '2', name: 'Connie', avatar: 'https://i.pinimg.com/736x/ae/c2/51/aec251493fc3e6d331a0dcdf6997f7b3.jpg' },
  { id: '3', name: 'Robin', avatar: 'https://i.pinimg.com/236x/fa/c0/43/fac04382be00644bcdb7282ea127de09.jpg' },
  { id: '4', name: 'Clover', avatar: 'https://i.pinimg.com/736x/d5/9f/69/d59f69942989bb53fdffec6f58abe6a3.jpg' },
  { id: '5', name: 'Sandy', avatar: 'https://i.pinimg.com/736x/8b/fb/8d/8bfb8db72030cce6c4c7505b8915e877.jpg' },
];

export default function App({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
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
            <Text style={styles.groupInfo2}>15 membros</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.optionsIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Membros</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Image style={styles.memberAvatar} source={{ uri: item.avatar }} />
            <Text style={styles.memberName}>{item.name}</Text>
          </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
    marginTop: 30,
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 40,
    color: '#000',
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
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  caixaInfos: {
    flexDirection: 'row',
    marginTop: 10,
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
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF621F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
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
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  memberName: {
    fontSize: 18,
    color: '#333',
  },
});
