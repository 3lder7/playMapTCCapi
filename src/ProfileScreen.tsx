import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }}
            style={styles.headerBackground}
          />
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80' }}
              style={styles.profileImage}
            />
            <Text style={styles.nameText}>Alex Vasquez</Text>
            <Text style={styles.pronounText}>Ela/Dela</Text>
            <Text style={styles.locationText}>Salvador-BA</Text>
          </View>
        </View>

        <View style={styles.socialMediaContainer}>
          {[
            { name: 'Instagram', icon: 'https://via.placeholder.com/40' },
            { name: 'TikTok', icon: 'https://via.placeholder.com/40' },
            { name: 'Outro', icon: 'https://via.placeholder.com/40' },
          ].map((social, index) => (
            <Image
              key={index}
              source={{ uri: social.icon }}
              style={styles.socialIcon}
            />
          ))}
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Esporte que prática</Text>
          <View style={styles.sportsContainer}>
            {[
              'https://via.placeholder.com/40',
              'https://via.placeholder.com/40',
              'https://via.placeholder.com/40',
              'https://via.placeholder.com/40',
            ].map((sport, index) => (
              <View key={index} style={styles.sportCard}>
                <Image source={{ uri: sport }} style={styles.sportIcon} />
                <Text style={styles.sportName}>Esporte {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grupos</Text>
          {[
            { name: 'Perna Longa', image: 'https://via.placeholder.com/40' },
            { name: 'Pedala pra frente', image: 'https://via.placeholder.com/40' },
            { name: 'Músculos de Titan', image: 'https://via.placeholder.com/40' },
          ].map((group, index) => (
            <TouchableOpacity key={index} style={styles.groupCard}>
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
    height: 200,
    borderRadius: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: -40, // Para ajustar em relação à imagem de fundo
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3.5,
    borderColor: '#fff',
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
    marginTop: -20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
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
  },
  groupArrow: {
    fontSize: 18,
    color: '#f58742',
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
});
