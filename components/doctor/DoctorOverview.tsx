import React from 'react';
import { mockDoctorStats, mockDoctorConsults, mockDoctorPatients } from '../../data/mockData';

const TODAY = '2026-02-18';

export const DoctorOverview: React.FC = () => {
  const stats = mockDoctorStats;

  // Consults for today or still scheduled
  const todayConsults = mockDoctorConsults.filter(
    (c) => c.date === TODAY || c.status === 'scheduled'
  );

  // Flagged patients
  const flaggedPatients = mockDoctorPatients.filter((p) => p.flagged);

  return (
    <div className="space-y-8">
      {/* Stat Cards — 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Total Patients */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-stone-800">{stats.patientsTotal}</p>
          <p className="text-stone-500 font-semibold text-sm sm:text-base mt-1">Total Patients</p>
        </div>

        {/* Consults Today */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600">{stats.consultsToday}</p>
          <p className="text-stone-500 font-semibold text-sm sm:text-base mt-1">Consults Today</p>
        </div>

        {/* Labs to Review */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            {stats.labsToReview > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {stats.labsToReview}
              </span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-stone-800">{stats.labsToReview}</p>
          <p className="text-stone-500 font-semibold text-sm sm:text-base mt-1">Labs to Review</p>
        </div>

        {/* Renewal Requests */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            {stats.renewalRequests > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {stats.renewalRequests}
              </span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-black text-stone-800">{stats.renewalRequests}</p>
          <p className="text-stone-500 font-semibold text-sm sm:text-base mt-1">Renewal Requests</p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div>
        <h2 className="font-display text-xl font-bold text-stone-800 mb-4">
          Today&apos;s Schedule
        </h2>
        {todayConsults.length === 0 ? (
          <p className="text-stone-400 text-base">No consultations scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todayConsults.map((consult) => {
              const typeBadge =
                consult.type === 'teleconsult'
                  ? 'bg-blue-100 text-blue-700'
                  : consult.type === 'follow-up'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-indigo-100 text-indigo-700';

              const statusBadge =
                consult.status === 'scheduled'
                  ? 'bg-blue-50 text-blue-600'
                  : consult.status === 'completed'
                  ? 'bg-emerald-50 text-emerald-600'
                  : consult.status === 'in_progress'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-stone-100 text-stone-400';

              return (
                <div
                  key={consult.id}
                  className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center gap-4"
                >
                  {/* Time */}
                  <div className="text-center min-w-[64px]">
                    <p className="text-base font-bold text-stone-800">{consult.time}</p>
                    <p className="text-sm text-stone-400">{consult.date}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-10 bg-stone-200" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-stone-800 truncate">
                      {consult.patientName}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeBadge}`}>
                        {consult.type === 'teleconsult'
                          ? 'Teleconsult'
                          : consult.type === 'follow-up'
                          ? 'Follow-up'
                          : 'Lab Review'}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusBadge}`}>
                        {consult.status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    </div>
                  </div>

                  {/* Notes excerpt */}
                  {consult.notes && (
                    <p className="text-sm text-stone-400 truncate max-w-[180px] hidden sm:block">
                      {consult.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Flagged Patients */}
      <div>
        <h2 className="font-display text-xl font-bold text-stone-800 mb-4">
          Flagged Patients
        </h2>
        {flaggedPatients.length === 0 ? (
          <p className="text-stone-400 text-base">No flagged patients at this time.</p>
        ) : (
          <div className="space-y-3">
            {flaggedPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5 border-l-4 border-l-red-400"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-base sm:text-lg font-bold text-stone-800">{patient.name}</p>
                  </div>
                  <p className="text-sm sm:text-base text-stone-500">{patient.condition}</p>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Adherence: {patient.adherencePercent}% &middot; Last consult: {patient.lastConsult}
                  </p>
                </div>
                <button
                  onClick={() => alert('Demo only')}
                  className="mt-3 w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 sm:py-3 px-5 rounded-2xl text-sm sm:text-base transition-colors"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
