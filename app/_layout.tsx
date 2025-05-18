// app/_layout.tsx
import { useAuthStore } from "@/store/auth-store";
import { Slot } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {

  const { error, clearError } = useAuthStore()

  // Show toast when auth error changes
  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        onHide: clearError,
      })
    }
  }, [error, clearError])

  return (
        <Slot />
  );
}
