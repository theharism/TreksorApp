import Workout from "@/components/Workout";
import { useWorkoutStore } from "@/store/workout-store";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutHome = () => {
  const { workouts } = useWorkoutStore();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {workouts.map((workout) => (
          <Workout
            key={workout.id}
            onPress={() => router.push({ pathname: "/body/workout/exercises", params: { workoutId:workout.id }})}
            icon={workout.icon}
            title={workout.title}
            description={workout.description}
            percentage={workout.percentage}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop:10
  },
});
