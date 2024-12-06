// Tipo de parâmetros passados entre as telas na navegação
export type RootStackParamList = {
    TelaInicial:undefined;
    Login: undefined;
    Cadastro: undefined;
    InscConfirmada: undefined;
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
    AlterarTema: undefined;
    Grupos: undefined;
    TelaCadastroEventoGrupo: undefined;
    MembrosGrupo: undefined;
    DetalhesGrupo: undefined;
    TelaMembro: undefined;
    Mapa: { selectedNeighborhood: Neighborhood }
  };

  export type MainTabParamList = {
    TelaInicial:undefined;
    Login: undefined;
    Cadastro: undefined;
    Mapa: undefined;
    Grupos: undefined;
    MembrosGrupo: undefined;
    Eventos: undefined;
    Perfil: undefined;
    Configurações: undefined;
    Chat: undefined;
    ConfigGeral: undefined;
    CentralConta:undefined;
    CadastroEvento: undefined;
    VisibiPerfil: undefined;
    TelaMembro: undefined;
    TelaCadastroEventoGrupo: undefined;
    GerenciaConta:undefined;
    Notificacao: undefined;
    AlterarTema: undefined;
    DetalhesGrupo: undefined;
    InscConfirmada: undefined;
  };
  
  // Interface que define os dados de um bairro
  export interface Neighborhood {
    id: string;               // ID único do bairro
    name: string;             // Nome do bairro
    latitude: number;         // Latitude do bairro
    longitude: number;        // Longitude do bairro
  }
  