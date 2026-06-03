import { Stack, router, useSegments } from "expo-router";
import { useEffect } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppointmentProvider } from "../context/AppointmentContext";
import { QRConnectionProvider } from "../context/QRConnectionContext";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import "../global.css";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup';

    if (!user && !inAuthGroup) {
      // Redirect to login if unauthenticated and trying to access app
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to app if authenticated and trying to access login/signup
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="doctors-list" />
      <Stack.Screen name="book-appointment" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="patient-report" />
      <Stack.Screen name="login" options={{ animation: 'fade' }} />
      <Stack.Screen name="signup" options={{ animation: 'fade' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppointmentProvider>
          <QRConnectionProvider>
            <RootLayoutNav />
          </QRConnectionProvider>
        </AppointmentProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

