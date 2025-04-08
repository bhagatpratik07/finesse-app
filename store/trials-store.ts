import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define trial types
export interface Trial {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  location: string;
  date: string;
  description: string;
  positions: string[];
  isPremium: boolean;
  image: string;
  createdAt: string;
}

export interface TrialApplication {
  id: string;
  trialId: string;
  playerId: string;
  playerName: string;
  playerPosition: string;
  playerAge: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

// Define trials state
export interface TrialsState {
  trials: Trial[];
  applications: TrialApplication[];
  loading: boolean;
  error: string | null;

  // Trial actions
  fetchTrials: () => Promise<void>;
  createTrial: (trial: Omit<Trial, "id" | "createdAt">) => Promise<void>;
  updateTrial: (id: string, updates: Partial<Trial>) => Promise<void>;
  deleteTrial: (id: string) => Promise<void>;

  // Application actions
  fetchApplications: (trialId?: string) => Promise<void>;
  applyForTrial: (
    trialId: string,
    playerId: string,
    playerName: string,
    playerPosition: string,
    playerAge: number
  ) => Promise<void>;
  updateApplicationStatus: (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => Promise<void>;
  withdrawApplication: (applicationId: string) => Promise<void>;

  clearError: () => void;
}

// Mock data for trials
const mockTrials: Trial[] = [
  {
    id: "trial_1",
    title: "Manchester City U18 Trials",
    clubId: "club_1",
    clubName: "Manchester City",
    location: "Manchester, UK",
    date: "2023-06-15",
    description:
      "Join the Manchester City academy trials for under 18 players. Looking for talented players in all positions.",
    positions: ["ST", "CAM", "CB"],
    isPremium: true,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2023-05-01T12:00:00Z",
  },
  {
    id: "trial_2",
    title: "FC Barcelona Youth Tryouts",
    clubId: "club_2",
    clubName: "FC Barcelona",
    location: "Barcelona, Spain",
    date: "2023-07-10",
    description:
      "FC Barcelona is looking for talented young players to join their prestigious academy.",
    positions: ["GK", "LW", "RW", "CM"],
    isPremium: true,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2023-05-05T10:30:00Z",
  },
  {
    id: "trial_3",
    title: "Local Club Tryouts",
    clubId: "club_3",
    clubName: "Local FC",
    location: "London, UK",
    date: "2023-06-05",
    description:
      "Local football club looking for players of all positions for the upcoming season.",
    positions: ["ST", "CB", "GK", "LB", "RB"],
    isPremium: false,
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c643e7f3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2023-05-10T14:15:00Z",
  },
];

// Mock data for applications
const mockApplications: TrialApplication[] = [
  {
    id: "app_1",
    trialId: "trial_1",
    playerId: "player_1",
    playerName: "John Smith",
    playerPosition: "ST",
    playerAge: 17,
    status: "pending",
    createdAt: "2023-05-15T09:30:00Z",
  },
  {
    id: "app_2",
    trialId: "trial_1",
    playerId: "player_2",
    playerName: "Alex Johnson",
    playerPosition: "CAM",
    playerAge: 16,
    status: "accepted",
    createdAt: "2023-05-16T11:45:00Z",
  },
  {
    id: "app_3",
    trialId: "trial_2",
    playerId: "player_1",
    playerName: "John Smith",
    playerPosition: "ST",
    playerAge: 17,
    status: "pending",
    createdAt: "2023-05-17T14:20:00Z",
  },
];

// Create trials store
export const useTrialsStore = create<TrialsState>()(
  persist(
    (set, get) => ({
      trials: [],
      applications: [],
      loading: false,
      error: null,

      fetchTrials: async () => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // In a real app, this would be an API call to fetch trials
          set({ trials: mockTrials, loading: false });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error ? error.message : "Failed to fetch trials",
          });
        }
      },

      createTrial: async (trialData) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Create new trial with ID and timestamp
          const newTrial: Trial = {
            ...trialData,
            id: `trial_${Math.random().toString(36).substring(2, 9)}`,
            createdAt: new Date().toISOString(),
          };

          // Update state with new trial
          set((state) => ({
            trials: [...state.trials, newTrial],
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error ? error.message : "Failed to create trial",
          });
        }
      },

      updateTrial: async (id, updates) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Update trial in state
          set((state) => ({
            trials: state.trials.map((trial) =>
              trial.id === id ? { ...trial, ...updates } : trial
            ),
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error ? error.message : "Failed to update trial",
          });
        }
      },

      deleteTrial: async (id) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Remove trial from state
          set((state) => ({
            trials: state.trials.filter((trial) => trial.id !== id),
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error ? error.message : "Failed to delete trial",
          });
        }
      },

      fetchApplications: async (trialId) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Filter applications by trial ID if provided
          const applications = trialId
            ? mockApplications.filter((app) => app.trialId === trialId)
            : mockApplications;

          set({ applications, loading: false });
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch applications",
          });
        }
      },

      applyForTrial: async (
        trialId,
        playerId,
        playerName,
        playerPosition,
        playerAge
      ) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check if player already applied
          const existingApplication = get().applications.find(
            (app) => app.trialId === trialId && app.playerId === playerId
          );

          if (existingApplication) {
            throw new Error("You have already applied for this trial");
          }

          // Create new application
          const newApplication: TrialApplication = {
            id: `app_${Math.random().toString(36).substring(2, 9)}`,
            trialId,
            playerId,
            playerName,
            playerPosition,
            playerAge,
            status: "pending",
            createdAt: new Date().toISOString(),
          };

          // Update state with new application
          set((state) => ({
            applications: [...state.applications, newApplication],
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to apply for trial",
          });
        }
      },

      updateApplicationStatus: async (applicationId, status) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Update application status in state
          set((state) => ({
            applications: state.applications.map((app) =>
              app.id === applicationId ? { ...app, status } : app
            ),
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update application status",
          });
        }
      },

      withdrawApplication: async (applicationId) => {
        try {
          set({ loading: true, error: null });

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Remove application from state
          set((state) => ({
            applications: state.applications.filter(
              (app) => app.id !== applicationId
            ),
            loading: false,
          }));
        } catch (error) {
          set({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to withdraw application",
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "finesse-trials-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
