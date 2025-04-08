import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import Colors from "@/constants/colors";

type SelectionItemProps = {
  id: string;
  name: string;
  icon?: string;
  flag?: string;
  selected?: boolean;
  onSelect: (id: string) => void;
};

export default function SelectionItem({
  id,
  name,
  icon,
  flag,
  selected,
  onSelect,
}: SelectionItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={() => onSelect(id)}
    >
      {flag && <Text style={styles.flag}>{flag}</Text>}

      {icon && <Image source={{ uri: icon }} style={styles.icon} />}

      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#222",
    borderRadius: 12,
    marginBottom: 12,
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  name: {
    color: Colors.text.primary,
    fontSize: 16,
  },
});
