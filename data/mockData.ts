
import { MedicationLog, LabTest, Appointment, VitalReading, AppNotification, PrescriptionUpload, DashboardTab, PharmacyOrder, PharmacyStats, DoctorPatient, DoctorConsult, DoctorLabReview, DoctorPrescription, DoctorStats } from '../types';

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

// ─── Pharmacy Portal Mock Data ──────────────────────────────────────────────

export const mockPharmacyStats: PharmacyStats = {
  ordersToday: 14,
  pendingVerification: 3,
  awaitingDispatch: 5,
  deliveredThisMonth: 87,
};

export const mockPharmacyOrders: PharmacyOrder[] = [
  {
    id: 'po1', patientName: 'Rosa Delgado', patientAge: 68,
    medications: ['Amlodipine 5mg', 'Metformin 500mg'],
    prescriptionStatus: 'pending', orderStatus: 'pending_verification',
    receivedAt: '2026-02-18T08:30:00', estimatedDispatch: '2026-02-19',
    hasSeniorPwdId: true, discountApplied: true, refillCycle: 30,
  },
  {
    id: 'po2', patientName: 'Carlos Mendoza', patientAge: 55,
    medications: ['Losartan 50mg', 'Atorvastatin 20mg'],
    prescriptionStatus: 'verified', orderStatus: 'packing',
    receivedAt: '2026-02-18T07:00:00', estimatedDispatch: '2026-02-18',
    hasSeniorPwdId: false, discountApplied: false, refillCycle: 30,
    notes: 'Patient requested blister pack format.',
  },
  {
    id: 'po3', patientName: 'Elena Santos', patientAge: 72,
    medications: ['Metformin 850mg', 'Glimepiride 2mg'],
    prescriptionStatus: 'flagged', orderStatus: 'pending_verification',
    receivedAt: '2026-02-17T15:00:00',
    hasSeniorPwdId: true, discountApplied: false, refillCycle: 60,
    notes: 'Prescription expiry date unclear — needs pharmacist review.',
  },
  {
    id: 'po4', patientName: 'Jun Bautista', patientAge: 45,
    medications: ['Tenofovir 300mg', 'Emtricitabine 200mg'],
    prescriptionStatus: 'verified', orderStatus: 'dispatched',
    receivedAt: '2026-02-16T09:00:00', estimatedDispatch: '2026-02-18',
    hasSeniorPwdId: false, discountApplied: false, refillCycle: 30,
    notes: 'Discreet packaging requested.',
  },
  {
    id: 'po5', patientName: 'Remedios Cruz', patientAge: 63,
    medications: ['Amlodipine 10mg', 'Rosuvastatin 10mg', 'Aspirin 80mg'],
    prescriptionStatus: 'verified', orderStatus: 'delivered',
    receivedAt: '2026-02-14T10:00:00',
    hasSeniorPwdId: true, discountApplied: true, refillCycle: 90,
  },
  {
    id: 'po6', patientName: 'Maria Lim', patientAge: 38,
    medications: ['Sertraline 50mg'],
    prescriptionStatus: 'verified', orderStatus: 'verified',
    receivedAt: '2026-02-18T10:15:00', estimatedDispatch: '2026-02-19',
    hasSeniorPwdId: false, discountApplied: false, refillCycle: 30,
    notes: 'Discreet packaging — plain brown box.',
  },
];

// ─── Doctor Portal Mock Data ────────────────────────────────────────────────

export const mockDoctorStats: DoctorStats = {
  patientsTotal: 48,
  consultsToday: 6,
  labsToReview: 4,
  renewalRequests: 2,
};

export const mockDoctorPatients: DoctorPatient[] = [
  {
    id: 'dp1', name: 'Rosa Delgado', age: 68,
    condition: 'Hypertension + Type 2 Diabetes',
    medications: ['Amlodipine 5mg', 'Metformin 500mg'],
    lastConsult: '2026-01-15', nextConsult: '2026-02-19',
    labsPending: 2, adherencePercent: 85, flagged: false,
  },
  {
    id: 'dp2', name: 'Carlos Mendoza', age: 55,
    condition: 'Dyslipidemia + Hypertension',
    medications: ['Losartan 50mg', 'Atorvastatin 20mg'],
    lastConsult: '2026-02-01', nextConsult: '2026-03-01',
    labsPending: 0, adherencePercent: 92, flagged: false,
  },
  {
    id: 'dp3', name: 'Elena Santos', age: 72,
    condition: 'Type 2 Diabetes',
    medications: ['Metformin 850mg', 'Glimepiride 2mg'],
    lastConsult: '2026-01-20', nextConsult: '2026-02-20',
    labsPending: 1, adherencePercent: 60, flagged: true,
  },
  {
    id: 'dp4', name: 'Jun Bautista', age: 45,
    condition: 'HIV / ART',
    medications: ['Tenofovir 300mg', 'Emtricitabine 200mg'],
    lastConsult: '2026-02-10',
    labsPending: 0, adherencePercent: 98, flagged: false,
  },
  {
    id: 'dp5', name: 'Remedios Cruz', age: 63,
    condition: 'Hypertension + Dyslipidemia',
    medications: ['Amlodipine 10mg', 'Rosuvastatin 10mg', 'Aspirin 80mg'],
    lastConsult: '2026-01-28', nextConsult: '2026-02-28',
    labsPending: 0, adherencePercent: 95, flagged: false,
  },
  {
    id: 'dp6', name: 'Maria Lim', age: 38,
    condition: 'Depression',
    medications: ['Sertraline 50mg'],
    lastConsult: '2026-02-05', nextConsult: '2026-03-05',
    labsPending: 0, adherencePercent: 88, flagged: false,
  },
];

