
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  timing: 'Morning' | 'Afternoon' | 'Evening' | 'Before Bed';
  frequency: string;
  instruction: string;
  pharmacistVerified?: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  location: string;
  condition: string;
  nextConsultation?: string;
  isRegistered?: boolean;
  hasSeniorPwdId?: boolean;
  refillCycle: 30 | 60 | 90;
}

export interface PrescriptionAnalysis {
  medications: Medication[];
  summary: string;
  warnings: string[];
}

export enum AppState {
  LANDING = 'LANDING',
  ABOUT = 'ABOUT',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  CONSULTATION = 'CONSULTATION',
  SCANNER = 'SCANNER',
  PAYMENT = 'PAYMENT',
  PROFILE = 'PROFILE'
}

export interface OnboardingData {
  fullName: string;
  age: string;
  contactNumber: string;
  consultationDate: string;
  consultationTime: string;
  hasSeniorPwdId: boolean;
  refillCycle: 30 | 60 | 90;
}
