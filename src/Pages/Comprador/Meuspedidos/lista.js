import React, {useState, useEffect} from 'react';
import {Linking, View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, ScrollView, ActivityIndicator, SnapshotViewIOS} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConnection';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialIcons';


export default function Lista({ data }){

  const navigation = useNavigation();
  const [load, setLoad] = useState(true);  
  const [modal, setModal] = useState(false);
  const [caminhofoto, setCaminhofoto] = useState();
  const [imagem, SetImagem] = useState(data.imagem);
  const [abrir1, setAbrir1] = useState(false);
  const [abrir2, setAbrir2] = useState(false);
  const [abrir3, setAbrir3] = useState(false);
  
  const [email1, setEmail1] = useState();
  const [email2, setEmail2] = useState();
  const [email3, setEmail3] = useState();

  const [existe1, setExiste1] = useState(false);
  const [existe2, setExiste2] = useState(false);
  const [existe3, setExiste3] = useState(false);

  const [caminhoavatarm1, setCaminhoavatarm1] = useState();
  const [caminhoimg1m1, setCaminhoimg1m1] = useState();
  const [caminhoimg2m1, setCaminhoimg2m1] = useState();
  const [caminhoimg3m1, setCaminhoimg3m1] = useState();

  const [caminhoavatarm2, setCaminhoavatarm2] = useState();
  const [caminhoimg1m2, setCaminhoimg1m2] = useState();
  const [caminhoimg2m2, setCaminhoimg2m2] = useState();
  const [caminhoimg3m2, setCaminhoimg3m2] = useState();

  const [caminhoavatarm3, setCaminhoavatarm3] = useState();
  const [caminhoimg1m3, setCaminhoimg1m3] = useState();
  const [caminhoimg2m3, setCaminhoimg2m3] = useState();
  const [caminhoimg3m3, setCaminhoimg3m3] = useState();

  async function Get(){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/imagens/'+imagem).getDownloadURL().then(function(url){
      setCaminhofoto(url);
    })
    setLoad(false);
  };

  async function GetMakers(){
    if(data.avatarm1 !== ''){
      await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.avatarm1).getDownloadURL().then(function(url){
      setCaminhoavatarm1(url);
    })
  }
  if(data.img1m1 !== '' & data.img1m1 !== null){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img1m1).getDownloadURL().then(function(url){
    setCaminhoimg1m1(url);
    })
  }
  if(data.img2m1 !== ''){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img2m1).getDownloadURL().then(function(url){
    setCaminhoimg2m1(url);
    })
  }
  if(data.img3m1 !== ''){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img3m1).getDownloadURL().then(function(url){
    setCaminhoimg3m1(url);
    })
  }
};

  async function GetMakers2(){
    if(data.avatarm2 !== ''){
      await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.avatarm2).getDownloadURL().then(function(url){
      setCaminhoavatarm2(url);
    })
  }
  if(data.img1m2 !== '' & data.img1m2 !== null){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img1m2).getDownloadURL().then(function(url){
    setCaminhoimg1m2(url);
    })
  }
  if(data.img2m2 !== ''){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img2m2).getDownloadURL().then(function(url){
    setCaminhoimg2m2(url);
    })
  }
  if(data.img3m2 !== ''){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img3m2).getDownloadURL().then(function(url){
    setCaminhoimg3m2(url);
    })
  }
  };

  async function GetMakers3(){
    if(data.avatarm3 !== ''){
      await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.avatarm3).getDownloadURL().then(function(url){
      setCaminhoavatarm3(url);
    })
  }
  if(data.img1m3 !== '' & data.img1m3 !== null){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img1m3).getDownloadURL().then(function(url){
    setCaminhoimg1m3(url);
    })
  }
  if(data.img2m3 !== ''){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img2m3).getDownloadURL().then(function(url){
    setCaminhoimg2m3(url);
    })
  }
  if(data.img3m3 !== ''){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+data.img3m3).getDownloadURL().then(function(url){
    setCaminhoimg3m3(url);
    })
  }
  };
  
  async function DescPedido(){
    Get();
    setModal(true);
  };

  async function Fechar(){
    setModal(false);
    setAbrir1(false);
    setAbrir2(false);
    setAbrir3(false);
  }

  async function abre1(){
    if(abrir1 == false){
      setAbrir1(true);
      GetMakers();
  }
    if(abrir1 == true){
      setAbrir1(false);
    }
  }

  function abre2(){
    if(abrir2 == false){
      setAbrir2(true);
      GetMakers2();
  }
    if(abrir2 == true){
      setAbrir2(false);
    }
  }

  function abre3(){
    if(abrir3 == false){
      setAbrir3(true);
      GetMakers3();
  }
    if(abrir3 == true){
      setAbrir3(false);
    }
  }

  function Verifica(){
    if(data.nomem1 !== ''){
      setExiste1(true);
    }
    if(data.nomem2 !== ''){
      setExiste2(true);
    }
    if(data.nomem3 !== ''){
      setExiste3(true);
    }
  };


  return(
  
       <View style={styles.container}>
          <TouchableOpacity
          onPress={() => {DescPedido(); Verifica();}}
          >
          {/* PEDIDOS COMEÇO */}
          <View style={styles.vpedidos}>
            <View style={styles.vstar}>
             
              <Text style={{fontSize: 18, fontFamily: "Roboto-Tiny",}}> São Paulo - SP </Text>
                <View style={{flexDirection: 'row'}}>
                  <Iconm name="star-border" size={25} color='#ffdf90' c /> 
                </View>
            </View>
            <Text style={styles.pedido}> {data.categoria} </Text>
            <Text style={styles.pedido}> {data.periodo} </Text>
            <View style={{
            backgroundColor: '#8c52ff', width: 260,
            alignItems: 'center', borderWidth: 1, borderRadius: 5, margin: 5}}>
            <Text style={{fontFamily: "Roboto-Tiny", color: 'white', fontSize: 15}}>{data.flag}/3 Maker(s) já abriram seu pedido!</Text>
          </View>
        </View>  
          {/* PEDIDOS FIM */}
          </TouchableOpacity>

          <Modal
          animationType="slide" visible={modal}
          >

              <Image 
                source={require('../../../Images/fundo.png')}
                style={{position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover'}}
                />
            <View style={styles.vmodal}>

              <View style={{alignItems: 'center', flexDirection: 'row',
                            justifyContent: 'center', 
                            padding: 10, marginBottom: 20, borderWidth: 1, borderRadius: 20, backgroundColor: 'white',
                            elevation: 15, marginBottom: 40}}>
                <Iconm 
                name="star" size={40} color='#ffdf90' Text='alguma' style={{justifyContent: 'center'}} /> 

              </View>
              <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false} >
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
                  <Text style={styles.txtitens}>Categoria: {data.categoria}</Text>

                  <Text style={styles.txtitens}>Urgência: {data.periodo}</Text>

                  <Text style={styles.txtitens}>Descrição: {data.descrição}</Text>

                </View>
                
              </View>

              <View style={styles.vdescs}>

              <View style={{borderBottomWidth: 1, alignItems: 'center'}}>
                  <Text style={styles.txtmodal}>{data.flag}/3 Makers abriram seu pedido</Text>
                </View>   

                <View style={{marginTop: 5, alignItems: 'flex-start'}}>
                {existe1 ?
                (<TouchableOpacity 
                  onPress={abre1}
                  style={{width: '100%'}}>
  
                  <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.6, width: '100%'}}>
                    {abrir1 ?
                    (<Iconm name="arrow-drop-up" size={30} color='black'/>)
                    :
                    (<Iconm name="arrow-drop-down" size={30} color='black'/>)}
                    
                    <Text style={styles.txtitens}>Maker 1: {data.nomem1}</Text>
                    </View>
                  </TouchableOpacity>)
                :
                (null)
                }
                
                  {abrir1 ? 
                  (<View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                    
                    <View style={{elevation: 10, backgroundColor: 'white', borderWidth: 0.8, borderRadius:60, width: 95, height: 95, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    source={{uri: caminhoavatarm1 }}                         
                    style={{width: '100%', height: '100%', borderRadius: 60}}
                    />
                    </View>
                    
                    <Text style={styles.txtsubitens}>{data.nomem1}</Text>
                    <Text style={{fontFamily: 'Roboto-Light'}}>{data.telefonem1}</Text>
                    
                    <Text style={{marginTop: 20, fontFamily: 'Roboto-Tiny', fontSize: 16}}>Trabalhos realizados</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-around'}}>

                      <View style={{marginHorizontal: 10, elevation: 10, backgroundColor: 'white', borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg1m1 }}                         
                      style={{width: '100%', height: '100%'}}
                      />
                      </View>
                      <View style={{marginHorizontal: 10, elevation: 10, backgroundColor: 'white', borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg2m1 }}                         
                      style={{width: '100%', height: '100%'}}
                      />
                      </View>
                      <View style={{marginHorizontal: 10, elevation: 10, backgroundColor: 'white', borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg3m1 }}                         
                      style={{width: '100%', height: '100%'}}
                      />

                      </View>

                    </View>

                      <TouchableOpacity 
                      onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+(data.telefonem1.trim()))}
                      style={{elevation: 8, marginBottom: 10, marginTop: 20, padding: 10, borderRadius: 12, backgroundColor: '#8c52ff'}}>
                        <Text style={{fontSize: 17, color: 'white', fontFamily: 'Roboto-Light'}}>Entrar em contato</Text>
                      </TouchableOpacity>
                  
                  </View> )
                  :
                  (null)
                  }
                  
                {existe2 ?
                (<TouchableOpacity
                  onPress={abre2}
                  style={{width: '100%'}}>
  
                  <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.6, width: '100%'}}>
                    {abrir2 ?
                    (<Iconm name="arrow-drop-up" size={30} color='black'/>)
                    :
                    (<Iconm name="arrow-drop-down" size={30} color='black'/>)}
                    <Text style={styles.txtitens}>Maker 2: {data.nomem2}</Text>
                  </View>
  
                  </TouchableOpacity>)
                :
                (null)  
                }

                {abrir2 ? 
                  (<View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                    
                    <View style={{elevation: 10, backgroundColor: 'white', borderWidth: 0.8, borderWidth: 1, borderRadius:60, width: 95, height: 95, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    source={{uri: caminhoavatarm2 }}                         
                    style={{width: '100%', height: '100%', borderRadius: 60}}
                    />
                    </View>
                    
                    <Text style={styles.txtsubitens}>{data.nomem2}</Text>
                    <Text style={{fontFamily: 'Roboto-Light'}}>{data.telefonem2}</Text>
                    
                    <Text style={{marginTop: 20, fontFamily: 'Roboto-Tiny', fontSize: 16}}>Trabalhos realizados</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-around'}}>

                      <View style={{marginHorizontal: 10, elevation: 10, backgroundColor: 'white', borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg1m2 }}                         
                      style={{width: '100%', height: '100%'}}
                      />
                      </View>
                      <View style={{marginHorizontal: 10, elevation: 10, backgroundColor: 'white', borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg2m2 }}                         
                      style={{width: '100%', height: '100%'}}
                      />
                      </View>
                      <View style={{marginHorizontal: 10, elevation: 10, backgroundColor: 'white', borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg3m2 }}                         
                      style={{width: '100%', height: '100%'}}
                      />

                      </View>

                    </View>

                      <TouchableOpacity 
                      onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+(data.telefonem2.trim()))}
                      style={{elevation: 8, marginBottom: 10, marginTop: 20, padding: 10, borderRadius: 12, backgroundColor: '#8c52ff'}}>
                        <Text style={{fontSize: 17, color: 'white', fontFamily: 'Roboto-Light'}}>Entrar em contato</Text>
                      </TouchableOpacity>
                  
                  </View> )
                  :
                  (null)
                  }
                
                {existe3 ?
                (<TouchableOpacity 
                  onPress={abre3}
                  style={{width: '100%'}}>
  
                  <View style={{marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.6, width: '100%'}}>
                    {abrir3 ?
                    (<Iconm name="arrow-drop-up" size={30} color='black'/>)
                    :
                    (<Iconm name="arrow-drop-down" size={30} color='black'/>)}
                    <Text style={styles.txtitens}>Maker 3: {data.nomem3} </Text>
                  </View>
  
                  </TouchableOpacity>)
                :
                (null)
                }

                {abrir3 ? 
                  (<View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                    
                    <View style={{elevation: 10, backgroundColor: 'white', borderWidth: 0.8, borderRadius:60, width: 95, height: 95, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                    source={{uri: caminhoavatarm3 }}                         
                    style={{width: '100%', height: '100%', borderRadius: 60}}
                    />
                    </View>
                    
                    <Text style={styles.txtsubitens}>{data.nomem3}</Text>
                    <Text style={{fontFamily: 'Roboto-Light'}}>{data.telefonem3}</Text>
                    
                    <Text style={{marginTop: 20, fontFamily: "Roboto-Tiny", fontSize: 16}}>Trabalhos realizados</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-around'}}>

                      <View style={{elevation: 10, backgroundColor: 'white', marginHorizontal: 10,borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg1m3 }}                         
                      style={{width: '100%', height: '100%'}}
                      />
                      </View>
                      <View style={{elevation: 10, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg2m3 }}                         
                      style={{width: '100%', height: '100%'}}
                      />
                      </View>
                      <View style={{elevation: 10, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 0.8, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                      source={{uri: caminhoimg3m3 }}                         
                      style={{width: '100%', height: '100%'}}
                      />

                      </View>

                    </View>

                      <TouchableOpacity 
                      onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+(data.telefonem3.trim()))}
                      style={{elevation: 8, marginBottom: 10, marginTop: 20, padding: 10, borderRadius: 12, backgroundColor: '#8c52ff'}}>
                        <Text style={{fontSize: 17, color: 'white', fontFamily: 'Roboto-Light'}}>Entrar em contato</Text>
                      </TouchableOpacity>
                  
                  </View> )
                  :
                  (null)
                }
                
              </View>

              </View>

              <View style={styles.vdescs}>

              <View style={{borderBottomWidth: 0.8, alignItems: 'center'}}>
                  <Text style={styles.txtmodal}>Seus Dados</Text>
                </View>   

                <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.txtitens}>{data.nome} </Text>
                </View>

                  <Text style={styles.txtitens}>{data.cidade} - {data.estado}</Text>
                  
                  <Text style={styles.txtitens}>CEP: {data.cep}</Text>
                  
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <Icon 
                    name="logo-whatsapp" size={30} color='green' Text='alguma' style={{justifyContent: 'center', marginLeft: 10}} /> 
                    <Text style={styles.txtitens}>{data.telefone}</Text>
                  
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
    marginHorizontal: 20,
    padding: 5,
    backgroundColor: 'white',
    marginBottom: 9,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 7      ,
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
    txtitens:{
      fontSize: 17,
      fontFamily: "Roboto-Light",
      margin: 10
    },
    txtsubitens:{
      fontSize: 16,
      fontFamily: "Roboto-Tiny",
    },
    desctxt:{
      fontSize: 20,
      marginTop: 10

    },
    vmodalbtn:{
      flex: 1,
      marginTop: 10,
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
      elevation: 5
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
      elevation: 7 
    },
    foto:{
      width: '100%',
      height: 250,
    },
    header:{
      position: 'absolute'
    }
});

