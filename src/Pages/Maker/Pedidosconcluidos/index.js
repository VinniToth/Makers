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
            setTriste(false);
          }
          else(setTriste(true))

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
          <View style={styles.vheader}>
                <Image 
                    source={require('../../../Images/fundo.png')}
                    style={styles.header}
                />
                <Text style={styles.stars}>{ stars }</Text>
            </View>
          {/* HEADER FIM */}
        

          {/* TITULO COMEÇO */}
          <View style={styles.vtitulo}> 
              <Text style={styles.titulo}>
                Pedidos Desbloqueados
              </Text> 
          </View>
          {/* TITULO FIM */}

          {triste ?
          (<View style={{alignItems: 'center', marginTop: 30}}>
          <Image source={require('../../../Images/estrela-triste.png')} style={{marginVertical: 25}} />
          <Text style={{textAlign: 'center', marginHorizontal: 20, fontSize: 17, marginBottom: 10, fontFamily: "Roboto-Tiny",}}>Você ainda não desbloqueou nenhum pedido :´(</Text>
          <Text style={{textAlign: 'center', marginHorizontal: 20, fontSize: 20, fontFamily: "Roboto-Medium",}}>Passe para o lado e desbloqueie já!</Text>
          <Icon name="arrow-undo-sharp" size={45} color='black'/>
          </View>)
          :
          (
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
            )
          }
          

          


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
    header:{
      position: 'absolute'
    },
    stars:{
      fontSize: 25,
      textAlign: 'center',
      marginTop: 48,
      fontFamily: "Roboto-Medium", 
    },
    vtitulo:{
      alignItems: 'center',
    },
    titulo:{
      fontSize: 24,
      textAlign: 'center',
      fontFamily: "Roboto-Tiny",
      marginTop: 50
    },
    vpedido:{
      marginTop: 20,
      flex: 1
      
    }
    
});
