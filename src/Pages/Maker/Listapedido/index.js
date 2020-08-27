import React, {useState, useEffect, useContext} from 'react';
import {Linking, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView, ActivityIndicator} from 'react-native';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../../firebaseConnection';

import {Context} from '../../../Pages/Maker/Pedidos/Contextpedido';


export default function Listapedido({ data }){

  const { uid, stars, nome, telefone, img1, img2, img3, picture } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);  
  const [caminhofoto, setCaminhofoto] = useState();
  const [imagem, SetImagem] = useState(data.imagem);

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

  async function Confirm(){
    Alert.alert(
      'Deseja confirmar o desbloqueio? O custo será de 10 Stars!',
      `Pedido:  ${data.titulo}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',          
        },
        {
          text: 'Confirmar',
          onPress: () => Unlock()
        }
      ]
      )
    }
    
    async function Unlock(){
      setLoading(true);
    if(stars >= 10){
        let flag = parseInt(data.flag) + parseInt(1);
        let newstar = parseInt(stars)-parseInt(10);

        
        
        if(data.mk1 == null)
        {
          const img1m1 = img1 ? img1 : '';
          const img2m1 = img2 ? img2 : '';
          const img3m1 = img3 ? img3 : '';
          const avatarm1 = picture ? picture : '';
          await firebase.database().ref('pedido').child(data.key).update({
            maker1: uid,
            nomem1: nome,
            flag: flag,
            img1m1: img1m1,
            img2m1: img2m1,
            img3m1: img3m1,
            avatarm1: avatarm1,
            telefonem1: telefone
          }).then
          await firebase.database().ref('maker').child(uid).update({
            stars: newstar
            });
          
      setLoading(false);
      return
    }
  
    if(data.mk1 !== null && data.mk2 == null)
    {
      const img1m2 = img1 ? img1 : '';
      const img2m2 = img2 ? img2 : '';
      const img3m2 = img3 ? img3 : '';
      const avatarm2 = picture ? picture : '';
      await firebase.database().ref('pedido').child(data.key).update({
        maker2: uid,
        nomem2: nome,
        flag: flag,
        img1m2: img1m2,
        img2m2: img2m2,
        img3m2: img3m2,
        avatarm2: avatarm2,
        telefonem2: telefone
       }).then
       await firebase.database().ref('maker').child(uid).update({
        stars: newstar
        });

      setLoading(false);
      return
    }
    if(data.mk1 !== null && data.mk2 !== null && data.mk3 == null)
    {
      const img1m3 = img1 ? img1 : '';
      const img2m3 = img2 ? img2 : '';
      const img3m3 = img3 ? img3 : '';
      const avatarm3 = picture ? picture : '';
      await firebase.database().ref('pedido').child(data.key).update({
        maker3: uid,
        nomem3: nome,
        flag: flag,
        img1m3: img1m3,
        img2m3: img2m3,
        img3m3: img3m3,
        avatarm3: avatarm3,
        telefonem3: telefone
       }).then
       await firebase.database().ref('maker').child(uid).update({
        stars: newstar
        });
      
      setLoading(false);
      return
    }
  }
    else{Alert.alert(
      'Saldo insulficiente :(  Adquira mais Stars para liberar...',
      `Saldo atual:  ${stars} Stars`,
      [
        {
          text: 'Sair',
          style: 'cancel',          
        },
        {
          text: 'Comprar!',
          onPress:() => Linking.openURL('https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=593105638-57d68d3b-135d-4a89-9dd5-03b01891e472')
        }
      ]
      )
      setLoading(false);
    };
  }
  

  return(
  
    <View style={styles.container}>
          <TouchableOpacity
          onPress={DescPedido}
          >
          {/* PEDIDOS COMEÇO */}
          <View style={styles.vpedidos}>
            <View style={styles.vstar}>
             
              <Text style={{fontSize: 18, fontFamily: "Roboto-Tiny",}}> {data.cidade} - {data.estado} </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: "Roboto-Medium", fontSize:18}}> 10 </Text>
                  <Iconm name="star-border" size={25} color='#ffd56c' /> 
                </View>
            </View>
            <Text style={styles.pedido}> {data.categoria} </Text>
            <Text style={styles.pedido}> {data.periodo} </Text>
          <View style={{
            backgroundColor: '#8c52ff', width: 90, 
            alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 5}}>
            <Text style={{fontFamily: "Roboto-Medium", color: 'white', fontSize: 15}}>Makers: {data.flag}/3</Text>
          </View>
          </View>  
          {/* PEDIDOS FIM */}
          </TouchableOpacity>

          {/* MODAL ----------------- */}
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
                            elevation: 15}}>
                 

                <Text style={{fontSize: 25, marginRight: 5, fontFamily: "Roboto-Tiny", color: 'black'}}>10</Text>
                <Iconm 
                name="star" size={40} color='#fdb927' Text='alguma' style={{justifyContent: 'center'}} /> 

              </View>
              <ScrollView showsVerticalScrollIndicator={false}>


              <View style={styles.vdescs}>
                

                <View style={{borderBottomWidth: 0.8, alignItems: 'center', marginBottom: 5}}>
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
              {/* <View style={{alignItems: 'center'}}>
              
              <Text style={{textAlign: 'center', marginBottom: 5, fontSize: 20, marginTop: 20, fontFamily: "Roboto-Tiny"}}>Localização: {data.cidade} - {data.estado}</Text>
              <MapView
                style={{width:'95%', height: 350}}
                initialRegion={{
                  latitude: -23.5486381,
                  longitude: -46.5167889,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421

                }}>
                  <Marker coordinate= {{
                    latitude: -23.5486381, longitude: -46.5167889}} 
                    title="Comprador esta aqui!"
                    />
                </MapView>
              
              </View> */}

              <View style={styles.vdescs}>


              <View style={{borderBottomWidth: 0.8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={styles.txtmodal}>Comprador</Text>
                  <Iconm
                    name="lock" size={25} color='#8c52ff' Text='alguma' style={{justifyContent: 'center'}} /> 
                </View>   

                <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.txtitem}>Nome: ********** </Text>
                  {/* <Text style={styles.desctxt}>{data.nome}</Text> */}
                </View>

                  <Text style={styles.txtitem}>{data.cidade} - {data.estado} </Text>
                  
                  <Text style={styles.txtitem}>CEP: ********</Text>
                  
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <Icon
                    name="logo-whatsapp" size={30} color='green' Text='alguma' style={{justifyContent: 'center', marginLeft: 10}} /> 
                    <Text style={styles.txtitem}>** *********</Text>
                  
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
                onPress= {Confirm} 
                style={styles.modalbtn}>
                  { 
                    loading ?
                    (
                      <ActivityIndicator size={20} color="#FFF" />
                    ) 
                    :
                    <Text style={styles.modalbtntxt}>Liberar!</Text>
                  }
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
      backgroundColor: '#ffffff',
      marginLeft: 10,
      marginRight: 10,
      padding: 5,
      marginBottom: 9,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 5,
      borderRadius: 5,
      elevation: 7 
    },
    foto:{
      width: '100%',
      height: 250,
    },
    header:{
      position: 'absolute',
    },
});
