// _layout.jsx
import { ImageBackground } from "expo-image";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/images/onboarding.png")}
        contentFit="cover"
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
          <Stack
            screenOptions={{
              headerShown: false,
              headerTransparent: true,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: '#fff',
              contentStyle: {
                backgroundColor: 'transparent',
              },
              animation: "none"
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="request-reset-password" />
            <Stack.Screen name="reset-password" />
            <Stack.Screen name="verify-otp" />
            {/* Other screens */}
          </Stack>
          <Toast />
      </ImageBackground>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width,
    height,
  },
  imageStyle: {
    opacity: 0.9,
  },
});