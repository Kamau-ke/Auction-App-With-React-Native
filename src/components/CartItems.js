import { Box, Button, Center, HStack, Image, Pressable, VStack } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Colors from '../data/color'
import products from '../data/Product'
import {FontAwesome} from '@expo/vector-icons'

const Swiper= ()=>(
    <SwipeListView 
        rightOpenValue={-50}
        previewRowKey='0'
        previewOpenValue={-40}
        previewOpenDelay={3000}
        const data={products}
        renderHiddenItem={hiddenItem}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
    />    
);


const renderItems=(data)=>{
    <Pressable>
        <Center alignItems='center' space={2}>
            <HStack alignItems="center" bg={Colors.white}
             shadow={1} rounded={10} overflow="hidden" 
            >

                <Center w="25%" bg={Colors.deepGray}>
                    <Image 
                        source={{uri:data.item.image}}
                        alt={data.item.name}
                        w="full"
                        h={24}
                        resizeMode="contain"
                    />
                </Center>
                <VStack
                  w="60%"  
                  px={2} space={2}>
                    <Text isTruncated color={Colors.black} bold fontSize={10}>
                        {data.item.name}
                    </Text>
                    <Text bold color={Colors.lightBlack}>Ksh:{data.item.price}</Text>
                    <Center>
                        <Button bg={Colors.main} _pressed={{bg:Colors.main}}
                            _text={{
                                color:Colors.white
                            }}
                        >5</Button>
                    </Center>
                </VStack>
            </HStack>
        </Center>
    </Pressable>
}

// Hidden

const hiddenItem=()=>{
    <Pressable w={50} roundedTopRight={10} roundedBottomRight={10} h="80%" ml="auto" justifyContent="center" bg={Colors.red}>
        <Center alignItems="center" space={2}>
        <FontAwesome name="trash" size={24} color={Colors.white}/>
           
        </Center>
    </Pressable>
}



export default function CartItems() {
  return (
    <Box mr={6}>
       <Swiper/>
    </Box>
  )
}
