import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Alert, Text, TouchableOpacity, ScrollView, TextInput, PanResponder, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location";
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Neighborhood } from './navigation/types'; // Importando os tipos corretos
import SportIcon from "./icons/Sport.png";
import MapsIcon from "./icons/Maps.png"; // Ícone da barra de pesquisa
import SearchIcon from "./icons/Search.png"; // Ícone da barra de pesquisa
import GpsIcon from "./icons/GPS.png"; // Ícone da barra de pesquisa


const MapScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Tipando a navegação
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [panelHeight, setPanelHeight] = useState(300);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Neighborhood[]>([]);
  const mapRef = useRef<MapView | null>(null);
  const route = useRoute<any>();

  // Map style configuration
  const mapStyle = [
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }],
    },
  ];

  // Request location permission
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      try {
        const currentPosition = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation(currentPosition);
      } catch (error) {
        console.error("Erro ao obter a localização: ", error);
        Alert.alert("Erro", "Não foi possível obter a localização.");
      }
    } else {
      Alert.alert("Permissão negada", "Permissão de localização não concedida.");
    }
    setLoading(false);
  };

  // Fetch markers from Firebase
  const fetchMarkersFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const firebaseMarkers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMarkers(firebaseMarkers);
    } catch (error) {
      console.error("Erro ao buscar marcadores: ", error);
      Alert.alert("Erro", "Não foi possível carregar os marcadores.");
    }
  };
  
  const fetchNeighborhoodSuggestions = async (queryText: string) => {
    const trimmedQuery = queryText.trim();
    if (!trimmedQuery) {
      setSuggestions([]);
      return;
    }
  
    const capitalizedQuery = 
      trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1).toLowerCase();
  
    try {
      const neighborhoodsQuery = query(
        collection(db, "neighborhood"),
        where("name", ">=", capitalizedQuery),
        where("name", "<=", capitalizedQuery + "\uf8ff")
      );
  
      const querySnapshot = await getDocs(neighborhoodsQuery);
  
      const neighborhoods: Neighborhood[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude
        };
      });
  
      setSuggestions(neighborhoods);
    } catch (error) {
      console.error("Erro ao buscar sugestões de bairros: ", error);
    }
  };

  const centerUserLocation = async () => {
    if (!location || !location.coords) {
      Alert.alert("Erro", "Localização não disponível.");
      return;
    }

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }, 1000);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    fetchMarkersFromFirebase();
  }, []);

  useEffect(() => {
    fetchNeighborhoodSuggestions(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (route.params?.selectedNeighborhood) {
      const { latitude, longitude } = route.params.selectedNeighborhood;
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }, 1000);
      }
    }
  }, [route.params?.selectedNeighborhood]);

  if (loading) {
    return null;
  }

  if (!location || !location.coords) {
    Alert.alert("Erro", "Localização não disponível.");
    return null;
  }

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    setIsVisible(true);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.0922 * 0.15,
        longitudeDelta: 0.0421 * 0.15,
      }, 1000);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newHeight = Math.max(200, Math.min(700, panelHeight - gestureState.dy));
      setPanelHeight(newHeight);
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: location.coords.latitude || -23.5505,
          longitude: location.coords.longitude || -46.6333,
          latitudeDelta: 0.0922 * 0.15,
          longitudeDelta: 0.0421 * 0.15,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        onPress={() => setIsVisible(false)}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(marker)}
            image={SportIcon}
          />
        ))}
      </MapView>

      {/* Barra de Pesquisa Estilizada */}
      <View style={styles.searchBar}>
        <Image source={MapsIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar por bairro"
          placeholderTextColor="#999"
          onFocus={() => navigation.navigate("SearchScreen")}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image source={SearchIcon} style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.gpsButton} onPress={centerUserLocation}>
        <Image source={GpsIcon} style={styles.gpsIcon} />
      </TouchableOpacity>

      {isVisible && selectedMarker && (
        <View style={[styles.infoContainer, { height: panelHeight }]} {...panResponder.panHandlers}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisible(false)}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.infoTitle}>{selectedMarker.title}</Text>
            <Text style={styles.infoDescription}>{selectedMarker.description}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    zIndex: 1,  // Isso garante que a barra de pesquisa fique sobre o mapa
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  gpsButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10, // Adicionar zIndex para garantir que fique acima de outros elementos
  },
  
  gpsIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
    elevation: 8,
  },
  closeButton: { alignSelf: 'flex-end' },
  closeText: { fontSize: 20, color: '#666' },
  scrollContainer: { marginTop: 10 },
  infoTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  infoDescription: { fontSize: 14, color: '#666' },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
  },
  suggestionItem: { padding: 8, borderBottomWidth: 0.5, borderBottomColor: '#ddd' },
  suggestionText: { fontSize: 16 },
});

export default MapScreen;
