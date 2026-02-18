
import React from 'react';
import { PharmacyOrder, PharmacyOrderStatus } from '../../types';
import { mockPharmacyOrders } from '../../data/mockData';

const orderStatusConfig: Record<PharmacyOrderStatus, { label: string; classes: string }> = {
  pending_verification: { label: 'Pending Verification', classes: 'bg-orange-100 text-orange-700' },
  verified: { label: 'Verified', classes: 'bg-blue-100 text-blue-700' },
  packing: { label: 'Packing', classes: 'bg-indigo-100 text-indigo-700' },
  dispatched: { label: 'Dispatched', classes: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Delivered', classes: 'bg-emerald-100 text-emerald-700' },
};

const actionButton = (status: PharmacyOrderStatus) => {
  const map: Record<PharmacyOrderStatus, { label: string; classes: string } | null> = {
    pending_verification: { label: 'Verify', classes: 'bg-orange-500 hover:bg-orange-600 text-white' },
    verified: { label: 'Pack', classes: 'bg-blue-600 hover:bg-blue-700 text-white' },
    packing: { label: 'Dispatch', classes: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
    dispatched: { label: 'Delivered', classes: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
    delivered: null,
  };
  const config = map[status];
  if (!config) return null;
  return (
    <button
      onClick={() => alert('Demo action')}
      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${config.classes}`}
    >
      {config.label}
    </button>
  );
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const PharmacyOrderQueue: React.FC = () => {
  const sortedOrders = [...mockPharmacyOrders].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-xl text-stone-800">All Orders</h3>
        <span className="text-stone-400 text-sm font-medium">{sortedOrders.length} orders</span>
      </div>

      {sortedOrders.map((order) => {
        const statusCfg = orderStatusConfig[order.orderStatus];
        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 space-y-3"
          >
            {/* Top row: name + age + status */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <p className="text-stone-800 font-semibold text-lg">{order.patientName}</p>
                <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full text-xs font-bold">
                  {order.patientAge} yrs
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusCfg.classes}`}>
                {statusCfg.label}
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

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-xs font-bold">
                {order.refillCycle}-day cycle
              </span>
              {order.hasSeniorPwdId && (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  order.discountApplied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.discountApplied ? 'SC/PWD Discount Applied' : 'SC/PWD - Discount Pending'}
                </span>
              )}
              <span className="text-stone-400 text-xs">{formatDate(order.receivedAt)}</span>
            </div>

            {/* Notes */}
            {order.notes && (
              <p className="text-stone-400 text-sm italic">{order.notes}</p>
            )}

            {/* Action button */}
            <div className="flex justify-end pt-1">
              {actionButton(order.orderStatus)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
