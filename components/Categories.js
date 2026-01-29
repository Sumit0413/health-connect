import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Categories() {
  const CategoriesData = [
    {
      id: 1,
      title: "Teeth",
      image: require("../assets/Categories/Teeth.webp"),
    },
    {
      id: 2,
      title: "Cardio",
      image: require("../assets/Categories/Cardio.webp"),
    },
    {
      id: 3,
      title: "Lungs",
      image: require("../assets/Categories/Lungs.webp"),
    },
    {
      id: 4,
      title: "General",
      image: require("../assets/Categories/Genral.webp"),
    },
    {
      id: 5,
      title: "Brain",
      image: require("../assets/Categories/Brain.webp"),
    },
    {
      id: 6,
      title: "Stomach",
      image: require("../assets/Categories/Stomach.webp"),
    },
    {
      id: 7,
      title: "Child",
      image: require("../assets/Categories/ChildHealth.webp"),
    },
    {
      id: 8,
      title: "Vaccine",
      image: require("../assets/Categories/Vaccine.webp"),
    },
  ];

  return (
    <View className="mt-5 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Categories</Text>
      </View>

      {/* 2. FIX: Use FlatList for a clean Grid Layout */}
      <FlatList
        data={CategoriesData}
        numColumns={4} // Makes it a grid of 4 columns
        columnWrapperStyle={{ justifyContent: "space-between" }} // Spacing between columns
        scrollEnabled={false} // Disable scroll if this is inside a scrollview already
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="items-center mb-4 w-[22%]"
            onPress={() => {
              router.push({
                pathname: "/doctors-list",
                params: { category: item.title },
              });
            }}
          >
            <View className="bg-gray-100 p-3 rounded-full mb-2">
              <Image
                source={item.image}
                className="w-10 h-10 rounded-full" // Adjust size as needed
                resizeMode="contain"
              />
            </View>
            <Text className="text-xs text-center font-medium text-gray-700">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
