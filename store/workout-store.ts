import { workoutContent, WorkoutsData } from "@/mock/workouts";
import { Exercise, Workout, WorkoutContent } from "@/types/workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WorkoutState {
    workouts: Workout[];
    workoutContent: WorkoutContent;
    getWorkoutExercies:(id:string)=>Exercise[] | undefined;
    markExerciseAsRead:(workoutId: string, exerciseId: string) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set,get) => ({
        workouts: WorkoutsData,
        workoutContent: workoutContent,

        getWorkoutExercies: (id) => {
          const workout = get().workouts.find(workout => workout.id === id);
          return workout?.exercises;
        },

        markExerciseAsRead: (workoutId: string, exerciseId: string) => {
          const existingWorkouts = get().workouts;
          const existingWorkoutIndex = existingWorkouts.findIndex((workout) => workout.id === workoutId);
          const updatedExercises = existingWorkouts[existingWorkoutIndex].exercises.map((exercise) => {
            if (exercise.id === exerciseId) {
              return { ...exercise, completed: true };
            }
            return exercise;
          });
          existingWorkouts[existingWorkoutIndex].exercises = updatedExercises;
          set({workouts: existingWorkouts});
        }        
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
