import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const TopNav = () => {
  return (
    <View style={styles.mainContainer}>
      
      {/* 1. Header Row (Location + Arrow) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>Location</Text>
        <MaterialIcons name="keyboard-arrow-down" size={16} color="#666" />
      </View>

      {/* 2. Main Row (Pin + City ....... Bell) */}
      <View style={styles.rowContainer}>
        
        {/* Left side: Icon + City Name */}
        <TouchableOpacity style={styles.locationWrapper} activeOpacity={0.7}>
          <EvilIcons name="location" size={24} color="#000" style={{ marginLeft: -4 }} />
          <Text style={styles.cityText}>Jamshedpur, India</Text>
        </TouchableOpacity>

        {/* Right side: Bell Icon */}
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Octicons name="bell" size={20} color="#000" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 2,
    marginBottom: 4,
  },
  
  headerLabel: {
    fontSize: 13,          
    fontWeight: '600',
    color: '#888', // Subtle gray
    marginRight: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  cityText: {
    fontSize: 18,     
    fontWeight: '800', 
    marginLeft: 2, 
    color: '#000', 
    letterSpacing: -0.5,
  },

  bellButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },

  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#F5F5F5',
  }
});