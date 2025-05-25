import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const WorkoutLayout = () => {
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
        name="workouts"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="WORKOUT"
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
            />
          ),
        }}
      />

    <Stack.Screen
        name="exercises"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="BACK & BICEP"
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

export default WorkoutLayout;
