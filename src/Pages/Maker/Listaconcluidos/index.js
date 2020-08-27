import React, {useState, useContext} from 'react';
import {Linking, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import firebase from '../../../firebaseConnection';
// import MapView, { Marker } from 'react-native-maps';

import {AuthContext} from '../../../contexts/auth';

export default function Listapedido({ data }){

  const { userm } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [load, setLoad] = useState(true);  
  const [caminhofoto, setCaminhofoto] = useState();
  const [imagem, SetImagem] = useState(data.imagem);

  const [loading, setLoading] = useState(false);

  async function Get(){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/imagens/'+imagem).getDownloadURL().then(function(url){
      setCaminhofoto(url);
    })
    setLoad(false);
  };

  async function DescPedido(){
    Get();
    setModal(true);
  }

  async function Fechar(){
    setModal(false);
  }
  

  return(
    
    <View style={styles.container}>
          <TouchableOpacity
          onPress={DescPedido}
          >
          {/* PEDIDOS COMEÇO */}
          <View style={styles.vpedidos}>
            <View style={styles.vstar}>
             
              <Text style={{fontSize: 18, fontFamily: "Roboto-Tiny"}}> {data.cidade} - {data.estado}</Text>
              <View style={{flexDirection: 'row'}}>
                  <Iconm name="lock-open" size={25} color='#ffd56c' /> 
                </View>

            </View>
            <Text style={styles.pedido}> {data.categoria} </Text>
            <Text style={styles.pedido}> {data.periodo} </Text>
            <View style={{
            backgroundColor: '#8c52ff', flex:1, marginHorizontal: 20, 
            margin: 5, alignItems: 'center', borderWidth: 1, borderRadius: 5}}>
            <Text style={{fontFamily: "Roboto-Tiny", color: 'white', fontSize: 15}}>
              Você, e mais {parseInt(data.flag) - (1)} makers abriram esse pedido!</Text>
          </View>
          </View>  
          {/* PEDIDOS FIM */}
          </TouchableOpacity>

          {/* MODAL -------- */}
          <Modal
          animationType="slide" visible={modal}
          >

            <Image 
            source={require('../../../Images/fundo-padrao.png')}
            style={styles.header}
            />   

            <View style={styles.vmodal}>

              <View style={{alignItems: 'center', flexDirection: 'row',
                            justifyContent: 'center', 
                            padding: 10, marginBottom: 20, borderWidth: 1, borderRadius: 20, backgroundColor: 'white',
                            elevation: 15, marginBottom: 40}}>

                <Iconm 
                name="lock-open" size={40} color='#fdb927' Text='alguma' style={{justifyContent: 'center'}} /> 

              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
              <View style={styles.vdescs}>

                <View style={{borderBottomWidth: 1, alignItems: 'center',marginBottom: 5}}>
                  <Text style={styles.txtmodal}>{data.titulo}</Text>
                </View>
                {load ?
                    (
                      <ActivityIndicator color="black" size={30} height={'100%'} alignItems={'center'} />
                    ) :
                    (    
                      <Image
                      source={{uri: caminhofoto }}                         
                      style={styles.foto}
                      />
                    )
                }                  
                  
                <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                  <Text style={styles.txtitem}>Categoria: {data.categoria}</Text>

                  <Text style={styles.txtitem}>Urgência: {data.periodo}</Text>

                  <Text style={styles.txtitem}>Descrição: {data.descrição}</Text>

                </View>
                
              </View>

              <View style={styles.vdescs}>

              <View style={{borderBottomWidth: 1, alignItems: 'center'}}>
                  <Text style={styles.txtmodal}>Comprador</Text>
                </View>   

                <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.txtitem}>Nome: {data.nome} </Text>
                  {/* <Text style={styles.desctxt}></Text> */}
                </View>

                  <Text style={styles.txtitem}>{data.cidade} - {data.estado} </Text>
                  
                  <Text style={styles.txtitem}>CEP: {data.cep} </Text>
                  
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <Icon 
                    name="logo-whatsapp" size={30} color='green' Text='alguma' style={{justifyContent: 'center', marginLeft: 10}} /> 
                    <Text style={styles.txtitem}>{data.telefone}</Text>
                  
                  </View>

                </View>

              </View>

              <View style={styles.vmodalbtn}>
              
                <TouchableOpacity 
                onPress={Fechar}
                style={styles.modalbtn}
                >
                  <Text style={styles.modalbtntxt} >Sair</Text>
                </TouchableOpacity>
              
                <TouchableOpacity 
                onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+(data.telefone.trim()))}
                style={styles.modalbtn}
                >
                  <Text style={styles.modalbtntxt} >Chamar!</Text>
                </TouchableOpacity>
              
              </View>
            </ScrollView>

            </View>
          </Modal>
  
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    backgroundColor: 'white',
    marginBottom: 9,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 7,
    borderWidth: 0.8      
    },
    pedido:{
      fontSize: 17,
      fontFamily: "Roboto-Light", 
    },
    vstar:{
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    vmodal:{
      flex: 1,
      marginTop: 20,
      alignItems: 'center',
    },
    txtmodal:{
      fontSize: 20,
      fontFamily: "Roboto-Tiny",
      margin: 10
    },
    txtitem:{
      fontSize: 18,
      fontFamily: "Roboto-Light", 
      margin: 10
    },
    desctxt:{
      fontSize: 20,
      marginTop: 10

    },
    vmodalbtn:{
      flex: 1,
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'flex-end',
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    modalbtn:{
      alignItems: 'center',
      margin: '10%',
      width: '30%',
      padding: 10,
      backgroundColor: '#8c52ff',
      borderRadius: 12,
      elevation: 8
    },
    modalbtntxt:{
      fontSize: 20,
      fontFamily: "Roboto-Light", 
      color: 'white'
    },
    vdescs:{
      justifyContent: 'center', 
      flex: 1,
      marginTop: 20,
      backgroundColor: 'white',
      marginLeft: 10,
      marginRight: 10,
      padding: 5,
      marginBottom: 9,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 5,
      borderRadius: 5,
      elevation: 7,
    },
    foto:{
      width: '100%',
      height: 250,
    },
    header:{
      position: 'absolute',
    },
});
