import { Box, HStack, Input, Pressable } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../data/color'
import {FontAwesome5} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeSearch() {
    const navigation=useNavigation()
  return (
   <HStack
   space={3}
   w="full"
   px={6}
   bg={Colors.main}
   py={10}
//    mt={200}
   alignItems="center"
   safeAreaTop
   
   >

    <Input 
        placeholder='Nike, Puma, Infinix ....'
        w="85%"
        bg={Colors.white}
        type="search"
        variant="filled"
        h={12}
        borderWidth={0}
        _focus={{
            bg:Colors.white
        }}
    />
    <Pressable mt={3} onPress={()=>navigation.navigate("Cart")}>
    <FontAwesome5 name="shopping-basket" size={24}
    color={Colors.white}/>
    {/* <Box 
    px={1}
    rounded="full"
    position="absolute"
    top={-13}
    left={2}
    bg={Colors.red}
    _text={{
        color:Colors.white,
        fontSize:"11px"
    }}
    >5</Box> */}
    </Pressable>
   </HStack>
  )
}
