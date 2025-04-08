import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useAuthStore } from "@/store/auth-store";
import ErrorBoundary from "./error-boundary";
import { useUserStore } from "@/store/user-store";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, userId } = useAuthStore();
  const { profile, fetchProfile } = useUserStore();

  // Handle authentication state changes
  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    const inOnboardingGroup = segments[0] === "onboarding";

    // If user is authenticated but profile is not loaded, fetch it
    if (isAuthenticated && userId && !profile) {
      fetchProfile(userId);
    }

    if (
      // If the user is not authenticated, redirect to the sign-in page
      !isAuthenticated &&
      !inAuthGroup &&
      !inOnboardingGroup
    ) {
      router.replace("/auth/sign-in");
    } else if (
      // If the user is authenticated and on an auth page, redirect to the home page
      isAuthenticated &&
      inAuthGroup
    ) {
      router.replace("/(tabs)");
    } else if (
      // If the user is authenticated but onboarding is not complete, redirect to onboarding
      isAuthenticated &&
      profile &&
      !profile.onboardingComplete &&
      !inOnboardingGroup
    ) {
      router.replace("/onboarding/name");
    }
  }, [isAuthenticated, segments, profile]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}
