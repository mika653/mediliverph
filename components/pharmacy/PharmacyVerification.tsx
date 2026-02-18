
import React from 'react';
import { mockPharmacyOrders } from '../../data/mockData';

export const PharmacyVerification: React.FC = () => {
  const pendingOrders = mockPharmacyOrders.filter(
    (o) => o.prescriptionStatus === 'pending' || o.prescriptionStatus === 'flagged'
  );

  const flaggedCount = pendingOrders.filter((o) => o.prescriptionStatus === 'flagged').length;
  const pendingCount = pendingOrders.filter((o) => o.prescriptionStatus === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Summary header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-stone-800">Prescription Verification</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-bold">
            {pendingCount} pending
          </span>
          <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-bold">
            {flaggedCount} flagged
          </span>
        </div>
      </div>

      {pendingOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-stone-500 text-base font-medium">All prescriptions verified</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingOrders.map((order) => {
            const isFlagged = order.prescriptionStatus === 'flagged';
            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border shadow-sm p-5 space-y-4 ${
                  isFlagged
                    ? 'border-l-4 border-l-red-500 border-t-stone-100 border-r-stone-100 border-b-stone-100'
                    : 'border-stone-100'
                }`}
              >
                {/* Patient info */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-stone-800 font-semibold text-lg">{order.patientName}</p>
                    <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full text-xs font-bold">
                      {order.patientAge} yrs
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isFlagged ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {isFlagged ? 'Flagged' : 'Pending'}
                  </span>
                </div>

                {/* Medications */}
                <div className="flex flex-wrap gap-2">
                  {order.medications.map((med) => (
                    <span
                      key={med}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {med}
                    </span>
                  ))}
                </div>

                {/* Flagged warning */}
                {isFlagged && order.notes && (
                  <div className="flex items-start gap-2 bg-red-50 rounded-xl p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-red-700 text-sm">{order.notes}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => alert('Demo only')}
                    className="px-5 py-2.5 border-2 border-red-300 text-red-600 rounded-full text-sm font-bold hover:bg-red-50 transition-colors"
                  >
                    Flag Issue
                  </button>
                  <button
                    onClick={() => alert('Demo only')}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors"
                  >
                    Mark Verified
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
