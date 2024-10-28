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
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert, Text, TouchableOpacity, ScrollView, PanResponder } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location";
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore"; 

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [panelHeight, setPanelHeight] = useState(300); // Altura inicial da aba

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
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            // Set initial height if needed
        },
        onPanResponderMove: (evt, gestureState) => {
            const newHeight = Math.max(200, Math.min(700, panelHeight - gestureState.dy));
            setPanelHeight(newHeight);
        },
        onPanResponderRelease: () => {
            // Handle release if needed
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922 * 0.15,
                    longitudeDelta: 0.0421 * 0.15,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                onPress={() => setIsVisible(false)} // Fecha a aba ao clicar fora
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
    map: {
        flex: 1,
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        padding: 15,
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
        marginTop: 40, // Espaço para o botão de fechar
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoDescription: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default MapScreen;
