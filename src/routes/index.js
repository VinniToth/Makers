import React, {useContext} from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';

import SignIn from '../../Navigate';
import {Tabs} from '../../Navigate';
import {Tabsc} from '../../Navigate';

export default function Routes(){
    const {signed, signedm, loading} = useContext(AuthContext);
    
    if(loading){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <Image
                  source={require('../Images//mak.png')} 
                />
            </View>
        );
    }
    else;

    return(
    signed ? <Tabsc/> : signedm ? <Tabs/> : <SignIn/> 
    );
}