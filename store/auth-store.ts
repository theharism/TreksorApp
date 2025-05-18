import { api } from "@/api/axios";
import { errorHandler } from "@/lib/utils";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface RequestResetPasswordRequest {
  email: string;
}

export interface RequestOtpRequest {
  email: string;
}

export interface AuthResponse {
  data: {
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
      isVerified: boolean;
    };
    token?: string;
    resetToken?: string;
  }
}

interface AuthState {
  isAuthenticated: boolean;
  isVerified: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  register: (data: RegisterRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  requestResetPassword: (data: RequestResetPasswordRequest) => Promise<void>;
  verifyOtp: (data: VerifyOtpRequest) => Promise<string | undefined>;
  requestOtp: (data: RequestOtpRequest) => Promise<void>;
  getCurrentUser: () => Promise<boolean | undefined>;
  clearError: () => void
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isVerified: false,
      user: {
        id: "",
        name: "",
        email: "",
        role: "",
      },
      token: null,
      loading: false,
      error: null,

      login: async (data: LoginRequest) => {
        try {
          set({ loading: true, error: null });
          const {data:response} = await api.post<AuthResponse>("auth/login", data);
          set({
            token: response.data.token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error: any) {
          console.error("login error:", { error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ loading: true, error: null });
          await api.post<void>("auth/register", data);
          set({
            loading: false,
          });
        } catch (error: any) {
          console.error("register error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          isVerified: false,
          user: { id: "", name: "", email: "", role: "" },
          token: null,
        });
      },

      requestResetPassword: async (data: RequestResetPasswordRequest) => {
        try {
          set({ loading: true, error: null });
          await api.post<void>("auth/request-reset-password", data);
          set({ loading: false });
        } catch (error: any) {
          console.error("requestResetPassword error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      resetPassword: async (data: ResetPasswordRequest) => {
        try {
          set({ loading: true, error: null });
          await api.post<void>("auth/reset-password", data);
          set({ loading: false });
        } catch (error: any) {
          console.error("resetPassword error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      requestOtp: async (data: RequestOtpRequest) => {
        try {
          set({ loading: true, error: null });
          await api.post<void>("auth/request-otp", data);
          set({ loading: false });
        } catch (error: any) {
          console.error("requestOtp error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      verifyOtp: async (data: VerifyOtpRequest) => {
        try {
          set({ loading: true, error: null });
          const {data:response} = await api.post<AuthResponse>("auth/verify-otp", data);
          if(response.data.resetToken)
          {
            set({ loading: false });
            return response.data.resetToken;
          }
          set({ loading: false, token: response.data.token });
        } catch (error: any) {
          console.error("verifyOtp error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      getCurrentUser: async () => {
        try {
          set({ loading: true, error: null });
          const {data:response} = await api.get<AuthResponse>("user/me");
          set({ loading: false, user: response.data.user, isVerified: response.data.user?.isVerified });
          return response.data.user?.isVerified;
        } catch (error: any) {
          console.error("getCurrentUser error:", {error:error.response.data });
          set({ error: error.response.data.message, loading: false });
          errorHandler(error);
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
        token: state.token,
      }),
    }
  )
);
