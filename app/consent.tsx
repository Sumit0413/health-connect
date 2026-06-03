import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQRConnection } from "../context/QRConnectionContext";

export default function ConsentScreen() {
  const insets = useSafeAreaInsets();
  const { doctorInfo, confirmSharing } = useQRConnection();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sharedItems = [
    { id: "history", title: "Medical History", desc: "Asthma, seasonal allergies, illnesses" },
    { id: "allergies", title: "Allergies", desc: "Penicillin allergy records" },
    { id: "meds", title: "Current Medications", desc: "Active prescriptions (e.g., Albuterol inhaler)" },
    { id: "labs", title: "Lab Reports", desc: "Recent Blood Tests, Chest X-Rays" },
    { id: "prescriptions", title: "Previous Prescriptions", desc: "Past medication histories" },
    { id: "visits", title: "Visit History", desc: "Consultation notes and diagnoses" },
  ];

  const handleConfirm = () => {
    // 1. Mark as connected in context (triggers doctor redirection)
    confirmSharing();
    
    // 2. Show success toast/modal to patient
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    // 3. Return to Patient Home Screen
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-1 rounded-full bg-slate-100 mr-4"
        >
          <Ionicons name="arrow-back" size={20} color="#64748b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Give Consent</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Warning/Confirmation Card */}
        <View className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 flex-row">
          <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-4">
            <Ionicons name="shield-checkmark" size={24} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-800 font-bold text-base leading-snug">
              Secure Record Sharing
            </Text>
            <Text className="text-slate-600 text-sm mt-1 leading-relaxed">
              You are about to share your health records with{" "}
              <Text className="font-bold text-blue-600">{doctorInfo.name}</Text>.
            </Text>
          </View>
        </View>

        {/* Info Header */}
        <Text className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Shared Information
        </Text>

        {/* Checklist Card */}
        <View
          className="bg-white rounded-2xl border border-slate-100 p-4 mb-8"
          style={styles.shadowSm}
        >
          {sharedItems.map((item, index) => (
            <View key={item.id}>
              <View className="flex-row items-center py-3 px-1">
                <View className="w-8 h-8 bg-emerald-50 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={18} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-800 text-sm">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-slate-400 mt-0.5">
                    {item.desc}
                  </Text>
                </View>
              </View>
              {index < sharedItems.length - 1 && (
                <View className="h-px bg-slate-50 w-full" />
              )}
            </View>
          ))}
        </View>

        {/* Security Clause */}
        <View className="flex-row items-center justify-center mb-6 px-4">
          <Ionicons name="lock-closed-outline" size={14} color="#94a3b8" />
          <Text className="text-xs text-slate-400 ml-1.5 text-center font-medium">
            This connection is temporary and encrypted. Access expires in 24 hours.
          </Text>
        </View>

        {/* Confirm Action Button */}
        <TouchableOpacity
          onPress={handleConfirm}
          activeOpacity={0.8}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-8"
          style={styles.shadowLg}
        >
          <Text className="text-white font-bold text-base">
            Confirm Sharing
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseSuccess}
      >
        <View
          className="flex-1 justify-center items-center px-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View
            className="bg-white rounded-3xl p-6 items-center w-full max-w-sm"
            style={styles.shadowXl}
          >
            <View className="w-16 h-16 bg-emerald-50 rounded-full items-center justify-center mb-4">
              <Ionicons name="shield-checkmark" size={36} color="#10b981" />
            </View>
            
            <Text className="text-xl font-bold text-slate-800 text-center">
              Sharing Confirmed!
            </Text>
            
            <Text className="text-sm text-slate-500 text-center mt-2 leading-relaxed">
              Your health records have been successfully shared with {doctorInfo.name}. They can now view your profile on their device.
            </Text>

            <TouchableOpacity
              onPress={handleCloseSuccess}
              className="mt-6 bg-slate-900 w-full py-3 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-sm">
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowSm: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  shadowLg: {
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shadowXl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
});


