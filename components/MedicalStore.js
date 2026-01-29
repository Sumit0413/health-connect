import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

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
    <View className="mt-5 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Nearby Medical Stores</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MedicalStoreData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="mr-4 bg-white rounded-xl border border-gray-200 w-48 shadow-sm">
            <Image
              source={item.uri}
              className="w-full h-32 rounded-t-xl"
              resizeMode="cover"
            />

            {/* Store Info */}
            <View className="p-3">
              <Text
                className="text-lg font-bold text-gray-800"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">Open 24/7</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
