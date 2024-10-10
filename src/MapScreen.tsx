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

export default function MapScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    //função para solicitar permissão e obter a localização
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

    //solicitar a permissão na montagem do componente
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
                <Popup>Sua Localização</Popup>
            </Marker>
        </MapContainer>
    );
}
