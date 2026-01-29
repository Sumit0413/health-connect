import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Call() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-gray-800">Video Call</Text>
        <Text className="text-gray-500 mt-2">Coming soon...</Text>
      </View>
    </View>
  );
}
