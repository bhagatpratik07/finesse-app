import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

type SocialProvider = "facebook" | "google" | "apple";

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
}

export default function SocialButton({ provider, onPress }: SocialButtonProps) {
  // Use web URLs instead of local assets
  const getIconUrl = () => {
    switch (provider) {
      case "facebook":
        return "https://cdn-icons-png.flaticon.com/512/124/124010.png";
      case "google":
        return "https://cdn-icons-png.flaticon.com/512/2991/2991148.png";
      case "apple":
        return "https://cdn-icons-png.flaticon.com/512/0/747.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/2991/2991148.png";
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: getIconUrl() }}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
