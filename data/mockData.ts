
import { MedicationLog, LabTest, Appointment, VitalReading, AppNotification, PrescriptionUpload, DashboardTab } from '../types';

export const mockMedicationLogs: MedicationLog[] = [
  { id: 'log1', medicationId: '1', takenAt: '2026-02-18T08:15:00', scheduled: 'Morning', status: 'taken' },
  { id: 'log2', medicationId: '2', takenAt: '2026-02-18T19:00:00', scheduled: 'Evening', status: 'taken' },
  { id: 'log3', medicationId: '1', takenAt: '2026-02-17T08:30:00', scheduled: 'Morning', status: 'taken' },
  { id: 'log4', medicationId: '2', takenAt: '', scheduled: 'Evening', status: 'missed' },
  { id: 'log5', medicationId: '1', takenAt: '2026-02-16T09:00:00', scheduled: 'Morning', status: 'taken' },
  { id: 'log6', medicationId: '2', takenAt: '2026-02-16T18:45:00', scheduled: 'Evening', status: 'taken' },
  { id: 'log7', medicationId: '1', takenAt: '2026-02-15T08:20:00', scheduled: 'Morning', status: 'taken' },
  { id: 'log8', medicationId: '2', takenAt: '2026-02-15T19:10:00', scheduled: 'Evening', status: 'taken' },
  { id: 'log9', medicationId: '1', takenAt: '', scheduled: 'Morning', status: 'missed' },
  { id: 'log10', medicationId: '2', takenAt: '2026-02-14T18:30:00', scheduled: 'Evening', status: 'taken' },
  { id: 'log11', medicationId: '1', takenAt: '2026-02-13T08:45:00', scheduled: 'Morning', status: 'taken' },
  { id: 'log12', medicationId: '2', takenAt: '2026-02-13T19:00:00', scheduled: 'Evening', status: 'taken' },
  { id: 'log13', medicationId: '1', takenAt: '2026-02-12T08:00:00', scheduled: 'Morning', status: 'taken' },
  { id: 'log14', medicationId: '2', takenAt: '2026-02-12T18:50:00', scheduled: 'Evening', status: 'taken' },
];

export const mockLabTests: LabTest[] = [
  {
    id: 'lab1',
    name: 'HbA1c (Glycated Hemoglobin)',
    category: 'Blood Sugar',
    status: 'completed',
    requestedDate: '2026-01-15',
    completedDate: '2026-01-22',
    labFacility: 'Hi-Precision Diagnostics - Quezon City',
    results: [
      { parameter: 'HbA1c', value: '6.8', unit: '%', referenceRange: '4.0 - 5.6%', flag: 'high' },
    ],
    doctorNotes: 'Slightly elevated. Continue Metformin. Recheck in 3 months.',
  },
  {
    id: 'lab2',
    name: 'Lipid Panel',
    category: 'Cholesterol',
    status: 'completed',
    requestedDate: '2026-01-15',
    completedDate: '2026-01-23',
    labFacility: 'Hi-Precision Diagnostics - Quezon City',
    results: [
      { parameter: 'Total Cholesterol', value: '210', unit: 'mg/dL', referenceRange: '< 200 mg/dL', flag: 'high' },
      { parameter: 'LDL', value: '135', unit: 'mg/dL', referenceRange: '< 100 mg/dL', flag: 'high' },
      { parameter: 'HDL', value: '52', unit: 'mg/dL', referenceRange: '> 40 mg/dL', flag: 'normal' },
      { parameter: 'Triglycerides', value: '148', unit: 'mg/dL', referenceRange: '< 150 mg/dL', flag: 'normal' },
    ],
    doctorNotes: 'LDL elevated. Consider adding Atorvastatin. Discussed with patient.',
  },
  {
    id: 'lab3',
    name: 'Complete Blood Count (CBC)',
    category: 'General',
    status: 'pending',
    requestedDate: '2026-02-10',
    labFacility: 'Any Hi-Precision or Healthway branch',
  },
  {
    id: 'lab4',
    name: 'Creatinine & BUN',
    category: 'Kidney Function',
    status: 'pending',
    requestedDate: '2026-02-10',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    doctorName: 'Dr. Maria Reyes',
    type: 'teleconsult',
    date: '2026-02-19',
    time: '10:00 AM',
    status: 'upcoming',
    labsRequested: ['CBC', 'Creatinine & BUN'],
  },
  {
    id: 'apt2',
    doctorName: 'Dr. Maria Reyes',
    type: 'teleconsult',
    date: '2026-01-15',
    time: '10:00 AM',
    status: 'completed',
    summary: 'Reviewed HbA1c and Lipid Panel results. Metformin maintained at 500mg. Discussed adding Atorvastatin for cholesterol.',
    prescriptionUpdated: false,
    labsRequested: ['HbA1c', 'Lipid Panel'],
  },
  {
    id: 'apt3',
    doctorName: 'Dr. Maria Reyes',
    type: 'follow-up',
    date: '2025-12-10',
    time: '02:00 PM',
    status: 'completed',
    summary: 'Initial consultation. Started Amlodipine 5mg for hypertension and Metformin 500mg for Type 2 diabetes. Advised on diet and exercise.',
    prescriptionUpdated: true,
  },
  {
    id: 'apt4',
    doctorName: 'Dr. Maria Reyes',
    type: 'lab-review',
    date: '2025-11-28',
    time: '11:00 AM',
    status: 'cancelled',
    summary: 'Patient was unable to attend. Rescheduled.',
  },
];

