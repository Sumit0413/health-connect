
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
  <Tab.Navigator screenOptions={{headerShown:false}}>
    <Tab.Screen options={{tabBarIcon:({size,color})=>(<Feather name="home" size={24} color="black" />)}} name="Home" component={HomeNavigation} />
   
    <Tab.Screen
    options={{tabBarIcon:({size,color})=>(<Ionicons name="calendar-outline" size={24} color="black" />)}}
    name="Appointment" component={require('../screen/Appointment').default} />
    
    <Tab.Screen
     options={{tabBarIcon:({size,color})=>(<AntDesign name="video-camera" size={24} color="black" />)}}
    name="Call" component={require('../screen/Call').default} />
    
     <Tab.Screen
     options={{tabBarIcon:({size,color})=>(<FontAwesome name="user-md" size={24} color="black" />)}}
     name="Profile" component={require('../screen/Profile').default} />
  </Tab.Navigator>
  )
}