import React from 'react'
import { NativeBaseProvider, StatusBar } from 'native-base';
import HomeScreen from './src/screens/HomeSreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen'
import { View } from 'react-native';
import { Text } from 'react-native';
import NotVerify from './src/screens/NotVerify';
import SingleProduct from './src/screens/SingleProduct'
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Tabs from './src/components/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import BotttomNav from './src/Navigations/BotttomNav';
import { createStackNavigator } from '@react-navigation/stack';
import PostScreen from './src/screens/PostScreen';
import MyProducts from './src/components/MyProducts';
import Notification from './src/components/Notification';


const Stack=createStackNavigator()
const App = () => {
  return (
   <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true}/>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown:false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
          <Stack.Screen name="Bottom" component={BotttomNav}/>


        </Stack.Navigator>
      </NavigationContainer>

     
   </NativeBaseProvider>

 
       
     
  )
}

export default App;