export const mockVitalReadings: VitalReading[] = [
  { id: 'v1', type: 'blood_pressure', value: '130/85', systolic: 130, diastolic: 85, recordedAt: '2026-02-18T08:00:00', source: 'self' },
  { id: 'v2', type: 'blood_pressure', value: '135/88', systolic: 135, diastolic: 88, recordedAt: '2026-02-15T08:30:00', source: 'self' },
  { id: 'v3', type: 'blood_pressure', value: '140/90', systolic: 140, diastolic: 90, recordedAt: '2026-02-12T09:00:00', source: 'self' },
  { id: 'v4', type: 'blood_pressure', value: '138/87', systolic: 138, diastolic: 87, recordedAt: '2026-02-08T08:15:00', source: 'clinic' },
  { id: 'v5', type: 'blood_pressure', value: '145/92', systolic: 145, diastolic: 92, recordedAt: '2026-02-01T07:45:00', source: 'self' },

  { id: 'v6', type: 'blood_sugar', value: '118', numericValue: 118, recordedAt: '2026-02-18T07:00:00', source: 'self', notes: 'Fasting' },
  { id: 'v7', type: 'blood_sugar', value: '125', numericValue: 125, recordedAt: '2026-02-15T06:45:00', source: 'self', notes: 'Fasting' },
  { id: 'v8', type: 'blood_sugar', value: '132', numericValue: 132, recordedAt: '2026-02-10T07:15:00', source: 'lab' },

  { id: 'v9', type: 'weight', value: '65', numericValue: 65, recordedAt: '2026-02-15T08:00:00', source: 'self' },
  { id: 'v10', type: 'weight', value: '66', numericValue: 66, recordedAt: '2026-01-15T08:00:00', source: 'clinic' },

  { id: 'v11', type: 'heart_rate', value: '72', numericValue: 72, recordedAt: '2026-02-18T08:00:00', source: 'self' },
  { id: 'v12', type: 'heart_rate', value: '75', numericValue: 75, recordedAt: '2026-02-15T08:00:00', source: 'self' },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1', type: 'refill', title: 'Refill Reminder',
    message: 'Your 30-day medicine pack refill is in 8 days. We will prepare your next pack automatically.',
    timestamp: '2026-02-18T09:00:00', read: false,
    actionLabel: 'View Pack', actionTab: DashboardTab.HOME,
  },
  {
    id: 'n2', type: 'appointment', title: 'Upcoming Teleconsult',
    message: 'Your consultation with Dr. Maria Reyes is tomorrow at 10:00 AM.',
    timestamp: '2026-02-18T08:00:00', read: false,
    actionLabel: 'View Details', actionTab: DashboardTab.HISTORY,
  },
  {
    id: 'n3', type: 'lab', title: 'Lab Tests Pending',
    message: 'You have 2 lab tests (CBC, Creatinine) pending from your last consult. Please visit any partner lab.',
    timestamp: '2026-02-12T10:00:00', read: false,
    actionLabel: 'View Labs', actionTab: DashboardTab.LABS,
  },
  {
    id: 'n4', type: 'medication', title: 'Missed Dose',
    message: 'It looks like you missed your evening Metformin yesterday. Remember to take it with dinner today.',
    timestamp: '2026-02-18T07:00:00', read: true,
    actionLabel: 'View Medications', actionTab: DashboardTab.MEDICATIONS,
  },
  {
    id: 'n5', type: 'lab', title: 'Lab Results Ready',
    message: 'Your HbA1c and Lipid Panel results from Jan 22 are now available. Your doctor has been notified.',
    timestamp: '2026-01-23T14:00:00', read: true,
    actionLabel: 'View Results', actionTab: DashboardTab.LABS,
  },
  {
    id: 'n6', type: 'system', title: 'Welcome to Mediliver PH',
    message: 'Your subscription is active! Your first pharmacist-verified medicine pack is being prepared.',
    timestamp: '2025-12-01T10:00:00', read: true,
  },
];

export const mockPrescriptionUploads: PrescriptionUpload[] = [
  {
    id: 'rx1', uploadDate: '2025-12-10', fileName: 'prescription_dec2025.jpg',
    status: 'verified', pharmacistNotes: 'All medications verified. Pack prepared.',
    medicationsExtracted: ['Amlodipine 5mg', 'Metformin 500mg'],
  },
  {
    id: 'rx2', uploadDate: '2026-02-10', fileName: 'prescription_feb2026.jpg',
    status: 'pending_review',
    medicationsExtracted: ['Atorvastatin 20mg'],
  },
];
