import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";
import React from "react";

const MySpaceLayout = () => {
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
              title="MY SPACE"
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
            />
          ),
        }}
      />

      <Stack.Screen
        name="new-entry"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="NEW ENTRY"
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
            />
          ),
        }}
      />

      <Stack.Screen
        name="new-entry-success"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title="NEW ENTRY"
              showBackButton={true}
              onBackPress={() => router.replace('/mental/myspace')}
              showAvatar={false}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default MySpaceLayout;
