import { Box, Center } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import Colors from '../data/color'
import {FontAwesome} from '@expo/vector-icons'
import Buttone from './Buttone'

export default function CartEmpty() {
  return (
    <Box flex={1} px={4}>
        <Center h="90%">
            <Center  w={200} h={200} bg={Colors.white} rounded="full">
            <FontAwesome name="shopping-basket" size={64} color={Colors.main}/></Center>
            <Text color={Colors.main} bold mt={5}>Your have not BIDDED Yet</Text>
        </Center> 
       
       <Buttone bg={Colors.black} color={Colors.white}>
        Start A Bid
       </Buttone>
    </Box>
  )
}
