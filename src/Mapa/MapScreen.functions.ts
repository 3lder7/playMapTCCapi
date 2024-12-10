import { Alert } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import MapView from "react-native-maps";
import { collection, getDocs, getDoc, doc, query, where, Query, DocumentData } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Neighborhood, Comment, EventDetails } from "../navigation/types";

  // Solicita permissão de localização ao usuário

  export const requestLocationPermission = async (
      setLocation: React.Dispatch<React.SetStateAction<Location.LocationObject | null>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
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

  // Captura os marcadores do Firebase

  export const fetchMarkersWithFilters = async (
    filters: { [key: string]: boolean }
  ): Promise<any[]> => {
    try {
      console.log("Iniciando a busca de marcadores com filtros:", filters);
  
      let quadrasQuery: Query<DocumentData> = collection(db, "locations");
  
      // Aplicar filtros
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          quadrasQuery = query(quadrasQuery, where(`sports.${key}`, "==", true));
        }
      });
  
      const quadrasSnapshot = await getDocs(quadrasQuery);
  
      const quadrasMarkers = quadrasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: "quadra",
      }));
  
      const eventsSnapshot = await getDocs(collection(db, "events"));
  
      const eventsMarkers = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: "evento",
      }));
  
      const allMarkers = [...quadrasMarkers, ...eventsMarkers];
  
      return allMarkers;
    } catch (error) {
      console.error("Erro ao buscar marcadores: ", error);
      Alert.alert("Erro", "Não foi possível carregar os marcadores.");
      return [];
    }
  };  

  // Busca sugestões de bairros no Firebase

  export const fetchNeighborhoodSuggestions = async (
      queryText: string,
      setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
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

  // Centraliza a localização do usuário no mapa

  export const centerUserLocation = async (
      location: LocationObject | null,
      mapRef: React.RefObject<MapView>
  ) => {
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

  // Exibe o icone de status corretamente

  export const fetchFeatureStatus = async (
    courtId: string, // ID da quadra selecionada
    setFeatureStatus: React.Dispatch<
      React.SetStateAction<{ [key: string]: boolean | null }>
    >
  ) => {
    try {
      // Acessa o documento da quadra selecionada
      const courtDoc = await getDoc(doc(db, "locations", courtId));
  
      if (courtDoc.exists()) {
        const courtData = courtDoc.data();
  
        // Obtém o campo "features" e define o status dos ícones
        const features = courtData.features || {};
        const featureStatus = {
          banheiro: features.banheiro ?? null,
          seguranca: features.seguranca ?? null,
          iluminacao: features.iluminacao ?? null,
          bebedouro: features.bebedouro ?? null,
          acessibilidade: features.acessibilidade ?? null,
          estacionamento: features.estacionamento ?? null,
          gratuidade: features.gratuidade ?? null,
        };
  
        setFeatureStatus(featureStatus);
      } else {
        console.error("Documento da quadra não encontrado!");
        Alert.alert("Erro", "Informações da quadra não encontradas.");
      }
    } catch (error) {
      console.error("Erro ao buscar informações das especificidades: ", error);
      Alert.alert("Erro", "Não foi possível carregar as informações da quadra.");
    }
  };
  
  // Função fetchComments ajustada
  export const fetchCommentsForItem = async (
    itemId: string,
    collectionPath: string,
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  ) => {
    try {
      // Caminho para a subcoleção de comentários
      const commentsCollectionRef = collection(db, `${collectionPath}/${itemId}/comments`);
      const snapshot = await getDocs(commentsCollectionRef);
  
      const fetchedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: data.username || "Usuário desconhecido", // Nome do usuário
          comment: data.comment || "",                     // Texto do comentário
          timestamp: data.timestamp?.toDate() || new Date(), // Conversão de timestamp para JS Date
        } as Comment; // Garantindo que o objeto segue o tipo Comment
      });
  
      setComments(fetchedComments); // Atualiza o estado com os comentários formatados
    } catch (error) {
      console.error("Erro ao buscar comentários: ", error);
    }
  };

  export const fetchEventDetails = async (
    eventId: string,
    setEventDetails: React.Dispatch<React.SetStateAction<EventDetails | null>>
  ) => {
    try {
      // Referência ao documento do evento
      const eventDocRef = doc(db, "events", eventId);
      const eventDoc = await getDoc(eventDocRef);
  
      if (eventDoc.exists()) {
        const data = eventDoc.data();
        // Formata os dados do evento
        const eventDetails: EventDetails = {
          date: data.date || "Data não informada",
          time: data.time || "Horário não informado",
          other: data.other || "Detalhes adicionais não disponíveis",
        };
  
        setEventDetails(eventDetails); // Atualiza o estado com os dados do evento
      } else {
        console.warn("Evento não encontrado no Firestore!");
        setEventDetails(null);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do evento: ", error);
      setEventDetails(null);
    }
  };

  export const fetchSportsStatus = async (
    courtId: string, // ID da quadra selecionada
    setSportsStatus: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  ) => {
    try {
      // Acessa o documento da quadra no Firestore
      const courtDoc = await getDoc(doc(db, "locations", courtId));
  
      if (courtDoc.exists()) {
        const courtData = courtDoc.data();
  
        // Obtém o campo "sports" do documento
        const sports = courtData.sports || {};
  
        // Atualiza o estado com os esportes suportados
        setSportsStatus(sports);
      } else {
        console.error("Documento da quadra não encontrado!");
        Alert.alert("Erro", "Informações da quadra não encontradas.");
      }
    } catch (error) {
      console.error("Erro ao buscar informações dos esportes: ", error);
      Alert.alert("Erro", "Não foi possível carregar os esportes suportados pela quadra.");
    }
  };
  
  


  