import { router } from "expo-router";

export const errorHandler = (error: any) => {
    error = JSON.parse(error.message);
    if (error.errorCode === 401) {
        localStorage.removeItem("auth-storage");
        router.replace("/(auth)/login");
    }
}
