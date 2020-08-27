import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConnection';

export default function Nomedatela(){
  return(
  
    <View style={styles.container}>
        
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
        
            {/* HEADER COMEÇO */}
            <View style={styles.vheader}>
                <Image 
                    source={require('../../../Images/header.png')}
                    style={styles.header}
                />
            </View>
            {/* HEADER FIM */}
        
        </View>
        {/* TELA FIM */} 

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
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      header:{
        width: 419,
        height: 100
      },
});
