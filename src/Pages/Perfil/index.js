//Tela 2 - Choose
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import Iconm from 'react-native-vector-icons/MaterialIcons';
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
        <View style={{alignItems: 'center'}}>
        <Iconm name="star" size={125} color='#FFB600' style={{position: 'absolute', marginTop: 0}} /> 
        </View>

        <Text style={styles.textoprincipal}>
          Para começar seu cadastro, precisamos saber qual o seu perfíl...
        </Text>

        <View style={styles.vbtn}>

        <View>

          <Image 
          source={require('../../Images/Avatar_Comp.png')}
          style={{marginHorizontal: 20}}
          />

          <TouchableOpacity 
          onPress={nxtcomp}
          style={styles.btn} 
          >

            <Text style={styles.txtbtn}>
              COMPRADOR
            </Text>


          </TouchableOpacity>
            </View>

          <View>
          <Image 
          source={require('../../Images/Avatar_Maker.png')}
          style={{marginHorizontal: 20}}
          />
          <TouchableOpacity 
          onPress={nxtmake}
          style={styles.btn} 
          >

            <Text style={styles.txtbtn}>
              MAKER
            </Text>

          </TouchableOpacity>

          </View>

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
      fontSize: 23,
      textAlign: 'center',
      fontFamily: "Roboto-Light", 
      margin: 10,
      marginTop: 140,
    },
    vbtn:{
      flexDirection: 'row',
      height: 40,
      marginVertical: 50,
      marginTop: 0,
      marginHorizontal: 25
    },
    btn:{
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: '#8c52ff',
      height: 50,
      marginHorizontal: 25,
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
