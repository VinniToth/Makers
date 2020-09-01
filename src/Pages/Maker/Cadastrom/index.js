import React, {useState, useEffect, useContext} from 'react';
import {Keyboard, ActivityIndicator, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {AuthContext} from '../../../contexts/auth';

export default function Cadastrom(){
  // States de cadastro
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [dados, setDados] = useState([]);

  const [exibir, setExibir] = useState(true);
  const [erronome, setErronome] = useState(false);
  const [erroemail, setErroemail] = useState(false);
  const [errocep, setErrocep] = useState(false);
  const [errocidade, setErrocidade] = useState(false);
  const [erroestado, setErroestado] = useState(false);
  const [errobairro, setErrobairro] = useState(false);
  const [errotelefone, setErrotelefone] = useState(false);
  const [erropassword, setErropassword] = useState(false);

  const [title, setTitle] = useState(false);

  const { signUpm, loadingAuth } = useContext(AuthContext);

    const buscarCep = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setDados(data);
      setCidade(data.localidade);
      setEstado(data.uf);
      setBairro(data.bairro);
      setErrocep(false);
      setErrocidade(false);
      setErroestado(false);
      setErrobairro(false);
    }).catch(error => {
      Alert.alert(
        'Ops, CEP inválido',
        `Preencha corretamente o CEP para concluirmos seu cadastro.`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        )
      setErrocep(true);
      setErrocidade(true);
      setErroestado(true);
      setErrobairro(true);
    });
  }

  function cadastrar(){
    if(nome !== '' & email !== '' & password !== '' & cep !== '' & telefone !== '' & telefone.length == 18){
    signUpm(email, password, nome, cep, cidade, estado, bairro, telefone);
    }
    if(telefone.length !== 18 & telefone !== ''){
      Alert.alert(
        'Ops, número telefonico invalido',
        `Verifique se o DDD ou número estão corretos! O número precisa estar relacionado á um WhatsApp.`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        )
      setErrotelefone(true);
    }
    if(telefone.length == 18 & telefone !== ''){
      setErrotelefone(false);
    }
    if(cep == ''){
      setErrocep(true);
      setErrocidade(true);
      setErroestado(true);
      setErrobairro(true);
    }
    if(cep !== ''){
      setErrocep(false);
      setErrocidade(false);
      setErroestado(false);
      setErrobairro(false);
    }
    if(telefone == ''){
      setErrotelefone(true);
    }
  }

  function voltar(){
    navigation.navigate('Perfil')
  }
  
  function escondertitle(){
    if(title == false){
      setTitle(true)
    }
  }

  function mostrartitle(){
    if(title == true){
      setTitle(false)
    }
  }

  function mostrar(){
    if(exibir == true & nome !== '' & email !== '' & password !== '' & password.length >= 6){
      setExibir(false);
      setErronome(false);
      setErroemail(false);
      setErropassword(false);
      Keyboard.dismiss();
    }  
    if(nome == ''){
      setErronome(true);
    }
    if(email == ''){
      setErroemail(true);
    }
    if(password == ''){
      setErropassword(true);
    }
    if(nome !== ''){
      setErronome(false);
    }
    if(email !== ''){
      setErroemail(false);
    }
    if(password !== ''){
      setErropassword(false);
    }
    if(password.length < 6 & password !== ''){
      setErropassword(true);
      Alert.alert(
        'Ops, senha inválida',
        `Sua senha deve conter no mínimo 6 caracteres.`,
        [
          {
            text: 'Ok',
            style: 'cancel',          
          }
        ]
        )
    }
    if(exibir == false){
      setExibir(true);
      Keyboard.dismiss();
    }
  };

  function mascara(){ 
    if(telefone.length == 0 & telefone == ''){
        setTelefone('+55 (' + telefone)
        return;
      }
    if(telefone.length == 7 & telefone !== ''){
        setTelefone(telefone + ') ')
        return;
      }
    }


  

    return(
      <View style={styles.container}>
        
        {/* TELA COMEÇO */}  
        <View style={styles.tela}> 
        
          <Image source={require('../../../Images/fundo-padrao.png')} style={{position: 'absolute'}} />


          <View style={styles.vcadastro}>
              {title ?
              (null)
              :
              (<View>
                <Text style={styles.titulo}>Maker</Text>
              </View>)
              }
              
            {exibir ?
            (
            <View>
              {erronome ?
              (
                <TextInput 
                placeholder={'Nome'}
                style={styles.inpterro}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setNome(texto)}
                returnKeyType="next" 
                onFocus={escondertitle}
                onSubmitEditing={ () => Keyboard.dismiss() }  
                value={nome}
                />)
              :
              (<TextInput 
                placeholder={'Nome'}
                style={styles.inpt}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setNome(texto)}
                returnKeyType="next" 
                onFocus={escondertitle}
                onSubmitEditing={ () => Keyboard.dismiss() }  
                value={nome}
                />)
              }

              {erroemail ?
              (
                <TextInput 
                placeholder={'E-mail'}
                style={styles.inpterro}        
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setEmail(texto)}
                returnKeyType="next" 
                onFocus={escondertitle}  
                onSubmitEditing={ () => Keyboard.dismiss() }
                value={email}
                />)
              :
              (
                <TextInput 
                placeholder={'E-mail'}
                style={styles.inpt}        
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setEmail(texto)}
                returnKeyType="next" 
                onFocus={escondertitle}     
                onSubmitEditing={ () => Keyboard.dismiss() }
                value={email}
                />)
              }  
              
              {erropassword ?
              (
                <TextInput 
                placeholder={'Crie uma senha'}
                style={styles.inpterro}  
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setPassword(texto)}
                value={password}
                onFocus={escondertitle}   
                onSubmitEditing={ () => Keyboard.dismiss() }
                secureTextEntry={true}
                />)
              :
              (<TextInput 
                placeholder={'Crie uma senha'}
                style={styles.inpt}  
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setPassword(texto)}
                value={password}
                onFocus={escondertitle}   
                onSubmitEditing={ () => Keyboard.dismiss() }
                secureTextEntry={true}
                />)
              }
              

              <View style={styles.vbtn}>

              <TouchableOpacity 
              style={styles.btn}
              onPress={voltar}
              >
                <Text style={styles.txtbtn}>
                  Voltar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={styles.btn}
              onPress={mostrar}
              >
                <Text style={styles.txtbtn}>
                  Avançar
                </Text>

              </TouchableOpacity>

              </View>
            </View>)
            :
            (
              <View>
              
              {errotelefone ?
              (
                <TextInput 
                placeholder={'Telefone'}
                style={styles.inpterro}
                keyboardType={'phone-pad'}        
                underlineColorAndroid='transparent'
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' & telefone.length == 7) {
                    setTelefone('');
                  }
                  }}
                onChangeText={(texto) => setTelefone(texto) & mascara() & setErrotelefone(false)}
                onFocus={() => {mascara(); escondertitle();}}
                value={telefone}
                />)
              :
              (<TextInput 
                placeholder={'Telefone'}
                style={styles.inpt}
                keyboardType={'phone-pad'}        
                underlineColorAndroid='transparent'
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' & telefone.length == 7) {
                    setTelefone('');
                  }
                  }}
                onChangeText={(texto) => setTelefone(texto) & mascara()}
                onFocus={() => {mascara(); escondertitle();}}
                value={telefone}
                />)
              }
              
              {errocep ?
              (
                <TextInput 
                placeholder={'Cep'}
                style={styles.inpterro}
                keyboardType={'numeric'}     
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setCep(texto)}
                onFocus={escondertitle}
                value={cep}
                />)
              :
              (<TextInput 
                placeholder={'Cep'}
                style={styles.inpt}
                keyboardType={'numeric'}     
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setCep(texto)}
                onFocus={escondertitle}
                value={cep}
                />)
              }
              
              {errocidade?
              (
                <TextInput 
                placeholder={'Cidade'}
                style={styles.inpterro}    
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setCidade(texto)}
                value={dados.localidade}
                onFocus={() => {buscarCep(); escondertitle();}}
                />)
              :
              (<TextInput 
                placeholder={'Cidade'}
                style={styles.inpt}    
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setCidade(texto)}
                value={dados.localidade}
                onFocus={() => {buscarCep(); escondertitle();}}
                />)
              }
              
              {erroestado?
              (
                <TextInput 
                placeholder={'Estado'}
                style={styles.inpterro}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setEstado(texto)}         
                value={dados.uf}
                />)
              :
              (<TextInput 
                placeholder={'Estado'}
                style={styles.inpt}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setEstado(texto)}         
                value={dados.uf}
                />)
              }
              
              {errobairro ?
              (
                <TextInput 
                placeholder={'Bairro'}
                style={styles.inpterro}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setBairro(texto)}         
                value={dados.bairro}
                />)
              :
              (<TextInput 
                placeholder={'Bairro'}
                style={styles.inpt}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setBairro(texto)}         
                value={dados.bairro}
                />)
              }
              

              <View style={styles.vbtn}>

              <TouchableOpacity 
              style={styles.btn}
              onPress={() => {mostrar(); mostrartitle();}}
              >
                <Text style={styles.txtbtn}>
                  Voltar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={styles.btn}
              onPress={cadastrar}
              >
                {
                      loadingAuth ? 
                      (
                        <ActivityIndicator size={20} color="#FFF" />
                      ) 
                      :
                <Text style={styles.txtbtn}>
                  Cadastrar
                </Text>
                }
              </TouchableOpacity>

              </View>  
    
              </View>)
            }
            

            </View>
 
        {/* CADASTRO FIM */}

        </View>
        {/* TELA FIM */}

      </View>
     
    );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ffffff',
  },
  tela:{
    backgroundColor: 'white',    
    flex: 1,
  },
  titulo:{
    fontSize: 30,
    fontFamily: "Roboto-Light",
    textAlign: 'center',
    marginBottom: 30
  },
  vcadastro:{
    justifyContent: 'center',
    flex: 1,
    margin: 20,
  },
  inpt:{
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    elevation: 2,
    fontFamily: "Roboto-Light", 
    
  },
  inpterro:{
    fontSize: 20,
    borderWidth: 0.7,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    elevation: 2,
    fontFamily: "Roboto-Light", 
  },
  txtcad:{
    fontSize: 20,
    marginTop: 5
  },
  vbtn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn:{
    backgroundColor: '#8c52ff',
    padding: 10,
    borderRadius: 12,
    width: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  txtbtn:{
    color: 'white',
    fontSize: 20,
    fontFamily: "Roboto-Light", 
  },
  desc:{
    fontSize: 15,
    fontWeight: 'bold'
  }
});
