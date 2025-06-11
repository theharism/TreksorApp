import { errorHandler } from "@/lib/utils";
import { mediations } from "@/mock/mediation";
import { Mediation } from "@/types/mediation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface fetchMediationRequest {
  id: string;
}

interface MediationState {
  mediation: Mediation[]
  loading: boolean;
  error: string | null;
  fetchMediations: (query: string) => Promise<void>;
  fetchMediationById: (data: fetchMediationRequest) => Promise<Mediation | undefined>;
}

export const useMediationStore = create<MediationState>()(
  persist(
    (set,get) => ({
      mediation:mediations,
      loading: false,
      error: null,

      fetchMediations: async (query) => {
        try {
          // set({ loading: true, error: null });
          // const {data:response} = await api.get<ArticleResponse>(`article?${query}`);
          // set({ loading: false, articles: response.data });
        } catch (error: any) {
          console.error("fetchMediations error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      fetchMediationById: async (data) => {
        try {
          set({ loading: true, error: null })
          const mediation = get().mediation.find(mediation => mediation.id === data.id);
          set({ loading: false });
          return mediation;
        } catch (error: any) {
          console.error("fetchMediationById error:", { error: error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },
    }),
    {
      name: "mediation-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        articles: state.mediation,
      }),
    }
  )
);
