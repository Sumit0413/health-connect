import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function MedicalStore() {
  const MedicalStoreData = [
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      uri: require("../assets/NearbyMedical/Store1.webp"),
    },
    {
      id: 2,
      name: "CityCare Medical",
      uri: require("../assets/NearbyMedical/Store2.webp"),
    },
    {
      id: 3,
      name: "Wellness Drugs",
      uri: require("../assets/NearbyMedical/Store3.webp"),
    },
    {
      id: 4,
      name: "MediTrust Pharmacy",
      uri: require("../assets/NearbyMedical/Store4.webp"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Medical Stores</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MedicalStoreData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardContainer}
            activeOpacity={0.8}
          >
            <Image
              source={item.uri}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Store Info */}
            <View style={styles.infoContainer}>
              <Text
                style={styles.storeName}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={styles.statusText}>Open 24/7</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 20, 
    // we only pad left so the horizontal list scrolls to the edge of the screen on the right
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight: 20, // Add right padding here for the header
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  cardContainer: {
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: 200,
    overflow: 'hidden',
    // Minimal shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    padding: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  }
});
