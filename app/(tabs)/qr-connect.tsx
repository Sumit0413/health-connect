import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQRConnection } from "../../context/QRConnectionContext";

// Safe import for react-native-vision-camera to prevent runtime exceptions on unsupported platforms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let Camera: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Camera = require("react-native-vision-camera").Camera;
} catch (e) {
  // Vision Camera is not supported in this environment
}

export default function QRConnect() {
  const insets = useSafeAreaInsets();
  const {
    connectionState,
    doctorInfo,
    startDoctorSession,
    scanDoctorQR,
    approveAccess,
    resetSession,
  } = useQRConnection();

  const [activeRole, setActiveRole] = useState<"doctor" | "patient">("doctor");
  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Initialize doctor session when doctor tab is selected
  useEffect(() => {
    if (activeRole === "doctor") {
      startDoctorSession();
    } else {
      resetSession();
    }
  }, [activeRole, startDoctorSession, resetSession]);

  // Handle doctor auto-navigation after connection approval
  useEffect(() => {
    if (activeRole === "doctor" && connectionState === "connected") {
      const timer = setTimeout(() => {
        router.push("/patient-report");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [connectionState, activeRole]);

  // Scan line animation for the scanner view
  useEffect(() => {
    if (activeRole === "patient" && connectionState === "idle") {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [activeRole, connectionState, scanAnim]);

  // Pulse animation for "Waiting for Patient..." status dot
  useEffect(() => {
    if (connectionState === "doctor_waiting") {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [connectionState, pulseAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 210],
  });

  const handleSimulateScan = () => {
    scanDoctorQR("DOC123", "SESSION456");
  };

  const handleDecline = () => {
    resetSession();
    router.replace("/(tabs)");
  };

  const qrDataString = JSON.stringify({
    doctorId: "DOC123",
    sessionId: "SESSION456",
  });

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-slate-800">QR Secure Share</Text>
        <TouchableOpacity
          onPress={() => {
            resetSession();
            router.replace("/(tabs)");
          }}
          className="p-1 rounded-full bg-slate-100"
        >
          <Ionicons name="close" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Segmented Control Role Switcher */}
      <View className="px-6 pt-4 pb-2 bg-white">
        <View className="flex-row bg-slate-100 p-1.5 rounded-xl">
          <TouchableOpacity
            onPress={() => setActiveRole("doctor")}
            className="flex-1 py-2.5 rounded-lg flex-row justify-center items-center"
            style={activeRole === "doctor" ? [styles.bgWhite, styles.shadowSm] : null}
          >
            <MaterialCommunityIcons
              name="doctor"
              size={18}
              color={activeRole === "doctor" ? "#3b82f6" : "#64748b"}
              style={{ marginRight: 6 }}
            />
            <Text
              className={`font-semibold text-sm ${
                activeRole === "doctor" ? "text-slate-800" : "text-slate-500"
              }`}
            >
              Doctor Portal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveRole("patient")}
            className="flex-1 py-2.5 rounded-lg flex-row justify-center items-center"
            style={activeRole === "patient" ? [styles.bgWhite, styles.shadowSm] : null}
          >
            <Ionicons
              name="qr-code-outline"
              size={18}
              color={activeRole === "patient" ? "#3b82f6" : "#64748b"}
              style={{ marginRight: 6 }}
            />
            <Text
              className={`font-semibold text-sm ${
                activeRole === "patient" ? "text-slate-800" : "text-slate-500"
              }`}
            >
              Patient Portal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {activeRole === "doctor" ? (
          /* DOCTOR FLOW */
          <View className="px-6 py-6 items-center">
            {/* Doctor Info Card */}
            <View
              className="bg-white rounded-2xl p-5 w-full border border-slate-100 items-center mb-6"
              style={styles.shadowSm}
            >
              <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-3">
                <Ionicons name="person" size={32} color="#3b82f6" />
              </View>
              <Text className="text-xl font-bold text-slate-800">
                {doctorInfo.name}
              </Text>
              <Text className="text-sm font-semibold text-blue-600 mt-0.5">
                {doctorInfo.specialization}
              </Text>
              <Text className="text-xs text-slate-400 mt-1">
                {doctorInfo.hospital}
              </Text>
            </View>

            {/* QR Code Container */}
            <View
              className="bg-white rounded-2xl p-6 w-full border border-slate-100 items-center mb-6"
              style={styles.shadowSm}
            >
              <View className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <QRCode
                  value={qrDataString}
                  size={200}
                  color="black"
                  backgroundColor="white"
                  onError={() => {
                    console.log("QR Code generation failed, fallback loading...");
                  }}
                />
              </View>
              <Text className="text-xs text-slate-400 text-center px-4 mt-5 leading-relaxed font-medium">
                {"Ask the patient to scan this QR code to securely share their medical records."}
              </Text>
            </View>

            {/* Status Card */}
            <View className="w-full">
              {connectionState === "connected" ? (
                <View className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex-row items-center">
                  <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center">
                    <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                  </View>
                  <View className="ml-4">
                    <Text className="text-emerald-800 font-bold text-base">
                      Patient Connected Successfully
                    </Text>
                    <Text className="text-emerald-600 text-xs mt-0.5">
                      Redirecting to medical dashboard...
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  className="border rounded-2xl p-5 flex-row items-center"
                  style={{
                    backgroundColor: "rgba(239, 246, 255, 0.5)",
                    borderColor: "rgba(219, 234, 254, 0.5)",
                  }}
                >
                  <Animated.View
                    style={{ opacity: pulseAnim }}
                    className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
                  >
                    <ActivityIndicator size="small" color="#3b82f6" />
                  </Animated.View>
                  <View className="ml-4">
                    <Text className="text-slate-700 font-bold text-base">
                      Waiting for Patient...
                    </Text>
                    <Text className="text-slate-400 text-xs mt-0.5">
                      Doctor session is active and listening
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        ) : (
          /* PATIENT FLOW */
          <View className="px-6 py-6">
            {connectionState === "idle" ||
            connectionState === "doctor_waiting" ||
            connectionState === "patient_scanning" ? (
              /* SCANNING STATE (MOCK Viewfinder + Simulator) */
              <View className="items-center">
                <Text className="text-lg font-bold text-slate-800 text-center mt-2">
                  {"Scan Doctor's QR Code"}
                </Text>
                <Text className="text-sm text-slate-400 text-center px-6 mt-1 mb-6">
                  {"Align the QR code within the framing lines to establish a secure link."}
                </Text>

                {/* Viewfinder Container */}
                <View className="w-[240px] h-[240px] relative items-center justify-center mb-8">
                  {/* Viewfinder Frame (Simulated camera feed) */}
                  <View
                    className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800 items-center justify-center"
                    style={styles.shadowLgGray}
                  >
                    <View className="w-[180px] h-[180px] border border-dashed border-slate-500 rounded-xl items-center justify-center opacity-40">
                      <Ionicons name="qr-code-outline" size={80} color="white" />
                    </View>

                    {/* Animated Scan Line */}
                    <Animated.View
                      style={[
                        { transform: [{ translateY }] },
                        styles.shadowLg,
                      ]}
                      className="absolute left-3 right-3 h-[3px] bg-blue-500 rounded-full"
                    />
                  </View>

                  {/* Corner Brackets for Viewfinder */}
                  <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
                  <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
                  <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
                  <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
                </View>

                {/* Simulator Trigger */}
                <TouchableOpacity
                  onPress={handleSimulateScan}
                  activeOpacity={0.8}
                  className="w-full bg-blue-600 py-4 rounded-xl items-center mb-3"
                  style={styles.shadowLg}
                >
                  <Text className="text-white font-bold text-base">
                    Simulate Successful Scan
                  </Text>
                </TouchableOpacity>
                <Text className="text-xs text-slate-400 text-center font-medium">
                  {"Tap to simulate scanning the doctor's active QR code"}
                </Text>
              </View>
            ) : (
              /* DOCTOR DETAILS SCREEN (POST-SCAN) */
              <View className="py-4">
                <View
                  className="bg-white border border-slate-100 rounded-2xl p-6 items-center mb-6"
                  style={styles.shadowSm}
                >
                  <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4">
                    <Ionicons name="person" size={40} color="#3b82f6" />
                  </View>
                  <Text className="text-2xl font-bold text-slate-800 text-center">
                    {doctorInfo.name}
                  </Text>
                  <Text className="text-base font-semibold text-blue-600 mt-1">
                    {doctorInfo.specialization}
                  </Text>
                  <Text className="text-sm text-slate-400 mt-1">
                    {doctorInfo.hospital}
                  </Text>

                  <View className="h-px bg-slate-100 w-full my-6" />

                  <Text className="text-center text-slate-600 text-sm leading-relaxed px-2">
                    {`${doctorInfo.name} is requesting temporary access to your medical records for consultation purposes.`}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View className="space-y-3">
                  <TouchableOpacity
                    onPress={approveAccess}
                    activeOpacity={0.8}
                    className="w-full bg-blue-600 py-4 rounded-xl items-center"
                    style={styles.shadowLg}
                  >
                    <Text className="text-white font-bold text-base">
                      Allow Access
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleDecline}
                    activeOpacity={0.8}
                    className="w-full bg-white border border-slate-200 py-4 rounded-xl items-center mt-3"
                  >
                    <Text className="text-slate-600 font-bold text-base">
                      Decline
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bgWhite: {
    backgroundColor: "white",
  },
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
  shadowLgGray: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
});


