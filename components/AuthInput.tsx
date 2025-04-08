import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInputProps,
} from "react-native";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";
import Colors from "@/constants/colors";

interface AuthInputProps extends TextInputProps {
  icon: "email" | "password";
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export default function AuthInput({
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <View style={styles.iconContainer}>
          {icon === "email" ? (
            <Mail size={20} color="#666" />
          ) : (
            <Lock size={20} color="#666" />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={icon === "password" ? !showPassword : false}
          autoCapitalize="none"
          {...props}
        />

        {icon === "password" && (
          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff size={20} color="#666" />
            ) : (
              <Eye size={20} color="#666" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    overflow: "hidden",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "red",
  },
  iconContainer: {
    padding: 16,
  },
  input: {
    flex: 1,
    height: 56,
    color: "#000",
    fontSize: 16,
  },
  visibilityToggle: {
    padding: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
});
