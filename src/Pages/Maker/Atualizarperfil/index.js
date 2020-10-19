import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConnection';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconm from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-picker';

import { Context } from '../Pedidos/Contextpedido';

console.disableYellowBox = true;
export default function Atualizarperfil(){

  const { Limpar, telefone, nome, email, cep, cidade, stars, estado, bairro, uid, dado, Get, img1, img2, img3, picture } = useContext(Context);
  const [abrir, setAbrir] = useState(true);
  const [modal, setModal] = useState(false);

  const [nomea, setNomea] = useState();
  const [emaila, setEmaila] = useState();
  const [cepa, setCepa] = useState();
  const [cidadea, setCidadea] = useState();
  const [estadoa, setEstadoa] = useState();
  const [bairroa, setBairroa] = useState();
  const [telefonea, setTelefonea] = useState('');
  const [dados, setDados] = useState([]);

  var [avatar, setAvatar] = useState('');
  var [image1, setImage1] = useState('');
  var [image2, setImage2] = useState('');
  var [image3, setImage3] = useState('');

  var [caminhoavatar, setCaminhoavatar] = useState('');
  var [caminhoimg1, setCaminhoimg1] = useState('');
  var [caminhoimg2, setCaminhoimg2] = useState('');
  var [caminhoimg3, setCaminhoimg3] = useState('');
  

  const buscarCep = () => {
    fetch(`https://viacep.com.br/ws/${cepa}/json/`).then(res => res.json()).then(data => {
      setDados(data);
      setCidadea(data.localidade);
      setEstadoa(data.uf);
      setBairroa(data.bairro);
    }).catch(error => {
      Alert.alert(
        'Ops, CEP inválido',
        `Preencha corretamente o CEP para atualizar.`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        )
    });
  }

  useEffect(() => {
    Pega();
  }, []);

  async function Pega(){
    if(picture !== ''){await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+picture).getDownloadURL().then(function(url){
      setCaminhoavatar(url);
      })}


    if(img1 !== ''){await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+img1).getDownloadURL().then(function(url){
      setCaminhoimg1(url);
      })}
    
    if(img2 !== ''){await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+img2).getDownloadURL().then(function(url){
    setCaminhoimg2(url);
    })}

    if(img3 !== ''){await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+img3).getDownloadURL().then(function(url){
    setCaminhoimg3(url);
    })}
};

  function mascara(){ 
    if(telefonea.length == 0 & telefonea == ''){
        setTelefonea('+55 (' + telefonea)
        return;
      }
    if(telefonea.length == 7 & telefonea !== ''){
        setTelefonea(telefonea + ') ')
        return;
      }
    }

  async function atualizar(){
    if(nomea !== ''){
      await firebase.database().ref('maker').child(uid).update({
        nome: nomea
      })
      setModal(false);
    };
    if(cepa !== '' & cidadea !== null){
      await firebase.database().ref('maker').child(uid).update({
        cep: cepa,
        cidade: cidadea,
        bairro: bairroa,
        estado: estadoa,
      })
      setModal(false);
    };
    if(cepa !== '' & cidadea == null){
      Alert.alert(
        `Aperte no campo "Atualizar Cidade"`,
        `Preencha seu CEP novamente, e aperte em "Atualizar Cidade" para validarmos seu cep, por favor.`,
        [
          {
            text: 'Ok',
            style: 'cancel'
          }
        ]
        )
    };
    if(telefonea !== '' & telefonea.length == 18){
      await firebase.database().ref('maker').child(uid).update({
        telefone: telefonea
      })
      setModal(false);
    };
    if(telefonea == '' & cepa == '' & nomea == ''){
      Alert.alert(
        `Preencha algum campo para atualizar!`,
        `Você pode atualizar uma, ou mais informações por vez.`,
        [
          {
            text: 'Ok',
            style: 'cancel'
          }
        ]
        )
    };
    if(telefonea.length !== 18 & telefonea !== ''){
      Alert.alert(
        `Ops, telefone inválido...`,
        `Verifique se o DDD ou número estão corretos.`,
        [
          {
            text: 'Ok',
            style: 'cancel'
          }
        ]
        )
    };
    setNomea('');
    setCepa('');
    setCidadea(null);
    setEstadoa(null);
    setBairroa(null);
    setTelefonea('');
    setDados('')
    
    
    dado();
  }

  async function stor(){
    let file = `${uid}` + `${avatar.fileName}`;
    const response = await fetch(avatar.uri);
    // const blob = response.blob();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', avatar.uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref('perfil').child(file);
    const picture = `${uid}` + `${avatar.fileName}`;

    await firebase.database().ref('maker').child(uid).update({
      avatar: picture,
    });
    return ref.put(blob);

  };

  async function stor1(){
    let file = `${uid}` + `${image1.fileName}`;
    const response = await fetch(image1.uri);
    // const blob = response.blob();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image1.uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref('perfil').child(file);
    const file1 = `${uid}` + `${image1.fileName}`;

    await firebase.database().ref('maker').child(uid).update({
      img1: file1,
    });
    return ref.put(blob);
  };

  async function stor2(){
    let file = `${uid}` + `${image2.fileName}`;
    const response = await fetch(image2.uri);
    // const blob = response.blob();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image2.uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref('perfil').child(file);
    const file2 = `${uid}` + `${image2.fileName}`;

    await firebase.database().ref('maker').child(uid).update({
      img2: file2,
    });

    return ref.put(blob);
  };

  async function stor3(){
    let file = `${uid}` + `${image3.fileName}`;
    const response = await fetch(image3.uri);
    // const blob = response.blob();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image3.uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref('perfil').child(file);
    const file3 = `${uid}` + `${image3.fileName}`;

    await firebase.database().ref('maker').child(uid).update({
      img3: file3,
    });

    return ref.put(blob);
  };
  
  function imagePickerCallback(data){
    if(data.didCancel) {
      return;
    }

    if(data.error) {
      return;
    }
    
    if(!data.uri) {
      return;
    }
    setAvatar(data);
  }

  function imagePickerCallback2(data){
    if(data.didCancel) {
      return;
    }

    if(data.error) {
      return;
    }

    if(!data.uri) {
      return;
    }
    setImage1(data);
  }

  function imagePickerCallback3(data){
    if(data.didCancel) {
      return;
    }

    if(data.error) {
      return;
    }

    if(!data.uri) {
      return;
    }
    setImage2(data);
  }

  function imagePickerCallback4(data){
    if(data.didCancel) {
      return;
    }

    if(data.error) {
      return;
    }

    if(!data.uri) {
      return;
    }
    setImage3(data);
  }

  function modale(){
    if(modal == false){
      setModal(true);
      setAbrir(true);
      return;
    }

    if(modal == true){
      setModal(false);
      setNomea('');
      setEmaila('');
      setCepa('');
      setCidadea('');
      setEstadoa('');
      setBairroa('');
      setTelefonea('');
      setDados('');
      return;
    }
  }
  

  function funcabrir(){
    if(abrir == true){
      setAbrir(false);
      return;
    }
    if(abrir == false){
      setAbrir(true);
      return;
    }
    
  }

  return(
  
    <View style={styles.container}>
        
        {/* TELA COMEÇO */}  

      <View style={styles.tela}> 
            <Image 
                source={require('../../../Images/fundo.png')}
                style={{position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover'}}
                />

        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.vtitulo}>

        <TouchableOpacity
        onPress={ () => ImagePicker.showImagePicker({},  imagePickerCallback)}>
          <View style={styles.vfoto}>
            {avatar || caminhoavatar ?
            (
              <Image
              source={{ uri: avatar ? avatar.uri : caminhoavatar }}                         
              style={styles.foto}
              />
            )
            :
            ( 
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: "Roboto-Tiny", fontSize: 16}}>Foto de perfil</Text>
                <Icon name="add-outline" size={25} color='black' />  
              </View>
            )            
            }
          </View>
          </TouchableOpacity>  

            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
              <Text style={styles.titulo}>{ nome }</Text>
            </View>

            <TouchableOpacity 
            onPress={funcabrir}
            style={{width: '100%'}}>

              <View style={{height: 25, backgroundColor: '#8c52ff' ,elevation: 10, borderTopWidth:0.5, borderBottomWidth: 0.5, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                
                {abrir ?
                (<Iconm name="arrow-drop-down" size={45} color='white'/>)
                :
                (<Iconm name="arrow-drop-up" size={45} color='white'/>)
                
                }
              </View>
          
            </TouchableOpacity>

            {abrir ?
            (null)
            :
            (
            <View style={{alignItems: 'center'}}>
              <Text style={{textAlign: 'center', marginVertical: 10, fontSize: 22, fontFamily: "Roboto-Tiny",}}>Informações</Text>

               
                <Text style={{marginBottom: 5, fontSize:18, fontFamily: "Roboto-Light",}}>{email}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{telefone}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{cep}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{bairro}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{cidade} - {estado}</Text>

              
             <TouchableOpacity 
            onPress={modale}
            style={styles.btnatualizar}>

            <Text style={{color: 'white', fontSize: 18, fontFamily: "Roboto-Light",}}>Atualizar Informações</Text>
            
            </TouchableOpacity> 

            </View>
            )
            }
        
        </View>  

        {/* TITULO COMEÇO */}
          <View style={styles.vimagens}>

            <Text style={styles.txtimagem}>Escolha 3 imagens de trabalhos que você ja fez!</Text>
          
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            
            <TouchableOpacity 
            onPress={ () => ImagePicker.showImagePicker({},  imagePickerCallback2)}
            style={{flex: 1}}>
              {image1 || caminhoimg1 ?
              (
                <View style={styles.vfotos}>
                  <Image
                source={{ uri: image1 ? image1.uri : caminhoimg1}}                         
                style={styles.images}
                />
              </View>
              )
              :
              (<View style={styles.vfotos}>
                <Icon name="add-outline" size={45} color='black' />  
              </View>)
              }
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={ () => ImagePicker.showImagePicker({},  imagePickerCallback3)}
            style={{flex: 1}}>
            {image2 || caminhoimg2 ?
              (
                <View style={styles.vfotos}>
                  <Image
                source={{ uri: image2 ? image2.uri : caminhoimg2}}                         
                style={styles.images}
                />
              </View>
              )
            :
            (<View style={styles.vfotos}>
              <Icon name="add-outline" size={45} color='black' />  
            </View>)
            }
          </TouchableOpacity>

            <TouchableOpacity 
            onPress={ () => ImagePicker.showImagePicker({},  imagePickerCallback4)}
            style={{flex: 1}}>
            {image3 || caminhoimg3 ?
            (
              <View style={styles.vfotos}>
                <Image
              source={{ uri: image3 ? image3.uri : caminhoimg3}}                         
              style={styles.images}
              />
            </View>
            )
            :
            (<View style={styles.vfotos}>
              <Icon name="add-outline" size={45} color='black' />  
            </View>)
            }
          </TouchableOpacity>

          </View>

          <View style={styles.vaplicar}>
            <TouchableOpacity 
            onPress={() => { stor(); stor1(); stor2(); stor3(); 
              Alert.alert(
                `Imagens salvas com sucesso!`,
                `Suas fotos estão atualizadas :)`,
                [
                  {
                    text: 'Ok',
                    style: 'cancel'
                  }
                ]
                )
            }}
            style={styles.btnaplicar}>

            <Text style={{color: 'white', fontSize: 18, fontFamily: "Roboto-Light"}}>Salvar Imagens</Text>
            <Icon name="save-outline" size={20} color='white' style={{marginHorizontal: 10}} />   
            
            </TouchableOpacity>

          </View>
      

            <TouchableOpacity style={styles.btnsair} onPress={ () => Limpar() }>
              <View style={styles.vsair}>
              
                <Icon name = "log-out-outline" size={40} color='black' style={{marginLeft: 5}} />     
                <Text style={{fontSize: 16, marginHorizontal: 5, fontFamily: "Roboto-Light"}}>Sair</Text>
              
              </View>
            </TouchableOpacity>

          <Text style={{textAlign: 'center', marginBottom: 10, fontFamily: "Roboto-Light"}}>Tem alguma sugestão? Fale conosco: ouvidoria.makers@gmail.com</Text>

        </ScrollView>


      </View>
      {/* TELA FIM */} 
      <Modal animationType="slide" visible={modal}>

      <Image 
                source={require('../../../Images/fundo.png')}
                style={styles.header}
            />

        <View style={styles.vcadastro}>
        <Text style={{fontSize: 20, fontFamily: 'Roboto-Light', textAlign: 'center'}}>Você pode atualizar 1 ou mais informações :)</Text>      
         
          <TextInput 
          placeholder={'Atualizar Nome'}
          style={styles.inpt}
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setNomea(texto)}
          value={nomea}
          />

          <TextInput 
          placeholder={'Atualizar Cep'}
          style={styles.inpt}
          keyboardType={'numeric'}     
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setCepa(texto)}
          value={cepa}
          />

          <TextInput 
          placeholder={'Atualizar Cidade'}
          style={styles.inpt}    
          underlineColorAndroid='transparent'
          onChangeText={(texto) => setCidadea(texto)}
          value={dados.localidade}
          onFocus={buscarCep}
          />

          <TextInput 
          placeholder={'Atualizar Telefone'}
          style={styles.inpt}
          keyboardType={'phone-pad'}        
          underlineColorAndroid='transparent'
          onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace' & telefonea.length == 7) {
            setTelefonea('');
          }
          }}
          onChangeText={(texto) => setTelefonea(texto) & mascara()}
          onFocus={mascara}
          value={telefonea}
          />      
          </View>

          <View style={{justifyContent: 'flex-end', flex: 1}}>
          <View style={styles.vbtn}>

            <TouchableOpacity 
            style={styles.btn}
            onPress={modale}
            >
              <Text style={styles.txtbtn}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.btn}
            onPress={atualizar}
            >
              {/* {
                    loadingAuth ? 
                    (
                      <ActivityIndicator size={20} color="#FFF" />
                    ) 
                    : */}
              <Text style={styles.txtbtn}>
                Salvar
              </Text>
              {/* } */}
            </TouchableOpacity>
            
          </View>
          </View>

        
      </Modal>

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
      alignItems: 'center',
    },
    header:{
      position: 'absolute'
    },
    vtitulo:{
      alignItems: 'center',
      marginTop: 0
    },
    vimagens:{
      alignItems: 'center',
      marginTop: 20,
      borderTopWidth: 0.8
    },
    titulo:{
      fontSize: 24,
      fontFamily: "Roboto-Tiny",
      textAlign: 'center'
    },
    txtimagem:{
      fontSize: 20,
      fontFamily: "Roboto-Tiny",
      marginTop: 10,
      textAlign: 'center',
      margin: 10
    },
    stars:{
      fontSize: 25,
      textAlign: 'center',
      marginTop: 35,
      fontWeight: 'bold'
    },
    txtpefil:{
      fontSize: 20,
      margin: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 5,
      borderRadius: 5,
    },
    txtdados:{
      textAlign: 'center'
    },
    valinha:{
      flexDirection: 'row',
      alignItems: 'center'
    },
    vaplicar:{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 10
    },
    vsair:{
      borderWidth: 0.5,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    btnaplicar:{
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 5,
      borderRadius: 12,
      elevation: 5,
      padding: 10,
      width: '55%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#8c52ff',
      marginTop: 20,
      flexDirection: 'row'
    },
    btnatualizar:{
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 5,
      borderRadius: 12,
      elevation: 5,
      padding: 10,
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#8c52ff',
      marginTop: 20,
    },
    btnsair:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0
    },
    vfoto:{
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 60,
      height: 120,
      width: 120,
      borderWidth: 1,
      elevation: 9,
      marginBottom: 5,
      marginTop: 20
    },
    vfotos:{
      height: 150,
      marginHorizontal: 3,
      borderWidth: 0.8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    foto:{
      height: '100%',
      width: '100%',
      borderRadius: 60,
  
    },
    vatualizarperfil:{
      flex: 1,
      alignItems: 'center',
      marginTop: 40,
      borderWidth: 0.5,
      elevation: 5,
      width: '90%',
      backgroundColor: 'black',
      padding: 8,
      borderRadius: 5
    },
    vcadastro:{
      justifyContent: 'flex-start',
      margin: 20,
      marginTop: 10,
    },
    inpt:{
      fontSize: 20,
      borderWidth: 0,
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
      elevation: 2,
      fontFamily: "Roboto-Light"
    },
    vbtn:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 20,        
    },
    btn:{
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 5,
      borderRadius: 12,
      padding: 10,
      alignItems: 'center',
      backgroundColor: '#8c52ff',
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#8c52ff',
      width: 150,
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
    },
    txtbtn:{
      color: 'white',
      fontSize: 18, 
      fontFamily: "Roboto-Light"
    },
    images:{
      width: '100%',
      height: '100%'
    }
});


