import React, { useState } from 'react';
import { AuthSession, DoctorTab } from '../types';
import { DoctorOverview } from './doctor/DoctorOverview';
import { DoctorPatients } from './doctor/DoctorPatients';
import { DoctorSchedule } from './doctor/DoctorSchedule';
import { DoctorLabReview } from './doctor/DoctorLabReview';
import { DoctorPrescriptions } from './doctor/DoctorPrescriptions';

interface Props {
  session: AuthSession;
  onLogout: () => void;
}

const TABS: { key: DoctorTab; label: string; icon: React.ReactNode }[] = [
  {
    key: DoctorTab.OVERVIEW,
    label: 'Overview',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    key: DoctorTab.PATIENTS,
    label: 'Patients',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    key: DoctorTab.SCHEDULE,
    label: 'Schedule',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: DoctorTab.LAB_REVIEW,
    label: 'Lab Review',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: DoctorTab.PRESCRIPTIONS,
    label: 'Prescriptions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export const DoctorPortal: React.FC<Props> = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState<DoctorTab>(DoctorTab.OVERVIEW);

  const renderTab = () => {
    switch (activeTab) {
      case DoctorTab.OVERVIEW:
        return <DoctorOverview />;
      case DoctorTab.PATIENTS:
        return <DoctorPatients />;
      case DoctorTab.SCHEDULE:
        return <DoctorSchedule />;
      case DoctorTab.LAB_REVIEW:
        return <DoctorLabReview />;
      case DoctorTab.PRESCRIPTIONS:
        return <DoctorPrescriptions />;
      default:
        return <DoctorOverview />;
    }
  };

  return (
    <div className="pb-8 max-w-4xl mx-auto px-4 pt-8 bg-ivory min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-stone-800 tracking-tight">
            <span className="text-blue-600">MEDI</span>LIVER{' '}
            <span className="text-blue-600 font-medium text-lg">PH</span>
          </h1>
          <p className="text-stone-500 text-base mt-0.5">
            Partner Portal &mdash; Physician
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-stone-800 font-bold text-base">{session.name}</p>
            <p className="text-stone-400 text-sm">{session.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-3 px-5 rounded-2xl text-base transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tab Bar — horizontal scrollable pills */}
      <div className="overflow-x-auto -mx-4 px-4 mb-8">
        <div className="flex gap-2 w-max">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 py-3 px-5 text-base font-bold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white rounded-full shadow-md'
                  : 'bg-stone-100 text-stone-600 rounded-full hover:bg-stone-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      {renderTab()}
    </div>
  );
};
