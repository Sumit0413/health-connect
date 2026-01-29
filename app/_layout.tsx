import { Stack } from "expo-router";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppointmentProvider } from "../context/AppointmentContext";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppointmentProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="doctors-list" />
          <Stack.Screen name="book-appointment" />
        </Stack>
      </AppointmentProvider>
    </SafeAreaProvider>
  );
}
