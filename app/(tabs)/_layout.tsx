import { useAuthStore } from "@/store/auth-store";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
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
          backgroundColor:'#02050C'
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
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="articles"
          options={{
            title: "Articles",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="article" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          redirect
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
