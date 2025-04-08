import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserCircle, Users, Building2 } from "lucide-react-native";
import Colors from "@/constants/colors";
import { UserType } from "@/store/auth-store";

interface UserTypeSelectorProps {
  selectedType: UserType | null;
  onSelect: (type: UserType) => void;
}

export default function UserTypeSelector({
  selectedType,
  onSelect,
}: UserTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a:</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === "player" && styles.selectedOption,
          ]}
          onPress={() => onSelect("player")}
        >
          <UserCircle
            size={32}
            color={
              selectedType === "player" ? Colors.text.dark : Colors.text.primary
            }
          />
          <Text
            style={[
              styles.optionText,
              selectedType === "player" && styles.selectedOptionText,
            ]}
          >
            Player
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedType === "manager" && styles.selectedOption,
          ]}
          onPress={() => onSelect("manager")}
        >
          <Users
            size={32}
            color={
              selectedType === "manager"
                ? Colors.text.dark
                : Colors.text.primary
            }
          />
          <Text
            style={[
              styles.optionText,
              selectedType === "manager" && styles.selectedOptionText,
            ]}
          >
            Manager
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedType === "club" && styles.selectedOption,
          ]}
          onPress={() => onSelect("club")}
        >
          <Building2
            size={32}
            color={
              selectedType === "club" ? Colors.text.dark : Colors.text.primary
            }
          />
          <Text
            style={[
              styles.optionText,
              selectedType === "club" && styles.selectedOptionText,
            ]}
          >
            Club
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    color: Colors.text.primary,
    marginTop: 8,
    fontWeight: "500",
  },
  selectedOptionText: {
    color: Colors.text.dark,
  },
});
