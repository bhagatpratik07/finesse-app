import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/user-store";
import Logo from "@/components/Logo";

export default function HomeScreen() {
  const { profile } = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" />
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, <Text style={styles.nameText}>{profile.name}</Text>
          </Text>
          <Text style={styles.subtitleText}>
            Here are some upcoming trials for you
          </Text>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Trials</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredList}
          >
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.featuredCard}>
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    }}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardBadge}>
                    <Text style={styles.cardBadgeText}>In 3 days</Text>
                  </View>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    Manchester City U18 Trials
                  </Text>
                  <Text style={styles.cardLocation}>Manchester, UK</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardDate}>June 15, 2023</Text>
                    <View style={styles.cardPositions}>
                      <Text style={styles.cardPositionText}>ST, CAM, CB</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.nearbySection}>
          <Text style={styles.sectionTitle}>Nearby Trials</Text>

          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.nearbyCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1508098682722-e99c643e7f3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                }}
                style={styles.nearbyCardImage}
              />
              <View style={styles.nearbyCardContent}>
                <Text style={styles.nearbyCardTitle}>Local Club Tryouts</Text>
                <Text style={styles.nearbyCardLocation}>2.5 km away</Text>
                <Text style={styles.nearbyCardDate}>Tomorrow, 10:00 AM</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  nameText: {
    color: Colors.primary,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  featuredSection: {
    marginBottom: 30,
  },
  featuredList: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  featuredCard: {
    width: 280,
    backgroundColor: "#111",
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
  },
  cardImageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  cardBadgeText: {
    color: Colors.text.dark,
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  cardPositions: {
    backgroundColor: "#222",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardPositionText: {
    fontSize: 12,
    color: Colors.text.primary,
  },
  nearbySection: {
    marginBottom: 30,
  },
  nearbyCard: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  nearbyCardImage: {
    width: 100,
    height: 100,
  },
  nearbyCardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  nearbyCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  nearbyCardLocation: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  nearbyCardDate: {
    fontSize: 12,
    color: Colors.primary,
  },
});
