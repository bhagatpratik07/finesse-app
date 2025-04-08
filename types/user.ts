export interface UserProfile {
  name: string;
  position: string;
  positionCode: string;
  country: string;
  favoriteClub: string;
  profileImage?: string;
  onboardingComplete: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
}

export type FootballPosition = {
  id: number;
  code: string;
  name: string;
  x: number;
  y: number;
};
