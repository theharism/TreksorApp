import { secureStorage } from "@/lib/utils";
import { WorkoutsData } from "@/mock/workouts";
import { Exercises, Workout } from "@/types/workout";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WorkoutState {
    workouts: Workout[];
    getWorkoutExercies:(id:string)=>Exercises | undefined;
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
        
              const updatedExercises: typeof workout.exercises = {};
        
              for (const [section, exercises] of Object.entries(workout.exercises)) {
                updatedExercises[section] = exercises.map((exercise) => {
                  if (exercise.id === exerciseId) {
                    return {
                      ...exercise,
                      completed: !exercise.completed,
                    };
                  }
                  return exercise;
                });
              }
        
              return {
                ...workout,
                exercises: updatedExercises,
              };
            });
        
            return { workouts: updatedWorkouts };
          });
        }        
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        workouts: state.workouts,
      }),
    }
  )
);
