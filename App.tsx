import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LoginScreen from './src/LoginScreen';
import CadastroScreen from './src/CadastroScreen';
import MapScreen from './src/MapScreen';
import GroupsScreen from './src/GroupsScreen';
import EventsScreen from './src/EventsScreen';
import ProfileScreen from './src/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Menu para as telas principais criado com a dependência BottomTabNavigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#fff',
        },
        headerShown: true,
      }}
    >
      <Tab.Screen name="Home" component={MapScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
