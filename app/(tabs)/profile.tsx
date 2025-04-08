import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Settings,
  MessageSquare,
  LogOut,
  Edit,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { useUserStore } from "@/store/user-store";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading } = useUserStore();
  const { signOut } = useAuthStore();
  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "Just finished an amazing training session! Ready for the upcoming trials. 💪⚽",
      image:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 21,
      comments: 4,
      timeAgo: "3 min ago",
    },
    {
      id: 2,
      content: "Great match today with the team. We're improving every day!",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 18,
      comments: 3,
      timeAgo: "2 hours ago",
    },
    {
      id: 3,
      content:
        "Excited to announce I'll be attending the Manchester City trials next month!",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 32,
      comments: 7,
      timeAgo: "1 day ago",
    },
  ]);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: () => signOut(),
      },
    ]);
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    Alert.alert("Edit Profile", "This feature will be implemented soon.");
  };

  const handleLikePost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleSharePost = (postId: number) => {
    Alert.alert("Share Post", "This feature will be implemented soon.");
  };

  if (!profile) {
    return <LoadingOverlay visible={true} message="Loading profile..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleEditProfile}
          >
            <Edit size={22} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleSignOut}>
            <LogOut size={22} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileBackground}>
            <View style={styles.profileBackgroundGradient} />
          </View>

          <View style={styles.profileInfo}>
            <Image
              source={
                profile.profileImage
                  ? { uri: profile.profileImage }
                  : require("@/assets/images/icon.png")
              }
              style={styles.profileImage}
            />

            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>
                {profile.name.toUpperCase()}
              </Text>
              <Text style={styles.profileNumber}>
                #{Math.floor(Math.random() * 99) + 1}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <MessageSquare size={18} color={Colors.text.primary} />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>420</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>

          {profile.userType === "player" && (
            <>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profile.age}</Text>
                <Text style={styles.statLabel}>Age</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profile.positionCode}</Text>
                <Text style={styles.statLabel}>Position</Text>
              </View>
            </>
          )}

          {profile.userType === "manager" && (
            <>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profile.experience || 0}</Text>
                <Text style={styles.statLabel}>Years Exp</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {profile.role.substring(0, 3)}
                </Text>
                <Text style={styles.statLabel}>Role</Text>
              </View>
            </>
          )}

          {profile.userType === "club" && (
            <>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>32</Text>
                <Text style={styles.statLabel}>Trials</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profile.founded}</Text>
                <Text style={styles.statLabel}>Founded</Text>
              </View>
            </>
          )}
        </View>

        {profile.userType === "player" && profile.bio && (
          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>Bio</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>
        )}

        {profile.userType === "player" &&
          profile.skills &&
          profile.skills.length > 0 && (
            <View style={styles.skillsSection}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {profile.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Posts</Text>

          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={
                    profile.profileImage
                      ? { uri: profile.profileImage }
                      : require("@/assets/images/icon.png")
                  }
                  style={styles.postAuthorImage}
                />
                <View style={styles.postAuthorInfo}>
                  <Text style={styles.postAuthorName}>{profile.name}</Text>
                  <Text style={styles.postTime}>{post.timeAgo}</Text>
                </View>
                <TouchableOpacity style={styles.postMenu}>
                  <Text style={styles.postMenuText}>...</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.postContent}>{post.content}</Text>

              <Image source={{ uri: post.image }} style={styles.postImage} />

              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.postAction}
                  onPress={() => handleLikePost(post.id)}
                >
                  <Heart size={20} color={Colors.text.secondary} />
                  <Text style={styles.postActionText}>{post.likes} likes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.postAction}>
                  <MessageCircle size={20} color={Colors.text.secondary} />
                  <Text style={styles.postActionText}>
                    {post.comments} comments
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.postAction}
                  onPress={() => handleSharePost(post.id)}
                >
                  <Share2 size={20} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    position: "relative",
    marginBottom: 20,
  },
  profileBackground: {
    height: 120,
    backgroundColor: Colors.primary,
  },
  profileBackgroundGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.background,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  profileNumber: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 20,
    width: "100%",
    gap: 12,
  },
  followButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.dark,
  },
  messageButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statItem: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  bioText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  skillsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadge: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    color: Colors.text.primary,
    fontSize: 12,
  },
  postsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  postCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
  postMenu: {
    padding: 8,
  },
  postMenuText: {
    fontSize: 18,
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  postContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postActions: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  postActionText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
});
