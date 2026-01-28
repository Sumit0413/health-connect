import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function HomeCarousel() {
  const { width } = Dimensions.get('window');
  
  // 1. UPDATED DATA: Now includes Title and Subtitle for a Medical App
  const carouselData = [
    {
      id: 1,
      image: require("../assets/images/image.png"),
      title: "Find Best Doctors",
      subtitle: "Book appointments with top specialists near you."
    },
    {
      id: 2,
       image: require('../assets/images/image3.png'),
      
      title: "Order Medicines",
      subtitle: "Get genuine medicines delivered to your doorstep."
    },
    {
      id: 3,
     image: require('../assets/images/image2.png'),
      title: "Lab Tests at Home",
      subtitle: "Schedule diagnostics and health checkups easily."
    },
  ];

  return (
    <View className="items-center mt-5">
      <Carousel
        loop
        width={width} 
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        
        renderItem={({ item }) => (
          <View className="flex-1 px-4 justify-center"> 
            
            {/* Container for Image + Text */}
            <View className="relative w-full h-full rounded-2xl overflow-hidden">
              
              {/* 1. The Image */}
              <Image
                source={item.image}
                className="w-full h-full" 
                resizeMode="cover"
              />

              {/* 2. Dark Overlay (Makes text readable) */}
              <View className="absolute inset-0 bg-black/30" />

              {/* 3. The Text Content (Positioned Absolute) */}
              <View className="absolute bottom-0 left-0 p-5 w-full">
                <Text className="text-white text-2xl font-bold mb-1 shadow-sm">
                  {item.title}
                </Text>
                <Text className="text-gray-100 text-sm font-medium shadow-sm">
                  {item.subtitle}
                </Text>
              </View>

            </View>
          </View>
        )}
      />
    </View>
  );
}