import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

type LogoProps = {
  size?: "small" | "medium" | "large";
  showText?: boolean;
};

export default function Logo({ size = "medium", showText = false }: LogoProps) {
  const logoSize = size === "small" ? 30 : size === "medium" ? 40 : 60;

  return (
    <View style={styles.container}>
      <View style={[styles.logo, { width: logoSize, height: logoSize }]}>
        <Text style={[styles.logoText, { fontSize: logoSize * 0.6 }]}>F</Text>
      </View>

      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>Finesse</Text>
          <Text style={styles.subtitle}>
            The ultimate football social network
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    borderWidth: 3,
    borderColor: Colors.text.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: "center",
  },
});
