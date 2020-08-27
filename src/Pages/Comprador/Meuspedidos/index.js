import React, {useState, useEffect, useContext, Children} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator, ActivityIndicatorBase} from 'react-native';
import firebase from '../../../firebaseConnection';
import Iconm from 'react-native-vector-icons/MaterialIcons';

import Lista from './lista';

import {AuthContext} from '../../../contexts/auth';

console.disableYellowBox = true;
export default function Pedido(){
  
  const [pedidos, setPedidos] = useState([]);
  // const mercadopago = require("mercadopago");

  
  const [loading, setLoading] = useState(true);
  const { userc, signOutm } = useContext(AuthContext);
  const [triste, setTriste] = useState(false);

  useEffect(() => {
    
    async function dados(){

      // Pegando snapshot do banco
      await firebase.database().ref('pedido').orderByChild("iduser").equalTo(userc.uid).on('value', (snapshot) =>{
        setPedidos([]);

      // Declarando o array para pegar os dados no snapshot
        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            titulo: childItem.val().titulo,
            descrição: childItem.val().descricao,
            cidade: childItem.val().cidade,
            cep: childItem.val().cep,
            estado: childItem.val().estado,
            telefone: childItem.val().telefone,
            nome: childItem.val().usuario,
            categoria: childItem.val().categoria,
            flag: childItem.val().flag,
            periodo: childItem.val().periodo,
            imagem: childItem.val().imagem,
            maker1: childItem.val().maker1,
            nomem1: childItem.val().nomem1,
            telefonem1:childItem.val().telefonem1,
            avatarm1: childItem.val().avatarm1,
            img1m1: childItem.val().img1m1,
            img2m1: childItem.val().img2m1,
            img3m1: childItem.val().img3m1,
            maker2: childItem.val().maker2,
            nomem2: childItem.val().nomem2,
            telefonem2:childItem.val().telefonem2,
            avatarm2: childItem.val().avatarm2,
            img1m2: childItem.val().img1m2,
            img2m2: childItem.val().img2m2,
            img3m2: childItem.val().img3m2,
            maker3: childItem.val().maker3,
            nomem3: childItem.val().nomem3,
            telefonem3:childItem.val().telefonem3,
            avatarm3: childItem.val().avatarm3,
            img1m3: childItem.val().img1m3,
            img2m3: childItem.val().img2m3,
            img3m3: childItem.val().img3m3,

          };
          setPedidos(oldArray => [...oldArray, data].reverse());
        })
        if(pedidos == null){
          setTriste(true);
        }
        setLoading(false);

      })

    }

    dados();
    console.log(pedidos)

  }, []);
  
  return(
  
    <View style={styles.container}>
        
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
          
                <Image 
                    source={require('../../../Images/fundo.png')}
                    style={{position: 'absolute'}}
                />
        

          {/* TITULO COMEÇO */}
          <View style={styles.vtitulo}>
              <Text style={styles.titulo}>
                Meus Pedidos
              </Text>
          </View>
          {/* TITULO FIM */}

          {triste ?
          (<View style={{alignItems: 'center', marginTop: 30}}>
          <Image source={require('../../../Images/estrela-triste.png')} style={{marginVertical: 20}} />
          <Text style={{textAlign: 'center', marginHorizontal: 20, fontSize: 20, marginBottom: 15}}>Você ainda não encomendou nenhum pedido :(</Text>
          <Text style={{textAlign: 'center', marginHorizontal: 20, fontSize: 20, fontWeight: 'bold'}}>Passe para o lado e peça já! Makers entrarão em contato via WhatsApp!</Text>
          <Iconm name="call-received" size={45} color='black'/>
          </View>)
          :
          (<View style={styles.vpedido}>

            {loading ?
            (
              <ActivityIndicator color="black" size={45} />
            ) :
            (    
            <FlatList
              keyExtractor={item => item.key}
              data={pedidos}
              renderItem= {({item}) => ( <Lista data={item} /> ) }
            />
            )
            }
            </View>)
            }


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
    stars:{
      fontSize: 25,
      textAlign: 'center',
      marginTop: 35,
      fontWeight: 'bold'
    },
    vtitulo:{
      alignItems: 'center',
      marginTop: 0,
      
    },
    titulo:{
      fontSize: 24,
      textAlign: 'center',
      fontFamily: "Roboto-Tiny", 
      marginTop: 120,
    },
    vpedido:{
      marginTop: 20,
      flex: 1
      
    }
    
});
