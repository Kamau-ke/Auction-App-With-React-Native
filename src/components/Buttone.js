import { Button } from 'native-base'
import React from 'react'

export default function Buttone({mt, bg, color, children, onPress }) {
  return (
    <Button w="full" h={8} rounded="full" bg={bg} _text={{
        color:color, fontWeight:'bold'
    }}
    _pressed={{bg:bg}}
    onPress={onPress}
    >{children}</Button>
  )
}
