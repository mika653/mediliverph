
import React from 'react';
import { Appointment, AppState } from '../../types';
import { mockAppointments } from '../../data/mockData';

interface Props {
  onNavigate: (state: AppState) => void;
}

const typeBadge = (type: Appointment['type']) => {
  switch (type) {
    case 'teleconsult':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          Teleconsult
        </span>
      );
    case 'follow-up':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Follow-up
        </span>
      );
    case 'lab-review':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          Lab Review
        </span>
      );
  }
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-PH', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const AppointmentHistory: React.FC<Props> = ({ onNavigate }) => {
  const upcomingAppointment = mockAppointments.find(
    (apt) => apt.status === 'upcoming'
  );

  const pastAppointments = mockAppointments
    .filter(
      (apt) =>
        apt.status === 'completed' ||
        apt.status === 'cancelled' ||
        apt.status === 'missed'
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-display font-black text-stone-800 tracking-tight">
          Appointment History
        </h2>
        <p className="text-stone-500 mt-1">
          Your consultations and scheduled visits
        </p>
      </div>

      {/* Next Appointment Card */}
      {upcomingAppointment && (
        <section className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Next Appointment
              </span>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                {upcomingAppointment.type === 'teleconsult'
                  ? 'Teleconsult'
                  : upcomingAppointment.type === 'follow-up'
                  ? 'Follow-up'
                  : 'Lab Review'}
              </span>
            </div>

            <h3 className="text-3xl font-black mb-1">
              {upcomingAppointment.doctorName}
            </h3>

            <div className="flex items-center gap-4 mt-3 text-emerald-100">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-sm">
                  {formatDate(upcomingAppointment.date)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm">
                  {upcomingAppointment.time}
                </span>
              </div>
            </div>

            {upcomingAppointment.labsRequested &&
              upcomingAppointment.labsRequested.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-emerald-200 font-medium mr-1 self-center">
                    Labs requested:
                  </span>
                  {upcomingAppointment.labsRequested.map((lab) => (
                    <span
                      key={lab}
                      className="bg-white/15 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm"
                    >
                      {lab}
                    </span>
                  ))}
                </div>
              )}

            <button
              onClick={() => onNavigate(AppState.CONSULTATION)}
              className="mt-6 bg-white text-emerald-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Join Call
            </button>
          </div>
        </section>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <section>
          <h3 className="text-lg font-display font-bold text-stone-700 mb-4">
            Past Appointments
          </h3>
          <div className="space-y-4">
            {pastAppointments.map((apt) => {
              const isCancelledOrMissed =
                apt.status === 'cancelled' || apt.status === 'missed';

              return (
                <div
                  key={apt.id}
                  className={`bg-white rounded-2xl border p-6 shadow-sm transition-shadow ${
                    isCancelledOrMissed
                      ? 'border-stone-200 bg-stone-50/50'
                      : 'border-stone-100 hover:shadow-md'
                  }`}
                >
                  {/* Top Row: Doctor Name + Type Badge */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-lg font-bold ${
                          isCancelledOrMissed
                            ? 'text-stone-400'
                            : 'text-stone-800'
                        }`}
                      >
                        {apt.doctorName}
                      </h4>
                      <div
                        className={`flex items-center gap-3 mt-1 text-sm ${
                          isCancelledOrMissed
                            ? 'text-stone-300'
                            : 'text-stone-500'
                        }`}
                      >
                        <span
                          className={
                            isCancelledOrMissed ? 'line-through' : ''
                          }
                        >
                          {formatDate(apt.date)}
                        </span>
                        <span className="text-stone-300">|</span>
                        <span
                          className={
                            isCancelledOrMissed ? 'line-through' : ''
                          }
                        >
                          {apt.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {typeBadge(apt.type)}
                      {isCancelledOrMissed && (
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            apt.status === 'cancelled'
                              ? 'bg-stone-100 text-stone-400'
                              : 'bg-red-50 text-red-400'
                          }`}
                        >
                          {apt.status === 'cancelled'
                            ? 'Cancelled'
                            : 'Missed'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {apt.summary && (
                    <p
                      className={`text-sm leading-relaxed mb-3 ${
                        isCancelledOrMissed
                          ? 'text-stone-300'
                          : 'text-stone-600'
                      }`}
                    >
                      {apt.summary}
                    </p>
                  )}

                  {/* Tags: Prescription Updated + Labs Requested */}
                  {!isCancelledOrMissed && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {apt.prescriptionUpdated && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Prescription Updated
                        </span>
                      )}
                      {apt.labsRequested &&
                        apt.labsRequested.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Labs Requested: {apt.labsRequested.join(', ')}
                          </span>
                        )}
                    </div>
                  )}

                  {/* Reschedule Button for cancelled/missed */}
                  {isCancelledOrMissed && (
                    <div className="mt-4">
                      <button
                        onClick={() => onNavigate(AppState.CONSULTATION)}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
                      >
                        Reschedule
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!upcomingAppointment && pastAppointments.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-stone-600 mb-1">
            No Appointments Yet
          </h3>
          <p className="text-stone-400 text-sm">
            Your consultation history will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
