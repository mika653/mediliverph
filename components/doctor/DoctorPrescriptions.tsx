import React from 'react';
import { mockDoctorPrescriptions } from '../../data/mockData';

export const DoctorPrescriptions: React.FC = () => {
  // Sort: renewalRequested=true first, then by issuedDate descending
  const sorted = [...mockDoctorPrescriptions].sort((a, b) => {
    if (a.renewalRequested && !b.renewalRequested) return -1;
    if (!a.renewalRequested && b.renewalRequested) return 1;
    return b.issuedDate.localeCompare(a.issuedDate);
  });

  const statusBadge = (status: 'active' | 'expired' | 'pending_renewal') => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700';
      case 'expired':
        return 'bg-red-50 text-red-600';
      case 'pending_renewal':
        return 'bg-orange-50 text-orange-600';
    }
  };

  const statusLabel = (status: 'active' | 'expired' | 'pending_renewal') => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      case 'pending_renewal':
        return 'Pending Renewal';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-stone-800 mb-4">
        Prescriptions
      </h2>

      {sorted.length === 0 ? (
        <p className="text-stone-400 text-base">No prescriptions found.</p>
      ) : (
        sorted.map((rx) => (
          <div
            key={rx.id}
            className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-5 ${
              rx.renewalRequested ? 'border-l-4 border-l-orange-400' : ''
            }`}
          >
            {/* Header: patient name + status */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-800">{rx.patientName}</h3>
                <p className="text-sm text-stone-400 mt-0.5">Issued: {rx.issuedDate}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge(
                    rx.status
                  )}`}
                >
                  {statusLabel(rx.status)}
                </span>
                {rx.renewalRequested && (
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    Renewal Requested
                  </span>
                )}
              </div>
            </div>

            {/* Medications as pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {rx.medications.map((med, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full"
                >
                  {med}
                </span>
              ))}
            </div>

            {/* Renew button if renewal requested */}
            {rx.renewalRequested && (
              <button
                onClick={() => alert('Demo only')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl text-base transition-colors"
              >
                Renew Now
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};
