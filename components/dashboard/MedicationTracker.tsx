
import React, { useState, useMemo } from 'react';
import { Medication, MedicationLog, PrescriptionUpload } from '../../types';
import { mockMedicationLogs, mockPrescriptionUploads } from '../../data/mockData';

interface Props {
  medications: Medication[];
  onScannerOpen: () => void;
}

const timingOrder = ['Morning', 'Afternoon', 'Evening', 'Before Bed'] as const;

const timingConfig: Record<string, { bg: string; border: string; text: string; checkbox: string; icon: string }> = {
  Morning: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    checkbox: 'accent-blue-600',
    icon: '🌅',
  },
  Afternoon: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    checkbox: 'accent-orange-600',
    icon: '☀️',
  },
  Evening: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    checkbox: 'accent-indigo-600',
    icon: '🌆',
  },
  'Before Bed': {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    checkbox: 'accent-purple-600',
    icon: '🌙',
  },
};

const statusColors: Record<PrescriptionUpload['status'], { bg: string; text: string; label: string }> = {
  pending_review: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Pending Review' },
  verified: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Verified' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', label: 'Rejected' },
};

function getLast7Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
}

function getDayAbbreviation(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const MedicationTracker: React.FC<Props> = ({ medications, onScannerOpen }) => {
  const [takenMap, setTakenMap] = useState<Record<string, boolean>>({});

  const toggleTaken = (medicationId: string, timing: string) => {
    const key = `${medicationId}-${timing}`;
    setTakenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const groupedMedications = useMemo(() => {
    const groups: Record<string, Medication[]> = {};
    for (const timing of timingOrder) {
      const meds = medications.filter((m) => m.timing === timing);
      if (meds.length > 0) {
        groups[timing] = meds;
      }
    }
    return groups;
  }, [medications]);

  const { dayStatuses, adherencePercent } = useMemo(() => {
    const last7 = getLast7Days();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const statuses: Array<{ date: Date; status: 'taken' | 'missed' | 'future' }> = [];
    let totalPast = 0;
    let totalTaken = 0;

    for (const day of last7) {
      if (day > today) {
        statuses.push({ date: day, status: 'future' });
        continue;
      }

      const logsForDay = mockMedicationLogs.filter((log) => {
        const logDate = log.takenAt ? new Date(log.takenAt) : null;
        if (logDate && isSameDay(logDate, day)) return true;
        if (log.status === 'missed') {
          const scheduled = mockMedicationLogs.filter(
            (l) => l.takenAt && isSameDay(new Date(l.takenAt), day)
          );
          if (scheduled.length > 0) return true;
          const dayStr = day.toISOString().split('T')[0];
          const otherLogsOnDay = mockMedicationLogs.filter((l) => {
            if (l.takenAt) return l.takenAt.startsWith(dayStr);
            return false;
          });
          if (otherLogsOnDay.length > 0) return true;
        }
        return false;
      });

      const dayLogs = mockMedicationLogs.filter((log) => {
        const dayStr = day.toISOString().split('T')[0];
        if (log.takenAt && log.takenAt.startsWith(dayStr)) return true;
        if (log.status === 'missed') {
          const takenOnDay = mockMedicationLogs.filter(
            (l) => l.takenAt && l.takenAt.startsWith(dayStr) && l.status === 'taken'
          );
          if (takenOnDay.length > 0) return true;
        }
        return false;
      });

      if (dayLogs.length === 0 && logsForDay.length === 0) {
        statuses.push({ date: day, status: 'future' });
        continue;
      }

      const allLogs = mockMedicationLogs.filter((log) => {
        const dayStr = day.toISOString().split('T')[0];
        if (log.takenAt && log.takenAt.startsWith(dayStr)) return true;
        return false;
      });

      const missedOnDay = mockMedicationLogs.filter((log) => {
        if (log.status !== 'missed') return false;
        const dayStr = day.toISOString().split('T')[0];
        const hasCompanionLog = mockMedicationLogs.some(
          (l) => l.takenAt && l.takenAt.startsWith(dayStr) && l !== log
        );
        return hasCompanionLog;
      });

      const hasMissed = missedOnDay.length > 0;
      totalPast++;
      if (!hasMissed && allLogs.length > 0) {
        totalTaken++;
        statuses.push({ date: day, status: 'taken' });
      } else if (allLogs.length > 0 || hasMissed) {
        statuses.push({ date: day, status: 'missed' });
      } else {
        statuses.push({ date: day, status: 'future' });
      }
    }

    const percent = totalPast > 0 ? Math.round((totalTaken / totalPast) * 100) : 100;
    return { dayStatuses: statuses, adherencePercent: percent };
  }, []);

  return (
    <div className="space-y-8">
      {/* Today's Schedule */}
      <section>
        <h2 className="font-display text-2xl font-bold text-stone-800 mb-6">
          Today&apos;s Schedule
        </h2>
        <div className="space-y-4">
          {timingOrder.map((timing) => {
            const meds = groupedMedications[timing];
            if (!meds || meds.length === 0) return null;
            const config = timingConfig[timing];

            return (
              <div
                key={timing}
                className={`${config.bg} border ${config.border} rounded-2xl p-5`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{config.icon}</span>
                  <h3 className={`font-display text-lg font-bold ${config.text}`}>
                    {timing}
                  </h3>
                </div>
                <div className="space-y-3">
                  {meds.map((med) => {
                    const key = `${med.id}-${timing}`;
                    const isTaken = takenMap[key] || false;

                    return (
                      <div
                        key={med.id}
                        className={`flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm transition-opacity ${
                          isTaken ? 'opacity-60' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleTaken(med.id, timing)}
                          className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors ${
                            isTaken
                              ? `${config.bg} ${config.border} ${config.text}`
                              : 'border-stone-300 bg-white'
                          }`}
                          aria-label={`Mark ${med.name} as ${isTaken ? 'not taken' : 'taken'}`}
                        >
                          {isTaken && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-bold text-stone-800 ${
                              isTaken ? 'line-through' : ''
                            }`}
                          >
                            {med.name}
                          </p>
                          <p className="text-sm text-stone-500">{med.dosage}</p>
                          <p className={`text-xs mt-1 ${config.text} font-medium`}>
                            {med.instruction}
                          </p>
                        </div>
                        {med.pharmacistVerified && (
                          <span className="flex-shrink-0 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7-Day Adherence */}
      <section className="bg-white rounded-3xl border border-stone-100 p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold text-stone-800 mb-5">
          7-Day Adherence
        </h2>
        <div className="flex items-center justify-between gap-2 mb-4">
          {dayStatuses.map((day, i) => {
            let circleClass = '';
            if (day.status === 'taken') {
              circleClass = 'bg-emerald-500 text-white';
            } else if (day.status === 'missed') {
              circleClass = 'bg-red-400 text-white';
            } else {
              circleClass = 'bg-stone-200 text-stone-400';
            }

            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${circleClass}`}
                >
                  {day.status === 'taken' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : day.status === 'missed' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs">&mdash;</span>
                  )}
                </div>
                <span className="text-xs font-medium text-stone-500">
                  {getDayAbbreviation(day.date)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <span className="text-sm text-stone-500">Overall adherence</span>
          <span
            className={`text-2xl font-black ${
              adherencePercent >= 80
                ? 'text-emerald-600'
                : adherencePercent >= 50
                ? 'text-orange-600'
                : 'text-red-500'
            }`}
          >
            {adherencePercent}%
          </span>
        </div>
      </section>

      {/* Prescription Uploads */}
      <section>
        <h2 className="font-display text-xl font-bold text-stone-800 mb-5">
          Prescription Uploads
        </h2>
        <div className="space-y-4">
          {mockPrescriptionUploads.map((rx) => {
            const statusStyle = statusColors[rx.status];

            return (
              <div
                key={rx.id}
                className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-stone-800 truncate">{rx.fileName}</p>
                      <p className="text-xs text-stone-400">
                        Uploaded {new Date(rx.uploadDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                  >
                    {statusStyle.label}
                  </span>
                </div>

                {rx.pharmacistNotes && (
                  <div className="bg-emerald-50 rounded-xl p-3 mb-3">
                    <p className="text-xs font-semibold text-emerald-700 mb-0.5">
                      Pharmacist Notes
                    </p>
                    <p className="text-sm text-emerald-800">{rx.pharmacistNotes}</p>
                  </div>
                )}

                {rx.medicationsExtracted && rx.medicationsExtracted.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-stone-500 mb-2">
                      Extracted Medications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {rx.medicationsExtracted.map((med, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-stone-100 text-stone-700 px-3 py-1.5 rounded-full"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Upload New Prescription Button */}
          <button
            onClick={onScannerOpen}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload New Prescription
          </button>
        </div>
      </section>
    </div>
  );
};
