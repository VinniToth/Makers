import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import firebase, { setLogLevel } from 'firebase'
require('firebase/auth');
import AsycStorage from '@react-native-community/async-storage';


export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [userc, setUserc] = useState(null);
    const [userm, setUserm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [log ,setLog] = useState(null);
    
    // Loading para AsycStorage MAKER
    useEffect(() => {
        async function loadStoragem(){
            const storageUserm = await AsycStorage.getItem('Auth_userm');
            const storageUserc = await AsycStorage.getItem('Auth_userc');

            if(storageUserm){
                setUserm(JSON.parse(storageUserm));
                setLoading(false);
            }
    
            setLoading(false);

            if(storageUserc){
                setUserc(JSON.parse(storageUserc));
                setLoading(false);
            }
    
            setLoading(false);
    
        }
        loadStoragem();
    }, []);
    

    // Função para logar user Comprador
    async function signIn(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('comprador').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid:uid,
                    nome: snapshot.val().nome,
                    email: value.user.email,
                    telefone: snapshot.val().telefone,
                    cidade: snapshot.val().cidade,
                    cep: snapshot.val().cep,
                    estado: snapshot.val().estado,
                    bairro: snapshot.val().bairro,
                    picture: snapshot.val().avatar

                };

                setUserc(data);
                storageUserc(data);
                setLoadingAuth(false);
            })
        })
        .catch((error) =>{
            Alert.alert(
                'Ops! email/senha inválidos',
                `Verifique se o email/senha utilizados são validos`,
                [
                  {
                    text: 'Ok',
                    style: 'cancel',          
                  }
                ]
                )
            setLoadingAuth(false);
        });
    }

    // Função para logar user MAKER
    async function signInm(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('maker').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid:uid,
                    nome: snapshot.val().nome,
                    email: value.user.email,
                    stars: snapshot.val().stars,
                    telefone: snapshot.val().telefone,
                    cidade: snapshot.val().cidade,
                    cep: snapshot.val().cep,
                    estado: snapshot.val().estado,
                    
                    
                    
                                       

                }

                setUserm(data);
                storageUserm(data);
                setLoadingAuth(false);
            })
        })
        .catch((error) =>{
            Alert.alert(
                'Ops! email/senha inválidos',
                `Verifique se o email/senha utilizados são validos`,
                [
                  {
                    text: 'Ok',
                    style: 'cancel',          
                  }
                ]
                )
            setLoadingAuth(false);
        });
    }

    // Async Storage Comprador
    async function storageUserc(data){
        await AsycStorage.setItem('Auth_userc', JSON.stringify(data));
}

    // Async Storage MAKER
        async function storageUserm(data){
            await AsycStorage.setItem('Auth_userm', JSON.stringify(data));
    }

    // Função deslogar MAKER
    async function signOutm(){
        await firebase.auth().signOut();
        await AsycStorage.clear()
        .then( () => {
            setUserm(null);
        })

    }

    // Função deslogar Comprador
    async function signOutc(){
        await firebase.auth().signOut();
        await AsycStorage.clear()
        .then( () => {
            setUserc(null);
        })

    }


    // Cadastro Comprador
    async function signUpc(email, password, nome, cep, cidade, estado, bairro, telefone){
        setLoadingAuth(true);
        // Criando Autenticação
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid;
            // Gravando States no Banco
            await firebase.database().ref('comprador').child(uid).set({
                nome: nome,
                email: value.user.email,
                cep: cep,
                cidade: cidade,
                estado: estado,
                bairro: bairro,
                telefone: telefone

            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    bairro: bairro,
                    telefone: telefone,
                    
                };
                setUserc(data);
                storageUserc(data);
                setLoadingAuth(false);
                Alert.alert(
                    `Olá ${nome}, seja bem-vindo ao Makers!`,
                    `Faça já seu pedido e aguarde que os profissionais entrarão em contato via WhatsApp.`,
                    [
                      {
                        text: 'Next',
                        onPress: () => nextc(),          
                      }
                    ]
                    )
            })
        })
        .catch((error) =>{
            Alert.alert(
                `Ops, o email ${email} já esta sendo usado por outro usuário`,
                `Por favor, utilize outro.`,
                [
                  {
                    text: 'Ok',
                    style: 'cancel',          
                  }
                ]
                )
            setLoadingAuth(false);
        });
    }

        function nextc(){
            Alert.alert(
                `Dica: mantenha SEMPRE seus dados atualizados!`,
                `Os profissionais Makers entrarão em contato via WhatsApp, então antes de fazer um pedido confira se seus dados estão atualizados na aba "Perfil" ;)`,
                [
                    {
                    text: 'Ok',
                    style: 'cancel',          
                    }
                ]
                )
        }    

        function nextm(){
            Alert.alert(
                `Dica: atualize suas fotos para se destacar!`,
                `Mantenha as fotos de seus trabalhos atualizadas, para chamar atenção dos compradores. Você pode atualizá-las na aba "Perfil"`,
                [
                  {
                    text: 'Ok',
                    style: 'cancel',          
                  }
                ]
                )
        }

        // Cadastro Maker
        async function signUpm(email, password, nome, cep, cidade, estado, bairro, telefone){
            setLoadingAuth(true);
            // Criando Autenticação
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) =>{
                let uid = value.user.uid;
                // Gravando States no Banco
                await firebase.database().ref('maker').child(uid).set({
                    nome: nome,
                    email: value.user.email,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    bairro: bairro,
                    telefone: telefone,
                    stars: 30
    
                })
                .then(()=>{
                    let data = {
                        uid: uid,
                        nome: nome,
                        email: value.user.email,
                        cep: cep,
                        cidade: cidade,
                        estado: estado,
                        bairro: bairro,
                        telefone: telefone
                        
                    };
                    setUserm(data);
                    console.log(userm);
                    storageUserm(data);
                    setLoadingAuth(false);
                    Alert.alert(
                        `Olá ${nome}, seja bem-vindo ao Makers!`,
                        `As Stars são suas "moedas de troca" para abrir os pedidos. Você acaba de ganhar 30 delas por nossa conta ;) Desbloqueie algum pedido, e feche seu primeiro negócio!`,
                        [
                          {
                            text: 'Next',
                            onPress: () => nextm(),          
                          }
                        ]
                        )
                })
            })
            .catch((error) =>{
                Alert.alert(
                    `Ops, o email ${email} já esta sendo usado por outro usuário`,
                    `Por favor, utilize outro.`,
                    [
                      {
                        text: 'Ok',
                        style: 'cancel',          
                      }
                    ]
                    )
                setLoadingAuth(false);
            });
            
        }
    
    return(
        <AuthContext.Provider 
        value={{ 
            signedm:!!userm , userm, signUpm, signed: !!userc, userc, loading,
            signUpc, signIn, signInm, signOutm, signOutc, loadingAuth, storageUserm}}
        >
            {children}
        </AuthContext.Provider>
    );
}
