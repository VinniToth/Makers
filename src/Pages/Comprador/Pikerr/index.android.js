import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function Pickerr({ onChance }){
    return(
        <View style={styles.vpick}>
            <RNPickerSelect
            style={{
                inputIOS:{
                    height: 50,
                    padding: 7, 
                    backgroundColor: '#FFF',
                    fontSize: 20
                },
                inputAndroid:{
                  color: 'black',
                  alignContent: 'center',
                  
                }
            }}
            placeholder={{
                label: 'Periodo de urgencia',
                color: 'lightgrey',
                value: null,
            }}
            onValueChange={ (periodo) => onChance(periodo) }
            items={[
                {label: 'Para essa semana', value: 'Para essa semana', color: '#222'},
                {label: 'Proxima Semana', value: 'Proxima Semana', color: '#222'},
                {label: 'Daqui á 15 dias', value: 'Daqui á 15 dias', color: '#222'},
                {label: 'Proximo Mês', value: 'Proximo Mês', color: '#222'},
                {label: 'Estou apenas orçando', value: 'Estou apenas orçando', color: '#222'},
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