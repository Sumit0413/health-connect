import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function HomeCarousel() {
  const { width } = Dimensions.get('window');
  
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
    <View style={styles.container}>
      <Carousel
        loop
        width={width} 
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slideContainer}> 
            <View style={styles.cardContainer}>
              
              {/* 1. The Image */}
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />

              {/* 2. Dark Overlay (Makes text readable) */}
              <View style={styles.overlay} />

              {/* 3. The Text Content */}
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {item.title}
                </Text>
                <Text style={styles.subtitleText}>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  slideContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 24,
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  }
});