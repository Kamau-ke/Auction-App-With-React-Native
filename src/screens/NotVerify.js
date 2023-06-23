import { Box, Center, Image, VStack } from 'native-base'
import React from 'react'
import Buttone from '../components/Buttone'
import Colors from '../data/color'

export default function NotVerify() {
  return (
    <Box flex={1} bg={Colors.main} safeAreaTop>
        <Center w="full" h={250}>
            <Image
                source={require('../../assets/auction.jpg')}
                alt='logo'
                size='lg'
            />
        </Center>
        <VStack space={6} px={5} alignItems="center">
            <Buttone bg={Colors.black} color={Colors.white}>REGISTER</Buttone>
            <Buttone bg={Colors.white} color={Colors.black}>LOGIN</Buttone>
        </VStack>
    </Box>
  )
}
