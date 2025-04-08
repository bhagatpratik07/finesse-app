import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import OnboardingProgress from "@/components/OnboardingProgress";
import Quote from "@/components/Quote";
import Logo from "@/components/Logo";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/user-store";
import { useAuthStore } from "@/store/auth-store";

export default function NameScreen() {
  const router = useRouter();
  const { profile, updateProfile, setOnboardingStep } = useUserStore();
  const { userType } = useAuthStore();
  const [name, setName] = useState(profile?.name || "");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    updateProfile({ name: name.trim() });
    setOnboardingStep(1);

    if (userType === "player") {
      router.push("/onboarding/photo");
    } else if (userType === "manager") {
      router.push("/onboarding/manager-details");
    } else if (userType === "club") {
      router.push("/onboarding/club-details");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
          <Logo size="small" />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {userType === "player"
              ? "What is your name?"
              : userType === "manager"
              ? "What is your name?"
              : "What is your club name?"}
          </Text>

          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Type here..."
            placeholderTextColor="#666"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError("");
            }}
            autoFocus
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.footer}>
          <Quote
            text="Discover a world of interactive learning, personalized growth, with limitless possibilities and a supportive community"
            author="Lionel Messi"
          />

          <OnboardingProgress
            currentStep={0}
            totalSteps={userType === "player" ? 4 : 3}
          />

          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={!name.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },
  footer: {
    padding: 20,
  },
});
