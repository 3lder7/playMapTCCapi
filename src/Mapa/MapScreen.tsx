import React, { useEffect, useState, useRef } from "react";
import { View, Alert, Text, TouchableOpacity, ScrollView, TextInput, PanResponder, Image, Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { BlurView } from "expo-blur";
import { styles } from "./MapScreen.styles";
import { requestLocationPermission, fetchMarkersWithFilters, fetchCommentsForItem,
fetchNeighborhoodSuggestions, centerUserLocation, fetchFeatureStatus, fetchEventDetails,
fetchSportsStatus
} from "./MapScreen.functions";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Neighborhood, Comment, EventDetails } from '../navigation/types'; // Importando os tipos corretos
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

  // Estados de detalhes dos eventos
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
 
  // Estados de interface
  const [isVisible, setIsVisible] = useState(false);
  const [panelHeight, setPanelHeight] = useState(400);
 
  // Estados de busca
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Neighborhood[]>([]);

  //Estados para controlar o modal da imagem selecionada
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | undefined>(undefined);

  //Estados para a exibição dos icones de esportes 
  const [sportsStatus, setSportsStatus] = useState<{ [key: string]: boolean }>({
    futebol: false,
    basquete: false,
    tenis: false,
    volei: false,
  });
  
  
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
    gratuidade: null,
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
    if (selectedMarker?.id && selectedMarker.type === "evento") {
      fetchCommentsForItem(selectedMarker.id, "events", setComments);
    }
  }, [selectedMarker]);
  
  useEffect(() => {
    if (selectedMarker?.id && selectedMarker.type === "quadra") {
      fetchCommentsForItem(selectedMarker.id, "locations", setComments);
    }
  }, [selectedMarker]);
  
  useEffect(() => {
    if (selectedMarker?.id && selectedMarker.type === "evento") {
      fetchEventDetails(selectedMarker.id, setEventDetails);
    }
  }, [selectedMarker]);

  useEffect(() => {
    if (selectedMarker?.id && selectedMarker.type === "quadra") {
      fetchSportsStatus(selectedMarker.id, setSportsStatus);
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
    const initializeMap = async () => {
      try {
        // Solicitar permissão de localização
        await requestLocationPermission(setLocation, setLoading);
  
        // Buscar marcadores no Firestore
        const fetchedMarkers = await fetchMarkersWithFilters({});
        setMarkers(fetchedMarkers); // Agora fetchedMarkers sempre terá um valor válido
      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do mapa.");
      } finally {
        setLoading(false);
      }
    };
  
    initializeMap();
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
    if (selectedMarker?.id && selectedMarker.type === "quadra") {
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
  
  const sportsFeatures = [
    { name: "Futebol", icon: require("../icons/Soccer.png"), status: sportsStatus.futebol },
    { name: "Basquete", icon: require("../icons/Basketball.png"), status: sportsStatus.basquete },
    { name: "Tênis", icon: require("../icons/Tennis.png"), status: sportsStatus.tenis },
    { name: "Vôlei", icon: require("../icons/Volley.png"), status: sportsStatus.volei },
  ];
  

  const features = [
    { name: "Banheiros", icon: require("../icons/Toilet.png"), status: featureStatus.banheiro },
    { name: "Segurança", icon: require("../icons/Police.png"), status: featureStatus.seguranca },
    { name: "Iluminação", icon: require("../icons/Lamp.png"), status: featureStatus.iluminacao },
    { name: "Bebedouros", icon: require("../icons/Fountain.png"), status: featureStatus.bebedouro },
    { name: "Acessibilidade", icon: require("../icons/Wheelchair.png"), status: featureStatus.acessibilidade },
    { name: "Estacionamento", icon: require("../icons/Garage.png"), status: featureStatus.estacionamento },
    { name: "Gratuidade", icon: require("../icons/Money.png"), status: featureStatus.gratuidade },
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
            image={marker.type === "evento" ? require("../icons/Event.png") : require("../icons/Sport.png")}
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
  <View style={[styles.infoContainer, { height: panelHeight }]}>
    <TouchableWithoutFeedback>
      <View {...panResponder.panHandlers} style={styles.dragHandle}>
        <Image source={require("../icons/Rectangle.png")} style={styles.dragIcon} />
      </View>
    </TouchableWithoutFeedback>

    <View style={styles.contentContainer}>
      {selectedMarker.imageUrls && selectedMarker.imageUrls.length > 0 ? (
        <ScrollView horizontal style={styles.imageCarousel} showsHorizontalScrollIndicator={false}>
          {selectedMarker.imageUrls.map((url: string, index: number) => (
            <TouchableOpacity key={index} onPress={() => handleImagePress(url)}>
              <Image key={index} source={{ uri: url }} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noImagesContainer}>
          <View style={styles.noImagesView}>
            <Text style={styles.noImagesText}>
              {selectedMarker.type === "evento"
                ? "Nenhuma imagem disponível para este evento."
                : "Nenhuma imagem disponível para esta quadra."}
            </Text>
          </View>
        </View>
      )}

      {/* Exibir informações do evento/quadra */}
      <View style={styles.textContainer}>
        <Text style={styles.infoTitle}>{selectedMarker.title}</Text>
        <View style={styles.row}>
          <Image source={LocationIcon} style={styles.locationIcon} />
          <Text style={styles.infoDescription}>{selectedMarker.description}</Text>
        </View>

        
      </View>
      {/* Exibir informações específicas de eventos */}
      {selectedMarker.type === "evento" && eventDetails && (
          <View style={styles.textContainerEvent}>  

              <Text style={styles.infoDescriptionEvent}>Data: {eventDetails.date}</Text>
              <Text style={styles.infoDescriptionEvent}>Horário: {eventDetails.time}</Text>
              <Text style={styles.infoDescriptionEvent}>Informações do Evento: {eventDetails.other || "Sem informações adicionais."}</Text>

          </View>
        )}

        {/* Status das funcionalidades, apenas para quadras */}
        {selectedMarker.type === "quadra" && selectedFeature && (
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

        {/* Ícones das funcionalidades, apenas para quadras */}
        {selectedMarker.type === "quadra" && (
          <ScrollView horizontal style={styles.iconCarousel} showsHorizontalScrollIndicator={false}>
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
        )}
    
        {selectedMarker.type === "quadra" && (
          <ScrollView horizontal style={styles.sportsIconCarousel} showsHorizontalScrollIndicator={false}>
              {sportsFeatures
                .filter((sport) => sport.status)
                .map((sport, index) => (
                  <View key={index} style={styles.sportItem}>
                    <Image source={sport.icon} style={styles.sportIcon} />
                    <Text style={styles.sportName}>{sport.name}</Text>
                  </View>
                ))}
          </ScrollView>
        )}

      {/* Exibição de comentários */}
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
          <Text style={styles.noComments}>
            {selectedMarker.type === "evento"
              ? "Nenhuma comentário disponível para este evento."
              : "Nenhuma comentário disponível para esta quadra."}
          </Text>
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