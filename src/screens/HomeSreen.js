import { Box } from 'native-base'
import React from 'react'
import HomeProducts from '../components/HomeProducts'
import HomeSearch from '../components/HomeSearch'
import BotttomNav from '../Navigations/BotttomNav'

export default function HomeSreen() {
  return (
     <Box>
      {/* <BottomNav/> */}
      <HomeSearch/>
      <HomeProducts/>
      
     </Box>
  )
}
