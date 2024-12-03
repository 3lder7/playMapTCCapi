// Tipo de parâmetros passados entre as telas na navegação
export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Main: undefined;
    Configurações: undefined;
    Perfil: undefined;  
    SearchScreen: undefined;   
    CadastroEvento: undefined;
    ConfigGeral: undefined;
    Chat: undefined;
    CentralConta:undefined;
    GerenciaConta: undefined;
    VisibiPerfil: undefined;
    Notificacao: undefined;
    Grupos: undefined;
    Mapa: { selectedNeighborhood: Neighborhood }
  };

  export type MainTabParamList = {
    Mapa: undefined;
    Grupos: undefined;
    Eventos: undefined;
    Perfil: undefined;
    Configurações: undefined;
    Chat: undefined;
    ConfigGeral: undefined;
    CentralConta:undefined;
    VisibiPerfil: undefined;
    GerenciaConta:undefined;
    Notificacao: undefined;
  };
  
  // Interface que define os dados de um bairro
  export interface Neighborhood {
    id: string;               // ID único do bairro
    name: string;             // Nome do bairro
    latitude: number;         // Latitude do bairro
    longitude: number;        // Longitude do bairro
  }
  