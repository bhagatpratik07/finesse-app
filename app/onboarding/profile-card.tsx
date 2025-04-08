import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Share } from "lucide-react-native";
import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import Logo from "@/components/Logo";
import ProfileCard from "@/components/ProfileCard";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/user-store";

export default function ProfileCardScreen() {
  const router = useRouter();
  const { profile, completeOnboarding } = useUserStore();

  const handleStartCareer = () => {
    completeOnboarding();
    router.replace("/(tabs)");
  };

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // Share functionality would go here
    // Not implementing actual share for this demo
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <View style={styles.shareButton}>
          <Share size={20} color={Colors.text.primary} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <ProfileCard profile={profile} />
        </View>

        <Text style={styles.title}>Your Profile card is ready!</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Start your career" onPress={handleStartCareer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: "80%",
    aspectRatio: 1.2,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    textAlign: "center",
  },
  footer: {
    padding: 20,
  },
});
