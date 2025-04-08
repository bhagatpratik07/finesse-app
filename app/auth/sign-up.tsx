import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import AuthInput from "@/components/AuthInput";
import SocialButton from "@/components/SocialButton";
import PrimaryButton from "@/components/PrimaryButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuthStore } from "@/store/auth-store";
import UserTypeSelector from "@/components/UserTypeSelector";
import { UserType } from "@/store/auth-store";

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, socialSignIn, loading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<UserType | null>(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Clear field errors when inputs change
  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError("");
  }, [confirmPassword]);

  const validateInputs = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    // Validate user type
    if (!userType) {
      // We'll handle this with a UI indication
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    try {
      await signUp(email, password, userType!);
      router.replace("/(tabs)");
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "facebook" | "apple"
  ) => {
    try {
      await socialSignIn(provider);
      router.replace("/(tabs)");
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              <Text style={styles.titleHighlight}>Create</Text> your account
            </Text>
          </View>

          <View style={styles.form}>
            <AuthInput
              icon="email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
            />

            <AuthInput
              icon="password"
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
            />

            <AuthInput
              icon="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={confirmPasswordError}
            />

            <UserTypeSelector selectedType={userType} onSelect={setUserType} />

            {error && <ErrorMessage message={error} onDismiss={clearError} />}

            <PrimaryButton
              title="Sign up"
              onPress={handleSignUp}
              disabled={
                loading || !email || !password || !confirmPassword || !userType
              }
              showArrow={false}
              style={styles.signUpButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <SocialButton
                provider="facebook"
                onPress={() => handleSocialSignIn("facebook")}
              />
              <SocialButton
                provider="google"
                onPress={() => handleSocialSignIn("google")}
              />
              <SocialButton
                provider="apple"
                onPress={() => handleSocialSignIn("apple")}
              />
            </View>

            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Link href="/auth/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={styles.signInLink}>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingOverlay visible={loading} message="Creating your account..." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  titleHighlight: {
    color: Colors.secondary,
  },
  form: {
    flex: 1,
  },
  signUpButton: {
    marginTop: 20,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  dividerText: {
    color: Colors.text.secondary,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signInText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  signInLink: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
