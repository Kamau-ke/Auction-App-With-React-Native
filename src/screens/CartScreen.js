import { Box, Center, HStack, ScrollView, Button,Image,Flex,Heading, Pressable} from 'native-base'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import CartEmpty from '../components/CartEmpty'
import CartItems from '../components/CartItems' 
import Colors from '../data/color'

export default function CartScreen() {
  const navigation=useNavigation();
  const [products, setProducts]=useState([]);
  const [user, setUser]=useState('')

  useEffect(()=>{
    let api=`http://localhost/phpApi/api/Products/myProduct.php?UserName=${user}`;

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
      
      setProducts(data.data)
    })
    .catch(err=>{
      console.log(err.message);
    })
  })

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
    // console.log(products);

  return (
    <Box flex={1} safeAreaTop bg={Colors.subGreen}>
        <Center w="full" py={5}>
            <Text color={Colors.black} fontSize={20} bold>Your Products</Text>
        </Center>
    {/* IF CART IS EMPTY */}
        {/* <CartEmpty/> */}

        {/* IF IT HAS ITEMS */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <CartItems/> */}

          {
              products&&products.map((product)=>(
                    <Pressable
                    key={product.ProductID}
                      w="47%" 
                     bg={Colors.white}
                        rounded="md"
                        shadow={2}
                        pt={0.3}
                        my={3}
                        pb={2}
                        overflow="hidden"
                        onPress={()=>navigation.navigate("Accept", product.ProductID)
                          // navigation.navigate("Single", product.ProductID)
                        }
                    >
                        {/* <Image 
                            source={{uri:`http://localhost/onlinebidding/ProductPhoto/${product.Image}`}}
                            alt={product.ProductName}
                            w="full"
                            h={24}
                            resizeMode="contain"/>
                        */}
                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                Ksh:{product.EndPrice}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated w="full">
                                {product.ProductName}
                            </Text>
                        </Box>

                       

                    </Pressable>
                ))
            
            }
{/* 
          <Center mt={5}>
              <HStack
              rounded={50}
              justifyContent="space-between"
              bg={Colors.white}
              shadow={2}
              w="90%"
              pl={5}
              h={45}
              alignItems="center"
              >
               <Text>Total</Text>  
               <Button px={10}
                h={45} 
               rounded={50} 
               bg={Colors.main}
               _text={{
                color:Colors.white,
                fontWeight:"semibold"
               }}
               _pressed={{
                bg:Colors.main
               }}
               >
                </Button>               
              </HStack>
          </Center> */}
        </ScrollView>
    </Box>
  )
}
