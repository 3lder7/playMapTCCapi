import React, { useEffect, useState } from "react";
import { View, Platform } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Importando Popup para exibir informações
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import 'leaflet/dist/leaflet.css'; // Importação do CSS do Leaflet
import { styles } from './stylesMap/styles'; // estilos da tela

export default function MapScreen() {
    const [location, setLocation] = useState<LocationObject | null>(null);

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const posicaoAtual = await getCurrentPositionAsync();
            setLocation(posicaoAtual);
        }
    }

    useEffect(() => {
        requestLocationPermission();
    }, []);

    if (!location) return null;

    // Estrutura do mapa
    if (Platform.OS === 'web') {
        return (
            <MapContainer 
                center={[location.coords.latitude, location.coords.longitude]} 
                zoom={13} 
                style={{ height: "100vh", width: "100%" }} // Ajustando o estilo
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.coords.latitude, location.coords.longitude]}>
                    <Popup>Your location</Popup> {/* Adicionando Popup */}
                </Marker>
            </MapContainer>
        );
    }

    return (
        <View style={styles.container}>
            {/* mapLibreGL pra mobile */}
        </View>
    );
}
