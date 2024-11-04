{/*import L from 'leaflet';
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as Location from "expo-location"; //importando o módulo completo
import 'leaflet/dist/leaflet.css';
import markerIcon from './img/marker.png'; 

//cria o ícone personalizado
const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

//limites pra Salvador-Bahia
const bounds = L.latLngBounds(
    L.latLng(-13.0106, -38.5303), // Sudoeste
    L.latLng(-12.8963, -38.3863)  // Nordeste
);

export default function MapScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    //solicitar permissão e obter a localização
    async function requestLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const posicaoAtual = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            setLocation(posicaoAtual);
        } else {
            console.log("Permissão de localização não concedida.");
        }
    }

    useEffect(() => {
        requestLocationPermission();
    }, []);
    if (!location) return null; 

    //renderizar o mapa
    return (
        <MapContainer 
            center={[-12.9716, -38.5014]} //centro de Salvador
            zoom={13} //nível de zoom
            style={{ height: "100vh", width: "100%" }}
            bounds={bounds} //limites de Salvador
            maxBounds={bounds} //restringir o movimento
            maxBoundsViscosity={1.0} //ajusta a "aderência" aos limites
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.coords.latitude, location.coords.longitude]} icon={customIcon}>
                <Popup>Sua Localização</Popup>
            </Marker>
        </MapContainer>
    );
}*/}

{/*  Codigo usando a api base do google, pode aparecer alguns erros mas se as dependencias ja instalaram ta tudo bem  */}

import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Alert, Text, TouchableOpacity, ScrollView, PanResponder, TextInput } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location";
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [panelHeight, setPanelHeight] = useState(300);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const mapRef = useRef(null);

    const mapStyle = [
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

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

    const fetchNeighborhoodSuggestions = async (queryText) => {
        const trimmedQuery = queryText.trim();
        if (!trimmedQuery) {
            setSuggestions([]);
            return;
        }

        const capitalizedQuery = trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1).toLowerCase();
        
        try {
            const neighborhoodsQuery = query(
                collection(db, "neighborhood"), 
                where("name", ">=", capitalizedQuery), 
                where("name", "<=", capitalizedQuery + '\uf8ff')
            );

            const querySnapshot = await getDocs(neighborhoodsQuery);
            const neighborhoods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSuggestions(neighborhoods);
        } catch (error) {
            console.error("Erro ao buscar sugestões de bairros: ", error);
        }
    };

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

    useEffect(() => {
        requestLocationPermission();
        fetchMarkersFromFirebase();
    }, []);

    useEffect(() => {
        fetchNeighborhoodSuggestions(searchQuery);
    }, [searchQuery]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!location || !location.coords) {
        Alert.alert("Erro", "Localização não disponível.");
        return null;
    }

    const handleMarkerPress = (marker) => {
        setSelectedMarker(marker);
        setIsVisible(true);
        mapRef.current.animateToRegion({
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.0922 * 0.15,
            longitudeDelta: 0.0421 * 0.15,
        }, 1000);
    };

    const handleSearchSubmit = (suggestion) => {
        if (suggestion && suggestion.latitude && suggestion.longitude) {
            setLocation({
                coords: {
                    latitude: suggestion.latitude,
                    longitude: suggestion.longitude,
                },
            });
            mapRef.current.animateToRegion({
                latitude: suggestion.latitude,
                longitude: suggestion.longitude,
                latitudeDelta: 0.0922 * 0.15,
                longitudeDelta: 0.0421 * 0.15,
            }, 1000);
            setSearchQuery(""); // Limpa a barra de pesquisa
            setSuggestions([]); // Limpa sugestões
            setSelectedMarker(null); // Reseta o marcador selecionado
            setIsVisible(false); // Oculta a aba após pesquisa
        } else {
            Alert.alert("Nenhuma sugestão encontrada", "Tente outro nome de bairro.");
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
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922 * 0.15,
                    longitudeDelta: 0.0421 * 0.15,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                onPress={() => setIsVisible(false)} // Oculta a aba ao tocar no mapa
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        onPress={() => handleMarkerPress(marker)}
                    />
                ))}
            </MapView>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por bairro"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => {
                        if (suggestions.length > 0) {
                            handleSearchSubmit(suggestions[0]); // Seleciona a primeira sugestão ao submeter
                        }
                    }}
                />
            </View>

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

            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {suggestions.map((suggestion) => (
                        <TouchableOpacity
                            key={suggestion.id}
                            onPress={() => handleSearchSubmit(suggestion)}
                            style={styles.suggestionItem}
                        >
                            <Text style={styles.suggestionText}>{suggestion.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    searchContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        elevation: 5,
    },
    searchInput: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 16,
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        padding: 20,
        overflow: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    closeText: {
        color: 'black',
        fontSize: 18,
    },
    scrollContainer: {
        marginTop: 40,
    },
    infoTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoDescription: {
        fontSize: 15,
        lineHeight: 24,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
        maxHeight: 150,
        overflow: 'hidden',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    suggestionText: {
        fontSize: 16,
    },
});

export default MapScreen;
