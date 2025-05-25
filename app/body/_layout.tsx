import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const BodyLayout = () => {
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
          headerShown: false,
          header: () => (
            <Header
              title="BODY"
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

export default BodyLayout;
