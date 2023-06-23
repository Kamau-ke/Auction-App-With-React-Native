import { View } from 'native-base'
import React, { useState } from 'react'
import { Text, useWindowDimensions, StyleSheet } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Colors from '../data/color'
import Bids from './Bids'
import Profile from './Profile'
import MyProducts from './MyProducts'

const renderScene=SceneMap({
    first:Profile,
    second:Bids,
    // third:MyProducts
})

export default function Tabs() {
    const layout=useWindowDimensions()
    const [index, setIndex]=useState(0)
    const [routes]=useState([
        {key:"first", title:"PROFILE"},
        {key:"second", title:"BIDS"},
        // {key:"third", title:"MyProducts"}
    ])


    const renderTabsBar=(props)=>{
      <TabBar 
      {...props}
      tabStyle={styles.tabStyle}
      indicatorStyle={{backgroundColor: Colors.black}}
      activeColor={Colors.white}
      renderLabel={({route, color}) =><Text style={{color, ...styles.text}}>{route.title}</Text>}
      />
    }
  return (
    <TabView navigationState={{index, routes}} 
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{width:layout.width}}

    // uncomment on phone
    
    // renderTabBar={renderTabsBar}  
    />
  );
}

const styles=StyleSheet.create({
  tabStyle:{
    backgroundColor: "black",
  },
  text:{
    fontSize:13,
    fontWeight:"bold"
  }
})
