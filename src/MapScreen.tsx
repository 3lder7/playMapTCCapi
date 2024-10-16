import L from 'leaflet';
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
}
{/*  Codigo usando a api base do google comentada, pode aparecer alguns erros mas se as dependencias ja instalaram ta tudo bem  */}
{/*import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    // Solicitar permissão de localização
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            try {
                const currentPosition = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
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
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Verifique se a localização está disponível
    if (!location || !location.coords) {
        Alert.alert("Erro", "Localização não disponível.");
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true} // Mostra a localização do usuário
                followsUserLocation={true} // Segue a localização do usuário
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default MapScreen;*/}
