import Header from "@/components/ui/Header";
import { useAuthStore } from "@/store/auth-store";
import { AntDesign } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function TabLayout() {

  const { isAuthenticated, isVerified } = useAuthStore();
  if(!isAuthenticated || !isVerified) return <Redirect href="/" />;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          animation: "shift",
          sceneStyle:{
          backgroundColor:'transparent'
          },
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: "#02050C",
            },
            default: {
              backgroundColor: "#02050C",
            },
          }),
          header: () => <Header/>,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
