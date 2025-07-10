import { useArticleStore } from "@/store/article-store";
import { useAuthStore } from "@/store/auth-store";
import { AntDesign, MaterialIcons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
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
          tabBarActiveTintColor: "#EFB33F", // Set the selected tab color to yellow
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
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Octicons name="dependabot" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="tracking"
          options={{
            title: "Tracking",
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="graph" size={24} color={color} />
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
            tabBarBadge: (() => {
              const count = useArticleStore.getState().getUnreadArticlesCount();
              return count > 0 ? count : undefined;
            })(),
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
