import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/colors";

type QuoteProps = {
  text: string;
  author: string;
};

export default function Quote({ text, author }: QuoteProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.authorContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  text: {
    color: Colors.text.secondary,
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    color: Colors.text.primary,
    fontSize: 16,
    marginRight: 8,
  },
  author: {
    color: Colors.text.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
