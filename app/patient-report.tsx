import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQRConnection } from "../context/QRConnectionContext";

export default function PatientReportScreen() {
  const insets = useSafeAreaInsets();
  const { patientData, resetSession } = useQRConnection();

  const handleDone = () => {
    resetSession();
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleDone}
            className="p-1 rounded-full bg-slate-100 mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#64748b" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">Health Report</Text>
        </View>
        <TouchableOpacity
          onPress={handleDone}
          className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100"
        >
          <Text className="text-xs font-bold text-blue-600">Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* PREMIUM AI HEALTH SUMMARY CARD */}
        <View style={styles.aiCard} className="rounded-3xl p-5 mb-6 overflow-hidden">
          {/* Subtle Glow Overlay */}
          <View style={styles.aiGlow} />

          {/* Card Header */}
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="sparkles" size={20} color="#fbbf24" />
              <Text className="text-white font-bold text-lg ml-2">
                AI Health Summary
              </Text>
            </View>
            <View
              className="px-2.5 py-0.5 rounded-full border"
              style={{ backgroundColor: "rgba(251, 191, 36, 0.2)", borderColor: "rgba(251, 191, 36, 0.3)" }}
            >
              <Text className="text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                Premium AI
              </Text>
            </View>
          </View>

          {/* AI Content */}
          <Text className="text-blue-50 text-sm leading-relaxed font-medium">
            {"Patient has a history of asthma and seasonal allergies. No major surgeries recorded. Currently using inhalers. Risk level is low. Recommend reviewing respiratory history during consultation."}
          </Text>

          <View
            className="my-3.5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", height: 1 }}
          />

          {/* AI Subtitle/Hint */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-[10px] font-semibold"
              style={{ color: "rgba(191, 219, 254, 0.8)" }}
            >
              Updated just now • Powered by HealthAI
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark" size={12} color="#34d399" />
              <Text className="text-emerald-300 text-[10px] font-bold ml-1">
                Verified Record
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION 1: PATIENT INFORMATION */}
        <View
          className="bg-white rounded-2xl border border-slate-100 p-5 mb-5"
          style={styles.shadowSm}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-blue-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="person-outline" size={18} color="#3b82f6" />
            </View>
            <Text className="text-base font-bold text-slate-800">
              Patient Information
            </Text>
          </View>

          {/* Name & Age Row */}
          <View className="flex-row justify-between items-center py-2 border-b border-slate-50">
            <Text className="text-sm text-slate-400 font-semibold">Name</Text>
            <Text className="text-sm font-bold text-slate-700">{patientData.name}</Text>
          </View>

          <View className="flex-row justify-between items-center py-2 border-b border-slate-50">
            <Text className="text-sm text-slate-400 font-semibold">Age / Gender</Text>
            <Text className="text-sm font-bold text-slate-700">
              {patientData.age} yrs / {patientData.gender}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-2 border-b border-slate-50">
            <Text className="text-sm text-slate-400 font-semibold">Blood Group</Text>
            <Text className="text-sm font-bold text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full text-xs">
              {patientData.bloodGroup}
            </Text>
          </View>

          {/* Height and Weight Row */}
          <View className="flex-row justify-between items-center pt-2">
            <View className="flex-row space-x-4">
              <Text className="text-sm text-slate-400 font-semibold mr-4">Height / Weight</Text>
            </View>
            <Text className="text-sm font-bold text-slate-700">
              {patientData.height} / {patientData.weight}
            </Text>
          </View>
        </View>

        {/* SECTION 2: MEDICAL HISTORY */}
        <View
          className="bg-white rounded-2xl border border-slate-100 p-5 mb-5"
          style={styles.shadowSm}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-red-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="medical-outline" size={18} color="#ef4444" />
            </View>
            <Text className="text-base font-bold text-slate-800">
              Medical History
            </Text>
          </View>

          {/* Illnesses */}
          <View className="mb-3">
            <Text className="text-xs text-slate-400 font-bold uppercase mb-1.5">
              Illnesses & Chronic Conditions
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {patientData.medicalHistory.map((item, idx) => (
                <View key={idx} className="bg-slate-100 px-3 py-1.5 rounded-lg">
                  <Text className="text-xs font-semibold text-slate-700">{item}</Text>
                </View>
              ))}
              {patientData.medicalHistory.length === 0 && (
                <Text className="text-xs text-slate-400">No chronic illnesses</Text>
              )}
            </View>
          </View>

          {/* Allergies */}
          <View className="mt-2">
            <Text className="text-xs text-slate-400 font-bold uppercase mb-1.5">
              Known Allergies
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {patientData.allergies.map((allergy, idx) => (
                <View key={idx} className="bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex-row items-center">
                  <Ionicons name="warning" size={12} color="#f43f5e" style={{ marginRight: 4 }} />
                  <Text className="text-xs font-bold text-rose-600">{allergy}</Text>
                </View>
              ))}
              {patientData.allergies.length === 0 && (
                <Text className="text-xs text-slate-400">No known allergies</Text>
              )}
            </View>
          </View>
        </View>

        {/* SECTION 3: CURRENT MEDICATIONS & PRESCRIPTIONS */}
        <View
          className="bg-white rounded-2xl border border-slate-100 p-5 mb-5"
          style={styles.shadowSm}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-amber-50 rounded-lg items-center justify-center mr-3">
              <MaterialCommunityIcons name="pill" size={18} color="#f59e0b" />
            </View>
            <Text className="text-base font-bold text-slate-800">
              Medications & Prescriptions
            </Text>
          </View>

          {/* Current Medications */}
          <View className="mb-4">
            <Text className="text-xs text-slate-400 font-bold uppercase mb-2">
              Current Medications
            </Text>
            {patientData.medications.map((med, idx) => (
              <View key={idx} className="flex-row items-center py-1">
                <Ionicons name="play" size={8} color="#f59e0b" style={{ marginRight: 8 }} />
                <Text className="text-xs font-semibold text-slate-700">{med}</Text>
              </View>
            ))}
          </View>

          {/* Recent Prescriptions */}
          <View>
            <Text className="text-xs text-slate-400 font-bold uppercase mb-2">
              Active Prescriptions
            </Text>
            {patientData.prescriptions.map((pres, idx) => (
              <View
                key={idx}
                className="border rounded-xl p-3 mb-2 flex-row items-start"
                style={{
                  backgroundColor: "rgba(255, 251, 235, 0.4)",
                  borderColor: "rgba(253, 230, 138, 0.5)",
                }}
              >
                <Ionicons name="document-text" size={16} color="#d97706" style={{ marginTop: 2, marginRight: 8 }} />
                <Text className="text-xs font-medium text-slate-700 flex-1 leading-relaxed">
                  {pres}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* SECTION 4: LAB REPORTS */}
        <View
          className="bg-white rounded-2xl border border-slate-100 p-5 mb-5"
          style={styles.shadowSm}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-purple-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="flask-outline" size={18} color="#a855f7" />
            </View>
            <Text className="text-base font-bold text-slate-800">
              Lab Reports
            </Text>
          </View>

          {patientData.reports.map((report, idx) => (
            <View key={idx} className="border border-slate-100 rounded-xl p-3 mb-3">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="font-bold text-slate-800 text-xs">{report.name}</Text>
                <Text className="text-[10px] text-slate-400 font-semibold">{report.date}</Text>
              </View>
              <Text className="text-slate-500 text-xs leading-relaxed mt-0.5">
                Result: <Text className="font-semibold text-slate-700">{report.result}</Text>
              </Text>
            </View>
          ))}
        </View>

        {/* SECTION 5: VISIT HISTORY */}
        <View
          className="bg-white rounded-2xl border border-slate-100 p-5"
          style={styles.shadowSm}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-emerald-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="time-outline" size={18} color="#10b981" />
            </View>
            <Text className="text-base font-bold text-slate-800">
              Visit History
            </Text>
          </View>

          {patientData.visitHistory.map((visit, idx) => (
            <View key={idx} className="flex-row">
              {/* Timeline graphic */}
              <View className="items-center mr-4">
                <View className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                {idx < patientData.visitHistory.length - 1 && (
                  <View className="w-0.5 bg-emerald-100 flex-1 my-1" style={{ minHeight: 40 }} />
                )}
              </View>

              {/* Visit Details */}
              <View className="flex-1 pb-4">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-xs text-slate-400 font-bold">{visit.date}</Text>
                  <Text className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {visit.doctor}
                  </Text>
                </View>
                <Text className="font-bold text-slate-800 text-xs mb-1">
                  {visit.diagnosis}
                </Text>
                <Text className="text-slate-500 text-xs leading-relaxed">
                  {visit.notes}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  aiCard: {
    backgroundColor: "#1e3a8a", // Dark blue backup
    // Linear gradient simulation
    borderWidth: 1,
    borderColor: "#3b82f6",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  aiGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2563eb",
    opacity: 0.25,
  },
  shadowSm: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
});
