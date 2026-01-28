import { View, TextInput } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';


export default function Search() {
    const [search ,Setsearch]=useState();
  return (
    <View>
      <View style={{
        flexDirection:"row",alignItems:"center",gap:8, margin:15, padding: 6, borderWidth:1,
         borderColor:"#ccc", borderRadius:8}}>
     <Feather name="search" size={20} color="gray" />
        <TextInput placeholder="Search Doctor"
        style={{width:"100%"}} 
        onChangeText={(value)=>(Setsearch(value))}
        onSubmitEditing={()=>(console.log(search))}
        />
      </View>
    </View>
  )
}