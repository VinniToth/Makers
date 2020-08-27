//Tela 1 - Bem - Vindo
import React, {useState} from 'react';
import {StatusBar, View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();


  function avancar(){
    navigation.navigate('Perfil');
  }

    return(

      //View de fundo
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
          
          <View style={styles.tela}> 
        
            <Image
                  source={require('../../Images/home.png')} 
                  style={{position: 'absolute'}}
            />

            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 400}}>
              <Text style={styles.textoprincipal}>
                Olá, seja bem vindo ao MAKERS!
              </Text>

              <TouchableOpacity
                  onPress={avancar}
                  style={styles.botao}
                >
                <Text style={styles.txtbotao}>
                  Vamos lá!
                </Text>

            </TouchableOpacity> 
            </View>

            <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
            <Text style={{fontFamily: "Roboto-Light",}}>By Vinnicius Toth</Text>
            </View>
      
          </View>

        </View>
         
    );

}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      marginTop: 0,
      backgroundColor: 'white',    
    },
    tela:{
      backgroundColor: 'white',    
      flex: 1,
      alignItems: 'center'
    },
    logo:{
      width: 425,
      height: 300
    },
    textoprincipal:{
      fontFamily: "Roboto-Tiny", 
      fontSize: 30,
      marginTop: 10,
      textAlign: 'center',
    },
    botao:{
      alignItems: "center",
      backgroundColor: "#8c52ff",
      padding: 10,
      marginTop: 30,
      width: 250,
      elevation: 8,
      borderRadius: 12
    
    },
    txtbotao:{
      fontFamily: "Roboto-Light", 
      fontSize: 25,
      color: 'white'  
    }
});