import React, {useState, useEffect, useContext} from 'react';
import {Modal, Linking, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import firebase from '../../../firebaseConnection';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';

import { Context } from '../Pedidos/Contextpedido';

export default function Stars(){

  const { stars, uid, dado} = useContext(Context);
  const [showModal1, setshowModal1] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [showModal3, setshowModal3] = useState(false);
  const [showModal4, setshowModal4] = useState(false);
  const newstars1 = parseInt(stars)+parseInt(45);
  const newstars2 = parseInt(stars)+parseInt(105);
  const newstars3 = parseInt(stars)+parseInt(220);
  const newstars4 = parseInt(stars)+parseInt(450);

  async function handleResponse1(data){
    if(data.title === 'Aprovado'){
      creditar1();
      (setshowModal1(false));
      Alert.alert(
        `Parabéns, você acaba de adquirir o Pacote Inicial!`,
        `Seu saldo atual é de: ${stars}! Começe a utilizar agora. Boa sorte :)`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        );
      dado();
    }
    };
  
  async function creditar1(){
    await firebase.database().ref("maker").child(uid).update({
      stars: newstars1
    })
  }

  async function handleResponse2(data){
    if(data.title === 'Aprovado'){
      creditar2();
      (setshowModal2(false));
      Alert.alert(
        `Parabéns, você acaba de adquirir o Pacote Médio!`,
        `Seu saldo atual é de: ${stars}! Começe a utilizar agora. Boa sorte :)`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        );
      dado();
    }
    };
  
  async function creditar2(){
    await firebase.database().ref("maker").child(uid).update({
      stars: newstars2
    })
  }

  async function handleResponse3(data){
    if(data.title === 'Aprovado'){
      creditar3();
      (setshowModal3(false));
      Alert.alert(
        `Parabéns, você acaba de adquirir o Pacote Plus!`,
        `Seu saldo atual é de: ${stars}! Começe a utilizar agora. Boa sorte :)`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        );
    }
    };
  
  async function creditar3(){
    await firebase.database().ref("maker").child(uid).update({
      stars: newstars3
    })
  }

  async function handleResponse4(data){
    if(data.title === 'Aprovado'){
      creditar4();
      (setshowModal4(false));
      Alert.alert(
        `Parabéns, você acaba de adquirir o Pacote Premium!`,
        `Começe a utilizar agora. Boa sorte :)`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        );
      dado();
    }
    };
  
  async function creditar4(){
    await firebase.database().ref("maker").child(uid).update({
      stars: newstars4
    })
  }

  function mostrar1(){
    setshowModal1(true)
  };

  function mostrar2(){
    setshowModal2(true)
  };
  
  function mostrar3(){
    setshowModal3(true)
  };
  
  function mostrar4(){
    setshowModal4(true)
  };


  return(
  
    <View style={styles.container}>
        
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
        
            <View style={styles.vheader}>
                <Image 
                    source={require('../../../Images/fundo.png')}
                    style={styles.header}
                />
                <Iconm name="star" size={125} color='#FFB600' style={{position: 'absolute', marginTop: 0, alignItems: 'center'}} /> 
            </View>
                <Text style={styles.stars}>{stars}</Text>

            <View style={styles.vtitulo}>
              <Text style={styles.titulo}>
                Pacotes de Stars
              </Text>
            </View>

            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
            <View style={styles.vimagem}>

              <View>
              <TouchableOpacity
              onPress={mostrar1}
              >
                <Image
                style={styles.imagem}
                source={require('../../../Images/Pacote-Inicial.png')}
                />
              </TouchableOpacity>
              </View>

              <View>
              <TouchableOpacity
              onPress={mostrar2}
              >
                <Image
                style={styles.imagem}
                source={require('../../../Images/Pacote-Medio.png')}
                />
              </TouchableOpacity>
              </View>

              <View>
              <TouchableOpacity
              onPress={mostrar3}
              >
                <Image
                style={styles.imagem}
                source={require('../../../Images/Pacote-Plus.png')}
                />
              </TouchableOpacity>
              </View>

              <View>
              <TouchableOpacity
              onPress={mostrar4}
              >
                <Image
                style={styles.imagem}
                source={require('../../../Images/Pacote-Premium.png')}
                />
              </TouchableOpacity>
              </View>

            </View>
            </ScrollView>
        
        </View>

        <Modal
        visible={showModal1}
        onRequestClose={() => setshowModal1(false)}
        >
          
          <WebView source={{uri : "https://cacaulovers.com.br/mp"}} onNavigationStateChange={data => handleResponse1(data)} />

        </Modal>
        
        <Modal
        visible={showModal2}
        onRequestClose={() => setshowModal2(false)}
        >
          
          <WebView source={{uri : "https://cacaulovers.com.br/mp/teste.php"}} onNavigationStateChange={data => handleResponse2(data)} />

        </Modal>

        <Modal
        visible={showModal3}
        onRequestClose={() => setshowModal3(false)}
        >
          
          <WebView source={{uri : "https://cacaulovers.com.br/mp/vinni.php"}} onNavigationStateChange={data => handleResponse3(data)} />

        </Modal>

        <Modal
        visible={showModal4}
        onRequestClose={() => setshowModal4(false)}
        >
          
          <WebView source={{uri : "https://cacaulovers.com.br/mp/coiso.php"}} onNavigationStateChange={data => handleResponse4(data)} />

        </Modal>

    </View>

  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#ffffff',
      marginTop: 0,
      backgroundColor: 'white',    
    },
    tela:{
      backgroundColor: 'white',    
      flex: 1,
    },
    vheader:{
      position: 'absolute',
      alignItems: 'center',
    },
    stars:{
      fontSize: 25,
      textAlign: 'center',
      marginTop: 48,
      fontFamily: "Roboto-Tiny", 
    },
    vtitulo:{
      alignItems: 'center',
      marginTop: 40
    },
    titulo:{
      fontSize: 24,
      textAlign: 'center',
      fontFamily: "Roboto-Light", 
      marginTop: 10
    },
    imagem:{
      marginHorizontal: 10,      
    },
    vimagem:{
      flexDirection: 'row',
      margin: 10,
      marginTop: 50,
    }
});
