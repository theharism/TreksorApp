import { api } from "@/api/axios";
import { errorHandler } from "@/lib/utils";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface savePushTokenRequest {
  token: string;
}

export interface SavePushTokenResonse {
  message: string;
  success: boolean;
}

interface UserState {
  // user: {
  //   id: string;
  //   name: string;
  //   email: string;
  //   role: string;
  //   avatar?: string;
  // };
  pushToken: string | null;
  savePushToken: (data: savePushTokenRequest) => Promise<void>;
  // token: string | null;
  loading: boolean;
  error: string | null;
  // getCurrentUser: () => Promise<boolean | undefined>;
  // updateProfile: (data: updateProfileRequest) => Promise<void>;
}

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // user: {
      //   id: "",
      //   name: "",
      //   email: "",
      //   role: "",
      // },
      pushToken: null,
      loading: false,
      error: null,

      savePushToken: async (data: savePushTokenRequest) => {
        try {
          set({ loading: true, error: null });
          await api.post<SavePushTokenResonse>("user/save-push-token", data);
          set({ loading: false });
        } catch (error: any) {
          console.error("savePushToken error:", { error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      // getCurrentUser: async () => {
      //   try {
      //     set({ loading: true, error: null });
      //     const {data:response} = await api.get<AuthResponse>("user/me");
      //     set({ loading: false, user: response.data.user, isVerified: response.data.user?.isVerified });
      //     return response.data.user?.isVerified;
      //   } catch (error: any) {
      //     console.error("getCurrentUser error:", {error:error.response.data });
      //     set({ error: error.response.data.message, loading: false });
      //     errorHandler(error);
      //   }
      // },

      // updateProfile: async (data: updateProfileRequest) => {
      //   try {
      //     set({ loading: true, error: null });
      //     const formData = new FormData();
      //     if (data.avatar) {
      //       if (data.avatar.uri) {
      //         formData.append("avatar",  {
      //           uri: data.avatar.uri,
      //           name: data.avatar.fileName || 'photo.jpg',
      //           type: data.avatar.type,
      //         } as any);
      //       }
      //     }
      //     if (data.name) {
      //       formData.append("name", data.name);
      //     }
      //     const config = {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     };
      //     await api.patch<AuthResponse>("user/profile", formData, config);
      //     set({ loading: false });
      //   } catch (error: any) {
      //     console.error("updateProfile error:", {error:error.response.data });
      //     set({ error: error.response.data.message, loading: false });
      //     errorHandler(error);
      //   }
      // },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        pushToken: state.pushToken,
      }),
    }
  )
);
