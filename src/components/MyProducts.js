import { useNavigation } from '@react-navigation/native'
import { Box, Flex, Heading, Image, Pressable, ScrollView, TextArea } from 'native-base'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../data/color'
import products from '../data/Product'

export default function MyProducts() {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>My products</Text>
        <Flex flexWrap="wrap"
            direction='row'
            justifyContent="space-between"
            px={6}
        >

              
            
                {products.map((product)=>(
                    <Pressable
                     key={product._id} w="47%" 
                     bg={Colors.white}
                        rounded="md"
                        shadow={2}
                        pt={0.3}
                        my={3}
                        pb={2}
                        overflow="hidden"
                        onPress={()=>navigation.navigate("Single", product)}
                    >
                        <Image 
                            source={{uri:product.image}}
                            alt={product.name}
                            w="full"
                            h={24}
                            resizeMode="contain"
                        />

                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                Ksh:{product.price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated w="full">
                                {product.name}
                            </Text>
                        </Box>

                    </Pressable>
                ))
                 }
        
        </Flex>
   </ScrollView>
  )
}

const styles=StyleSheet.create({
  headerText:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    paddingBottom:20
  }
})
