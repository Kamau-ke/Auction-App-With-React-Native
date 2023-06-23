import { Avatar, Box, FormControl, Image, Input, ScrollView, VStack } from 'native-base'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableHighlight, Button, View } from 'react-native'
import Colors from '../data/color'
import Buttone from '../components/Buttone'
import * as ImagePicker from 'expo-image-picker';



export default function Profile() {
  
  const [error, setError] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState('');
  const [type, setType]=useState('')
  const [imgName, setImgName]=useState('')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImageUri(result.uri);
      const imageName = result.uri.split('/').pop();
       const imageType = result.uri.substring(result.uri.lastIndexOf(".") + 1);
      
       setImgName(imageName);
       setType(imageType)
      console.log(imageName, imageType);
      
    }
  };
  
  const Camera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImageUri(result.uri);
   

    }
  };


  
  const PostProduct = async () => {
    if (!name || !description) {
      setError('Please fill in all fields.');
      return;
    }
  
    let api = 'http://localhost/phpApi/api/Products/newProduct.php';
  
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
  
 


    const data = new FormData();
    data.append('ProductName', name);
    data.append('CategoryName', category);
    data.append('UserName', user);
    data.append('Price', price);
    data.append('Description', description);
    data.append('Image', imageUri);
    try {
      const response = await fetch(api, {
        method: 'POST',
        // headers: headers,
        body: data
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log('Success:', json);
      } else {
        console.log('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  // get data from asyncStorage
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
    


  return (
    <Box  bg={Colors.white} pt={10} style={{height:'auto'}}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          
            <VStack space={10} mt={2} pb={10}>

              {/* IMAGE UPLOAD */}
              <View style={{ flex: 1, alignItems: 'center',
               justifyContent: 'center' }}>          
                {imageUri && <Image source={{ uri: imageUri }} 
                style={{ width: 200, height: 100 }} />}
                <View>
                <Button title="Pick Image"  onPress={pickImage} />
                <Button title="Take Picture" mt={10} onPress={Camera} />
                </View>
                <Text style={{textAlign:'center', paddingTop:10, color:'red'}}>{error}</Text>
           </View>

                    {/* FORM  */}
                        <FormControl>

                          {/* PRODUCT NAME */}
                        <FormControl.Label
                            _text={{
                                fontSize:"12px",
                                fontWeight:"bold",
                                color:Colors.black
    
                            }}
                        >PRODUCT NAME</FormControl.Label>
                        <Input 
                            type='text'
                            borderWidth={0.2}
                            borderColor={Colors.main}
                            bg={Colors.subGreen}
                            py={3}
                            color={Colors.main}
                            fontSize={15}
                            onChange={(e)=>setName(e.target.value)}
                            _focus={{
                                bg:Colors.subGreen,
                                borderColor:Colors.main,
                                borderWidth:1
                                
                            }}
                        />


                        {/* CATEGORY */}

                        <FormControl.Label
                            _text={{
                                fontSize:"12px",
                                fontWeight:"bold",
                                color:Colors.black
    
                            }}
                        >CATEGORY</FormControl.Label>
                        <Input 
                            type='text'
                            borderWidth={0.2}
                            borderColor={Colors.main}
                            bg={Colors.subGreen}
                            py={3}
                            color={Colors.main}
                            fontSize={15}
                            onChange={(e)=>setCategory(e.target.value)}
                            _focus={{
                                bg:Colors.subGreen,
                                borderColor:Colors.main,
                                borderWidth:1
                                
                            }}
                            placeholder='Electronics, cars, phones'
                        />



                        {/* DESCRIPTION */}

                        <FormControl.Label
                            _text={{
                                fontSize:"12px",
                                fontWeight:"bold",
                                color:Colors.black
    
                            }}
                        >DESCRIPTION</FormControl.Label>
                        <Input 
                            type='text'
                            borderWidth={0.2}
                            borderColor={Colors.main}
                            bg={Colors.subGreen}
                            py={3}
                            color={Colors.main}
                            fontSize={15}
                            onChange={(e)=>setDescription(e.target.value)}
                            _focus={{
                                bg:Colors.subGreen,
                                borderColor:Colors.main,
                                borderWidth:1
                                
                            }}
                            
                        />

                        {/* AMOUNT */}

                        <FormControl.Label
                            _text={{
                                fontSize:"12px",
                                fontWeight:"bold",
                                color:Colors.black
    
                            }}
                        >AMOUNT</FormControl.Label>
                        <Input 
                            type='number'
                            borderWidth={0.2}
                            borderColor={Colors.main}
                            bg={Colors.subGreen}
                            py={3}
                            color={Colors.main}
                            fontSize={15}
                            onChange={(e)=>setPrice(e.target.value)}
                            _focus={{
                                bg:Colors.subGreen,
                                borderColor:Colors.main,
                                borderWidth:1
                                
                            }}
                        />
                    </FormControl>
              
            <Buttone bg={Colors.main} color={Colors.white} style={{padding:5}} onPress={PostProduct}>SUBMIT</Buttone>
            </VStack>
        </ScrollView>
    </Box>
  )
}


