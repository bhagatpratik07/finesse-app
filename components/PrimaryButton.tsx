import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ChevronRight } from "lucide-react-native";
import Colors from "@/constants/colors";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  showArrow?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  showArrow = true,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {showArrow && <ChevronRight size={20} color={Colors.text.dark} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.text.dark,
    fontSize: 16,
    fontWeight: "600",
  },
});
