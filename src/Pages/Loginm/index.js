import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TextInput, 
        TouchableOpacity, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {AuthContext} from '../../contexts/auth';

export default function Loginm() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signInm, loadingAuth} = useContext(AuthContext);


  function cadastrar(){
    navigation.navigate('Perfil');
  }

  function avancar(){
    signInm(email, password)
  }

    return(

      //View de fundo
          
          <View style={styles.container}> 

            <View style={styles.tela}>
        

                  <Image 
                  source={require('../../Images/fundo.png')}
                  style={{position: 'absolute'}}
                  />



              <View style={styles.vlog}>
                <Text style={styles.titulo}>Maker</Text>
                    <TextInput 
                    placeholder={'Email'}
                    style={styles.inpt}
                    underlineColorAndroid='transparent'
                    onChangeText={(texto) => setEmail(texto)}
                    />

                    
                    <TextInput 
                    placeholder={'Senha'}
                    style={styles.inpt}      
                    underlineColorAndroid='transparent'
                    onChangeText={(texto) => setPassword(texto)}
                    secureTextEntry={true}
                    />
                    <TouchableOpacity
                    onPress={avancar}
                    style={styles.botao}
                    >
                    {
                        loadingAuth ? 
                        (
                          <ActivityIndicator size={20} color="#FFF" />
                        ) 
                        :
                          <Text style={styles.txtbotao}>
                          Acessar
                          </Text>
                      }
                    
                    </TouchableOpacity>
                    <View style={styles.vcad}>
                    <TouchableOpacity
                    onPress={cadastrar}
                    >
                    <Text style={styles.cad}>Ainda não é cadastrado?</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                    

            </View>

        </View>
         
    );

}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      marginTop: 0,
      backgroundColor: 'white',  
    },
    tela:{
      flex: 1, 
      alignItems: 'center',
    },
    textoprincipal:{
      fontSize: 35,
      marginTop: 90,
      textAlign: 'center'
    },
    botao:{
      alignItems: "center",
      backgroundColor: "#8c52ff",
      padding: 10,
      width: 350,
      borderRadius: 5,
      elevation: 8,
      marginTop: 20
    
    },
    txtbotao:{
      fontSize: 20,
      fontFamily: "Roboto-Light",
      color: 'white'  
    },
    inpt:{
        fontSize: 20,
        fontFamily: "Roboto-Light",
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 350,
        elevation: 2
    },
    txtcad:{
        fontSize: 20,
    },
    vlog:{
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cad:{
        fontSize: 22,
        fontFamily: "Roboto-Light",
    },
    vcad:{
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    keyboard:{
        flex: 1
    },
    titulo:{
      fontSize: 30,
      fontFamily: "Roboto-Tiny",
      marginTop: 150,
      marginBottom: 20
    }
});