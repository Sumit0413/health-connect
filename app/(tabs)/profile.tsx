import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out of HealthConnect?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const menuItems = [
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Address, contact info, emergency contacts",
      icon: "person-outline",
    },
    {
      id: "records",
      title: "My Health History",
      subtitle: "Allergies, medications, lab reports",
      icon: "medical-outline",
    },
    {
      id: "sharing",
      title: "Secure Sharing Settings",
      subtitle: "Manage access permissions",
      icon: "shield-checkmark-outline",
    },
    {
      id: "settings",
      title: "App Settings",
      subtitle: "Notifications, biometric login, language",
      icon: "settings-outline",
    },
    {
      id: "help",
      title: "Help & Support",
      subtitle: "FAQs, contact support, terms of service",
      icon: "help-circle-outline",
    },
  ];

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-900">My Profile</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="w-10 h-10 items-center justify-center border border-gray-100 rounded-xl"
        >
          <Ionicons name="home-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View className="bg-white px-6 py-6 items-center">
          {/* Avatar circle */}
          <View className="relative">
            <View className="w-24 h-24 bg-black rounded-full items-center justify-center">
              <Text className="text-white text-3xl font-bold">
                {user ? getInitials(user.name) : "U"}
              </Text>
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full items-center justify-center border-2 border-white">
              <Feather name="edit-2" size={12} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-gray-900 mt-4">
            {user?.name || "User"}
          </Text>
          <Text className="text-sm text-gray-500 font-medium mt-1">
            {user?.email || "email@example.com"}
          </Text>
          <Text className="text-[10px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full font-bold mt-3 uppercase">
            ROLE: {user?.role || "Patient"}
          </Text>
        </View>

        {user?.role === 'patient' && (
          <>
            {/* Vitals Quick Grid */}
            <View className="px-6 py-4 flex-row justify-between">
              {/* Blood Group */}
              <View
                className="bg-gray-50 border border-gray-100 p-4 rounded-2xl items-center flex-1 mr-3"
                style={styles.shadowSm}
              >
                <View className="w-9 h-9 bg-white rounded-xl items-center justify-center mb-2 border border-gray-100">
                  <Ionicons name="water" size={16} color="black" />
                </View>
                <Text className="text-[10px] text-gray-400 font-bold uppercase">
                  Blood
                </Text>
                <Text className="text-sm font-bold text-gray-800 mt-0.5">B+</Text>
              </View>

              {/* Height */}
              <View
                className="bg-gray-50 border border-gray-100 p-4 rounded-2xl items-center flex-1 mr-3"
                style={styles.shadowSm}
              >
                <View className="w-9 h-9 bg-white rounded-xl items-center justify-center mb-2 border border-gray-100">
                  <MaterialCommunityIcons name="ruler" size={16} color="black" />
                </View>
                <Text className="text-[10px] text-gray-400 font-bold uppercase">
                  Height
                </Text>
                <Text className="text-sm font-bold text-gray-800 mt-0.5">
                  178 cm
                </Text>
              </View>

              {/* Weight */}
              <View
                className="bg-gray-50 border border-gray-100 p-4 rounded-2xl items-center flex-1"
                style={styles.shadowSm}
              >
                <View className="w-9 h-9 bg-white rounded-xl items-center justify-center mb-2 border border-gray-100">
                  <MaterialCommunityIcons
                    name="scale-bathroom"
                    size={16}
                    color="black"
                  />
                </View>
                <Text className="text-[10px] text-gray-400 font-bold uppercase">
                  Weight
                </Text>
                <Text className="text-sm font-bold text-gray-800 mt-0.5">
                  72 kg
                </Text>
              </View>
            </View>

            {/* Emergency Card */}
            <View className="px-6 mb-6">
              <View
                className="bg-gray-50 rounded-3xl border border-gray-100 p-5"
                style={styles.shadowSm}
              >
                <View className="flex-row items-center mb-3">
                  <Ionicons name="alert-circle-outline" size={20} color="black" />
                  <Text className="text-sm font-bold text-gray-900 ml-2">
                    Emergency Medical Card
                  </Text>
                </View>

                <View className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-xs text-gray-500 font-medium">Allergies</Text>
                  <Text className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                    Penicillin
                  </Text>
                </View>
                <View className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-xs text-gray-500 font-medium">Condition</Text>
                  <Text className="text-xs font-bold text-gray-800">Asthma (Mild)</Text>
                </View>
                <View className="flex-row justify-between py-2 border-b border-gray-100">
                  <Text className="text-xs text-gray-500 font-medium">Primary Doctor</Text>
                  <Text className="text-xs font-bold text-gray-800">Dr. Vikram Mehta</Text>
                </View>
                <View className="flex-row justify-between pt-2">
                  <Text className="text-xs text-gray-500 font-medium">Emergency Link</Text>
                  <Text className="text-xs font-bold text-gray-800">Amit Sharma (Father)</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Menu Items */}
        <View className="px-6 mb-6 mt-4">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
            Settings & Security
          </Text>

          <View
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
            style={styles.shadowSm}
          >
            {menuItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between p-4"
                >
                  <View className="flex-row items-center flex-1">
                    <View
                      className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100"
                    >
                      <Ionicons name={item.icon as any} size={18} color="black" />
                    </View>
                    <View className="flex-1 mr-2">
                      <Text className="font-bold text-gray-800 text-sm">
                        {item.title}
                      </Text>
                      <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
                </TouchableOpacity>
                {index < menuItems.length - 1 && (
                  <View className="h-px bg-gray-100 w-full" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 mt-2">
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full bg-black py-4 rounded-xl items-center justify-center"
          >
            <Text className="text-white font-bold text-base">Log Out</Text>
          </TouchableOpacity>
          <Text className="text-center text-[10px] text-gray-300 font-semibold mt-4">
            Version 1.0.0 (Build 90) • Secured by HealthConnect
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowSm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
});
