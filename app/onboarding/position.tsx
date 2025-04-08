import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";
import PrimaryButton from "@/components/PrimaryButton";
import OnboardingProgress from "@/components/OnboardingProgress";
import Logo from "@/components/Logo";
import FootballField from "@/components/FootballField";
import SelectionItem from "@/components/SelectionItem";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/user-store";
import { footballPositions } from "@/constants/positions";
import { countries } from "@/constants/countries";
import { clubs } from "@/constants/clubs";
import { FootballPosition } from "@/types/user";

export default function PositionScreen() {
  const router = useRouter();
  const { profile, updateProfile, setOnboardingStep } = useUserStore();

  const [selectedPosition, setSelectedPosition] = useState<number | undefined>(
    profile.position
      ? footballPositions.find((p) => p.name === profile.position)?.id
      : undefined
  );
  const [selectedCountry, setSelectedCountry] = useState(profile.country || "");
  const [selectedClub, setSelectedClub] = useState(profile.favoriteClub || "");

  const handleSelectPosition = (position: FootballPosition) => {
    setSelectedPosition(position.id);
    updateProfile({
      position: position.name,
      positionCode: position.code,
    });
  };

  const handleSelectCountry = (countryCode: string) => {
    setSelectedCountry(countryCode);
    updateProfile({ country: countryCode });
  };

  const handleSelectClub = (clubId: string) => {
    setSelectedClub(clubId);
    updateProfile({ favoriteClub: clubId });
  };

  const handleFinish = () => {
    setOnboardingStep(3);
    router.push("/onboarding/profile-card");
  };

  const handleBack = () => {
    router.back();
  };

  const isFormComplete = selectedPosition && selectedCountry && selectedClub;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <Logo size="small" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Preferred Position</Text>

        <FootballField
          selectedPosition={selectedPosition}
          onSelectPosition={handleSelectPosition}
        />

        <View style={styles.selectionContainer}>
          <Text style={styles.sectionTitle}>Country</Text>
          <View style={styles.selectionList}>
            {countries.slice(0, 3).map((country) => (
              <SelectionItem
                key={country.code}
                id={country.code}
                name={country.name}
                flag={country.flag}
                selected={selectedCountry === country.code}
                onSelect={handleSelectCountry}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Favorite Club</Text>
          <View style={styles.selectionList}>
            {clubs.slice(0, 3).map((club) => (
              <SelectionItem
                key={club.id}
                id={club.id}
                name={club.name}
                icon={club.logo}
                selected={selectedClub === club.id}
                onSelect={handleSelectClub}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <OnboardingProgress currentStep={2} totalSteps={4} />

        <PrimaryButton
          title="Finish"
          onPress={handleFinish}
          disabled={!isFormComplete}
        />
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  selectionContainer: {
    marginTop: 20,
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  selectionList: {
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: Colors.background,
  },
});
