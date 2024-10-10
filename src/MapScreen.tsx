import L from 'leaflet';
import React, { useEffect, useState } from "react";
import { View, Platform } from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import 'leaflet/dist/leaflet.css';
import { styles } from './stylesMap/styles'; // estilos da tela
import markerIcon from './img/marker.png'; 

// criando o ícone personalizado
const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34] 
});

export default function MapScreen() {
    const [location, setLocation] = useState<LocationObject | null>(null);

    //acesso á localização do usuário
    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const posicaoAtual = await getCurrentPositionAsync();
            setLocation(posicaoAtual);
        }
    }

    //função
    useEffect(() => {
        requestLocationPermission();
    }, []);

    if (!location) return null;

    //renderizando o mapa
    return (
        <MapContainer 
            center={[location.coords.latitude, location.coords.longitude]} 
            zoom={13} 
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.coords.latitude, location.coords.longitude]} icon={customIcon}>
                <Popup>Your location</Popup>
            </Marker>
        </MapContainer>
    );
}

/*ANDROID:
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapLibreGL from "@react-native-maplibre-gl/maps";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from "expo-location";
import { styles } from './stylesMap/styles'; // estilos da tela
import markerIcon from './img/marker.png'; // Caminho para o seu ícone personalizado

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

    return (
        <View style={styles.container}>
            <MapLibreGL.MapView style={styles.map}>
                <MapLibreGL.Camera
                    zoomLevel={14}
                    centerCoordinate={[location.coords.longitude, location.coords.latitude]}
                />
                <MapLibreGL.PointAnnotation
                    coordinate={[location.coords.longitude, location.coords.latitude]}
                    id="current-location"
                    onSelected={() => console.log("Marker selected")}
                >
                    <MapLibreGL.Callout>
                        <View style={{ alignItems: 'center' }}>
                            <MapLibreGL.Image
                                source={markerIcon} // Usando a imagem importada como fonte
                                style={{ width: 25, height: 41 }} // Tamanho do ícone
                            />
                        </View>
                    </MapLibreGL.Callout>
                </MapLibreGL.PointAnnotation>
            </MapLibreGL.MapView>
        </View>
    );
}*/
