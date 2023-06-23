import { Box, Heading, HStack, Image, ScrollView, Spacer } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import Colors  from '../data/color'
import Buttone from '../components/Buttone'
import { useState,useEffect } from 'react';

export default function AcceptProduct({route}) {
  const [value, setValue]=useState(0);
  const [product, setProduct]=useState([])
  const [error, setError]=useState('');
  const [buyer, setBuyer]=useState('')
  const [name,setName]=useState('')
   const [user, setUser]=useState('')

   
  const navigation=useNavigation()
  const productId=route.params

  useEffect(()=>{
  const url= `http://localhost/PhpApi/api/Products/single.php?ProductID=${productId}`;
  fetch(url)
  .then(response=>response.json())
  .then(data=>setProduct([data]))
  .catch(err=>console.log(err))
  },[])

   // get data from asyncStorage
   const getData = async () => {
    
    try {
      const value = await AsyncStorage.getItem('username')
      if(value !== null) {
        // value previously stored
        setUser(value)
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }
  
  getData()
  // console.log(user);


  useEffect(()=>{
    product.map(product=>{
      setBuyer(product.Buyer);
    })
  },[product])


  useEffect(()=>{
    product.map(product=>{
      setName(product.ProductName);
    })
  },[buyer])

  // code below is for quering buyer
  
  // product.map(product=>{
  //   setBuyer(product.buyer);
  //   setName(product.ProductName)
  // });





  // send notification to the buyer
  const sendNotification=()=>{
    const url=`http://localhost/phpApi/api/Notification/send.php`;

    let header={
      'Content-Type':'application/json'
    }
    let data={
      UserName:buyer,
      Message:`Hello ${buyer},You are the highest bidder for ${name} visit admin office to collect the item`
    }
    fetch(url,{
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
      setError(data)
    })
    .catch(err=>{
      console.log(err.message);
    })
    navigation.navigate("Cart")
  }

  const Accept=()=>{
    const url=`http://localhost/phpApi/api/Bid/Accept.php`;

     let header={
      'Content-Type':'application/json'
    }
    let data={
      ProductStatus:"Yes",
      ProductID:productId
     
    }
    fetch(url,{
      method:'POST',
      headers:header,
      body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data=>setError(data))
    .catch(err=>console.log(err))

    sendNotification();

    
  }
    
  return (
      <Box>

<ScrollView px={5} showsVerticalScrollIndicator={false}>
        
        
        {
          product.map(product=>(
            
          <Box key={productId}>
            
          <Image 
        source={{uri: product.Image}}
        alt="Image"
        w="full"
        h={300}
        resizeMode="contain"
        />
        <Heading bold fontSize={15} mb={2} lineHeight={22}>
         {product.ProductName}
        </Heading>
        <HStack space={2} alignItems="center" my={5}>
            {/* <NumericInput 
              value={value}
              totalWidth={140}
              totalHeight={30}
              iconSize={25}
              step={1}
              minValue={0}
              borderColor={Colors.deepGray}
              rounded
              textColor={Colors.black}
              iconStyle={{color:Colors.white}}
              rightButtonBackgroundColor={Colors.main}
              leftButtonBackgroundColor={Colors.main}
              

            />
             <Spacer/> */}
             <Heading
                bold
                color={Colors.black}
                fontSize={19}>Ksh:{product.EndPrice}</Heading>
        </HStack>
          <Text lineHeight={24} fontSize={12}>
          {product.Description}
          </Text>
          <Buttone bg={Colors.main} color={Colors.white}
        mt={10} onPress={()=>Accept()}>Accept Bid</Buttone>
        
          </Box>
          ))
        }

    </ScrollView>
        
      </Box>
    
  )
}
