import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppointments } from "../../context/AppointmentContext";

export default function MyAppointments() {
  const insets = useSafeAreaInsets();
  const { appointments } = useAppointments();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const renderAppointmentCard = ({ item }: { item: any }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm">
      {/* Doctor Info */}
      <View className="flex-row items-center">
        <Image
          source={
            typeof item.doctorImage === "string"
              ? { uri: item.doctorImage }
              : item.doctorImage
          }
          style={{ width: 60, height: 60 }}
          className="rounded-xl bg-gray-200"
        />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-gray-900">
            {item.doctorName}
          </Text>
          <Text className="text-gray-500 text-sm">{item.specialization}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={12} color="#9ca3af" />
            <Text className="text-gray-400 text-xs ml-1" numberOfLines={1}>
              {item.address}
            </Text>
          </View>
        </View>
        <View className="px-3 py-1.5 rounded-full bg-blue-100">
          <Text className="text-xs font-semibold text-blue-600">Upcoming</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 my-4" />

      {/* Date and Time */}
      <View className="flex-row">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
            <Ionicons name="calendar-outline" size={18} color="#374151" />
          </View>
          <View className="ml-3">
            <Text className="text-xs text-gray-400">Date</Text>
            <Text className="text-sm font-semibold text-gray-800">
              {formatDate(item.date)}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center">
            <Ionicons name="time-outline" size={18} color="#374151" />
          </View>
          <View className="ml-3">
            <Text className="text-xs text-gray-400">Time</Text>
            <Text className="text-sm font-semibold text-gray-800">
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View className="items-center justify-center py-20">
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="calendar-outline" size={40} color="#9ca3af" />
      </View>
      <Text className="text-xl font-bold text-gray-800 mb-2">
        No Appointments
      </Text>
      <Text className="text-gray-500 text-center px-10">
        You don't have any appointments. Book a doctor to get started!
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* HEADER */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">
          My Appointments
        </Text>
        <Text className="text-gray-500 mt-1">
          {appointments.length} appointments
        </Text>
      </View>

      {/* APPOINTMENTS LIST */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentCard}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyState}
      />
    </View>
  );
}
