import { View, Text, StyleSheet } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const TopNav = () => {
  return (
    <View style={styles.mainContainer}>
      
      {/* 1. Header Row (Location + Arrow) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>Location</Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
      </View>

      {/* 2. Main Row (Pin + City ....... Bell) */}
      <View style={styles.rowContainer}>
        
        {/* Left side: Icon + City Name */}
        <View style={styles.locationWrapper}>
          <EvilIcons name="location" size={20} color="black" />
          <Text style={styles.cityText}>Jamshedpur, India</Text>
        </View>

        {/* Right side: Bell Icon */}
        <Octicons name="bell" size={20} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10, 
    backgroundColor: "white",
  },
  
  // ✅ ADDED THIS: Aligns "Location" and "Arrow" horizontally
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 10, // Aligns with the location icon below
    marginBottom: 5,
  },
  
  headerLabel: {
    fontSize: 14,          
    fontWeight: '600',
    color: '#6B7280', // Gray color looks more like a "Label"
    marginRight: 4,   // Adds space between text and arrow
  },
  
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes Bell to the far right
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  cityText: {
    fontSize: 16,     
    fontWeight: 'bold', 
    marginLeft: 2, 
    color: '#111827', 
  }
});