
import { createStackNavigator } from '@react-navigation/stack';
import HomeSreen from '../screens/HomeSreen';
import SingleProduct from '../screens/SingleProduct';
import AcceptProduct from '../screens/AcceptProduct';


const Stack=createStackNavigator()

export default function StackNav() {
    
  return (
    <Stack.Navigator 
    initialRouteName="Home"
    screenOptions={{
      headerShown:false,
    }}
  >
    <Stack.Screen name="Home" component={HomeSreen} />
    <Stack.Screen name="Single" component={SingleProduct} />
    <Stack.Screen name="Accept" component={AcceptProduct} />
    
  </Stack.Navigator>
  )

}
