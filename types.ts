
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  timing: 'Morning' | 'Afternoon' | 'Evening' | 'Before Bed';
  frequency: string;
  instruction: string;
  pharmacistVerified?: boolean;
  refillDate?: string;
  remainingDays?: number;
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
  emergencyContact?: string;
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

export enum DashboardTab {
  HOME = 'HOME',
  MEDICATIONS = 'MEDICATIONS',
  LABS = 'LABS',
  HISTORY = 'HISTORY',
  VITALS = 'VITALS',
  NOTIFICATIONS = 'NOTIFICATIONS',
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

export interface MedicationLog {
  id: string;
  medicationId: string;
  takenAt: string;
  scheduled: string;
  status: 'taken' | 'missed' | 'skipped';
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'scheduled' | 'completed';
  requestedDate: string;
  completedDate?: string;
  labFacility?: string;
  results?: LabResult[];
  doctorNotes?: string;
}

export interface LabResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: 'normal' | 'high' | 'low' | 'critical';
}

export interface Appointment {
  id: string;
  doctorName: string;
  type: 'teleconsult' | 'follow-up' | 'lab-review';
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'cancelled' | 'missed';
  summary?: string;
  prescriptionUpdated?: boolean;
  labsRequested?: string[];
}

export interface VitalReading {
  id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'heart_rate';
  value: string;
  systolic?: number;
  diastolic?: number;
  numericValue?: number;
  recordedAt: string;
  source: 'self' | 'lab' | 'clinic';
  notes?: string;
}

export interface AppNotification {
  id: string;
  type: 'refill' | 'appointment' | 'lab' | 'medication' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionTab?: DashboardTab;
}

export interface PrescriptionUpload {
  id: string;
  uploadDate: string;
  fileName: string;
  status: 'pending_review' | 'verified' | 'rejected';
  pharmacistNotes?: string;
  medicationsExtracted?: string[];
}
