import React, {useState, useEffect, createContext, useContext} from 'react';
import firebase from '../../../firebaseConnection';

import { AuthContext } from '../../../contexts/auth';

export const Context = createContext({});

export default function ContextProvider({ children }){
    const { userm, signOutm, userc } = useContext(AuthContext);
    const [uid, setUid] = useState('');
    const [picture, setPicture] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [stars, setStars] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [email, setEmail] = useState('');   
    

    
    
    async function dado(){
        
        await firebase.database().ref('maker').child(userm.uid).once('value', (snapshot) =>{
            setStars(snapshot.val().stars);
            setTelefone(snapshot.val().telefone);
                setNome(snapshot.val().nome);
                setCep(snapshot.val().cep);
                setCidade(snapshot.val().cidade);
                setEstado(snapshot.val().estado);
                setBairro(snapshot.val().bairro);
                setEmail(snapshot.val().email);
                setUid(snapshot.key);
                setPicture(snapshot.val().avatar);
                setImg1(snapshot.val().img1);
                setImg2(snapshot.val().img2);
                setImg3(snapshot.val().img3);
            })
        }

       async function Limpar(){
        setStars(null);
        setTelefone(null);
        setNome(null);
        setCep(null);
        setCidade(null);
        setEmail(null);
        setUid(null);
        setEstado(null);
        setBairro(null);
        setImg1(null);
        setImg2(null);
        setImg3(null);
        setPicture(null);

        signOutm();
      };

      async function dadoc(){
        
        await firebase.database().ref('comprador').child(userc.uid).on('value', (snapshot) =>{
                setTelefone(snapshot.val().telefone);
                setNome(snapshot.val().nome);
                setCep(snapshot.val().cep);
                setCidade(snapshot.val().cidade);
                setEstado(snapshot.val().estado);
                setBairro(snapshot.val().bairro);
                setEmail(snapshot.val().email);
                setUid(snapshot.key);
                setPicture(snapshot.val().avatar);
            })
        }




    return(
        <Context.Provider value={{ 
            
            telefone, email, cidade, nome, stars, uid, cep, bairro, estado, Limpar, dado, img1, img2, img3, picture, dadoc }}>
            
            { children }
        </Context.Provider>
    );
}