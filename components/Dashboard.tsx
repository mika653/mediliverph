
import React, { useState } from 'react';
import { AppState, Medication, UserProfile, DashboardTab } from '../types';
import { mockNotifications } from '../data/mockData';
import { DashboardHome } from './dashboard/DashboardHome';
import { MedicationTracker } from './dashboard/MedicationTracker';
import { LabResults } from './dashboard/LabResults';
import { AppointmentHistory } from './dashboard/AppointmentHistory';
import { HealthVitals } from './dashboard/HealthVitals';
import { NotificationCenter } from './dashboard/NotificationCenter';

interface Props {
  userProfile: UserProfile;
  medications: Medication[];
  onNavigate: (state: AppState) => void;
  onScannerOpen: () => void;
}

const tabs: { key: DashboardTab; label: string; icon: React.ReactNode }[] = [
  {
    key: DashboardTab.HOME,
    label: 'Home',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: DashboardTab.MEDICATIONS,
    label: 'Meds',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    key: DashboardTab.LABS,
    label: 'Labs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    key: DashboardTab.HISTORY,
    label: 'History',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: DashboardTab.VITALS,
    label: 'Vitals',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    key: DashboardTab.NOTIFICATIONS,
    label: 'Alerts',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];

export const Dashboard: React.FC<Props> = ({ userProfile, medications, onNavigate, onScannerOpen }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.HOME);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const renderTab = () => {
    switch (activeTab) {
      case DashboardTab.HOME:
        return (
          <DashboardHome
            userProfile={userProfile}
            medications={medications}
            onNavigate={onNavigate}
            onTabChange={setActiveTab}
          />
        );
      case DashboardTab.MEDICATIONS:
        return <MedicationTracker medications={medications} onScannerOpen={onScannerOpen} />;
      case DashboardTab.LABS:
        return <LabResults />;
      case DashboardTab.HISTORY:
        return <AppointmentHistory onNavigate={onNavigate} />;
      case DashboardTab.VITALS:
        return <HealthVitals />;
      case DashboardTab.NOTIFICATIONS:
        return <NotificationCenter onTabChange={setActiveTab} />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-24 max-w-4xl mx-auto px-4 pt-6 sm:pt-8 bg-ivory min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl sm:text-3xl text-stone-800 truncate">Hello, {userProfile.name}!</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></span>
            <p className="text-stone-400 text-sm sm:text-lg truncate">Active Subscription: {userProfile.refillCycle}-Day Cycle</p>
          </div>
        </div>
        <div
          className="w-11 h-11 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-md cursor-pointer hover:scale-105 transition-transform flex-shrink-0 ml-3"
          onClick={() => onNavigate(AppState.LANDING)}
        >
          <span className="text-lg sm:text-xl">👩‍🦳</span>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="mb-8 -mx-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.key === DashboardTab.NOTIFICATIONS && unreadCount > 0 && (
                <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-600'
                    : 'bg-red-500 text-white'
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Active Tab Content */}
      <main>{renderTab()}</main>

      {/* ER Disclaimer */}
      <section className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <p className="text-red-700 text-xs leading-relaxed">
          <strong>Emergency?</strong> This service is for chronic maintenance care only. If you need emergency medical attention, <strong>go to the nearest ER or call 911 immediately.</strong>
        </p>
      </section>
    </div>
  );
};
