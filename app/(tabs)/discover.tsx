import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Filter } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search players, clubs, trials..."
            placeholderTextColor={Colors.text.secondary}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Popular Players</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.playersList}
          >
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity key={item} style={styles.playerCard}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                  }}
                  style={styles.playerImage}
                />
                <Text style={styles.playerName}>Alex Smith</Text>
                <Text style={styles.playerPosition}>CAM</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Top Clubs</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.clubsList}
          >
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity key={item} style={styles.clubCard}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/180px-Manchester_City_FC_badge.svg.png",
                  }}
                  style={styles.clubLogo}
                />
                <Text style={styles.clubName}>Manchester City</Text>
                <Text style={styles.clubLocation}>Manchester, UK</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>

          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                  }}
                  style={styles.postAuthorImage}
                />
                <View style={styles.postAuthorInfo}>
                  <Text style={styles.postAuthorName}>John Doe</Text>
                  <Text style={styles.postTime}>2 hours ago</Text>
                </View>
              </View>

              <Text style={styles.postContent}>
                Just finished an amazing training session with the team. Ready
                for the upcoming trials! 💪⚽
              </Text>

              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                }}
                style={styles.postImage}
              />

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction}>
                  <Text style={styles.postActionText}>12 likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Text style={styles.postActionText}>3 comments</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.text.primary,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  playersList: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  playerCard: {
    alignItems: "center",
    marginRight: 20,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  playerPosition: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  clubsList: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  clubCard: {
    alignItems: "center",
    marginRight: 20,
    width: 100,
  },
  clubLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  clubName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  clubLocation: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  postCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postAuthorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  postTime: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  postContent: {
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingTop: 12,
  },
  postAction: {
    marginRight: 16,
  },
  postActionText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
});
