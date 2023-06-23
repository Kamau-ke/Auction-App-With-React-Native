import React, { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Box,Text, Heading, Input, TextArea, VStack, Pressable } from 'native-base'
import {  Alert, Image,  View } from 'react-native'
import Colors from '../data/color'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../data/UserContext';
import BotttomNav from '../Navigations/BotttomNav';

export default function LoginScreen({navigation}) {
    const [user, setUser]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState('');
    const [data, setData]=useState([]);

    

    useEffect(()=>{
      let api=`http://localhost/phpApi/api/User/single_user.php?UserName=${user}`;

      let header={
        'Content-Type':'application/json'
      }
      let data={
        UserName:user
        // Password:password,
        // Type:'Login'
      }

      fetch(api,{
        method:'POST',
        headers:header,
        body:JSON.stringify(data)
      })
      .then((response)=>{
        if(response) return response.json();
        else{
          setError('Response is empty');
          return {};    
        }
      })
      .then(data=>{
        console.log(data.Password)
        setData(data);
      })
      .catch(err=>{
        console.log(err.message);
      })
    },[user])


    // store user in asyncStorage

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('username', value)
      } catch (e) {
        // saving error
        console.log(e)
      }
    }

    // authenticate users
    const Authenticate=()=>{
      if(!user||!password){
        setError('Please fill in all fields');
        console.log(user, password)
      }else{
       

        
      }

      if(password!=data.Password){
       setError('Wrong password or User Name')
        return;
      // console.log(data)
      }else
      {
           navigation.navigate("Bottom")
          
      }

     storeData(user)
     
    }

    
  return (
    <Box flex={1} bg={Colors.black}>
      {/* <Image 
      flex={1}
      alt='logo'
      resizeMode='cover'
      size='lg'
      w='full'
      source={require('../images/logo')}
      /> */}
      <Box 
      w="full"
      h="full"
      position="absolute"
      top="0"
      px="6"
      justifyContent="center"
      
      >
        <Heading>LOGIN</Heading>
        <Text style={{textAlign:'center', paddingTop:10, color:'red'}}>{error}</Text>
        <VStack space={8} pt="6">
      
        <Input 
          InputLeftElement={
            <AntDesign name='user' 
            size={20}
             color={Colors.main}
            
            
            />
          }
          variant="underlined"
          placeholder='john doe'
          w="70%"
          pl={2}
          color={Colors.main}
          borderBottomColor={Colors.underline}
          onChange={e =>setUser(e.target.value)}
        />

        {/* PASSWORD */}

        <Input 
          InputLeftElement={
            <Feather name='eye' 
            size={20}
             color={Colors.main}
            
            />
          }
          variant="underlined"
          placeholder='********'
          w="70%"
          type='password'
          pl={2}
          color={Colors.main}
          borderBottomColor={Colors.underline}
          onChange={e =>setPassword(e.target.value)}
        />

        </VStack>

          <Button 
            _pressed={
              {
                bg:Colors.main
              }
            }

          my={30} 
          w="40%" 
          rounded={50} 
          bg={Colors.main}
          onPress={()=>Authenticate()
            // navigation.navigate("Bottom")
           }
          // 
          >
            LOGIN 
          </Button>

          <Pressable mt={4}
          onPress={()=>navigation.navigate("Register")
          }
          >
            <Text color={Colors.deepestGray}>SIGN UP</Text>
          </Pressable>
         
      </Box>

    </Box>
  )
}
