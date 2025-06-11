import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const SpiritualArticles = () => {
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
              title="SPIRITUAL ARTICLE"
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
              title="ARTICLE DETAILS"
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

export default SpiritualArticles;
