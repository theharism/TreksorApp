import { WorkoutsData } from "@/mock/workouts";
import { Exercise, Workout } from "@/types/workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WorkoutState {
    workouts: Workout[];
    getWorkoutExercies:(id:string)=>Exercise[] | undefined;
    updateExerciseStatus:(workoutId: string, exerciseId: string) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set,get) => ({
        workouts: WorkoutsData,

        getWorkoutExercies: (id) => {
          const workout = get().workouts.find(workout => workout.id === id);
          return workout?.exercises;
        },

        updateExerciseStatus: (workoutId: string, exerciseId: string) => {
          set((state) => {
            const updatedWorkouts = state.workouts.map((workout) => {
              if (workout.id !== workoutId) return workout;
      
              return {
                ...workout,
                exercises: [],
              };
            });
        
            return { workouts: updatedWorkouts };
          });
        }        
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
