import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState(null);


  const FAQData = [
    {
      id: 1,
      question: "How do I book an appointment?",
      answer: "Simply choose a doctor from the list, select a time slot, and click 'Book Now'. You will receive a confirmation shortly."
    },
    {
      id: 2,
      question: "Do you offer video consultations?",
      answer: "Yes! Many of our doctors offer online video consultations. Look for the 'Video Call' icon on the doctor's profile."
    },
    {
      id: 3,
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule up to 1 hour before the appointment time from your 'My Appointments' section."
    },
    {
      id: 4,
      question: "Are the doctors verified?",
      answer: "Absolutely. All doctors on our platform undergo a strict verification process including license and background checks."
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, UPI, Google Pay, Apple Pay, and digital wallets. Cash at clinic is also available for select doctors."
    },
    {
      id: 6,
      question: "Is this for medical emergencies?",
      answer: "No. This app is for scheduled appointments only. If you have a medical emergency, please call 108 or visit the nearest hospital immediately."
    },
  ];

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View className="px-5  mb-10">
      
      {/* Header */}
      <View className='flex-row justify-between items-center mb-6'>
        <Text className='text-xl font-bold text-gray-800'>FAQs</Text>
       
      </View>

      {/* List */}
      <View className="space-y-4"> 
        {FAQData.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <TouchableOpacity 
              key={item.id}
              activeOpacity={0.9}
              onPress={() => toggleExpand(item.id)}
              className={`p-4 rounded-2xl bg-white mb-4 shadow-sm border ${
                isOpen ? 'border-blue-500' : 'border-gray-100'
              }`}
            >
              
              {/* Question Row */}
              <View className="flex-row justify-between items-center">
                <Text className={`text-base font-semibold flex-1 mr-4 ${
                  isOpen ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {item.question}
                </Text>
                
                <Ionicons 
                  name={isOpen ? "chevron-up-circle" : "chevron-down-circle-outline"} 
                  size={24} 
                  color={isOpen ? "#3B82F6" : "#9CA3AF"} 
                />
              </View>

              {/* Answer (Visible only if open) */}
              {isOpen && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-gray-500 leading-5 text-sm">
                    {item.answer}
                  </Text>
                </View>
              )}

            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}