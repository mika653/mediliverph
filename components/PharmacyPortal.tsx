
import React, { useState } from 'react';
import { AuthSession, PharmacyTab } from '../types';
import { PharmacyOverview } from './pharmacy/PharmacyOverview';
import { PharmacyOrderQueue } from './pharmacy/PharmacyOrderQueue';
import { PharmacyVerification } from './pharmacy/PharmacyVerification';
import { PharmacyDispatch } from './pharmacy/PharmacyDispatch';
import { PharmacyDiscounts } from './pharmacy/PharmacyDiscounts';

interface Props {
  session: AuthSession;
  onLogout: () => void;
}

const tabs: { key: PharmacyTab; label: string; icon: React.ReactNode }[] = [
  {
    key: PharmacyTab.OVERVIEW,
    label: 'Overview',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    key: PharmacyTab.ORDERS,
    label: 'Orders',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    key: PharmacyTab.VERIFICATION,
    label: 'Verify Rx',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: PharmacyTab.DISPATCH,
    label: 'Dispatch',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    key: PharmacyTab.DISCOUNTS,
    label: 'Senior/PWD',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
];

export const PharmacyPortal: React.FC<Props> = ({ session, onLogout }) => {
  const [activeTab, setActiveTab] = useState<PharmacyTab>(PharmacyTab.OVERVIEW);

  const renderTab = () => {
    switch (activeTab) {
      case PharmacyTab.OVERVIEW:
        return <PharmacyOverview />;
      case PharmacyTab.ORDERS:
        return <PharmacyOrderQueue />;
      case PharmacyTab.VERIFICATION:
        return <PharmacyVerification />;
      case PharmacyTab.DISPATCH:
        return <PharmacyDispatch />;
      case PharmacyTab.DISCOUNTS:
        return <PharmacyDiscounts />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-8 max-w-4xl mx-auto px-4 pt-8 bg-ivory min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-display text-3xl text-stone-800 tracking-tight">
            MEDILIVER<span className="text-blue-600"> PH</span>
          </h1>
          <p className="text-stone-400 text-base mt-1">Partner Portal &mdash; Pharmacy</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-stone-700 font-semibold text-base">{session.name}</p>
            <p className="text-stone-400 text-sm">{session.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-stone-100 text-stone-600 rounded-full text-sm font-bold hover:bg-stone-200 transition-colors"
          >
            Logout
          </button>
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
            </button>
          ))}
        </div>
      </nav>

      {/* Active Tab Content */}
      <main>{renderTab()}</main>
    </div>
  );
};