export const mockDoctorConsults: DoctorConsult[] = [
  { id: 'dc1', patientId: 'dp1', patientName: 'Rosa Delgado', date: '2026-02-19', time: '10:00 AM', type: 'teleconsult', status: 'scheduled' },
  { id: 'dc2', patientId: 'dp3', patientName: 'Elena Santos', date: '2026-02-19', time: '11:00 AM', type: 'follow-up', status: 'scheduled' },
  { id: 'dc3', patientId: 'dp2', patientName: 'Carlos Mendoza', date: '2026-02-18', time: '02:00 PM', type: 'lab-review', status: 'completed', notes: 'LDL improving on Atorvastatin. Continue current dose.' },
  { id: 'dc4', patientId: 'dp5', patientName: 'Remedios Cruz', date: '2026-02-18', time: '09:00 AM', type: 'teleconsult', status: 'completed', notes: 'BP well-controlled. Continue current regimen.' },
  { id: 'dc5', patientId: 'dp4', patientName: 'Jun Bautista', date: '2026-02-17', time: '03:00 PM', type: 'follow-up', status: 'completed', notes: 'ART adherence excellent. Viral load undetectable.' },
  { id: 'dc6', patientId: 'dp6', patientName: 'Maria Lim', date: '2026-02-17', time: '04:00 PM', type: 'teleconsult', status: 'completed', notes: 'Mood improving. Continue Sertraline 50mg.' },
];

export const mockDoctorLabReviews: DoctorLabReview[] = [
  {
    id: 'dlr1', patientName: 'Rosa Delgado', patientId: 'dp1',
    testName: 'HbA1c', completedDate: '2026-02-15',
    flagged: true, reviewed: false,
    results: [{ parameter: 'HbA1c', value: '7.2', unit: '%', referenceRange: '4.0 - 5.6%', flag: 'high' }],
  },
  {
    id: 'dlr2', patientName: 'Elena Santos', patientId: 'dp3',
    testName: 'Fasting Blood Sugar', completedDate: '2026-02-14',
    flagged: true, reviewed: false,
    results: [{ parameter: 'FBS', value: '198', unit: 'mg/dL', referenceRange: '70 - 100 mg/dL', flag: 'high' }],
  },
  {
    id: 'dlr3', patientName: 'Carlos Mendoza', patientId: 'dp2',
    testName: 'Lipid Panel', completedDate: '2026-02-13',
    flagged: false, reviewed: true,
    results: [
      { parameter: 'LDL', value: '105', unit: 'mg/dL', referenceRange: '< 100 mg/dL', flag: 'high' },
      { parameter: 'HDL', value: '58', unit: 'mg/dL', referenceRange: '> 40 mg/dL', flag: 'normal' },
    ],
  },
  {
    id: 'dlr4', patientName: 'Remedios Cruz', patientId: 'dp5',
    testName: 'CBC', completedDate: '2026-02-12',
    flagged: false, reviewed: true,
    results: [{ parameter: 'WBC', value: '6.5', unit: 'x10³/µL', referenceRange: '4.5 - 11.0', flag: 'normal' }],
  },
];

export const mockDoctorPrescriptions: DoctorPrescription[] = [
  { id: 'drx1', patientName: 'Rosa Delgado', medications: ['Amlodipine 5mg', 'Metformin 500mg'], issuedDate: '2025-12-10', status: 'active', renewalRequested: false },
  { id: 'drx2', patientName: 'Elena Santos', medications: ['Metformin 850mg', 'Glimepiride 2mg'], issuedDate: '2026-01-20', status: 'active', renewalRequested: true },
  { id: 'drx3', patientName: 'Carlos Mendoza', medications: ['Losartan 50mg', 'Atorvastatin 20mg'], issuedDate: '2026-02-01', status: 'active', renewalRequested: false },
  { id: 'drx4', patientName: 'Jun Bautista', medications: ['Tenofovir 300mg', 'Emtricitabine 200mg'], issuedDate: '2025-11-15', status: 'pending_renewal', renewalRequested: true },
  { id: 'drx5', patientName: 'Remedios Cruz', medications: ['Amlodipine 10mg', 'Rosuvastatin 10mg', 'Aspirin 80mg'], issuedDate: '2026-01-28', status: 'active', renewalRequested: false },
  { id: 'drx6', patientName: 'Maria Lim', medications: ['Sertraline 50mg'], issuedDate: '2026-02-05', status: 'active', renewalRequested: false },
];
