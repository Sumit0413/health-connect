
import { createStackNavigator } from '@react-navigation/stack';

const Stack= createStackNavigator();
export default function HomeNavigation() {
  return (
   <Stack.Navigator>
    <Stack.Screen name="HomePage" component={require('../screen/HomePage').HomePage} options={{headerShown:false}}/>
    <Stack.Screen name="DoctorsList" component={require('../screen/DoctorsList').default} options={{headerShown:false}}/>
    <Stack.Screen name="MedicalStore" component={require('../screen/MedicalStore').default} options={{headerShown:false}}/>
    <Stack.Screen name="Categories" component={require('../screen/Categories').default} options={{headerShown:false}}/>
   </Stack.Navigator>
  )
}