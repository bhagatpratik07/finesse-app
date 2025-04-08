import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "./auth-store";

// Define user profile types
export interface BaseUserProfile {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  profileImage?: string;
  country: string;
  onboardingComplete: boolean;
}

export interface PlayerProfile extends BaseUserProfile {
  userType: "player";
  position: string;
  positionCode: string;
  age: number;
  height?: number; // in cm
  weight?: number; // in kg
  favoriteClub: string;
  skills?: string[];
  achievements?: string[];
  bio?: string;
}

export interface ManagerProfile extends BaseUserProfile {
  userType: "manager";
  clubId?: string;
  clubName?: string;
  role: string;
  experience?: number; // in years
  bio?: string;
}

export interface ClubProfile extends BaseUserProfile {
  userType: "club";
  clubName: string;
  founded: string;
  location: string;
  website?: string;
  logo?: string;
  description?: string;
}

export type UserProfile = PlayerProfile | ManagerProfile | ClubProfile;

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
}

// Define user state
export interface UserState {
  profile: UserProfile | null;
  onboarding: OnboardingState;
  loading: boolean;
  error: string | null;

  // Profile actions
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;

  // Onboarding actions
  setOnboardingStep: (step: number) => void;
  resetOnboarding: () => void;
  completeOnboarding: () => void;

  clearError: () => void;
}

// Mock player profile
const mockPlayerProfile: PlayerProfile = {
  id: "player_1",
  name: "John Smith",
  email: "john@example.com",
  userType: "player",
  position: "Striker",
  positionCode: "ST",
  age: 17,
  height: 178,
  weight: 70,
  country: "GB",
  favoriteClub: "mancity",
  skills: ["Speed", "Finishing", "Dribbling"],
  achievements: ["Regional Champion 2022", "Top Scorer 2021"],
  bio: "Passionate striker with good finishing skills.",
  profileImage:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  onboardingComplete: true,
};

// Mock manager profile
const mockManagerProfile: ManagerProfile = {
  id: "manager_1",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  userType: "manager",
  clubId: "club_1",
  clubName: "Manchester City",
  role: "Youth Team Coach",
  experience: 8,
  country: "GB",
  bio: "Experienced youth coach with focus on player development.",
  profileImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  onboardingComplete: true,
};

// Mock club profile
const mockClubProfile: ClubProfile = {
  id: "club_1",
  name: "Manchester City",
  email: "youth@mancity.com",
  userType: "club",
  clubName: "Manchester City FC",
  founded: "1880",
  location: "Manchester, UK",
  website: "www.mancity.com",
  country: "GB",
  logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/180px-Manchester_City_FC_badge.svg.png",
  description: "Premier League club with world-class youth academy.",
  profileImage:
    "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/180px-Manchester_City_FC_badge.svg.png",
  onboardingComplete: true,
};

// Helper function to safely update profile based on user type
const updateProfileByType = (
  currentProfile: UserProfile,
  updates: Partial<UserProfile>
): UserProfile => {
  if (!currentProfile) {
    throw new Error("Cannot update a null profile");
  }

  // Create a type-safe update based on the user type
  switch (currentProfile.userType) {
    case "player": {
      const playerUpdates = updates as Partial<PlayerProfile>;
      return {
        ...currentProfile,
        ...playerUpdates,
        userType: "player", // Ensure userType remains 'player'
      } as PlayerProfile;
    }

    case "manager": {
      const managerUpdates = updates as Partial<ManagerProfile>;
      return {
        ...currentProfile,
        ...managerUpdates,
        userType: "manager", // Ensure userType remains 'manager'
      } as ManagerProfile;
    }

    case "club": {
      const clubUpdates = updates as Partial<ClubProfile>;
      return {
        ...currentProfile,
        ...clubUpdates,
        userType: "club", // Ensure userType remains 'club'
      } as ClubProfile;
    }

    default:
      // This should never happen if types are correct
      throw new Error(`Unknown user type: ${(currentProfile as any).userType}`);
  }
};

// Create user store
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      onboarding: {
        currentStep: 0,
        totalSteps: 4,
      },
      loading: false,
      error: null,

      fetchProfile: async (userId) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // In a real app, this would be an API call to fetch user profile
          // For demo, return mock profile based on ID prefix
          let profile: UserProfile | null = null;

          if (userId.startsWith("player_")) {
            profile = { ...mockPlayerProfile, id: userId };
          } else if (userId.startsWith("manager_")) {
            profile = { ...mockManagerProfile, id: userId };
          } else if (userId.startsWith("club_")) {
            profile = { ...mockClubProfile, id: userId };
          } else {
            // Default to player profile
            profile = { ...mockPlayerProfile, id: userId };
          }

          set({ profile, loading: false });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch profile",
          });
        }
      },

      updateProfile: async (data) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Update profile in state
          set((state) => {
            if (!state.profile) return { loading: false };

            try {
              // Use the helper function to create a type-safe updated profile
              const updatedProfile = updateProfileByType(state.profile, data);

              return {
                profile: updatedProfile,
                loading: false,
              };
            } catch (error) {
              console.error("Error updating profile:", error);
              return {
                loading: false,
                error:
                  error instanceof Error
                    ? error.message
                    : "Failed to update profile",
              };
            }
          });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update profile",
          });
        }
      },

      setOnboardingStep: (step) =>
        set((state) => ({
          onboarding: { ...state.onboarding, currentStep: step },
        })),

      resetOnboarding: () =>
        set((state) => ({
          onboarding: { ...state.onboarding, currentStep: 0 },
        })),

      completeOnboarding: () =>
        set((state) => {
          if (!state.profile) return state;

          try {
            // Use the helper function to create a type-safe updated profile
            const updatedProfile = updateProfileByType(state.profile, {
              onboardingComplete: true,
            });

            return {
              profile: updatedProfile,
            };
          } catch (error) {
            console.error("Error completing onboarding:", error);
            return state;
          }
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "finesse-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
