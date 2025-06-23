import { calcPercentage, errorHandler, generateRandomId } from "@/lib/utils";
import { trackingData as initialTrackingData } from "@/mock/tracking";
import { TrackingCategory } from "@/types/tracking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useArticleStore } from "./article-store";
import { useMediationStore } from "./mediation-store";
import { useMySpaceStore } from "./myspace-store";
import { usePowerThoughtStore } from "./thought-store";
import { useWorkoutStore } from "./workout-store";

interface TrackingStore {
  trackingData: TrackingCategory[];
  loading: boolean;
  error: string | null;
  fetchTrackingData: () => Promise<void>;
  addTrackingCategory: (category: TrackingCategory) => void;
  updateTrackingCategory: (title: string, updated: Partial<TrackingCategory>) => void;
  deleteTrackingCategory: (title: string) => void;
  getTrackingCategoryByTitle: (title: string) => TrackingCategory | undefined;
  clearData: () => void;
}

export const useTrackingStore = create<TrackingStore>()(
  persist(
    (set, get) => ({
      trackingData: initialTrackingData,
      loading: false,
      error: null,

      fetchTrackingData: async () => {
        try {
          set({ loading: true, error: null });

          const countRead = (items: { isRead?: boolean }[]) => items.filter(i => i.isRead).length;

          // Articles
          const { articles } = useArticleStore.getState();
          const bodyArticles = articles["Body"] || [];
          const mentalArticles = articles["Mental"] || [];
          const spiritualArticles = articles["Spiritual"] || [];

          const bodyRead = countRead(bodyArticles);
          const mentalRead = countRead(mentalArticles);
          const spiritualRead = countRead(spiritualArticles);

          // Workouts
          const workouts = useWorkoutStore.getState().workouts || [];
          const totalWorkouts = workouts.reduce((total, w) => total + w.exercises.length, 0);
          const completedWorkouts = workouts.reduce((total, w) => total + w.exercises.filter(e => e.completed).length, 0);

          // Meditations
          const meditations = useMediationStore.getState().mediation || [];
          const totalMeditations = meditations.length;
          const readMeditations = countRead(meditations);

          // Power Thoughts
          const powerThoughts = usePowerThoughtStore.getState().powerThoughts || [];
          const totalThoughts = powerThoughts.length;
          const readThoughts = countRead(powerThoughts);

          // Journal Entries
          const journalEntries = useMySpaceStore.getState().myspaces || [];
          const totalJournals = journalEntries.length;

          const updatedTrackingData: TrackingCategory[] = [
            {
              id: generateRandomId(),
              title: "Body",
              percentage: calcPercentage(completedWorkouts + bodyRead, totalWorkouts + bodyArticles.length),
              items: [
                { id: generateRandomId(), label: "Workouts", value: `${completedWorkouts}/${totalWorkouts}` },
                { id: generateRandomId(), label: "Articles Completed", value: `${bodyRead}/${bodyArticles.length}` },
              ],
              custom: false,
            },
            {
              id: generateRandomId(),
              title: "Mental",
              percentage: calcPercentage(
                readThoughts + mentalRead + totalJournals,
                totalThoughts + mentalArticles.length + totalJournals
              ),
              items: [
                { id: generateRandomId(), label: "Power Thought Read", value: `${readThoughts}/${totalThoughts}` },
                { id: generateRandomId(), label: "Articles Completed", value: `${mentalRead}/${mentalArticles.length}` },
                { id: generateRandomId(), label: "General Entries", value: `${totalJournals}` },
              ],
              custom: false,
            },
            {
              id: generateRandomId(),
              title: "Spiritual",
              percentage: calcPercentage(
                readMeditations + spiritualRead,
                totalMeditations + spiritualArticles.length
              ),
              items: [
                { id: generateRandomId(), label: "Meditations", value: `${readMeditations}/${totalMeditations}` },
                { id: generateRandomId(), label: "Articles Read", value: `${spiritualRead}/${spiritualArticles.length}` },
              ],
              custom: false,
            },
          ];

            let oldTrackingData = get().trackingData;
            
            const bodyIndex = oldTrackingData.findIndex(track => track.title === 'Body')
            const mentalIndex = oldTrackingData.findIndex(track => track.title === 'Mental')
            const SpiritualIndex = oldTrackingData.findIndex(track => track.title === 'Spiritual')

            oldTrackingData[bodyIndex] = updatedTrackingData[0]
            oldTrackingData[mentalIndex] = updatedTrackingData[1]
            oldTrackingData[SpiritualIndex] = updatedTrackingData[2]

            set({ trackingData: oldTrackingData, loading: false });
        } catch (error: any) {
          console.error("fetchTrackingData error:", { error });
          set({ error: error?.response?.data?.message || "Something went wrong", loading: false });
          errorHandler(error);
        }
      },

      addTrackingCategory: (category) => {
        const current = get().trackingData;
      
        const updatedCategory = {
          ...category,
          items: category.items.map((item) => {
            const days = parseInt(item.value);
            const record: Record<string, boolean> = {};
      
            for (let i = 0; i < days; i++) {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const isoDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
              record[isoDate] = false;
            }
      
            return {
              ...item,
              record,
            };
          }),
        };
      
        set({ trackingData: [...current, updatedCategory] });
      },      

      updateTrackingCategory: (id, updated) => {
        const updatedList = get().trackingData.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        );
        set({ trackingData: updatedList });
      },

      deleteTrackingCategory: (id) => {
        const filtered = get().trackingData.filter((item) => item.id !== id);
        set({ trackingData: filtered });
      },

      getTrackingCategoryByTitle: (id) => {
        return get().trackingData.find((item) => item.id === id);
      },

      clearData: () => {
        set({
          trackingData: initialTrackingData,
          loading: false,
          error: null,
        })
      }
    }),
    {
      name: "tracking-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        trackingData: state.trackingData,
      }),
    }
  )
);
