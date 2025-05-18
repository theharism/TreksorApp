import Header from "@/components/ui/Header";
import { router, Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <Header
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
              title="Profile"
            />
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          header: () => (
            <Header
              showBackButton={true}
              onBackPress={() => router.back()}
              showAvatar={false}
              title="Edit Profile"
            />
          ),
        }}
      />
    </Stack>
  );
}
