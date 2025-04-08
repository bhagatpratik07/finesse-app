import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/constants/colors";
import Logo from "./Logo";
import { UserProfile } from "@/types/user";

type ProfileCardProps = {
  profile: UserProfile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" />
        <View style={styles.positionContainer}>
          <Text style={styles.positionLabel}>{profile.position}</Text>
        </View>
        <Text style={styles.countryFlag}>{profile.country ? "🇮🇳" : ""}</Text>
        {profile.favoriteClub && (
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/180px-Manchester_City_FC_badge.svg.png",
            }}
            style={styles.clubLogo}
          />
        )}
      </View>

      <View style={styles.profileInfo}>
        {profile.profileImage ? (
          <Image
            source={{ uri: profile.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImagePlaceholder} />
        )}
        <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1.2,
    backgroundColor: Colors.card.background,
    borderRadius: 24,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  positionLabel: {
    color: Colors.text.dark,
    fontSize: 12,
    fontWeight: "bold",
  },
  countryFlag: {
    fontSize: 20,
  },
  clubLogo: {
    width: 24,
    height: 24,
  },
  profileInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333",
    marginBottom: 10,
  },
  name: {
    color: Colors.text.dark,
    fontSize: 28,
    fontWeight: "bold",
  },
});
