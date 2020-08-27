import * as React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importando para TAB Maker
import Pedidos from './src/Pages/Maker/Pedidos';
import Atualizarperfil from './src/Pages/Maker/Atualizarperfil';
import Pedidosconcluidos from './src/Pages/Maker/Pedidosconcluidos';
import Stars from './src/Pages/Maker/Stars';

// Importando para TAB Comprador
import Novopedido from './src/Pages/Comprador/Novopedido';
import Atualizarperfilc from './src/Pages/Comprador/Atualizarperfilc';
import Meuspedidos from './src/Pages/Comprador/Meuspedidos';

// Importando para Stack
import Home from './src/Pages/Home';
import Perfil from './src/Pages/Perfil';
import Cadastroc from './src/Pages/Comprador/Cadastroc';
import Cadastrom from './src/Pages/Maker/Cadastrom';
import Login from './src/Pages/Login';
import ChooseLog from './src/Pages/ChooseLog';
import Loginm from './src/Pages/Loginm';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Icones TAB COMPRADOR
const iconsc = {
  Novo:{
    name: 'add-box'
  },
  Perfil:{
    name: 'account-circle'
  },
  Pedidos:{
    name: 'receipt'
  }
};

// Icones TAB MAKER
const icons = {
  Pedidos:{
    name: 'receipt'
  },
  Perfil:{
    name: 'account-circle'
  },
  Desbloqueados:{
    name: 'lock-open'
  },
  Stars:{
    name: 'star-border'
  },
};

// Componente COMPRADOR TAB
export function Tabsc(){
  return(
    
      <Tab.Navigator
      screenOptions={ ({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = iconsc[route.name];
          return <Icon name={name} color={color} size={size}/>
        }
      }) }
      tabBarOptions={{
        style:{
          backgroundColor: 'white',
          // position: 'absolute'
        },
        activeTintColor: '#8c52ff',
        keyboardHidesTabBar: true,
      }}
      >
        <Tab.Screen name="Novo"     component={Novopedido} />
        <Tab.Screen name="Pedidos"  component={Meuspedidos} />
        <Tab.Screen name="Perfil"   component={Atualizarperfilc} />
      </Tab.Navigator>

  );
   
}

// Componente MAKER TAB
export function Tabs(){
  return(
    
      <Tab.Navigator
      screenOptions={ ({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size}/>
        }
      }) }
      tabBarOptions={{
        style:{
          backgroundColor: 'white',
          
        },
        activeTintColor: '#8c52ff',
        keyboardHidesTabBar: true,
      }}
      >
        <Tab.Screen name="Pedidos"         component={Pedidos} />
        <Tab.Screen name="Desbloqueados"   component={Pedidosconcluidos}/>
        <Tab.Screen name="Stars"           component={Stars}/>
        <Tab.Screen name="Perfil"          component={Atualizarperfil} />
      </Tab.Navigator>

  );
}

// STACK PARA NAVEGAÇÃO
export default function SignIn(){
  return(
      <Stack.Navigator>
        <Stack.Screen name="Home"                    component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil"                  component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastroc"               component={Cadastroc} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastrom"               component={Cadastrom} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs"                    component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Tabsc"                   component={Tabsc} options={{ headerShown: false }} />
        <Stack.Screen name="Login"                   component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseLog"               component={ChooseLog} options={{ headerShown: false }} />
        <Stack.Screen name="Loginm"                  component={Loginm} options={{ headerShown: false }} />
      </Stack.Navigator>

  );
}
      
      