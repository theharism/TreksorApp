import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const errorHandler = (error: any) => {
    error = JSON.parse(error.message);
    if (error.errorCode === 401) {
        localStorage.removeItem("auth-storage");
        router.replace("/(auth)/login");
    }
}

export const secureStorage = {
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