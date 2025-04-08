import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="name" />
      <Stack.Screen name="photo" />
      <Stack.Screen name="position" />
      <Stack.Screen name="profile-card" />
    </Stack>
  );
}
