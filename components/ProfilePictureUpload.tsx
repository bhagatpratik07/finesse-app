import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Plus, User } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/colors";

type ProfilePictureUploadProps = {
  image?: string;
  onImageSelected: (uri: string) => void;
};

export default function ProfilePictureUpload({
  image,
  onImageSelected,
}: ProfilePictureUploadProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <User size={40} color={Colors.text.primary} />
          </View>
        )}
        <View style={styles.addButton}>
          <Plus size={20} color={Colors.text.primary} />
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>Add a Profile Picture</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
});
