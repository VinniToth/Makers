import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

import Context from './src/Pages/Maker/Pedidos/Contextpedido';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <Context>
        <Routes/>
        </Context>        
      </AuthProvider>
    </NavigationContainer>
    

  );
}
