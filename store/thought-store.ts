import { api } from "@/api/axios";
import { errorHandler } from "@/lib/utils";
import { PowerThought, PowerThoughtResponse } from "@/types/powerThought";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PowerThoughtState {
  powerThoughts: PowerThought[]
  loading: boolean;
  error: string | null;
  fetchPowerThoughts: () => Promise<void>;
  markPowerThoughtAsRead: (id: string) => void;
}

export const usePowerThoughtStore = create<PowerThoughtState>()(
  persist(
    (set, get) => ({
      powerThoughts:[],
      loading: false,
      error: null,

      fetchPowerThoughts: async () => {
        try {
          set({ loading: true, error: null });
          const {data:response} = await api.get<PowerThoughtResponse>("power-thought");
          const existingThoughts = get().powerThoughts;
          const existingIds = new Set(existingThoughts.map(t => t._id));
          const newThoughts = response.data
            .filter(thought => !existingIds.has(thought._id))
            .map(thought => ({
              ...thought,
              isRead: false,
              date: new Date(thought.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              isToday: new Date(thought.date).toDateString() === new Date().toDateString(),
            }));            
          const updatedThoughts = [...existingThoughts, ...newThoughts];          
          set({ loading: false, powerThoughts: updatedThoughts});
        } catch (error: any) {
          console.error("fetchPowerThoughts error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      markPowerThoughtAsRead: (id) => {
        const existingThoughts = get().powerThoughts;
        const thoughtIndex = existingThoughts.findIndex(thought => thought._id === id)
        existingThoughts[thoughtIndex].isRead = true;
        set({ powerThoughts: existingThoughts});
      }

    }),
    {
      name: "thought-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
