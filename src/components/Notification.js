// import { Box, Center, Heading } from 'native-base'
// import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Text, View } from 'react-native'
// import Colors from '../data/color'

// export default function Notification() {
    
//   const [user, setUser]=useState('')
//   const [error, setError]=useState('');
//   const [data, setData]=useState([]);


//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('username')
//       if(value !== null) {
//         // value previously stored
//         setUser(value)
//       }
//     } catch(e) {
//       // error reading value
//       console.log(e);
//     }
//   }


//     useEffect(()=>{
//       // get user when page loads
      
//       getData()

//       // make api call
//       let api=`http://localhost/phpApi/api/Notification/GetNotification.php?UserName=${user}`;

//       let header={
//         'Content-Type':'application/json'
//       }
//       let data={
//         UserName:user
//         // Password:password,
//         // Type:'Login'
//       }

//       // should be placed after api
//       // {
//       //   method:'POST',
//       //   headers:header,
//       //   body:JSON.stringify(data)

//       fetch(api,{
//                 method:'POST',
//                 headers:header,
//                 body:JSON.stringify(data)
//       })
//       .then((response)=>{
//         if(response) return response.json();
//         else{
//           setError('Response is empty');
//           return {};    
//         }
//       })
//       .then(data=>{
//          setData([data]);
//         // console.log(data)
//       })
//       .catch(err=>{
//         console.log(err.message);
//       })
//     })

//     console.log(data)
//   return (
//     <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
//     <Center pb={15}>
//         <Heading color={Colors.white} pb={10}>NOTIFICATIONS</Heading>
//         <Box bg={Colors.white} h={250} w={300}>
//           {
//             data.map(data=>(
//               <Text fontSize={10} mt={1} isTruncated w="full">
//               {data.Message}
//                </Text>
//             ))
//           }
   
//         </Box>
//     </Center>

//  </Box>
//   )
// }



import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser]=useState('');
  
   
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
 
 useEffect(()=>{
  getData()
 })

  
    fetch( `http://localhost/phpApi/api/Notification/GetNotification.php?UserName=${user}`)
      .then((response) => response.json())
      .then((json) => {
        setNotifications(json.data);
      })
      .catch((error) => console.error(error));


  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.Message}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.Message}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>You don't have any notifications.</Text>
        </View>
      )}
    </View>
  );
};


