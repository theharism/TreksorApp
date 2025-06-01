import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const BodyArticles = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#02050C",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="BODY ARTICLE"
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
            />
          ),
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="BODY ARTICLE"
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default BodyArticles;
