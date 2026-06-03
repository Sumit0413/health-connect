import { View, TextInput, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#666" style={styles.icon} />
        <TextInput 
          placeholder="Search Doctor, Medicines..."
          placeholderTextColor="#999"
          style={styles.input} 
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => console.log(search)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  }
});