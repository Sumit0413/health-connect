import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>FAQs</Text>
      </View>

      {/* List */}
      <View style={styles.listContainer}> 
        {FAQData.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <TouchableOpacity 
              key={item.id}
              activeOpacity={0.9}
              onPress={() => toggleExpand(item.id)}
              style={[
                styles.faqCard, 
                isOpen ? styles.faqCardOpen : null
              ]}
            >
              {/* Question Row */}
              <View style={styles.questionRow}>
                <Text style={[
                  styles.questionText,
                  isOpen ? styles.questionTextOpen : null
                ]}>
                  {item.question}
                </Text>
                
                <Ionicons 
                  name={isOpen ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={isOpen ? "#000" : "#666"} 
                />
              </View>

              {/* Answer */}
              {isOpen && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
  listContainer: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  faqCardOpen: {
    borderColor: '#000', // Black border when open
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginRight: 16,
  },
  questionTextOpen: {
    color: '#000',
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  answerText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 22,
  }
});