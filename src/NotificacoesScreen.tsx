import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<MainTabParamList, 'Notificacao'>;

const NotificationsScreen = ({ navigation }: Props) => {
  // Estados para cada botão Switch
  const [isNewMessageEnabled, setIsNewMessageEnabled] = useState(false);
  const [isEventTimeEnabled, setIsEventTimeEnabled] = useState(false);
  const [isNewEventEnabled, setIsNewEventEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Notificações</Text>

      {/* Opções de notificação */}
      <View style={styles.notificationOption}>
        <Text style={styles.optionTitle}>Nova mensagem</Text>
        <Text style={styles.optionDescription}>
          Notificar quando houver uma nova mensagem para você
        </Text>
        <Switch
          style={styles.switch}
          value={isNewMessageEnabled} // Estado atual
          onValueChange={(value) => setIsNewMessageEnabled(value)} // Atualiza o estado
        />
      </View>

      <View style={styles.notificationOption}>
        <Text style={styles.optionTitle}>Horário do evento</Text>
        <Text style={styles.optionDescription}>
          Notificar quando o evento cadastrado estiver se aproximando.
        </Text>
        <Switch
          style={styles.switch}
          value={isEventTimeEnabled}
          onValueChange={(value) => setIsEventTimeEnabled(value)}
        />
      </View>

      <View style={styles.notificationOption}>
        <Text style={styles.optionTitle}>Novo evento</Text>
        <Text style={styles.optionDescription}>
          Notificar quando uma nova evento for adicionado
        </Text>
        <Switch
          style={styles.switch}
          value={isNewEventEnabled}
          onValueChange={(value) => setIsNewEventEnabled(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  notificationOption: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#7f7f7f',
    paddingRight: 50, 
    lineHeight: 20, 
  },
  switch: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
});

export default NotificationsScreen;
