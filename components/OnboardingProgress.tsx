import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

type OnboardingProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index < currentStep
                  ? Colors.progressBar.completed
                  : index === currentStep
                  ? Colors.progressBar.active
                  : Colors.progressBar.inactive,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
