import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const PurposeLayout = () => {
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
              title="PURPOSE"
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

export default PurposeLayout;
