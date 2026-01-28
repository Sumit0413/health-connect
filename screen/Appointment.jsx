import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, Feather, FontAwesome, FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Appointment() {
  const route = useRoute();
  const navigation = useNavigation();
  const doctor = route.params?.doctor;

  if (!doctor) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-400">No doctor data available</Text>
      </View>
    );
  }

  // Updated stats to look cleaner but stay in your black/gray theme
  const stats = [
    { label: "Patients", value: "1.2k+", icon: "user-group", lib: FontAwesome6 },
    { label: "Experience", value: "8 Yrs", icon: "award", lib: Feather },
    { label: "Rating", value: doctor.rating, icon: "star", lib: FontAwesome },
    { label: "Reviews", value: "80+", icon: "message-bulleted", lib: MaterialCommunityIcons },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* HEADER - CLEAN & MINIMAL */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Doctor Details</Text>
        <TouchableOpacity className="p-1">
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* HERO SECTION */}
        <View className="px-6 mt-4">
          <View className="flex-row items-center bg-gray-50 p-5 rounded-[30px] border border-gray-100 shadow-sm">
            <Image
              source={doctor.image}
              style={{ width: 110, height: 110 }}
              className="rounded-2xl bg-gray-200"
            />
            <View className="flex-1 ml-5">
              <Text className="text-2xl font-bold text-gray-900">{doctor.name}</Text>
              <Text className="text-gray-500 font-medium text-md">{doctor.specialization}</Text>
              
              <View className="flex-row items-center mt-3 bg-white self-start px-3 py-1 rounded-full border border-gray-100">
                <SimpleLineIcons name="location-pin" size={12} color="black" />
                <Text className="text-gray-600 text-xs ml-1" numberOfLines={1}>{doctor.address}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* STATS ROW - CUSTOM THEME STYLE */}
        <View className="flex-row justify-between px-6 mt-8">
          {stats.map((stat, index) => {
            const IconLib = stat.lib;
            return (
              <View key={index} className="items-center" style={{ width: width * 0.2 }}>
                <View className="bg-gray-100 w-12 h-12 items-center justify-center rounded-2xl mb-2">
                  <IconLib name={stat.icon} size={20} color="black" />
                </View>
                <Text className="font-bold text-gray-900">{stat.value}</Text>
                <Text className="text-[10px] text-gray-400 uppercase tracking-tighter">{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* ABOUT SECTION */}
        <View className="px-6 mt-8">
          <Text className="text-xl font-bold text-gray-900">About Me</Text>
          <Text className="text-gray-600 mt-2 leading-6 text-[15px]">
            {doctor.about || "Providing expert medical care with a focus on patient comfort and advanced treatment methods."}
          </Text>
        </View>

        {/* WORKING HOURS - BOLD & CLEAR */}
        <View className="px-6 mt-8">
          <Text className="text-xl font-bold text-gray-900 mb-4">Working Hours</Text>
          <View className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-500">Monday - Friday</Text>
              <Text className="font-bold">{doctor.availableTime || "09:00 - 17:00"}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Saturday - Sunday</Text>
              <Text className="font-bold">09:00 - 13:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOOKING BUTTON - STAYING IN YOUR THEME (BLACK) */}
      <View className="absolute bottom-0 w-full bg-white px-6 pt-4 pb-8 border-t border-gray-100">
        <TouchableOpacity 
          activeOpacity={0.8}
          className="bg-black h-16 rounded-2xl items-center justify-center shadow-lg"
          onPress={() => console.log("Booking:", doctor.name)}
        >
          <Text className="text-white text-lg font-bold">Book Appointment</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}