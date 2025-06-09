import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const PowerThoughtsLayout = () => {
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
              title="POWER THOUGHT"
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

export default PowerThoughtsLayout;
