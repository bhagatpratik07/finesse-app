import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/colors";
import { footballPositions } from "@/constants/positions";
import { FootballPosition } from "@/types/user";

type FootballFieldProps = {
  selectedPosition?: number;
  onSelectPosition: (position: FootballPosition) => void;
};

export default function FootballField({
  selectedPosition,
  onSelectPosition,
}: FootballFieldProps) {
  return (
    <View style={styles.container}>
      {/* Field markings */}
      <View style={styles.field}>
        {/* Center circle */}
        <View style={styles.centerCircle} />

        {/* Center line */}
        <View style={styles.centerLine} />

        {/* Penalty areas */}
        <View style={styles.penaltyAreaTop} />
        <View style={styles.penaltyAreaBottom} />

        {/* Goal areas */}
        <View style={styles.goalAreaTop} />
        <View style={styles.goalAreaBottom} />

        {/* Position markers */}
        {footballPositions.map((position) => (
          <TouchableOpacity
            key={position.id}
            style={[
              styles.positionMarker,
              {
                left: `${position.x}%`,
                top: `${position.y}%`,
                backgroundColor:
                  selectedPosition === position.id ? Colors.primary : "#333",
              },
            ]}
            onPress={() => onSelectPosition(position)}
          >
            <Text style={styles.positionNumber}>{position.id}</Text>
            <Text style={styles.positionCode}>{position.code}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 0.7,
    padding: 10,
  },
  field: {
    flex: 1,
    backgroundColor: Colors.field.background,
    borderWidth: 2,
    borderColor: Colors.field.lines,
    position: "relative",
  },
  centerCircle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.field.lines,
    top: "50%",
    left: "50%",
    marginLeft: -30,
    marginTop: -30,
  },
  centerLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: Colors.field.lines,
    top: "50%",
  },
  penaltyAreaTop: {
    position: "absolute",
    width: "40%",
    height: "15%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.field.lines,
    top: 0,
    left: "30%",
  },
  penaltyAreaBottom: {
    position: "absolute",
    width: "40%",
    height: "15%",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.field.lines,
    bottom: 0,
    left: "30%",
  },
  goalAreaTop: {
    position: "absolute",
    width: "20%",
    height: "6%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.field.lines,
    top: 0,
    left: "40%",
  },
  goalAreaBottom: {
    position: "absolute",
    width: "20%",
    height: "6%",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.field.lines,
    bottom: 0,
    left: "40%",
  },
  positionMarker: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  positionNumber: {
    color: Colors.text.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
  positionCode: {
    position: "absolute",
    bottom: -20,
    color: Colors.text.primary,
    fontSize: 10,
  },
});
