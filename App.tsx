import 'react-native-gesture-handler';
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStackParamList, MainTabParamList } from './src/navigation/types';  // Importando os tipos

// Importando as telas
import LoginScreen from './src/LoginScreen';
import CadastroScreen from './src/CadastroScreen';
import MapScreen from './src/MapScreen';
import GroupsScreen from './src/GroupsScreen';
import EventsScreen from './src/EventsScreen';
import ProfileScreen from './src/ProfileScreen';
import EditProfileScreen from './src/EditProfileScreen';
import SearchScreen from './src/SearchScreen';
import CadastroEventoScreen from './src/CadastroEventoScreen'
import ChatScreen from './src/TelaChatGrupo';
import ConfigGeralScreen from './src/ConfigGeralScreen';

// Criando os navegadores
const Stack = createNativeStackNavigator<RootStackParamList>();  // Tipando o Stack
const Tab = createBottomTabNavigator<MainTabParamList>();  // Tipando o Tab

// Importando os ícones personalizados
const mapIcon = require('./src/icons/Maps.png');
const groupsIcon = require('./src/icons/Groups.png');
const eventsIcon = require('./src/icons/Events.png');
const profileIcon = require('./src/icons/User.png');

// Função para configurar a navegação das abas
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          // Configura os ícones para cada tela
          if (route.name === 'Mapa') {
            iconSource = mapIcon;
          } else if (route.name === 'Grupos') {
            iconSource = groupsIcon;
          } else if (route.name === 'Eventos') {
            iconSource = eventsIcon;
          } else if (route.name === 'Perfil') {
            iconSource = profileIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: focused ? 28 : 24, 
                height: focused ? 28 : 24,
                tintColor: focused ? '#FF5722' : '#8E8E93',
              }}
            />
          );
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: '#F58742', // Cor do texto ativo
        tabBarInactiveTintColor: '#8E8E93', // Cor do texto inativo
        headerShown: true,
      })}
    >
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Grupos" component={GroupsScreen} />
      <Tab.Screen name="Eventos" component={EventsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Configurações" component={EditProfileScreen}  options={{ title: "Editar Perfil" }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: "Buscar Bairro" }}/>
          <Stack.Screen name="CadastroEvento" component={CadastroEventoScreen} options={{title: "Cadastro Eventos"}}/>
          <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'JOJO Workout' }} />
          <Stack.Screen name="ConfigGeral" component={ConfigGeralScreen} options={{ title: 'Configurações Geral' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
