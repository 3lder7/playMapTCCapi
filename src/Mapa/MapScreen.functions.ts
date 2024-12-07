import { Alert } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import MapView from "react-native-maps";
import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Neighborhood } from "../navigation/types";
import { Comment } from "../navigation/types";


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

  export const fetchMarkersFromFirebase = async (
      setMarkers: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const firebaseMarkers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMarkers(firebaseMarkers);
      } catch (error) {
        console.error("Erro ao buscar marcadores: ", error);
        Alert.alert("Erro", "Não foi possível carregar os marcadores.");
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
  export const fetchCommentsForMarker = async (
    markerId: string,
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  ) => {
    try {
      // Caminho para a subcoleção de comentários
      const commentsCollectionRef = collection(db, `locations/${markerId}/comments`);
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


  