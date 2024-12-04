import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, GestureResponderEvent, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from './navigation/types'; 

type Props = NativeStackScreenProps<MainTabParamList, 'TelaInicial'>;

export default function App({navigation}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const windowWidth = Dimensions.get('window').width;

  // Informações para serem exibidas em cada slide
  const slides = [
    {
      title: 'Localize sua área esportiva',
      subtitle: 'Encontre os melhores lugares para praticar sua atividade física favorita.',
    },
    {
      title: 'Pratique esportes com seus amigos',
      subtitle: 'Crie grupos para fazer atividades físicas com as pessoas que você gosta.',
    },
    {
      title: 'Fortalecendo Comunidades Através do Esporte',
      subtitle: 'Formação de amizades e o desenvolvimento de uma rede de apoio local através do esporte.',
    },
  ];

  // Função para alternar entre os slides
  const changeSlide = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={(event: GestureResponderEvent) => {
        const { locationX } = event.nativeEvent;
        const isLeftSide = locationX < windowWidth / 2;
        changeSlide(isLeftSide ? 'left' : 'right');
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[currentIndex].title}</Text>
          <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.activeDot, // Muda a cor do dot ativo
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.solidBackground}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonWhite}>
              <Text style={styles.buttonWhiteText} onPress={() => navigation.navigate('Login')}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBlack}>
              <Text style={styles.buttonBlackText} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f3e',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF621F', // Cor do dot ativo
  },
  solidBackground: {
    width: '100%',
    backgroundColor: '#FF621F',
    paddingHorizontal: 20,
    paddingBottom: 120,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    marginTop: 60,
  },
  buttonWhite: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 0,
    elevation: 3,
    marginBottom: 30,
  },
  buttonWhiteText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  buttonBlack: {
    backgroundColor: '#000000',
    borderRadius: 10,
    elevation: 4,
    marginBottom: -20,
    borderWidth: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonBlackText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
