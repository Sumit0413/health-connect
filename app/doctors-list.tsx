import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { doctors } from "../data/doctordata";

export default function DoctorsList() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const category = (params.category as string) || "Specialist";

  const filteredDoctors = doctors.filter(
    (doctor: any) => doctor.category === category,
  );

  const renderDoctor = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-white rounded-3xl p-4 mb-5 shadow-xl shadow-slate-200 border border-slate-50 flex-row"
      onPress={() =>
        router.push({
          pathname: "/book-appointment",
          params: { doctorId: item.id },
        })
      }
    >
      {/* IMAGE CONTAINER */}
      <View className="relative">
        <Image
          source={item.image}
          style={{ width: 100, height: 110 }}
          className="rounded-2xl bg-slate-100"
          resizeMode="cover"
        />
        <View className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded-lg flex-row items-center">
          <MaterialIcons name="star" size={14} color="#fbbf24" />
          <Text className="text-[10px] font-bold ml-0.5">{item.rating}</Text>
        </View>
      </View>

      {/* INFO SECTION */}
      <View className="flex-1 ml-4 justify-between">
        <View>
          <View className="flex-row justify-between items-start">
            <Text
              className="text-lg font-bold text-slate-800 flex-1 mr-2"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <TouchableOpacity className="bg-slate-50 p-2 rounded-full">
              <Ionicons name="heart-outline" size={18} color="#ef4444" />
            </TouchableOpacity>
          </View>

          <Text className="text-blue-600 font-medium text-xs uppercase tracking-wider -mt-1">
            {item.specialization}
          </Text>

          <View className="flex-row items-center mt-2">
            <SimpleLineIcons name="location-pin" size={12} color="#64748b" />
            <Text
              className="text-slate-500 text-xs ml-1 flex-1"
              numberOfLines={1}
            >
              {item.address}
            </Text>
          </View>
        </View>

        {/* BOTTOM ACTION ROW */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-slate-400 text-[10px] italic">
            Available Today
          </Text>
          <View className="bg-blue-50 px-3 py-1.5 rounded-xl">
            <Text className="text-blue-600 font-bold text-xs text-center">
              Book Now
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center border border-slate-100 rounded-xl"
        >
          <Ionicons name="chevron-back" size={20} color="#1e293b" />
        </TouchableOpacity>

        <Text className="text-xl font-extrabold text-slate-800">
          {category}
        </Text>

        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Ionicons name="options-outline" size={20} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoctor}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="mt-20 items-center">
            <Text className="text-slate-400">
              No doctors found in this category.
            </Text>
          </View>
        )}
      />
    </View>
  );
}
