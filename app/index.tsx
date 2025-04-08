import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/store/auth-store";
import { useUserStore } from "@/store/user-store";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { profile } = useUserStore();

  useEffect(() => {
    // If authenticated and onboarding is complete, redirect to home after a short delay
    if (isAuthenticated && profile?.onboardingComplete) {
      const timer = setTimeout(() => {
        router.replace("/(tabs)");
      }, 2000);

      return () => clearTimeout(timer);
    }

    // If authenticated but onboarding is not complete, redirect to onboarding
    if (isAuthenticated && profile && !profile.onboardingComplete) {
      const timer = setTimeout(() => {
        router.replace("/onboarding/name");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, profile]);

  const handleGetStarted = () => {
    router.push("/auth/sign-up");
  };

  return (
    <LinearGradient colors={["#9D00FF", "#6600FF"]} style={styles.container}>
      <View style={styles.backgroundPattern}>
        {/* Soccer pattern background */}
      </View>

      <View style={styles.content}>
        <Logo showText={true} size="large" />

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Get Started" onPress={handleGetStarted} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
