import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPin, Calendar, Filter, Plus, Search } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useTrialsStore, Trial } from "@/store/trials-store";
import { useAuthStore } from "@/store/auth-store";
import { useUserStore } from "@/store/user-store";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useRouter } from "expo-router";

export default function TrialsScreen() {
  const router = useRouter();
  const { trials, fetchTrials, loading, error } = useTrialsStore();
  const { userType } = useAuthStore();
  const { profile } = useUserStore();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTrials();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTrials();
    setRefreshing(false);
  };

  const handleCreateTrial = () => {
    Alert.alert("Create Trial", "This feature will be implemented soon.");
  };

  const handleRegisterForTrial = (trial: Trial) => {
    if (!profile) return;

    Alert.alert(
      "Register for Trial",
      `Would you like to register for ${trial.title}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Register",
          onPress: () => {
            // In a real app, this would navigate to a registration form
            // or directly register the user
            Alert.alert(
              "Success",
              "You have successfully registered for this trial."
            );
          },
        },
      ]
    );
  };

  const handleViewApplications = (trial: Trial) => {
    Alert.alert("View Applications", "This feature will be implemented soon.");
  };

  const renderTrialActions = (trial: Trial) => {
    if (userType === "player") {
      return (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => handleRegisterForTrial(trial)}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      );
    } else if (userType === "club" || userType === "manager") {
      return (
        <TouchableOpacity
          style={styles.viewApplicationsButton}
          onPress={() => handleViewApplications(trial)}
        >
          <Text style={styles.viewApplicationsButtonText}>
            View Applications
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Football Trials</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={22} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={22} color={Colors.text.primary} />
          </TouchableOpacity>

          {(userType === "club" || userType === "manager") && (
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateTrial}
            >
              <Plus size={22} color={Colors.text.dark} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "registered" && styles.activeTab]}
          onPress={() => setActiveTab("registered")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "registered" && styles.activeTabText,
            ]}
          >
            {userType === "player" ? "Registered" : "My Trials"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {trials.map((trial) => (
          <TouchableOpacity key={trial.id} style={styles.trialCard}>
            <Image source={{ uri: trial.image }} style={styles.trialImage} />

            <View style={styles.trialContent}>
              <View style={styles.trialHeader}>
                <Text style={styles.trialTitle}>{trial.title}</Text>
                {trial.isPremium && (
                  <View style={styles.trialBadge}>
                    <Text style={styles.trialBadgeText}>Premium</Text>
                  </View>
                )}
              </View>

              <View style={styles.trialInfo}>
                <View style={styles.trialInfoItem}>
                  <MapPin size={16} color={Colors.text.secondary} />
                  <Text style={styles.trialInfoText}>{trial.location}</Text>
                </View>
                <View style={styles.trialInfoItem}>
                  <Calendar size={16} color={Colors.text.secondary} />
                  <Text style={styles.trialInfoText}>
                    {new Date(trial.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              <Text style={styles.trialDescription} numberOfLines={2}>
                {trial.description}
              </Text>

              <View style={styles.trialFooter}>
                <View style={styles.trialPositions}>
                  <Text style={styles.trialPositionsLabel}>Positions:</Text>
                  <Text style={styles.trialPositionsText}>
                    {trial.positions.join(", ")}
                  </Text>
                </View>
                {renderTrialActions(trial)}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {trials.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {activeTab === "upcoming"
                ? "No upcoming trials found."
                : activeTab === "registered"
                ? userType === "player"
                  ? "You have not registered for any trials yet."
                  : "You have not created any trials yet."
                : "No past trials found."}
            </Text>
          </View>
        )}
      </ScrollView>

      <LoadingOverlay visible={loading} />
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  trialCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  trialImage: {
    width: "100%",
    height: 150,
  },
  trialContent: {
    padding: 16,
  },
  trialHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  trialTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text.primary,
    flex: 1,
  },
  trialBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trialBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.text.dark,
  },
  trialInfo: {
    flexDirection: "row",
    marginBottom: 12,
  },
  trialInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  trialInfoText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  trialDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  trialFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingTop: 12,
  },
  trialPositions: {
    flex: 1,
  },
  trialPositionsLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  trialPositionsText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text.dark,
  },
  viewApplicationsButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewApplicationsButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyStateText: {
    color: Colors.text.secondary,
    fontSize: 16,
    textAlign: "center",
  },
});
