import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { doctors } from "../data/doctordata";

export default function BookDoctors() {
  const DoctorsData = doctors.slice(0, 4); // Get first 4 doctors for preview

  return (
    <View style={styles.container}>
      {/* 1. THE BANNER */}
      <View style={styles.bannerContainer}>
        <Image
          source={require("../assets/Doctors/Banner.png")}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerOverlay} />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerSubtitle}>
            Need a Checkup?
          </Text>
          <Text style={styles.bannerTitle}>
            Book Appointment
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            activeOpacity={0.8}
          >
            <Text style={styles.bannerButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SECTION HEADER */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Book Doctor</Text>
        <TouchableOpacity onPress={() => router.push("/doctors-list")}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* 3. MODERN GRID LIST */}
      <FlatList
        data={DoctorsData}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorCard}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/book-appointment",
                params: { doctorId: item.id },
              })
            }
          >
            {/* Image + Rating */}
            <View style={{ position: 'relative' }}>
              <Image
                source={item.image}
                style={styles.doctorImage}
                resizeMode="cover"
              />

              {/* --------- NEW RATING DESIGN (Golden Pill) --------- */}
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={10} color="#000" />
                <Text style={styles.ratingText}>
                  {item.rating}
                </Text>
              </View>
              {/* ---------------------------------------------------- */}
            </View>

            {/* Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>
                  {item.specialization}
                </Text>
              </View>

              <Text
                style={styles.doctorName}
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text style={styles.doctorMeta}>
                {item.experience} • {item.category}
              </Text>
            </View>

            {/* Small Button */}
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() =>
                router.push({
                  pathname: "/book-appointment",
                  params: { doctorId: item.id },
                })
              }
            >
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
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
    marginBottom: 40,
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 32,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  bannerImage: {
    width: '100%',
    height: 160,
    opacity: 0.8,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.9,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  bannerButton: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bannerButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
    gap: 12,
  },
  doctorCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  doctorImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  ratingPill: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000',
    marginLeft: 4,
  },
  detailsContainer: {
    marginTop: 12,
  },
  specialtyTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  specialtyText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  doctorName: {
    color: '#000',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: -0.5,
  },
  doctorMeta: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
  },
  bookButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  }
});
