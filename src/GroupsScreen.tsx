import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function GroupsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./img/playmap.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>PlayMap</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#999"
        />
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/482/482631.png' }}
          style={styles.searchIcon}
        />
      </View>
      <ScrollView style={styles.groupList}>
        {[
          //members para simbolizar mensagens recebidas enquanto não tem implementação de chat
          { name: 'Perna Longa', members: '104', image: 'https://i.pinimg.com/originals/78/12/a7/7812a76820f4d5269dadd571ff759174.jpg' },
          { name: 'Pedala pra frente', members: '95', image: 'https://www.anastra.com.br/wp-content/uploads/2022/07/Anastra-2022-Quinta-0443-1024x683.jpg' },
          { name: 'Músculos de Titan', members: '80', image: 'https://image.lexica.art/md2_webp/d370994d-3c60-4aa5-848c-16191aeec57f' },
          { name: 'Vôlei - FEM IHAC', members: '20', image: 'https://cdn-icons-png.flaticon.com/128/5496/5496293.png' },
          { name: 'JOJO Workout', members: '70', image: 'https://static.wikia.nocookie.net/jjba/images/9/9e/Sports_Maxx_Anime.png/revision/latest?cb=20221202205133&path-prefix=pt-br' },
          { name: 'Vôlei no CEFE', members: '46', image: 'https://www.animeac.com.br/wp-content/uploads/2024/06/anime-haikyuu-10.webp' },
          { name: 'Saitama Workout', members: '55', image: 'https://i.pinimg.com/736x/04/b7/c0/04b7c03aebf75630a5c02af2129bc165.jpg' },
        ].map((group, index) => (
          <TouchableOpacity key={index} style={styles.groupItem}>
            <Image source={{ uri: group.image }} style={styles.groupImage} />
            <Text style={styles.groupName}>{group.name}</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberCount}>{group.members}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#333",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  groupList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  groupName: {
    fontSize: 16,
    flex: 1,
  },
  memberBadge: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  memberCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
