import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<MainTabParamList, 'Perfil'>;

export default function ProfileScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://imply.com/wp-content/uploads/composite-image-mid-section-sportsman-holding-volleyball.jpg' }}
            style={styles.headerBackground}
          />
          <View style={styles.profileInfo}>
            <Image
              source={require('./img/perfil-img.png')}
              style={styles.profileImage}
            />

          <TouchableOpacity
              style={styles.settingsIconContainer}
              onPress={() => navigation.navigate('ConfigGeral')}
            >
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/40/40031.png',
                }}
                style={styles.settingsIcon}
              />
          </TouchableOpacity>

            <Text style={styles.nameText}>Alex Vasquez</Text>
            <Text style={styles.pronounText}>Ela/Dela</Text>
            <Text style={styles.locationText}>🚩 Salvador - BA</Text>
          </View>
        </View>

        <View style={styles.socialMediaContainer}>
          {[
            { name: 'X', icon: 'https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png' },
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
              { name: 'Vôlei', image: 'https://cdn-icons-png.flaticon.com/128/37/37680.png' },
              { name: 'Corrida', image: 'https://cdn-icons-png.flaticon.com/128/763/763965.png' },
              { name: 'Ciclismo', image: 'https://cdn-icons-png.flaticon.com/128/94/94203.png' },
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
              name: 'Pedala Pra Frente!!',
              image: 'https://www.anastra.com.br/wp-content/uploads/2022/07/Anastra-2022-Quinta-0443-1024x683.jpg',
            },
            {
              name: 'Músculos of Titan',
              image: 'https://image.lexica.art/md2_webp/d370994d-3c60-4aa5-848c-16191aeec57f',
            },
          ].map((group, index) => (
            <TouchableOpacity
              key={index}
              style={styles.groupCard}
              onPress={() => {
                if (group.name === 'Perna Longa') {
                  navigation.navigate('DetalhesGrupo');
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

   
      <View style={styles.bottomNav}>
        {['Início', 'Grupos', 'Eventos', 'Perfil'].map((label, index) => (
          <TouchableOpacity key={index} style={styles.navButton}>
            <Text style={styles.navText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 30,
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
