import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useRef } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

const CustomTabBarButton = (props: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 100,
      friction: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 6,
    }).start();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable
        onPress={props.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.customButtonContainer}
      >
        <Animated.View
          style={[
            styles.customButton,
            { transform: [{ scale }] }
          ]}
        >
          <Ionicons name="qr-code" size={26} color="white" />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default function TabsLayout() {
  const { role } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
          overflow: "visible",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          href: role === "doctor" ? null : undefined, // Hide for doctors
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: role === "doctor" ? "Schedule" : "Appointments",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr-connect"
        options={{
          title: "QR Connect",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={22} color={color} />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="call"
        options={{
          title: "Call",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -15,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
  customButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#3b82f6",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
    borderWidth: 4,
    borderColor: "white",
  },
});
