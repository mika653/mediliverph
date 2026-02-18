
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
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  PHARMACY_PORTAL = 'PHARMACY_PORTAL',
  DOCTOR_PORTAL = 'DOCTOR_PORTAL',
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

// ─── Auth ───────────────────────────────────────────────────────────────────

export type UserRole = 'patient' | 'pharmacy' | 'doctor';

export interface AuthSession {
  role: UserRole;
  name: string;
  email: string;
}

// ─── Partner Portal Tabs ────────────────────────────────────────────────────

export enum PharmacyTab {
  OVERVIEW = 'OVERVIEW',
  ORDERS = 'ORDERS',
  VERIFICATION = 'VERIFICATION',
  DISPATCH = 'DISPATCH',
  DISCOUNTS = 'DISCOUNTS',
}

export enum DoctorTab {
  OVERVIEW = 'OVERVIEW',
  PATIENTS = 'PATIENTS',
  SCHEDULE = 'SCHEDULE',
  LAB_REVIEW = 'LAB_REVIEW',
  PRESCRIPTIONS = 'PRESCRIPTIONS',
}

// ─── Pharmacy Portal ─────────────────────────────────────────────────────────

export type PharmacyOrderStatus =
  | 'pending_verification'
  | 'verified'
  | 'packing'
  | 'dispatched'
  | 'delivered';

export interface PharmacyOrder {
  id: string;
  patientName: string;
  patientAge: number;
  medications: string[];
  prescriptionStatus: 'pending' | 'verified' | 'flagged';
  orderStatus: PharmacyOrderStatus;
  receivedAt: string;
  estimatedDispatch?: string;
  hasSeniorPwdId: boolean;
  discountApplied: boolean;
  refillCycle: 30 | 60 | 90;
  notes?: string;
}

export interface PharmacyStats {
  ordersToday: number;
  pendingVerification: number;
  awaitingDispatch: number;
  deliveredThisMonth: number;
}

// ─── Doctor Portal ────────────────────────────────────────────────────────────

export type ConsultStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface DoctorPatient {
  id: string;
  name: string;
  age: number;
  condition: string;
  medications: string[];
  lastConsult: string;
  nextConsult?: string;
  labsPending: number;
  adherencePercent: number;
  flagged: boolean;
}

export interface DoctorConsult {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: 'teleconsult' | 'follow-up' | 'lab-review';
  status: ConsultStatus;
  notes?: string;
}

export interface DoctorLabReview {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  completedDate: string;
  flagged: boolean;
  reviewed: boolean;
  results: Array<{
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    flag: 'normal' | 'high' | 'low' | 'critical';
  }>;
}

export interface DoctorPrescription {
  id: string;
  patientName: string;
  medications: string[];
  issuedDate: string;
  status: 'active' | 'expired' | 'pending_renewal';
  renewalRequested: boolean;
}

export interface DoctorStats {
  patientsTotal: number;
  consultsToday: number;
  labsToReview: number;
  renewalRequests: number;
}
