import React from 'react';
import { mockDoctorConsults } from '../../data/mockData';
import { DoctorConsult } from '../../types';

const typeBadgeClass = (type: DoctorConsult['type']) => {
  switch (type) {
    case 'teleconsult':
      return 'bg-blue-100 text-blue-700';
    case 'follow-up':
      return 'bg-emerald-100 text-emerald-700';
    case 'lab-review':
      return 'bg-indigo-100 text-indigo-700';
  }
};

const typeLabel = (type: DoctorConsult['type']) => {
  switch (type) {
    case 'teleconsult':
      return 'Teleconsult';
    case 'follow-up':
      return 'Follow-up';
    case 'lab-review':
      return 'Lab Review';
  }
};

export const DoctorSchedule: React.FC = () => {
  const upcoming = mockDoctorConsults.filter((c) => c.status === 'scheduled');
  const past = mockDoctorConsults.filter(
    (c) => c.status === 'completed' || c.status === 'cancelled'
  );

  return (
    <div className="space-y-8">
      {/* Upcoming */}
      <div>
        <h2 className="font-display text-xl font-bold text-stone-800 mb-4">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-stone-400 text-base">No upcoming consultations.</p>
        ) : (
          <div className="space-y-4">
            {upcoming.map((consult) => (
              <div
                key={consult.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5"
              >
                <div className="space-y-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-stone-800">
                      {consult.patientName}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-sm sm:text-base text-stone-500 font-semibold">
                        {consult.date} &middot; {consult.time}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${typeBadgeClass(
                          consult.type
                        )}`}
                      >
                        {typeLabel(consult.type)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Demo only')}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-2xl text-base transition-colors"
                  >
                    Start Consult
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Consultations */}
      <div>
        <h2 className="font-display text-xl font-bold text-stone-800 mb-4">
          Past Consultations
        </h2>
        {past.length === 0 ? (
          <p className="text-stone-400 text-base">No past consultations.</p>
        ) : (
          <div className="space-y-4">
            {past.map((consult) => {
              const isCancelled = consult.status === 'cancelled';

              return (
                <div
                  key={consult.id}
                  className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-5 ${
                    isCancelled ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-lg font-bold ${
                            isCancelled ? 'text-stone-400 line-through' : 'text-stone-800'
                          }`}
                        >
                          {consult.patientName}
                        </h3>
                        {isCancelled && (
                          <span className="bg-stone-100 text-stone-400 text-xs font-bold px-2 py-0.5 rounded-full">
                            Cancelled
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-base text-stone-400 font-semibold">
                          {consult.date} &middot; {consult.time}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${typeBadgeClass(
                            consult.type
                          )}`}
                        >
                          {typeLabel(consult.type)}
                        </span>
                        {!isCancelled && (
                          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      {consult.notes && (
                        <p
                          className={`text-base mt-3 ${
                            isCancelled ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          {consult.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
