import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "react-native";
import Colors from "@/constants/colors";

type BackButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

export default function BackButton({ onPress, style }: BackButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <ChevronLeft size={20} color={Colors.text.primary} />
      <Text style={styles.text}>Go back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  text: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: "500",
  },
});
