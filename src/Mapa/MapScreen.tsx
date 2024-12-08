import React, { useEffect, useState, useRef } from "react";
import { View, Alert, Text, TouchableOpacity, ScrollView, TextInput, PanResponder, Image, Modal } from "react-native";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { BlurView } from "expo-blur";
import { styles } from "./MapScreen.styles";
import { requestLocationPermission, fetchMarkersFromFirebase, fetchCommentsForMarker,
fetchNeighborhoodSuggestions, centerUserLocation, fetchFeatureStatus
} from "./MapScreen.functions";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Neighborhood, Comment } from '../navigation/types'; // Importando os tipos corretos
import SportIcon from "../icons/Sport.png";
import MapsIcon from "../icons/Maps.png"; // Ícone da barra de pesquisa
import SearchIcon from "../icons/Search.png"; // Ícone da barra de pesquisa
import GpsIcon from "../icons/GPS.png"; // Ícone da barra de pesquisa
import LocationIcon from "../icons/Location.png";
import closeIcon from "../icons/Close.png";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const MapScreen = () => {
  // Navegação e rotas
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Tipando a navegação
  const route = useRoute<any>();

  // Estados de localização e carregamento
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados de marcadores
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
 
  // Estados de interface
  const [isVisible, setIsVisible] = useState(false);
  const [panelHeight, setPanelHeight] = useState(400);
 
  // Estados de busca
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Neighborhood[]>([]);

  //Estados para controlar o modal da imagem selecionada
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | undefined>(undefined);

  //Estados de exibição dos icones de status de acordo com especificidades
  const [featureStatus, setFeatureStatus] = useState<{
    [key: string]: boolean | null;
  }>({
    banheiro: null,
    seguranca: null,
    iluminacao: null,
    bebedouro: null,
    acessibilidade: null,
    estacionamento: null,
  });

  const [selectedFeature, setSelectedFeature] = useState<{
    name: string;
    status: boolean | null;
  } | null>(null);  

  const handleFeaturePress = (name: string, status: boolean | null) => {
    setSelectedFeature({ name, status });
  };
  
  const handleFeatureRelease = () => {
    setSelectedFeature(null);
  };

  // Comentarios 
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (selectedMarker?.id) {
      fetchCommentsForMarker(selectedMarker.id, setComments);
    }
  }, [selectedMarker]);

  
  // Referências
  const mapRef = useRef<MapView | null>(null);

  // Configuração de estilo do mapa
  const mapStyle = [
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{ "visibility": "off" }],
    },
  ];
  

  useEffect(() => {
    requestLocationPermission(setLocation, setLoading);
    fetchMarkersFromFirebase(setMarkers);
  }, []);

  useEffect(() => {
    fetchNeighborhoodSuggestions(searchQuery, setSuggestions);
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

  useEffect(() => {
    if (selectedMarker) {
      fetchFeatureStatus(selectedMarker.id, setFeatureStatus);
    }
  }, [selectedMarker]);  


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
  
  const features = [
    { name: "Banheiros", icon: require("../icons/Toilet.png"), status: featureStatus.banheiro },
    { name: "Segurança", icon: require("../icons/Police.png"), status: featureStatus.seguranca },
    { name: "Iluminação", icon: require("../icons/Lamp.png"), status: featureStatus.iluminacao },
    { name: "Bebedouros", icon: require("../icons/Fountain.png"), status: featureStatus.bebedouro },
    { name: "Acessibilidade", icon: require("../icons/Wheelchair.png"), status: featureStatus.acessibilidade },
    { name: "Estacionamento", icon: require("../icons/Garage.png"), status: featureStatus.estacionamento },
  ];  

  const handleImagePress = (url: string) => {
    setZoomedImage(url || undefined);
    setIsZoomed(true);
  };  


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newHeight = Math.max(200, Math.min(750, panelHeight - gestureState.dy));
      setPanelHeight(newHeight);
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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

      <TouchableOpacity style={styles.gpsButton}
        onPress={() => centerUserLocation(location, mapRef)}>
          <Image source={GpsIcon} style={styles.gpsIcon} />
      </TouchableOpacity>

      {isVisible && selectedMarker && (
        <View
          style={[styles.infoContainer, { height: panelHeight }]}
        >
          <TouchableWithoutFeedback>
            <View {...panResponder.panHandlers} style={styles.dragHandle}>
              <Image source={require("../icons/Rectangle.png")} style={styles.dragIcon}/>
            </View>
          </TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              {selectedMarker.imageUrls && selectedMarker.imageUrls.length > 0 ? (
                <ScrollView
                  horizontal
                  style={styles.imageCarousel}
                  showsHorizontalScrollIndicator={false}
                >
                  {selectedMarker.imageUrls.map((url: string, index: number) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(url)}>
                      <Image
                        key={index}
                        source={{ uri: url }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.noImagesContainer}>  
                  <View style={styles.noImagesView}>
                    <Text style={styles.noImagesText}>
                      Nenhuma imagem disponível para esta quadra.
                    </Text>
                  </View>
                </View>  
              )}
              <View style={styles.textContainer}>
                <Text style={styles.infoTitle}>{selectedMarker.title}</Text>
                <View style={styles.row}>
                  <Image source={LocationIcon} style={styles.locationIcon} />
                  <Text style={styles.infoDescription}>{selectedMarker.description}</Text>
                </View>
              </View>

              {selectedFeature && (
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>
                      {selectedFeature.name}:{" "}
                      {selectedFeature.status === true
                        ? "Disponível"
                        : selectedFeature.status === false
                        ? "Indisponível"
                        : "Desconhecido"}
                    </Text>
                  </View>
                )}

              <ScrollView
                horizontal
                style={styles.iconCarousel}
                showsHorizontalScrollIndicator={false}
              >
                {features.map((feature, index) => (
                  <View key={index}>
                    <TouchableWithoutFeedback
                      onPressIn={() => handleFeaturePress(feature.name, feature.status)}
                      onPressOut={handleFeatureRelease}
                    >
                      <View style={styles.iconCircle}>
                        <Image source={feature.icon} style={styles.iconImage} />
                        <View style={styles.statusIconContainer}>
                          {feature.status === true ? (
                            <Image source={require("../icons/Check.png")} style={styles.statusIcon} />
                          ) : feature.status === false ? (
                            <Image source={require("../icons/No Check.png")} style={styles.statusIcon} />
                          ) : null}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.commentsContainer}>
                <Text style={styles.commentsHeader}>Comentários</Text>
                {comments.length > 0 ? (
                  <ScrollView>
                    {comments.map((comment) => (
                      <View key={comment.id} style={styles.commentBox}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.username}>{comment.username}</Text>
                          <Text style={styles.timestamp}>
                            {comment.timestamp.toLocaleString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </View>
                        <Text style={styles.commentText}>{comment.comment}</Text>
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <Text style={styles.noComments}>Ainda não há comentários para esta quadra.</Text>
                )}
              </View>

            </View>
          </View>
      )}
      <Modal visible={isZoomed} transparent={true} animationType="fade" onRequestClose={() => setIsZoomed(false)}>
        <BlurView intensity={50} style={styles.blurBackground}>
          <View style={styles.fullscreenImageContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsZoomed(false)}>
              <Image source={closeIcon} style={styles.closeButtonIcon} />
            </TouchableOpacity>
            {zoomedImage && (
              <Image source={{ uri: zoomedImage }} style={styles.fullscreenImage} resizeMode="contain" />
            )}
          </View>
        </BlurView>
      </Modal>
    </GestureHandlerRootView>
  );
};


export default MapScreen;