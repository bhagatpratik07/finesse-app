import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// Define user types
export type UserType = "player" | "manager" | "club";

// Define auth state
export interface AuthState {
  isAuthenticated: boolean;
  userType: UserType | null;
  userId: string | null;
  email: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  // Auth actions
  signUp: (
    email: string,
    password: string,
    userType: UserType
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  socialSignIn: (provider: "google" | "facebook" | "apple") => Promise<void>;
  clearError: () => void;
}

// Secure storage for sensitive data
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

// Mock API functions (replace with actual API calls)
const mockSignUp = async (
  email: string,
  password: string,
  userType: UserType
): Promise<{ userId: string; token: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an API call to create a user
  return {
    userId: `user_${Math.random().toString(36).substring(2, 9)}`,
    token: `token_${Math.random().toString(36).substring(2, 15)}`,
  };
};

const mockSignIn = async (
  email: string,
  password: string
): Promise<{ userId: string; token: string; userType: UserType }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an API call to authenticate
  // For demo purposes, we'll return a random user type
  const userTypes: UserType[] = ["player", "manager", "club"];
  const randomUserType =
    userTypes[Math.floor(Math.random() * userTypes.length)];

  return {
    userId: `user_${Math.random().toString(36).substring(2, 9)}`,
    token: `token_${Math.random().toString(36).substring(2, 15)}`,
    userType: randomUserType,
  };
};

// Create auth store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userType: null,
      userId: null,
      email: null,
      token: null,
      loading: false,
      error: null,

      signUp: async (email, password, userType) => {
        try {
          set({ loading: true, error: null });

          // Validate inputs
          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          if (!email.includes("@")) {
            throw new Error("Please enter a valid email");
          }

          if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
          }

          // Call API to sign up
          const { userId, token } = await mockSignUp(email, password, userType);

          // Store auth data
          await secureStorage.setItem("auth_token", token);

          // Update state
          set({
            isAuthenticated: true,
            userType,
            userId,
            email,
            token,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          });
        }
      },

      signIn: async (email, password) => {
        try {
          set({ loading: true, error: null });

          // Validate inputs
          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          // Call API to sign in
          const { userId, token, userType } = await mockSignIn(email, password);

          // Store auth data
          await secureStorage.setItem("auth_token", token);

          // Update state
          set({
            isAuthenticated: true,
            userType,
            userId,
            email,
            token,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          });
        }
      },

      signOut: async () => {
        // Remove token from secure storage
        await secureStorage.removeItem("auth_token");

        // Reset state
        set({
          isAuthenticated: false,
          userType: null,
          userId: null,
          email: null,
          token: null,
          loading: false,
          error: null,
        });
      },

      socialSignIn: async (provider) => {
        try {
          set({ loading: true, error: null });

          // In a real app, this would integrate with the respective social provider SDK
          console.log(`Signing in with ${provider}`);

          // Mock successful authentication
          const { userId, token, userType } = await mockSignIn(
            "social@example.com",
            "password"
          );

          // Store auth data
          await secureStorage.setItem("auth_token", token);

          // Update state
          set({
            isAuthenticated: true,
            userType,
            userId,
            email: "social@example.com",
            token,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "finesse-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userType: state.userType,
        userId: state.userId,
        email: state.email,
        // Don't persist sensitive data or UI state
      }),
    }
  )
);
