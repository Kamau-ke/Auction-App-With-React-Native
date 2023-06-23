import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Center, Pressable } from 'native-base'
import { Entypo, AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons,EvilIcons, MaterialIcons  } from '@expo/vector-icons'
import {StyleSheet} from 'react-native'
import Colors from '../data/color'
import HomeSreen from '../screens/HomeSreen'
import ProfileScreen from '../screens/ProfileScreen'
import Profile from '../components/Profile'
import CartScreen from '../screens/CartScreen'
import StackNav from './StackNav'
import Notification from '../components/Notification'
import PostScreen from '../screens/PostScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useState } from 'react'
const Tab=createBottomTabNavigator()
const CustomTab=({children, onPress})=>(
    <Pressable
        onPress={onPress}
        h={70}
        w={70}
        rounded="full"
        bg={Colors.main}
        bottom={0}
        top={0}
        mt={0}
        shadow={2}
        // mb={800}
    >
       {children} 
    </Pressable>
)


export default function BotttomNav( ) {
    
    const [user, setUser]=useState('')

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('username')
          if(value !== null) {
            // value previously stored
            setUser(value)
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }
      
      getData()
      console.log(user);
  return (
    
        <Tab.Navigator backBehavior='Main' initialRouteName='Main' screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{...styles.tab},
            headerShown:false,
            tabBarHideOnKeyboard:true
        }}>
            <Tab.Screen name='Main' component={StackNav} options={{
                tabBarIcon:({focused}) =>(
                    <Center>
                        {focused ? (
                            <Entypo name="home" size={24} color={Colors.main}/>
                        ):(
                            <AntDesign name="home" size={24} color={Colors.black}/>
                        )}
                    </Center>
                )
            }}
            />
            {/* POST SCREEN */}

            <Tab.Screen name='Post' component={PostScreen} options={{
                tabBarIcon:({focused}) =>(
                    <Center>
                        {focused ? (
                            <MaterialIcons  name="post-add" size={24} color={Colors.main}/>
                        ):(
                            <MaterialCommunityIcons name="post" size={24} color={Colors.black}/>
                        )}
                    </Center>
                )
            }}
            />

            {/* CART */}

            <Tab.Screen name='Cart' 
            component={CartScreen} 
            options={{
                tabBarButton:(props)=><CustomTab {...props}/>,
                tabBarIcon:({focused}) =>(
                    <Center>
                        {focused ? (
                            <FontAwesome5 name="shopping-basket" size={24} color={Colors.white}/>
                        ):(
                            <MaterialCommunityIcons name="shopping-outline" size={24} color={Colors.white}/>
                        )}
                    </Center>
                )
            }}
            />

        {/* PROFILE */}
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon:({focused}) =>(
                    <Center>
                        {focused ? (
                            <FontAwesome name="user" size={24} color={Colors.main}/>
                        ):(
                            <AntDesign name="user" size={24} color={Colors.black}/>
                        )}
                    </Center>
                )
            }}
            />

            {/* NOTIFIATION */}

            <Tab.Screen name='Notification' component={Notification} options={{
                tabBarIcon:({focused}) =>(
                    <Center>
                        {focused ? (
                             <EvilIcons name="bell" size={24} color={Colors.black}/>
                        ):(
                            <AntDesign name="bells" size={24} color={Colors.black}/>
                        )}
                    </Center>
                )
            }}
            />



        </Tab.Navigator>
       
       
  )

  
}
const styles=StyleSheet.create({
    tab:{
        // elevation:0,
        backgroundColor:Colors.white,
        height:60,
        marginBottom:270,
        
    }
  })


