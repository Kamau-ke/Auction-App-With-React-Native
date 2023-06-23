import { Box, Heading, HStack, Image, ScrollView, Spacer } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, View,TextInput,StyleSheet } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import Colors  from '../data/color'
import Buttone from '../components/Buttone'
import { useState,useEffect } from 'react';

export default function SingleProduct({route}) {
  const [eprice, setEprice]=useState(0);
  const [price, setPrice]=useState(0);
  const [product, setProduct]=useState([])
  const [user, setUser]=useState('')
  const [userName, setUserName]=useState('');
  const [error,setError]=useState('')
  const navigation=useNavigation()
  const productId=route.params

  useEffect(()=>{
    const url= `http://localhost/PhpApi/api/Products/single.php?ProductID=${productId}`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>setProduct([data]))
    .catch(err=>console.log(err))

    
  },[])
  
  useEffect(()=>{
    product.map(product=>{
      setPrice(product.Price);
    })
  },[product])
  
    useEffect(()=>{
      product.map(product=>{
        setUserName(product.UserName)
      })
    },[price])
 
  
  // get user from asyncStorage
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

  // function to post product
  const Bid=()=>{
    const url= `http://localhost/PhpApi/api/Bid/Bid.php`;
    let header={
      'Content-Type':'application/json'
    }
    let data={
      EndPrice:eprice,
      Buyer:user,
      ProductID:productId
      // Password:password,
      // Type:'Login'
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
      console.log(data)
    })
    .catch(err=>{
      console.log(err.message);
    })

    
   
  }



  // run functions

  getData()  



console.log(userName,price)

  
  const validate=(user, userName,price,eprice)=>{
    let dprice=eprice-price;
    if(user!==userName && dprice>1){
      Bid()
      navigation.navigate("Cart")
  }
  else{
    setError('Bid Amount should be greater, and you should not bid on your item')
    return;
  }
}
 

 
  return (
      <Box>

<ScrollView px={5} showsVerticalScrollIndicator={false}>
        
<Text style={{textAlign:'center', paddingTop:10, color:'red'}}>{error}</Text>

{/* remove map function, create a function that map through product  */}
        {
          product.map(product=>(
          <Box key={productId} >
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
              
            /> */}

            <TextInput
              style={styles.inp}
              onChangeText={(val)=>setEprice(val)}
             
            />
             {/* <Spacer/> this is used to add space and it in flex form */}
             <Heading
                mt={2}
                bold
                color={Colors.black}
                fontSize={19}>Ksh:{product.Price}</Heading>
        </HStack>
          <Text lineHeight={24} fontSize={12}>
          {product.Description}
          </Text>
          <Buttone bg={Colors.main} color={Colors.white}
        mt={10} onPress={()=>validate(user,userName,price,eprice)}>Place Bid</Buttone>
          </Box>
          ))
        }
    </ScrollView>
        
      </Box>
    
  )
}

const styles=StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white'
}
})


