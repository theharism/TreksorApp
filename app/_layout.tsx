// app/_layout.tsx
import { useAuthStore } from "@/store/auth-store";
import * as Linking from "expo-linking";
import { router, Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { error, clearError } = useAuthStore()
  const [initialURL, setInitialURL] = useState<string | null>(null)
  const [isNavigationReady, setIsNavigationReady] = useState(false)

  useEffect(()=>{
    const timer = setTimeout(() => {
      setIsNavigationReady(true)
    }, 300)

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url)
    })

    Linking.getInitialURL().then((url) => {
      if (url) {
        setInitialURL(url)
      }
    })

    return () => {
      subscription.remove()
      clearTimeout(timer)
    }

  },[])

  useEffect(() => {
    if (isNavigationReady && initialURL) {
      handleDeepLink(initialURL)
      setInitialURL(null)
    }
  }, [isNavigationReady, initialURL])

  const handleDeepLink = (url: string) => {
    try {
      const parsedUrl = Linking.parse(url)

      if (parsedUrl.path) {
        const queryParams = parsedUrl.queryParams || {}
        router.replace({
          pathname: `/${parsedUrl.path}`,
          params: queryParams,
        })
      }
    } catch (error) {
      console.error("Error handling deep link:", error)
    }
    finally{
      SplashScreen.hideAsync();
    }
  }

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
