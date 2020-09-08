import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, FlatList, Alert, ActivityIndicator} from 'react-native';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import firebase from '../../../firebaseConnection';

import Listapedido from '../Listapedido';
import { Context } from '../Pedidos/Contextpedido';
import {AuthContext} from '../../../contexts/auth';

console.disableYellowBox = true;

export default function Pedido({ children }){
  
  const { stars, dado } = useContext(Context);
  const { userm } = useContext(AuthContext);
  
  const [uid, setUid] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    
    async function dados(){
      
      await firebase.database().ref('pedido').on('value', (snapshot) =>{
        dado();
        setPedidos([]);
        
        // Declarando o array para pegar os dados no snapshot
        snapshot.forEach((childItem) => {
          let data = 
          {
            key: childItem.key,
            titulo: childItem.val().titulo,
            descrição: childItem.val().descricao,
            nome: childItem.val().usuario,
            cep: childItem.val().cep,
            cidade: childItem.val().cidade,
            estado: childItem.val().estado,
            telefone: childItem.val().telefone,
            mk1: childItem.val().maker1,
            mk2: childItem.val().maker2,
            mk3: childItem.val().maker3,
            flag: childItem.val().flag,
            imagem: childItem.val().imagem,
            categoria: childItem.val().categoria,
            periodo: childItem.val().periodo
          }
          let maker1 = childItem.val().maker1;
          let maker2 = childItem.val().maker2;
          let maker3 = childItem.val().maker3;
          let flag = childItem.val().flag;
          
          setUid(userm.uid);
          
          // Declarando o array para pegar os dados no snapshot
          
          if(userm.uid !== maker1 && userm.uid !== maker2 && userm.uid !== maker3 && flag<=2)
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
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
        
          {/* HEADER COMEÇO */}
          <View style={styles.vheader}>
                <Image 
                    source={require('../../../Images/fundo.png')}
                    style={styles.header}
                />
                <Iconm name="star" size={125} color='#FFB600' style={{position: 'absolute', marginTop: 0, alignItems: 'center'}} /> 

            </View>
                <Text style={styles.stars}>{stars}</Text>
          {/* HEADER FIM */}
        

          {/* TITULO COMEÇO */}
          <View style={styles.vtitulo}>

            <Text style={styles.titulo}>Escolha um pedido e libere já!</Text>
            
            
          </View>
          {/* TITULO FIM */}
                
          {/* PEDIDOS COMEÇO */}
          <View style={styles.vpedido}>

              

            {loading ?
            (
              <ActivityIndicator color="black" size={45} />
            ) :
            (    
            <FlatList
              keyExtractor={item => item.key}
              data={pedidos}
              renderItem= {({item}) => ( <Listapedido data={item} /> ) }
            />
            )
            }
          </View>
          {/* PEDIDOS FIM */}


        </View>
        {/* TELA FIM */} 

    </View>

  );
}



const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop: 0,
         
    },
    tela:{
      flex: 1,
      backgroundColor: 'white'
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
      marginTop: 30,
      margin: 10
    },
    titulo:{
      fontSize: 24,
      textAlign: 'center',
      fontFamily: "Roboto-Light", 
      marginTop: 20
    },
    vpedido:{
      marginTop: 15,
      flex: 1, 
    }
    
});
