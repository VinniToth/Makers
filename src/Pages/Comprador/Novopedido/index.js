import React, {useState, useContext, useEffect} from 'react';
import {StatusBar, KeyboardAvoidingView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../firebaseConnection';
import Iconm from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-picker';

import Picker from '../Picker';
import Pickerr from '../Pikerr';
import {AuthContext} from '../../../contexts/auth';
import { Context } from '../../Maker/Pedidos/Contextpedido';

console.disableYellowBox = true;
export default function Novopedido(){

  const { userc } = useContext(AuthContext);
    const { dadoc, nome, estado, cep, cidade, bairro, email, telefone, picture } = useContext(Context);

    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [categoria, setCategoria] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [errot, setErrot] = useState(false);
    const [errod, setErrod] = useState(false);
    const [erroa, setErroa] = useState(false);
    const [errop, setErrop] = useState(false);
    const [erroc, setErroc] = useState(false);

    useEffect(() => {
      dadoc();
    }, []);

    async function stor(){
      let file = `${userc.uid}` + `${avatar.fileName}`;
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
      const ref = firebase.storage().ref('imagens').child(file);
      return ref.put(blob);
    };

    async function cadastrar()
{
    if(desc !== '' & title !== '' & avatar !== null)
    {
          let uid = userc.uid;
          let chave = await firebase.database().ref('pedido').push().key;
          let file = `${uid}` + `${avatar.fileName}`;
          
        // inserindo no nó pedido
          await firebase.database().ref('pedido').child(chave).set({
          titulo: title,
          descricao: desc,
          categoria: categoria,
          periodo: periodo,
          telefone: userc.telefone,
          usuario: userc.nome,
          cidade: userc.cidade,
          cep: userc.cep,
          estado: userc.estado,
          iduser: uid,
          flag: 0,
          nomem1: '',
          nomem2: '',
          nomem3: '',
          imagem: file,
          avatarm1: '',
          img1m1: '',
          img2m1: '',
          img3m1: '',
          avatarm2: '',
          img1m2: '',
          img2m2: '',
          img3m2: '',
          avatarm3: '',
          img1m3: '',
          img2m3: '',
          img3m3: '',


        });

        stor();        

        Alert.alert(
          `Pedido efetuado com sucesso!`,
          `Em breve os Makers entrarão em contato via WhatsApp: ${telefone}. Você pode acompanhar quem abriu seu pedido, na aba "Pedidos"`,
          [
            {
              text: 'Ok',
              style: 'cancel',          
            }
          ]
          )
        setErroa(false);
        setErrot(false);
        setErrod(false);
        setDesc(null);
        setTitle(null);
        setAvatar(null);
        setCategoria(null);
        setPeriodo(null);
        Keyboard.dismiss();

        return;
        
    };
    if(desc == '' || title == '' || avatar == null || periodo == '' || categoria == '' ){
      console.log(categoria, periodo);
      Alert.alert(
        `Ops, faltou preencher algum campo`,
        `Preencha todos os campos para concluir seu pedido :)`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        );
    }
    if(desc == ''){
      setErrod(true);
    }
    if(avatar == null){
      setErroa(true);
    }
    if(title == ''){
      setErrot(true);
    }
    if(periodo == ''){
      setErrop(true);
    }
    if(categoria == ''){
      setErroc(true);
    }
   else('')
}

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
    setErroa(false);
    setAvatar(data);
  }

    return(
        
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />

                    <Image 
                        source={require('../../../Images/fundo.png')}
                        style={{position: 'absolute'}}                        
                        />
                    <View style={{alignItems: 'center'}}>
                        <Iconm name="star" size={125} color='#FFB600' style={{position: 'absolute', marginTop: 0}} /> 
                    </View>

                {/* TITULO COMEÇO */}
                <View style={styles.vtitulo}>
                    <Text style={styles.titulo}>Encomendar Pedido</Text>
                </View>   
                {/* TITULO FIM */}

               
                {/* <View style={{flex: 1, margin: 15}}> */}
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 15, }}
                    >
                    <View style={styles.vpedido}>

                      <View style={{alignItems: 'center'}}>

                        {erroa ?
                        (<View style={styles.vfotoerro}>

                          <Image
                          source={{ uri: avatar ? avatar.uri : '' }}                         
                          style={styles.foto}
                          />

                        </View>)
                        :
                        (<View style={styles.vfoto}>

                          <Image
                          source={{ uri: avatar ? avatar.uri : '' }}                         
                          style={styles.foto}
                          />

                        </View>)
                        }
                        

                        <TouchableOpacity 
                        style={{marginTop: 5, padding: 6, backgroundColor: '#8c52ff', elevation: 4, borderRadius: 8}}
                        onPress={ () => ImagePicker.showImagePicker({},  imagePickerCallback)}
                        >
                          <Text style={{fontSize: 17, fontFamily: "Roboto-Tiny", color: 'white'}}>Inserir imagem de exemplo</Text>
                        </TouchableOpacity>

                      </View>  


                        <Text style={styles.txtped}>Pedido:</Text>
                        {errot ?
                        (<TextInput 
                          placeholder={'Titulo do seu pedido'}
                          style={styles.titleinputerro}
                          underlineColorAndroid='transparent'
                          onChangeText={(texto) => setTitle(texto) & setErrot(false)}
                          value={title}
                          returnKeyType="next"
                          // onFocus={setErrot(false)} 
                          />) 
                        :
                        (<TextInput 
                          placeholder={'Titulo do seu pedido'}
                          style={styles.titleinput}
                          underlineColorAndroid='transparent'
                          onChangeText={(texto) => setTitle(texto)}
                          value={title}
                          returnKeyType="next" 
                        />)
                        }
                        
                        
                        <Text style={styles.txtped}>Categoria:</Text>
                        
                        <Picker
                        onChance={setCategoria}
                        />
                        

                        <Text style={styles.txtped}>Periodo de urgencia:</Text>
                        <Pickerr
                        onChance={setPeriodo}
                        value={periodo}
                        />



                        <Text style={styles.txtped}>Descrição detalhada:</Text>
                        {errod ?
                        (<TextInput 
                          placeholder={"(Máximo 200 caracteres)"}
                          multiline={true}
                          style={styles.inpterro}
                          underlineColorAndroid='transparent'
                          onChangeText={(texto) => setDesc(texto) & setErrod(false)}
                          value={desc}        
                          returnKeyType="next" 
                          onSubmitEditing={ () => Keyboard.dismiss() }                          
                          />)
                        :
                        (<TextInput 
                          placeholder={"(Máximo 200 caracteres)"}
                          multiline={true}
                          style={styles.inpt}
                          underlineColorAndroid='transparent'
                          onChangeText={(texto) => setDesc(texto)}
                          value={desc}        
                          returnKeyType= 'default' 
                          onSubmitEditing={ () => Keyboard.dismiss() }
                          />)
                        }
                        
                    </View>

                    {/* BOTÃO COMEÇO */}
                    <View style={styles.vbtn}>
                        <TouchableOpacity 
                        style={styles.btn}
                        onPress={cadastrar}
                        >
                            <Text style={styles.txtbtn}>
                                Concluir
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* BOTÃO FIM */}
                    </ScrollView>
            {/* </View> */}
            
         
            

                
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffffff',
        marginTop: 0,
         
    },
      vtitulo:{
        marginTop: 120,
        alignItems: 'center'
      },
      titulo:{
        fontSize: 24,
        fontFamily: "Roboto-Light", 
      },
      vfoto:{
        marginTop: 20,
        borderWidth: 0.5,
        width: '100%',
        height: 250,
        justifyContent: 'center',

      },
      vfotoerro:{
        marginTop: 20,
        borderWidth: 0.8,
        width: '100%',
        height: 250,
        justifyContent: 'center',
        borderColor: 'red'
      },
      foto:{
        width: '100%',
        height: 250,
      },
      vdesc:{
        marginTop: 30,
        margin: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        marginBottom: 9,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        borderRadius: 5,
        elevation: 3
      },
      desc:{
        fontSize: 15,
        fontFamily: "FredokaOne-Regular", 
        textAlign: 'center',
        color: 'red'
      },
      titleped:{
        fontSize: 20,
        marginTop: 5
      },
      titleinput:{
        fontFamily: "Roboto-Light", 
        fontSize: 17,
        padding: 7,
        elevation: 2,
        borderRadius: 2,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 0.2
      },
      titleinputerro:{
        fontFamily: "Roboto-Light", 
        fontSize: 17,
        padding: 7,
        elevation: 2,
        borderRadius: 2,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 0.8,
        borderColor: 'red',
      },
      inpt:{
        fontSize: 17,
        height: 150,
        textAlignVertical: 'top',
        marginBottom: 20,
        borderRadius: 2,
        padding: 7,
        elevation: 2,
        fontFamily: "Roboto-Light", 
        backgroundColor: 'white',
        borderWidth: 0.2
      },
      inpterro:{
        fontFamily: "Roboto-Light", 
        fontSize: 17,
        height: 150,
        textAlignVertical: 'top',
        marginBottom: 20,
        borderRadius: 2,
        padding: 7,
        elevation: 2,
        borderColor: 'red',
        borderWidth: 0.8,
        backgroundColor: 'white'
      },
      vpedido:{
        marginTop: 10,
        width: '100%',
      },
      txtped:{
        fontSize: 18,
        marginTop: 20,
        fontFamily: "Roboto-Tiny", 
      },
      vbtn:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      btn:{
        backgroundColor: '#8c52ff',
        padding: 8,
        borderRadius: 12,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        marginBottom: 10
        
          
      },
      txtbtn:{
        color: 'white',
        fontSize: 20,
        fontFamily: "Roboto-Light", 
      },
      
      
});
