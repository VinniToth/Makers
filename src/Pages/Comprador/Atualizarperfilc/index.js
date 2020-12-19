import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConnection';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import ImagePicker from 'react-native-image-picker';

import {AuthContext} from '../../../contexts/auth';
import { Context } from '../../Maker/Pedidos/Contextpedido';

export default function Atualizarperfilc(){

  const { userc, signOutc } = useContext(AuthContext);
  const { dadoc, nome, estado, cep, cidade, bairro, email, telefone, picture, uid } = useContext(Context);

  var [avatar, setAvatar] = useState('');
  var [caminhoavatar, setCaminhoavatar] = useState('');
  const [modal, setModal] = useState(false);

  const [nomea, setNomea] = useState();
  const [emaila, setEmaila] = useState();
  const [cepa, setCepa] = useState();
  const [cidadea, setCidadea] = useState();
  const [estadoa, setEstadoa] = useState();
  const [bairroa, setBairroa] = useState();
  const [telefonea, setTelefonea] = useState('');
  const [dados, setDados] = useState([]);

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

  function modale(){
    if(modal == false){
      setModal(true);
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

  async function atualizar(){
    if(nomea !== ''){
      await firebase.database().ref('comprador').child(uid).update({
        nome: nomea
      })
      setModal(false);
    };
    if(cepa !== '' & cidadea !== null){
      await firebase.database().ref('comprador').child(uid).update({
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
      await firebase.database().ref('comprador').child(uid).update({
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
    
    
    dadoc();
  }


  useEffect(() => {
    dadoc();
    Pega();
  }, []);

  async function Pega(){
    await firebase.storage().refFromURL('gs://bdmakers-6a253.appspot.com/perfil/'+picture).getDownloadURL().then(function(url){
      setCaminhoavatar(url);
      })
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

    if(picture != ''){
    await firebase.database().ref('comprador').child(uid).update({
      avatar: picture,
    });}
    return ref.put(blob);

  };

  return(
  
    <View style={styles.container}>

        {/* TELA COMEÇO */}  
      <View style={styles.tela}> 
      <ScrollView showsVerticalScrollIndicator={false}>
            
            <Image 
                source={require('../../../Images/fundo.png')}
                style={{position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover'}}
                />

          <View style={styles.vtitulo}>

            <TouchableOpacity
            onPress={ () => ImagePicker.showImagePicker({
              title: 'Selecione uma foto de perfil',
              cancelButtonTitle: 'Cancelar',
              takePhotoButtonTitle: 'Usar camera',        
              chooseFromLibraryButtonTitle: 'Escolher na galeria',
            },  imagePickerCallback)}>
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

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.titulo}>{ nome }</Text>
              </View>
          </View>

            <View style={{backgroundColor: 'black', width: '100%', height: 1, marginVertical: 2}}>

            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={{marginTop: 5,textAlign: 'center', marginVertical: 10, fontSize: 22, fontFamily: "Roboto-Tiny"}}>Informações</Text>

               
                <Text style={{marginBottom: 5, fontSize:18, fontFamily: "Roboto-Light", }}>{email}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{telefone}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{cep}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{bairro}</Text>
                <Text style={{marginBottom: 5, fontSize: 18, fontFamily: "Roboto-Light",}}>{cidade} - {estado}</Text>
                
              
             <TouchableOpacity 
            onPress={modale}
            style={styles.btnaplicar}>

            <Text style={{color: 'white', fontSize: 18, fontFamily: "Roboto-Light",}}>Atualizar Informações</Text>
            
            </TouchableOpacity> 

            </View>

            <View style={styles.vaplicar}>
              <TouchableOpacity 
              onPress={() => { stor(); 
                Alert.alert(
                  `Imagem salva com sucesso!`,
                  `Sua foto de perfil foi atualizada :)`,
                  [
                    {
                      text: 'Ok',
                      style: 'cancel'
                    }
                  ]
                  ) 
              }}
              style={styles.btnaplicar}>

              <Text style={{color: 'white', fontSize: 18, fontFamily: "Roboto-Light"}}>Salvar Imagem</Text>
              <Icon name="save-outline" size={20} color='white' style={{marginHorizontal: 10}} />   
              
              </TouchableOpacity>

            </View>

          <View style={styles.vsair}>
            <TouchableOpacity style={styles.btnsair} onPress={ () => signOutc() }>

            <Icon name = "log-out-outline" size={40} color='black' style={{marginLeft: 5}} />     
                <Text style={{fontSize: 16, marginHorizontal: 5, fontFamily: "Roboto-Light"}}>Sair</Text>
            
            </TouchableOpacity>
          </View>

          

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
    header:{
      position: 'absolute'
    },
    tela:{
      backgroundColor: 'white',    
      flex: 1,
    },
      vtitulo:{
        alignItems: 'center'
      },
      titulo:{
        fontSize: 24,
        fontFamily: "Roboto-Tiny", 
        textAlign: 'center'
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
      foto:{
        height: '100%',
        width: '100%',
        borderRadius: 60,
    
      },
      vperfil:{
        justifyContent: 'flex-start',
        marginTop: 40,
        margin: 10
      },
      txtpefil:{
        fontSize: 20,
        margin: 10,
        borderBottomWidth: 1,
        borderRadius: 5,
      },
      vsair:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
      },
      btnsair:{
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
        width: '60%',
        alignItems: 'center',
        backgroundColor: '#8c52ff',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      vaplicar:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        marginBottom: 20
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
      vcadastro:{
        justifyContent: 'flex-start',
        margin: 20,
        marginTop: 10,
      },
});
