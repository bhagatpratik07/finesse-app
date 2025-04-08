import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import OnboardingProgress from "@/components/OnboardingProgress";
import Quote from "@/components/Quote";
import Logo from "@/components/Logo";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/user-store";

export default function PhotoScreen() {
  const router = useRouter();
  const { profile, updateProfile, setOnboardingStep } = useUserStore();
  const [image, setImage] = useState(profile.profileImage);

  const handleImageSelected = (uri: string) => {
    setImage(uri);
  };

  const handleContinue = () => {
    updateProfile({ profileImage: image });
    setOnboardingStep(2);
    router.push("/onboarding/position");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <Logo size="small" />
      </View>

      <View style={styles.content}>
        <ProfilePictureUpload
          image={image}
          onImageSelected={handleImageSelected}
        />
      </View>

      <View style={styles.footer}>
        <Quote
          text="Discover a world of interactive learning, personalized growth, with limitless possibilities and a supportive community"
          author="Lionel Messi"
        />

        <OnboardingProgress currentStep={1} totalSteps={4} />

        <PrimaryButton title="Continue" onPress={handleContinue} />
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
  },
});
