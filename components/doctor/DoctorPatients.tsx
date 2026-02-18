import React, { useState } from 'react';
import { mockDoctorPatients } from '../../data/mockData';

export const DoctorPatients: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = mockDoctorPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const adherenceColor = (pct: number) => {
    if (pct >= 80) return 'text-emerald-600 bg-emerald-50';
    if (pct >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients by name..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-stone-200 text-base focus:border-blue-400 focus:outline-none transition-colors bg-white"
        />
      </div>

      {/* Patient Cards */}
      {filtered.length === 0 ? (
        <p className="text-stone-400 text-base text-center py-8">No patients found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((patient) => (
            <div
              key={patient.id}
              className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-5 ${
                patient.flagged ? 'border-l-4 border-l-red-400' : ''
              }`}
            >
              {/* Top row: name + age + flagged icon */}
              <div className="flex items-center gap-3 mb-3">
                {patient.flagged && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                )}
                <h3 className="text-lg font-bold text-stone-800">{patient.name}</h3>
                <span className="bg-stone-100 text-stone-600 text-sm font-bold px-2.5 py-0.5 rounded-full">
                  {patient.age} yrs
                </span>
              </div>

              {/* Condition tag */}
              <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {patient.condition}
              </span>

              {/* Metrics row */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {/* Adherence */}
                <span className={`font-bold px-3 py-1 rounded-full ${adherenceColor(patient.adherencePercent)}`}>
                  {patient.adherencePercent}% adherence
                </span>

                {/* Pending labs */}
                {patient.labsPending > 0 && (
                  <span className="bg-orange-50 text-orange-600 font-bold px-3 py-1 rounded-full">
                    {patient.labsPending} lab{patient.labsPending > 1 ? 's' : ''} pending
                  </span>
                )}

                {/* Next consult */}
                {patient.nextConsult && (
                  <span className="text-stone-400 font-semibold">
                    Next: {patient.nextConsult}
                  </span>
                )}
              </div>

              {/* Medications */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {patient.medications.map((med, i) => (
                  <span
                    key={i}
                    className="bg-stone-50 text-stone-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-stone-100"
                  >
                    {med}
                  </span>
                ))}
              </div>

              {/* View Profile button */}
              <div className="mt-4">
                <button
                  onClick={() => alert('Demo only')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl text-base transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
