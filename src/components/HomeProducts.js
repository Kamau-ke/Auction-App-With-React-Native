import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { Box, Flex, Heading, Image, Pressable, ScrollView, TextArea } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../data/color'
// import product from '../data/Product'



export default function HomeProducts() {
    const [product, setProduct]=useState([]);
    const [query,setQuery]=useState([]);
    const navigation=useNavigation()
    useEffect(()=>{
        
        const url='http://localhost/PhpApi/api/Products/Products.php';
        fetch(url)
        .then(response=>response.json())
        .then(result=>{
            setProduct(result.data)
        //    const filtered= result.data.filter(product=>product.ProductStatus=='No')
        //     setProduct(filtered)
        }
            
            )
        .catch(err =>console.log(err))
    },[])

    


  return (
   <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Flex flexWrap="wrap"
            direction='row'
            justifyContent="space-between"
            px={6}
        >
            {
                product.map((product)=>(
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
                        onPress={()=>navigation.navigate("Single", product.ProductID)}
                    >
                        {/* <Image 
                            source={{uri:`http://localhost:80/PhpApi/uploads/BAL.png`}}
                            alt={product.ProductName}
                            w="full"
                            h={24}
                            resizeMode="contain"

                            
                        /> */}
                           
                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                Ksh:{product.Price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated w="full">
                                {product.ProductName}
                            </Text>
                        </Box>

                    </Pressable>
                ))
            
            }
        </Flex>
   </ScrollView>
  )
}
