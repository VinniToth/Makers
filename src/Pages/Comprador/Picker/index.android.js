import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker({ onChance }){
    return(
        <View style={styles.vpick}>
            <RNPickerSelect
            style={{
                inputIOS:{
                    height: 50,
                    padding: 7, 
                    backgroundColor: '#FFF',
                    fontSize: 20,
                    
                
                },
                inputAndroid:{
                  color: 'black',
                  alignContent: 'center',
                  
                }
            }}
            placeholder={{
                label: 'Selecione uma categoria',
                color: 'lightgrey',
                value: null,
               
            }}
            onValueChange={ (categoria) => onChance(categoria) }
            items={[
                {label: 'Bolos', value: 'Bolos', color: '#222'},
                {label: 'Bolo Chantilly', value: 'Bolo Chantilly', color: '#222'},
                {label: 'Bolo com Topper', value: 'Bolo com Topper', color: '#222'},
                {label: 'Bolo Personalizados', value: 'Bolo Personalizados', color: '#222'},
                {label: 'Bolo para Café', value: 'Bolo para Café', color: '#222'},
                {label: 'Doces', value: 'Doces', color: '#222'},
                {label: 'Doces Finos', value: 'Doces Finos', color: '#222'},
                {label: 'Doces Personalizados', value: 'Doces Personalizados', color: '#222'},
                {label: 'Salgados', value: 'Salgados', color: '#222'},
                {label: 'Coffee Break', value: 'Coffee Break', color: '#222'},
                {label: 'Brindes', value: 'Brindes', color: '#222'},
                {label: 'Lembrancinhas', value: 'Lembrancinhas', color: '#222'},
                {label: 'Chocolates', value: 'Chocolates', color: '#222'},
                {label: 'Festa na Caixa', value: 'Festa na Caixa', color: '#222'},
                {label: 'Kit Festa', value: 'Kit Festa', color: '#222'},
                {label: 'Decorações', value: 'Decorações', color: '#222'},
                {label: 'Outro', value: 'Outro', color: '#222'},
            ]}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    vpick:{
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        elevation: 2,
        borderWidth: 0.7,
        borderColor: 'lightgrey',
        borderRadius: 5,

        
    }
});