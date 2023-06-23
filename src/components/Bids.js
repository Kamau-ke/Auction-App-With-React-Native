import { Box, HStack, Pressable, ScrollView } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import Colors from '../data/color'

export default function Bids() {
  return (
    <Box h="full" bg={Colors.white} pt={5}>
        <ScrollView showsVerticalScrollIndicator={false}>

            {/* PAID BIDS */}
            
            <Pressable>
                <HStack
                space={4}
                justifyContent="space-between"
                alignItems="center"
                bg={Colors.deepGray}
                py={5}
                px={2}
                >
                    <Text fontSize={9} color={Colors.blue} isTruncated>
                        Ksh: 1234
                    </Text>
                    <Text fontSize={12} bold color={Colors.blue} isTruncated>
                        PAID
                    </Text>
                </HStack>
            </Pressable>
        </ScrollView>
    </Box>
  )
}
