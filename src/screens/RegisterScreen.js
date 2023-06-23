import { Text,Pressable,Box, Button, Heading, VStack, Input } from 'native-base'
import React, { useState } from 'react'
import {   View } from 'react-native'
import Colors from '../data/color'
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';


export default function RegisterScreen({navigation}) {

  const [name, setName]=useState('')
  const [userName, setUserName]=useState('')
  const [phone, setPhone]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [gender, setGender]=useState('')
  const [address, setAddress]=useState('')
  const [error, setError]=useState('')

  const verify=()=>{
    if (name === '') {
      setError('please fill in user field');
      return;
    }
    if (userName === '') {
      setError('please fill in userName field');
      return;
    }
    if (email === '') {
      setError('please fill in email field');
      return;
    }
    if (password === '') {
      setError('please fill in password field');
      return;
    }
    if (gender === '') {
      setError('please fill in gender field');
      return;
    }
    if (address === '') {
      setError('please fill in address field');
      return;
    }
  
    let api = 'http://localhost/phpApi/api/User/UserRegister.php';
  
    let header = {
      'Content-Type': 'application/json'
    };
  
    let data = {
      Name: name,
      UserName: userName,
      Password: password,
      Email: email,
      Phone: phone,
      Gender: gender,
      Address: address
    };
  
    fetch(api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response) return response.json();
        else {
          setError('Response is empty');
          return {};
        }
      })
      .then((data) => {
        setError(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  
    // navigation.navigate('Bottom');
    alert('registered successfully')
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
      {/* NAME */}

      <Heading>SIGN UP</Heading>
      <VStack space={5} pt="6">
        {/* NAME */}

        <Input 
        InputLeftElement={
          <FontAwesome name='user' 
          size={20}
           color={Colors.main}
          
          />
        }
        variant="underlined"
        placeholder='Enter your full name'
        w="70%"
        type='text'
        pl={2}
        color={Colors.main}
        borderBottomColor={Colors.underline}
        onChange={e=>setName(e.target.value)}
      />

        {/* USERNAME */}

        <Input 
        InputLeftElement={
          <FontAwesome name='user' 
          size={20}
           color={Colors.main}
          
          />
        }
        variant="underlined"
        placeholder='John Doe'
        w="70%"
        type='text'
        pl={2}
        color={Colors.main}
        borderBottomColor={Colors.underline}
        onChange={e=>setUserName(e.target.value)}
      />

      <Input 
        InputLeftElement={
          <MaterialIcons name='email' 
          size={20}
           color={Colors.main}
          
          />
        }
        variant="underlined"
        placeholder='user@gmail.com'
        w="70%"
        pl={2}
        color={Colors.main}
        borderBottomColor={Colors.underline}
        onChange={e=>setEmail(e.target.value)}
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
        onChange={e=>setPassword(e.target.value)}
      />

        <Input 
        InputLeftElement={
          <FontAwesome name='user' 
          size={20}
           color={Colors.main}
          
          />
        }
        variant="underlined"
        placeholder='0722334455'
        w="70%"
        type='text'
        pl={2}
        color={Colors.main}
        borderBottomColor={Colors.underline}
        onChange={e=>setPhone(e.target.value)}
      />

      <Input 
        InputLeftElement={
          <FontAwesome name='user' 
          size={20}
           color={Colors.main}
          
          />
        }
        variant="underlined"
        placeholder='Gender'
        w="70%"
        type='text'
        pl={2}
        color={Colors.main}
        borderBottomColor={Colors.underline}
        onChange={e=>setGender(e.target.value)}
      />

      <Input 
        InputLeftElement={
          <FontAwesome name='user' 
          size={20}
           color={Colors.main}
          
          />
        }
        variant="underlined"
        placeholder='Address'
        w="70%"
        type='text'
        pl={2}
        color={Colors.main}
        borderBottomColor={Colors.underline}
        onChange={e=>setAddress(e.target.value)}
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
        onPress={verify}
        >
          SIGN UP
        </Button>

        <Pressable mt={4}>
          <Text color={Colors.deepestGray}
          onPress={()=>navigation.navigate("Login")}
          >LOGIN</Text>
        </Pressable>
       
    </Box>
  </Box>
  )
}
