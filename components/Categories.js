import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>

      <FlatList
        data={CategoriesData}
        numColumns={4}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={0.7}
            onPress={() => {
              router.push({
                pathname: "/doctors-list",
                params: { category: item.title },
              });
            }}
          >
            <View style={styles.iconContainer}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.itemTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '22%',
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 24,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 28,
    height: 28,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  }
});
