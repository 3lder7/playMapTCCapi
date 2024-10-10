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
