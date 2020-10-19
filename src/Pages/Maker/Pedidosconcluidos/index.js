import React, {useState, useEffect, useContext, Children} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator, ActivityIndicatorBase} from 'react-native';
import firebase from '../../../firebaseConnection';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Listaconcluidos from '../Listaconcluidos';

import { Context } from '../../Maker/Pedidos/Contextpedido';
import {AuthContext} from '../../../contexts/auth';

console.disableYellowBox = true;
export default function Pedidosconcluidos(){
  
  const [pedidos, setPedidos] = useState([null]);
  
  const [loading, setLoading] = useState(true);
  const { stars } = useContext(Context);
  const { userm } = useContext(AuthContext);
  const [triste, setTriste] = useState(false);

  useEffect(() => {
    
    async function dados(){

      await firebase.database().ref('pedido').on('value', (snapshot) =>{
        setPedidos([]);

      // Declarando o array para pegar os dados no snapshot
        snapshot.forEach((childItem) => {
          let data = 
          {
            key: childItem.key,
            titulo: childItem.val().titulo,
            descrição: childItem.val().descricao,
            categoria: childItem.val().categoria,
            nome: childItem.val().usuario,
            cep: childItem.val().cep,
            cidade: childItem.val().cidade,
            estado: childItem.val().estado,
            telefone: childItem.val().telefone,
            flag: childItem.val().flag,
            imagem: childItem.val().imagem,
            periodo: childItem.val().periodo
          };
          let maker1 = childItem.val().maker1;
          let maker2 = childItem.val().maker2;
          let maker3 = childItem.val().maker3;
          
          if(maker1 == userm.uid || maker2== userm.uid || maker3== userm.uid)
          {
            setPedidos(oldArray => [...oldArray, data].reverse());
          }

        })
        setLoading(false);

      })

    }

    dados();

  }, []);
  
  return(
  
    <View style={styles.container}>
        
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
        
          {/* HEADER COMEÇO */}
          <View style={{alignItems: 'center', position: 'absolute', flex: 1, width: '100%'}}>
                <Image 
                    source={require('../../../Images/fundo.png')}
                    style={{position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover'}}
                    />
                <Iconm name="star" size={125} color='#FFB600' style={{position: 'absolute', marginTop: 0, alignItems: 'center'}} /> 
            </View>
                <Text style={styles.stars}>{ stars }</Text>
          {/* HEADER FIM */}
        

          {/* TITULO COMEÇO */}
          <View style={styles.vtitulo}> 
              <Text style={styles.titulo}>
                Pedidos Desbloqueados
              </Text> 
          </View>
          {/* TITULO FIM */}

         
            <View style={styles.vpedido}>
  
              {loading ?
              (
                <ActivityIndicator color="black" size={45} />
              ) :
              (    
              <FlatList
                keyExtractor={item => item.key}
                data={pedidos}
                renderItem= {({item}) => ( <Listaconcluidos data={item} /> ) }
              />
              )
              }
            </View>     

        </View>
        {/* TELA FIM */} 

    </View>

  );
}



const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop: 0,
      backgroundColor: 'white',    
    },
    tela:{
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
    },
    titulo:{
      fontSize: 24,
      textAlign: 'center',
      fontFamily: "Roboto-Light",
      marginTop: 50
    },
    vpedido:{
      marginTop: 20,
      flex: 1
      
    }
    
});
