import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<MainTabParamList, 'CadastroEvento'>;

const BlueRunCard = ({navigation}: Props) => {
  const data = [
    { id: '1', icon: require('./img/imgEventos/001-calendar.png'), text: '02/11/2024' },
    { id: '2', icon: require('./img/imgEventos/002-pin.png'), text: 'Jardim de Alah: Avenida Octávio Mangabeira, Salvador-BA' },
    { id: '3', icon: require('./img/imgEventos/003-bandeiras.png'), text: 'Sport' },
  ];

  const renderHeader = () => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      {/* Imagem principal */}
      <View style={styles.imageContainer}>
        <Image source={require('./img/bluerun.png')} style={styles.image} />
      </View>

      {/* Detalhes */}
      <View style={styles.card}>
        <Text style={styles.description}>
          Inscrições até <Text style={styles.bold}>30/10/2024 23:59</Text> ou <Text style={styles.bold}>até o limite de vagas.</Text>
        </Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.iconWithText}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          )}
          scrollEnabled={false} // Desabilitar rolagem no FlatList interno
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>✅ Inscreva-se</Text>
        </TouchableOpacity>
      </View>

      {/* Informações sobre o evento */}
      <View style={styles.card2}>
        <Text style={styles.card2Text}>O Evento</Text>
        <Text style={styles.card2Text2}>
          Há dois anos, o Dr. Nilo Jorge, juntamente com sua equipe da Uroclínica da Bahia, idealizou uma corrida no mês de novembro com o
          objetivo de promover muito mais do que conhecimento e cuidado sobre o câncer de próstata. A iniciativa busca transmitir uma
          mensagem sobre a importância de os homens, bem como toda a sociedade, estarem atentos aos cuidados com a própria saúde e com a
          saúde daqueles que amamos.
        </Text>
      </View>

      {/* Percurso */}
      <View style={styles.card3}>
        <Text style={styles.card2Text}>Percurso</Text>
        <Image source={require('./img/imgEventos/Percurso.png')} style={styles.imagePercurso} />
      </View>

      {/* Redes sociais */}
      <View style={styles.card4}>
        <Text style={styles.text}>Compartilhe nas redes sociais</Text>
        <View style={styles.socialIcons}>
          {[
            { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png' },
            { uri: 'https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png' },
            { uri: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { uri: 'https://cdn-icons-png.flaticon.com/512/3116/3116491.png' },
          ].map((icon, index) => (
            <TouchableOpacity key={index} style={styles.iconWrapper}>
              <Image source={{ uri: icon.uri }} style={styles.icon2} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={renderHeader}
      keyExtractor={() => 'header'}
      renderItem={() => null} // Não exibe itens, apenas usa o header
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20, 
    left: -8,
    zIndex: 1,
  },
  backArrow: {
    fontSize: 50,
    color: '#ff5722',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  details: {
    marginVertical: 16,
  },
  infoText: {
    fontSize: 17,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    elevation: 3,
  },
  card: {
    borderRadius: 10,
    elevation: 5,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  card2: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 16,
  },
  card3: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 16,
  },
  card4: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  card2Text: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
  },
  card2Text2: {
    textAlign: 'justify',
    letterSpacing: 1,
    color: '#555',
  },
  imagePercurso: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 28,
    marginRight: 8,
    resizeMode: 'contain',
  },
  icon2: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default BlueRunCard;
