
import React from 'react';
import { mockPharmacyOrders } from '../../data/mockData';

export const PharmacyDiscounts: React.FC = () => {
  const seniorPwdOrders = mockPharmacyOrders.filter((o) => o.hasSeniorPwdId);
  const discountAppliedCount = seniorPwdOrders.filter((o) => o.discountApplied).length;
  const discountPendingCount = seniorPwdOrders.filter((o) => !o.discountApplied).length;

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl text-stone-800">Senior Citizen / PWD Discounts</h3>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-stone-100 shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-700">{seniorPwdOrders.length}</p>
            <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">SC/PWD Orders</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-700">{discountAppliedCount}</p>
            <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">Discount Applied</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">{discountPendingCount}</p>
            <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">Pending</p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-blue-800 font-semibold text-base">20% Automatic Discount</p>
          <p className="text-blue-700 text-sm mt-1 leading-relaxed">
            Under Republic Act No. 9994 and RA 10754, senior citizens (60+) and persons with
            disability are entitled to a <strong>20% discount</strong> on prescription medications.
            Mediliver PH automatically applies this discount when a valid SC/PWD ID is on file.
            Orders with a verified ID receive the discount upon prescription verification.
          </p>
        </div>
      </div>

      {/* Order List */}
      <div>
        <h4 className="font-display text-lg text-stone-700 mb-3">SC/PWD Orders</h4>
        {seniorPwdOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 text-center">
            <p className="text-stone-500 text-base font-medium">No SC/PWD orders found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {seniorPwdOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center justify-between flex-wrap gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar circle */}
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm">
                      {order.patientName.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-stone-800 font-semibold text-base truncate">{order.patientName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-stone-400 text-sm">{order.patientAge} yrs old</span>
                      <span className="text-stone-300">|</span>
                      <span className="text-stone-400 text-sm">{order.refillCycle}-day cycle</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Medications count */}
                  <span className="bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full text-xs font-bold">
                    {order.medications.length} med{order.medications.length > 1 ? 's' : ''}
                  </span>
                  {/* Discount status badge */}
                  {order.discountApplied ? (
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      20% Applied
                    </span>
                  ) : (
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
