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
import { ChevronLeft } from "lucide-react-native";
import Colors from "@/constants/colors";
import AuthInput from "@/components/AuthInput";
import SocialButton from "@/components/SocialButton";
import PrimaryButton from "@/components/PrimaryButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuthStore } from "@/store/auth-store";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, socialSignIn, loading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Clear field errors when inputs change
  useEffect(() => {
    setEmailError("");
  }, [email]);

  useEffect(() => {
    setPasswordError("");
  }, [password]);

  const validateInputs = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    try {
      await signIn(email, password);
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {error && <ErrorMessage message={error} onDismiss={clearError} />}

            <PrimaryButton
              title="Sign in"
              onPress={handleSignIn}
              disabled={loading || !email || !password}
              showArrow={false}
              style={styles.signInButton}
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

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Link href="/auth/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingOverlay visible={loading} message="Signing in..." />
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
  backButton: {
    marginTop: 10,
    padding: 8,
    alignSelf: "flex-start",
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  signInButton: {
    marginTop: 10,
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
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
