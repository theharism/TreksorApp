"use client";

import ActivityLogModal from "@/components/ActivityLogModal";
import AddTrackerModal from "@/components/AddTrackerModal";
import TrackingCard from "@/components/TrackingCard";
import CalendarModal from "@/components/ui/CalendarModal";
import { useTrackingStore } from "@/store/tracking-store";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TrackingScreen() {
  const { trackingData, fetchTrackingData } = useTrackingStore();

  const [showAddTracker, setShowAddTracker] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const handleDateSelect = (date: string) => {   
    setSelectedDate(date);
    setShowActivityLog(true);
  };

  const handleCategoryLog = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setShowActivityLog(true);
  };

  const openCalendar = () => {
    setSelectedCategory(undefined);
    setShowCalendar(true);
  };

  useEffect(() => {
    fetchTrackingData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Streak Section */}
      <View style={styles.streakContainer}>
        <View style={styles.streakContent}>
          <Ionicons name="flame" size={24} color="#EFB33F" />
          <Text style={styles.streakText}>4-Day Streak</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowAddTracker(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={openCalendar}
          >
            <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tracking Cards */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {trackingData.map((data, index) => (
          <TrackingCard
            key={index}
            title={data.title}
            percentage={data.percentage}
            items={data.items}
            custom={data.custom}
          />
        ))}
      </ScrollView>
      <AddTrackerModal
        visible={showAddTracker}
        onClose={() => setShowAddTracker(false)}
      />

      <ActivityLogModal
        visible={showActivityLog}
        onClose={() => {
          setShowActivityLog(false);
          setSelectedCategory(undefined);
        }}
        selectedDate={selectedDate}
      />

      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02050C",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  streakContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
});
