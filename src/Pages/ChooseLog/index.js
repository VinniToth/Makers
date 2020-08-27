import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChooseLog(){

    const navigation = useNavigation();

    function loginc(){
        navigation.navigate('Login');
      }

    function loginm(){
        navigation.navigate('Loginm');
    }

  return(
  
    <View style={styles.container}>
        
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
        
                <Image 
                    source={require('../../Images/fundo.png')}
                    style={{position: 'absolute'}}
                />
            
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 150}}>
                <Text style={styles.titulo}>Entrar como</Text>

                <View style={styles.vbtn}>
                    <TouchableOpacity 
                    style={styles.btn}
                    onPress={loginc}
                    >
                    <Text style={styles.txtbtn}>COMPRADOR</Text>
                    </TouchableOpacity>

                    <Text style={styles.texto}>OU</Text>

                    <TouchableOpacity 
                    style={styles.btn}
                    onPress={loginm}
                    >
                    <Text style={styles.txtbtn}>MAKER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
        </View>
        {/* TELA FIM */} 

    </View>

  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,

    },
    tela:{
      backgroundColor: 'white',    
      flex: 1,
      
    },
    titulo:{
        fontSize: 27,
        textAlign: 'center',
        marginTop: 40,
        fontFamily: "Roboto-Tiny",
    },
    vbtn:{
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    btn:{
        borderColor: 'black',
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#8c52ff',
        width: 200,
        alignItems: 'center',
        elevation: 8
    },
    txtbtn:{
        fontSize: 20,
        color: 'white',
        fontFamily: "Roboto-Light",
    },
    texto:{
        margin: 20,
        fontSize: 20,
        fontFamily: "Roboto-medium",
    }

});
