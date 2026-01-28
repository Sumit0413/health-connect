import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { doctors } from "../data/doctordata";

export default function BookDoctors() {
  const DoctorsData = doctors.slice(0, 4); // Get first 4 doctors for preview
  const navigation = useNavigation();
  return (
    <View className="px-5 mt-5 mb-10">
      {/* 1. THE BANNER */}
      <View className="relative shadow-sm mb-8">
        <Image
          source={require("../assets/Doctors/Banner.png")}
          className="w-full h-44 rounded-2xl"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/10 rounded-2xl" />
        <View className="absolute top-0 left-0 w-full h-full justify-center px-6">
          <Text className="text-white text-lg font-semibold mb-1 opacity-90">
            Need a Checkup?
          </Text>
          <Text className="text-white text-2xl font-bold mb-4">
            Book Appointment
          </Text>
          <TouchableOpacity
            className="bg-blue-500 self-start py-2 px-5 rounded-full shadow-md active:opacity-80"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-sm">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SECTION HEADER */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">Book Doctor</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DoctorsList")}>
          <Text className="text-blue-600 font-semibold">See All</Text>
        </TouchableOpacity>
      </View>

      {/* 3. MODERN GRID LIST */}
      <FlatList
        data={DoctorsData}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 12 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm mb-4"
            activeOpacity={0.7}
          >
            {/* Image + Rating */}
            <View className="relative">
              <Image
                source={item.image}
                className="w-full h-28 rounded-xl bg-gray-50"
                resizeMode="cover"
              />

              {/* --------- NEW RATING DESIGN (Golden Pill) --------- */}
              <View className="absolute top-3 right-3 bg-amber-50 border border-amber-100 px-2 py-[2px] rounded-full flex-row items-center shadow-sm">
                <Ionicons name="star" size={10} color="#F59E0B" />
                <Text className="text-[10px] font-extrabold text-amber-600 ml-1">
                  {item.rating}
                </Text>
              </View>
              {/* ---------------------------------------------------- */}
            </View>

            {/* Details */}
            <View className="mt-3">
              <View className="self-start bg-blue-50 px-2 py-1 rounded-md mb-1">
                <Text className="text-blue-600 text-[10px] font-bold uppercase tracking-wide">
                  {item.specialization}
                </Text>
              </View>

              <Text
                className="text-gray-900 font-bold text-base"
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text className="text-gray-400 text-xs mt-1">
                {item.experience} • {item.category}
              </Text>
            </View>

            {/* Small Button */}
            <TouchableOpacity
              className="mt-3 w-full bg-blue-100 py-2 rounded-lg items-center"
              onPress={() =>
                navigation.navigate("Appointment", { doctor: item })
              }
            >
              <Text className="text-blue-600 font-bold text-xs">Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
