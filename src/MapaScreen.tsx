import { View } from "react-native";
import { styles } from './stylesMap/styles';//estilos da tela
import { requestForegroundPermissionsAsync} from "expo-location";//pedir permissão ao usuario para usar localização // assincrono
import { getCurrentPositionAsync} from "expo-location";//obter a localização do usuario
import { LocationObject } from "expo-location";//latitude e longitude
import { useEffect, useState } from "react";

export default function MapScreen(){

    const [location, setLocation] = useState <LocationObject | null>(null);

    //PEDINDO LOCALIZAÇÃO-------------------------
    async function requestLocationPermission(){
       const { granted } = await requestForegroundPermissionsAsync();//verifca a permissão e aguarda a resposta

       if(granted){
            const posicaoAtual = await getCurrentPositionAsync();//assincrono
            setLocation(posicaoAtual);

            console.log("LOCALIZAÇÃO ATUAL =>", posicaoAtual);//exibe no terminal a loc
       }
    }

    useEffect(() =>{//usando a função//no momento que a intrface é renderizada, solicita o método
        requestLocationPermission();
    }, []);//STOP HERE 02/10

    return (
        <View style ={styles.container}>

        </View>
    );
}