//Tela 2 - Choose
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Perfil(){
  const navigation = useNavigation();

  function nxtmake(){
    navigation.navigate('Cadastrom');
  }
  
  function nxtcomp(){
    navigation.navigate('Cadastroc');
  }

  function login(){
    navigation.navigate('ChooseLog');
  }

    return(

      //View de fundo
    <View style={styles.container}>
          
      <View style={styles.tela}> 

            <Image 
                source={require('../../Images/fundo.png')}
                style={{position: 'absolute'}}
                />

        <Text style={styles.textoprincipal}>
          Para começar seu cadastro, precisamos saber qual o seu perfíl...
        </Text>


            <Image
            source={require('../../Images/choose.png')}
            style={styles.choose}
            />

        <View style={styles.vbtn}>

          <TouchableOpacity 
          onPress={nxtcomp}
          style={styles.btn} 
          >

            <Text style={styles.txtbtn}>
              COMPRADOR
            </Text>

          </TouchableOpacity>

          <TouchableOpacity 
          onPress={nxtmake}
          style={styles.btn} 
          >

            <Text style={styles.txtbtn}>
              MAKER
            </Text>

          </TouchableOpacity>

        </View>

          <View style={styles.vlog}>

            <TouchableOpacity onPress={login}>
            <Text style={styles.txtlog}> Ja tem uma conta? </Text>
            </TouchableOpacity>

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
    textoprincipal:{
      fontSize: 25,
      textAlign: 'center',
      fontFamily: "Roboto-Tiny", 
      margin: 10,
      marginTop: 130,
    },
    vbtn:{
      flexDirection: 'row',
      marginTop: 0,
      height: 40,
      marginVertical: 50
    },
    btn:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: '#8c52ff',
      height: 50,
      marginHorizontal: 15,
      borderRadius: 12,
      elevation: 8
    },
    txtbtn:{
      fontSize: 20,
      fontFamily: "Roboto-Light", 
      color: 'white'
    },      
    txtlog:{
      fontSize: 22,
      fontFamily: "Roboto-Tiny", 
    },
    vlog:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 20,
      
    },
});
