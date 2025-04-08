import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { X } from "lucide-react-native";
import Colors from "@/constants/colors";

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorMessage({
  message,
  onDismiss,
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <X size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff3b30",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },
  dismissButton: {
    padding: 4,
  },
});
