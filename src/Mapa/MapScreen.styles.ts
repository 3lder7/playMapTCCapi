import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  map: { 
    flex: 1, 
  },
  searchBar: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 2,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  // icones da aba de informações da quadra
  messageContainer: {
    position: "absolute",
    top: 240, // Ajuste para posicionar acima dos ícones
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  messageText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  iconCarousel: {
    marginTop: 30,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexGrow: 0, 
  },
  iconCircle: {
    top: 5,
    width: 68,
    height: 68,
    borderRadius: 34, // Para manter o formato circular
    backgroundColor: "#fff", // Cor de fundo para o círculo
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10, // Espaçamento entre os ícones
    shadowColor: "#000", // Cor da sombra (preto)
    elevation: 5, // Sombreamento para Android
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  statusIconContainer: {
    position: "absolute",
    top: -4, // Ajuste para alinhar ao canto
    right: -4, // Ajuste para alinhar ao canto
    width: 22,
    height: 22,
    borderRadius: 11, // Para manter o formato circular
    backgroundColor: "#FFF", // Cor de fundo do espaço
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // Para criar um leve efeito de sombra (opcional)
  },
  statusIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  // fim da declaração dos icones

  // declaração de estilos dos comentarios
  commentsContainer: {
    padding: 10,
    backgroundColor: "#f5f5f",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: 255, // Limita a altura do container
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  commentBox: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  timestamp: {
    fontSize: 12,
    color: "#aaa",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  noComments: {
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    marginTop: 20,
  },
    
  // fim dos estilos dos comentarios

  // estilos para informações detalhadas de eventos
  
  eventDetailsContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginTop: 16,
  },
  eventHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  eventRow: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555555",
  },
  eventLabel: {
    fontWeight: "bold",
    color: "#000000",
  },
  textContainerEvent: {
    marginTop: 20,
    margin: 10,
    marginBottom: 35,
  },
  infoDescriptionEvent: {
      fontWeight: "bold",
  },
  
  // fim dos estilos para informações detalhadas de eventos

  // estilos dos icones de tipos de esporte 
  sportsIconCarousel: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexGrow: 0, 
  },
  sportItem: {
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    borderRadius: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: 90,
    height: 30,
  },
  sportIcon: {
    width: 15,
    height: 15,
    marginRight: 3,
  },
  sportName: {
    fontSize: 13,
    color: "#333",
    fontWeight: "bold",
  },

  // fim dos estilos de tipos de esporte 

  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  contentContainer: {
    
    backgroundColor: '#fff',
  },
  textContainer: {
    marginTop: 10,
    left: 10,
  },
  
  gpsButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gpsIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 60, // distância do topo
    alignSelf: 'center', // centralizado horizontalmente
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 50,
    height: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonIcon: {
    height: 15,
    width: 15,
  },
  scrollContainer: { 
    marginTop: 10, 
  },
  imageCarousel: {
    marginLeft: 5,
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  image: {
    width: 250,  
    height: 150, 
    borderRadius: 10, 
    marginRight: 10,
    borderWidth: 1,  
  },
  noImagesText: {
    flexGrow: 0,
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
    fontSize: 14,
  },
  noImagesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noImagesView: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,  
    height: 150,
    flexGrow: 0,
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,  
  },
  dragHandle: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  dragIcon: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#f5f5f5",
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    right: 4,
    resizeMode: "contain",
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
  },
  suggestionItem: { 
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd', 
  },
  suggestionText: { 
    fontSize: 16, 
  },
  fullscreenImageContainer: {
    flex: 1,
    height: 600,
    width: 500,
    alignItems:"center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  fullscreenImage: {
    width: 400,
    height: "100%",
    borderRadius: 10,
  },    
  blurBackground: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  
});
