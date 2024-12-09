import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 
import { FontAwesome } from '@expo/vector-icons'; 

type Props = NativeStackScreenProps<MainTabParamList, 'TelaMembro'>;

export default function ProfileScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://www.beartai.com/wp-content/uploads/2020/01/Captain-Tsubasa-Rise-of-New-Champions_2020_01-24-20_002.jpg' }}
            style={styles.headerBackground}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://pics.craiyon.com/2023-10-04/ea1d7c2f085647cb812df273e091d6b3.webp' }}
              style={styles.profileImage}
            />
            <Text style={styles.nameText}>Sam DyJunior</Text>
            <Text style={styles.pronounText}>A número 10!</Text>
            <Text style={styles.locationText}>🚩 Salvador - BA</Text>
          </View>
        </View>

        <View style={styles.socialMediaContainer}>
          {[
            { name: 'Twitter', icon: 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png' },
            { name: 'Instagram', icon: 'https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png' },
            { name: '', icon: 'https://static.vecteezy.com/system/resources/thumbnails/016/716/485/small_2x/tiktok-icon-free-png.png' },
          ].map((social, index) => (
            <Image
              key={index}
              source={{ uri: social.icon }}
              style={styles.socialIcon}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Esportes que pratica</Text>
          <View style={styles.sportsHorizontalContainer}>
            {[
              { name: 'Futsal', image: 'https://icons.iconarchive.com/icons/icons8/windows-8/512/Sports-Football-icon.png' },
              { name: 'Tênis', image: 'https://cdn-icons-png.flaticon.com/512/72/72945.png' },
              { name: 'Natação', image: 'https://cdn-icons-png.flaticon.com/512/50/50004.png' },
            ].map((sport, index) => (
              <View key={index} style={styles.sportCardHorizontal}>
                <Image source={{ uri: sport.image }} style={styles.sportIconHorizontal} />
                <Text style={styles.sportNameHorizontal}>{sport.name}</Text>
              </View>
            ))}
          </View>
        </View>

      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grupos que participa</Text>
          {[
            {
              name: 'Perna Longa',
              image: 'https://i.pinimg.com/originals/78/12/a7/7812a76820f4d5269dadd571ff759174.jpg',
              screen: 'PernaLongaScreen',
            },
            {
              name: 'Saitama Workout',
              image: 'https://cdn6.aptoide.com/imgs/b/e/f/befac7ddbe2bf46a1389d4c2592caf8f_icon.png',
            },
            {
              name: 'JOJO Workout',
              image: 'https://static.wikia.nocookie.net/jjba/images/9/9e/Sports_Maxx_Anime.png/revision/latest?cb=20221202205133&path-prefix=pt-br',
            },
          ].map((group, index) => (
            <TouchableOpacity
              key={index}
              style={styles.groupCard}
              onPress={() => {
                if (group.name === 'Perna Longa') {
                  navigation.navigate('Chat');
                }
              }}
            >
              <Image source={{ uri: group.image }} style={styles.groupImage} />
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    bottom: 65,
    left: 10,
    backgroundColor: '#FF5722',
    borderRadius: 25,
    padding: 9,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: -40, 
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3.5,
    borderColor: '#fff',
  },
  settingsIconContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    width: 30,
    height: 30,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pronounText: {
    fontSize: 14,
    color: '#666',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    marginBottom: 20,
    marginTop: -8,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 25,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sportsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  sportCard: {
    alignItems: 'center',
    width: 70,
    marginBottom: 10,
  },
  sportIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  sportName: {
    fontSize: 12,
    textAlign: 'center',
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  groupName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  groupArrow: {
    fontSize: 40,
    color: '#000000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  sportsHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  sportCardHorizontal: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 2, 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  sportIconHorizontal: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  sportNameHorizontal: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
});
