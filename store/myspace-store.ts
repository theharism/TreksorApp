import { mySpaces } from "@/mock/myspace";
import { MySpace } from "@/types/myspace";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface addMySpaceRequest{
    text: string;
    mood: string
}

interface MySpaceState {
  myspaces: MySpace[]
  loading: boolean;
  error: string | null;
  addMySpace: (data: addMySpaceRequest) => void;
  fetchMySpace: (id: string) => void;
}

export const useMySpaceStore = create<MySpaceState>()(
  persist(
    (set,get) => ({
      myspaces:mySpaces,
      loading: false,
      error: null,

      fetchMySpace: async (id) => {
          const mySpace = get().myspaces.find(mySpace => mySpace.id === id);
          return mySpace
      },

      addMySpace: async (data) => {
        const payload = {
            id: `${get().myspaces.length + 1}`,
            mood: data.mood,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            text: data.text,
        }          
        const newSpaces = [payload, ...get().myspaces]
        set({ myspaces: newSpaces });
      },
    }),
    {
      name: "myspace-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
