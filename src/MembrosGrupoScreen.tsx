import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<MainTabParamList, 'MembrosGrupo'>;

const GroupScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.groupImage}
          />
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Perna Longa</Text>
            <Text style={styles.memberStatus}>Membro</Text>
            <Text style={styles.memberCount}>15 membros</Text>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Group Activity */}
        <View style={styles.activitySection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/20' }} 
            style={styles.activityIcon}
          />
          <Text style={styles.activityText}>Musculação</Text>
        </View>

        {/* Members List */}
        <Text style={styles.membersTitle}>
          <Image
            source={{ uri: 'https://via.placeholder.com/20' }}
            style={styles.activityIcon}
          />
          Membros
        </Text>
        <View>
          {['Sam', 'Connie', 'Robin', 'Clover', 'Sandy', 'Violet'].map((member, index) => (
            <View key={index} style={styles.memberRow}>
              <Image
                source={{ uri: 'https://via.placeholder.com/40' }} 
                style={styles.memberAvatar}
              />
              <Text style={styles.memberName}>{member}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupInfo: {
    flex: 1,
    marginLeft: 16,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberStatus: {
    color: 'green',
    fontSize: 14,
  },
  memberCount: {
    color: '#666',
    fontSize: 14,
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 24,
  },
  activitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activityText: {
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  memberName: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default GroupScreen;
