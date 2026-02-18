
import React from 'react';
import { PharmacyOrder, PharmacyOrderStatus } from '../../types';
import { mockPharmacyOrders } from '../../data/mockData';

const STEPS: { key: PharmacyOrderStatus; label: string }[] = [
  { key: 'verified', label: 'Verified' },
  { key: 'packing', label: 'Packing' },
  { key: 'dispatched', label: 'Dispatched' },
  { key: 'delivered', label: 'Delivered' },
];

const stepIndex = (status: PharmacyOrderStatus): number => {
  const idx = STEPS.findIndex((s) => s.key === status);
  return idx === -1 ? 0 : idx;
};

const statusOrder: PharmacyOrderStatus[] = [
  'verified',
  'packing',
  'dispatched',
  'delivered',
];

const StepperVisual: React.FC<{ order: PharmacyOrder }> = ({ order }) => {
  const current = stepIndex(order.orderStatus);

  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => {
        const isPast = i < current;
        const isCurrent = i === current;
        const isFuture = i > current;

        return (
          <div key={step.key} className="flex items-start gap-3">
            {/* Dot + line column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${
                  isPast
                    ? 'bg-emerald-500 border-emerald-500'
                    : isCurrent
                    ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100'
                    : 'bg-stone-200 border-stone-300'
                }`}
              >
                {isPast && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${
                    isPast ? 'bg-emerald-400' : 'bg-stone-200'
                  }`}
                />
              )}
            </div>

            {/* Label */}
            <p
              className={`text-sm font-medium pt-0 ${
                isPast
                  ? 'text-emerald-700'
                  : isCurrent
                  ? 'text-blue-700 font-bold'
                  : 'text-stone-400'
              }`}
            >
              {step.label}
              {isCurrent && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                  Current
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const PharmacyDispatch: React.FC = () => {
  // Filter to only orders that are past pending_verification (i.e. in the dispatch pipeline)
  const dispatchOrders = mockPharmacyOrders
    .filter((o) => statusOrder.includes(o.orderStatus))
    .sort((a, b) => {
      const aIdx = statusOrder.indexOf(a.orderStatus);
      const bIdx = statusOrder.indexOf(b.orderStatus);
      return aIdx - bIdx;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-stone-800">Dispatch Tracker</h3>
        <span className="text-stone-400 text-sm font-medium">{dispatchOrders.length} in pipeline</span>
      </div>

      {dispatchOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 text-center">
          <p className="text-stone-500 text-base font-medium">No orders in the dispatch pipeline</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dispatchOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-stone-800 font-semibold text-lg">{order.patientName}</p>
                  <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full text-xs font-bold">
                    {order.patientAge} yrs
                  </span>
                </div>
                {order.hasSeniorPwdId && (
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    SC/PWD
                  </span>
                )}
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

              {/* Stepper */}
              <div className="bg-stone-50 rounded-xl p-4">
                <StepperVisual order={order} />
              </div>

              {/* Estimated dispatch */}
              {order.estimatedDispatch && (
                <div className="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-stone-500">
                    Est. dispatch:{' '}
                    <span className="font-semibold text-stone-700">
                      {new Date(order.estimatedDispatch).toLocaleDateString('en-PH', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
