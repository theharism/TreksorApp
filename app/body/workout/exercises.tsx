"use client";

import Header from "@/components/ui/Header";
import { useWorkoutStore } from "@/store/workout-store";
import { Exercise } from "@/types/workout";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WorkoutDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { workoutId } = useLocalSearchParams();
  const { workouts, getWorkoutExercies, markExerciseAsRead } = useWorkoutStore();
  const [workout, setWorkout] = useState<Exercise[]>();

  useFocusEffect(() => {
    if (workoutId) {
      setWorkout(getWorkoutExercies(workoutId as string));
    }
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={(workoutId as string).toUpperCase()}
          showBackButton={true}
          onBackPress={() => router.back()}
          showAvatar={false}
        />
      ),
    })
  }, [navigation, workoutId])

  const handleExercisePress = (workoutId: string, exerciseId: string) => {
    if (!workout) return;
    router.push({pathname:"/body/workout/details",params:{id:exerciseId, workoutId}})
  };

  const renderExerciseCard = (
    exercise: Exercise,
    workoutId: string,
    index: number
  ) => {
    return (
        <TouchableOpacity
          style={styles.exerciseCard}
          onPress={() => handleExercisePress(workoutId, exercise.id)}
          key={index}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)"]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.borderGradient}
          >
            <LinearGradient
              colors={["#262626", "#0a0a0a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.innerGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.checkboxContainer}>
                  {exercise.completed ? (
                    <View style={styles.completedCheckbox}>
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    </View>
                  ) : (
                    <View style={styles.uncompletedCheckbox} />
                  )}
                </View>

                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.title}</Text>
                  <Text style={styles.exerciseDetails}>
                    {exercise.description}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
    );
  };

  if (!workout) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading workout...</Text>
        </View>
      </View>
    );
  }

  let exerciseIndex = 0;

  return (
    <View style={[styles.container]}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {workout.map((exercise,index) => (
          <View key={index} style={styles.section}>
            {/* <Text style={styles.sectionTitle}>{sectionTitle}</Text> */}
            <View style={styles.exercisesList}>
              {/* {exercises.map((exercise) => {
                const cardIndex = exerciseIndex++; */}
                {renderExerciseCard(exercise, workoutId as string, index)}
              {/* })} */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    // paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
    marginLeft: 4,
  },
  exercisesList: {
    gap: 18,
  },
  exerciseCard: {
    width: width - 40, // Full width minus margins
    height: 67,
    borderRadius: 12,
    // overflow: "hidden",
    // marginVertical: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:10,
  },
  checkboxContainer: {
    marginRight: 16,
  },
  completedCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  uncompletedCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
    lineHeight: 22,
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#F39C12",
    fontWeight: "500",
  },
  borderGradient: {
    flex: 1,
    borderRadius: 12,
    padding: 1, // This creates the border thickness
  },
  innerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11, // Slightly smaller than outer radius
  },
});
