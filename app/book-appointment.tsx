import {
    Feather,
    FontAwesome,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppointments } from "../context/AppointmentContext";
import { doctors } from "../data/doctordata";

const { width } = Dimensions.get("window");

// Helper functions for calendar
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

export default function BookAppointment() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const doctorId = params.doctorId as string;
  const doctor = doctors.find((d: any) => d.id.toString() === doctorId);
  const { addAppointment } = useAppointments();

  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const todayDate = new Date();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days: any[] = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, disabled: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === todayDate.toDateString();
      const isPast =
        date <
        new Date(
          todayDate.getFullYear(),
          todayDate.getMonth(),
          todayDate.getDate(),
        );
      const isSunday = date.getDay() === 0;

      days.push({
        day,
        isToday,
        isPast,
        isSunday,
        disabled: isPast || isSunday,
        fullDate: date,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (dayInfo: any) => {
    if (dayInfo.disabled) return;
    setSelectedDate(dayInfo);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(
        "Selection Required",
        "Please select both date and time for your appointment.",
      );
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime || !doctor) return;

    // Create appointment object for backend
    const appointmentData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorImage: doctor.image,
      specialization: doctor.specialization,
      address: doctor.address,
      date: new Date(currentYear, currentMonth, selectedDate.day).toISOString(),
      time: selectedTime,
      // Additional fields for backend
      userId: "current-user-id", // TODO: Get from auth context
    };

    // Add to context (and eventually backend)
    addAppointment(appointmentData);

    setShowConfirmModal(false);

    // Show confirmation alert
    Alert.alert(
      "Booking Confirmed!",
      `Your appointment with ${doctor?.name} is scheduled for ${selectedDate?.day} ${MONTHS[currentMonth]} ${currentYear} at ${selectedTime}`,
      [
        {
          text: "View Appointments",
          onPress: () => router.replace("/(tabs)/appointments"),
        },
        { text: "OK", onPress: () => router.back() },
      ],
    );
  };

  const formatSelectedDate = () => {
    if (!selectedDate?.day) return "";
    return `${selectedDate.day} ${MONTHS[currentMonth]} ${currentYear}`;
  };

  if (!doctor) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Ionicons name="calendar-outline" size={80} color="#e5e7eb" />
        <Text className="text-lg text-gray-400 mt-4">No doctor selected</Text>
        <TouchableOpacity
          className="mt-6 bg-black px-8 py-3 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Stats for doctor info
  const stats = [
    {
      label: "Patients",
      value: "1.2k+",
      icon: "user-group",
      lib: FontAwesome6,
    },
    {
      label: "Experience",
      value: (doctor as any).experience || "8 Yrs",
      icon: "award",
      lib: Feather,
    },
    {
      label: "Rating",
      value: (doctor as any).rating,
      icon: "star",
      lib: FontAwesome,
    },
    {
      label: "Reviews",
      value: "80+",
      icon: "message-bulleted",
      lib: MaterialCommunityIcons,
    },
  ];

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Book Appointment</Text>
        <TouchableOpacity className="p-1">
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* DOCTOR CARD - COMPACT */}
        <View className="px-6 mt-4">
          <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <Image
              source={(doctor as any).image}
              style={{ width: 70, height: 70 }}
              className="rounded-xl bg-gray-200"
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-gray-900">
                {(doctor as any).name}
              </Text>
              <Text className="text-gray-500 font-medium text-sm">
                {(doctor as any).specialization}
              </Text>
              <View className="flex-row items-center mt-1">
                <FontAwesome name="star" size={12} color="#fbbf24" />
                <Text className="text-gray-600 text-xs ml-1">
                  {(doctor as any).rating} -{" "}
                  {(doctor as any).experience || "8 years"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CALENDAR SECTION */}
        <View className="px-6 mt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Select Date
          </Text>

          {/* Calendar Header */}
          <View className="bg-gray-50 rounded-3xl p-4 border border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={goToPreviousMonth}
                className="w-10 h-10 items-center justify-center bg-white rounded-xl border border-gray-200"
              >
                <Ionicons name="chevron-back" size={20} color="black" />
              </TouchableOpacity>

              <Text className="text-lg font-bold text-gray-900">
                {MONTHS[currentMonth]} {currentYear}
              </Text>

              <TouchableOpacity
                onPress={goToNextMonth}
                className="w-10 h-10 items-center justify-center bg-white rounded-xl border border-gray-200"
              >
                <Ionicons name="chevron-forward" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {/* Weekday Headers */}
            <View className="flex-row mb-2">
              {WEEKDAYS.map((day, index) => (
                <View key={day} className="flex-1 items-center py-2">
                  <Text
                    className={`text-xs font-semibold ${
                      index === 0 ? "text-red-400" : "text-gray-500"
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View className="flex-row flex-wrap">
              {calendarDays.map((dayInfo, index) => {
                const isSelected =
                  selectedDate?.day === dayInfo.day && dayInfo.day !== null;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDateSelect(dayInfo)}
                    disabled={dayInfo.disabled}
                    style={{ width: (width - 80) / 7 }}
                    className={`aspect-square items-center justify-center rounded-xl m-0.5 ${
                      isSelected
                        ? "bg-black"
                        : dayInfo.isToday
                          ? "bg-blue-100 border border-blue-300"
                          : dayInfo.disabled
                            ? "bg-transparent"
                            : "bg-white"
                    }`}
                  >
                    {dayInfo.day && (
                      <Text
                        className={`text-sm font-medium ${
                          isSelected
                            ? "text-white"
                            : dayInfo.isPast
                              ? "text-gray-300"
                              : dayInfo.isSunday
                                ? "text-red-300"
                                : dayInfo.isToday
                                  ? "text-blue-600 font-bold"
                                  : "text-gray-800"
                        }`}
                      >
                        {dayInfo.day}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Legend */}
            <View className="flex-row justify-center mt-4 space-x-6">
              <View className="flex-row items-center">
                <View className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-1" />
                <Text className="text-xs text-gray-500">Today</Text>
              </View>
              <View className="flex-row items-center ml-4">
                <View className="w-3 h-3 bg-black rounded mr-1" />
                <Text className="text-xs text-gray-500">Selected</Text>
              </View>
              <View className="flex-row items-center ml-4">
                <View className="w-3 h-3 bg-gray-200 rounded mr-1" />
                <Text className="text-xs text-gray-500">Unavailable</Text>
              </View>
            </View>
          </View>
        </View>

        {/* TIME SLOTS SECTION */}
        {selectedDate && (
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-gray-900 mb-2">
              Select Time
            </Text>
            <Text className="text-gray-500 text-sm mb-4">
              Available slots for {formatSelectedDate()}
            </Text>

            <View className="flex-row flex-wrap">
              {TIME_SLOTS.map((time, index) => {
                const isSelected = selectedTime === time;
                // Simulate some slots being unavailable
                const isUnavailable = [2, 5, 8, 11].includes(index);

                return (
                  <TouchableOpacity
                    key={time}
                    onPress={() => !isUnavailable && handleTimeSelect(time)}
                    disabled={isUnavailable}
                    className={`px-4 py-3 rounded-xl mr-2 mb-2 ${
                      isSelected
                        ? "bg-black"
                        : isUnavailable
                          ? "bg-gray-100"
                          : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        isSelected
                          ? "text-white"
                          : isUnavailable
                            ? "text-gray-300 line-through"
                            : "text-gray-700"
                      }`}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* BOOKING SUMMARY */}
        {selectedDate && selectedTime && (
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Booking Summary
            </Text>
            <View className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <View className="flex-row items-center mb-2">
                <Ionicons name="calendar" size={18} color="#22c55e" />
                <Text className="ml-2 text-gray-700 font-medium">
                  {formatSelectedDate()}
                </Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Ionicons name="time" size={18} color="#22c55e" />
                <Text className="ml-2 text-gray-700 font-medium">
                  {selectedTime}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="person" size={18} color="#22c55e" />
                <Text className="ml-2 text-gray-700 font-medium">
                  {(doctor as any).name}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* DOCTOR ABOUT SECTION */}
        <View className="px-6 mt-6">
          <Text className="text-lg font-bold text-gray-900 mb-2">
            About Doctor
          </Text>
          <Text className="text-gray-600 text-sm leading-5">
            {(doctor as any).about ||
              "Providing expert medical care with a focus on patient comfort and advanced treatment methods."}
          </Text>
        </View>

        {/* STATS ROW */}
        <View className="flex-row justify-between px-6 mt-6">
          {stats.map((stat, index) => {
            const IconLib = stat.lib as any;
            return (
              <View
                key={index}
                className="items-center"
                style={{ width: width * 0.2 }}
              >
                <View className="bg-gray-100 w-11 h-11 items-center justify-center rounded-xl mb-1">
                  <IconLib name={stat.icon} size={18} color="black" />
                </View>
                <Text className="font-bold text-gray-900 text-sm">
                  {stat.value}
                </Text>
                <Text className="text-[9px] text-gray-400 uppercase tracking-tight">
                  {stat.label}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* BOOKING BUTTON */}
      <View className="absolute bottom-0 w-full bg-white px-6 pt-4 pb-8 border-t border-gray-100">
        <TouchableOpacity
          activeOpacity={0.8}
          className={`h-16 rounded-2xl items-center justify-center shadow-lg ${
            selectedDate && selectedTime ? "bg-black" : "bg-gray-300"
          }`}
          onPress={handleBookAppointment}
        >
          <Text className="text-white text-lg font-bold">
            {selectedDate && selectedTime
              ? `Confirm Booking - ${selectedTime}`
              : "Select Date & Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONFIRMATION MODAL */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white w-full rounded-3xl p-6">
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="calendar-outline" size={32} color="#22c55e" />
              </View>
              <Text className="text-xl font-bold text-gray-900">
                Confirm Appointment
              </Text>
            </View>

            <View className="bg-gray-50 p-4 rounded-2xl mb-4">
              <View className="flex-row items-center mb-3">
                <Image
                  source={(doctor as any).image}
                  style={{ width: 50, height: 50 }}
                  className="rounded-xl"
                />
                <View className="ml-3">
                  <Text className="font-bold text-gray-900">
                    {(doctor as any).name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {(doctor as any).specialization}
                  </Text>
                </View>
              </View>

              <View className="h-px bg-gray-200 my-2" />

              <View className="flex-row justify-between mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="calendar" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">
                    {formatSelectedDate()}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">{selectedTime}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setShowConfirmModal(false)}
                className="flex-1 h-14 bg-gray-100 rounded-xl items-center justify-center"
              >
                <Text className="font-semibold text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmBooking}
                className="flex-1 h-14 bg-black rounded-xl items-center justify-center ml-3"
              >
                <Text className="font-semibold text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
