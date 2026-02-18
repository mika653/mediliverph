
import React from 'react';
import { PharmacyOrder } from '../../types';
import { mockPharmacyStats, mockPharmacyOrders } from '../../data/mockData';

const statusBadge = (status: PharmacyOrder['orderStatus']) => {
  const map: Record<PharmacyOrder['orderStatus'], { label: string; classes: string }> = {
    pending_verification: { label: 'Pending Verification', classes: 'bg-orange-100 text-orange-700' },
    verified: { label: 'Verified', classes: 'bg-blue-100 text-blue-700' },
    packing: { label: 'Packing', classes: 'bg-indigo-100 text-indigo-700' },
    dispatched: { label: 'Dispatched', classes: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Delivered', classes: 'bg-emerald-100 text-emerald-700' },
  };
  const { label, classes } = map[status];
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${classes}`}>
      {label}
    </span>
  );
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
};

export const PharmacyOverview: React.FC = () => {
  const recentOrders = [...mockPharmacyOrders]
    .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
    .slice(0, 3);

  const stats = [
    {
      label: 'Orders Today',
      value: mockPharmacyStats.ordersToday,
      color: 'blue',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: 'Pending Verification',
      value: mockPharmacyStats.pendingVerification,
      color: 'orange',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Awaiting Dispatch',
      value: mockPharmacyStats.awaitingDispatch,
      color: 'indigo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      label: 'Delivered This Month',
      value: mockPharmacyStats.deliveredThisMonth,
      color: 'emerald',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const bgMap: Record<string, string> = {
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    indigo: 'bg-indigo-50',
    emerald: 'bg-emerald-50',
  };

  const numColorMap: Record<string, string> = {
    blue: 'text-blue-700',
    orange: 'text-orange-700',
    indigo: 'text-indigo-700',
    emerald: 'text-emerald-700',
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${bgMap[stat.color]} rounded-2xl border border-stone-100 shadow-sm p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>
            </div>
            <p className={`text-2xl sm:text-3xl font-bold ${numColorMap[stat.color]}`}>{stat.value}</p>
            <p className="text-stone-500 text-xs sm:text-sm font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <section>
        <h3 className="font-display text-xl text-stone-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="text-stone-800 font-semibold text-base truncate">{order.patientName}</p>
                <p className="text-stone-400 text-sm mt-0.5">{formatTime(order.receivedAt)}</p>
              </div>
              <div className="flex-shrink-0 ml-3">
                {statusBadge(order.orderStatus)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
