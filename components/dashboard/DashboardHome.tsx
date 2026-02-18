
import React from 'react';
import { Medication, UserProfile, AppState, DashboardTab } from '../../types';
import { MedicationPack } from '../MedicationPack';

interface Props {
  userProfile: UserProfile;
  medications: Medication[];
  onNavigate: (state: AppState) => void;
  onTabChange: (tab: DashboardTab) => void;
}

export const DashboardHome: React.FC<Props> = ({ userProfile, medications, onNavigate, onTabChange }) => {
  return (
    <div className="space-y-8">
      {/* Refill Progress Card */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-medium opacity-90 mb-2">Refill Automation</h3>
          <p className="text-4xl font-black mb-1">22 Days Remaining</p>
          <div className="w-full bg-blue-800/40 h-3 rounded-full mb-6">
            <div className="bg-white h-3 rounded-full w-[70%]"></div>
          </div>
          <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-sm">
            Request Early Refill
          </button>
        </div>
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        </div>
      </section>

      {/* Medication Pack */}
      <section>
        <MedicationPack medications={medications} />
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800">Doctor's Call</h3>
              <p className="text-emerald-600 text-sm font-semibold">{userProfile.nextConsultation}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate(AppState.CONSULTATION)}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors"
          >
            Start Consult
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800">Lab Requests</h3>
              <p className="text-indigo-600 text-sm font-semibold">2 pending from last consult</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2">
              <span className="text-sm text-stone-700">HbA1c (Blood Sugar)</span>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Pending</span>
            </div>
            <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2">
              <span className="text-sm text-stone-700">Lipid Panel</span>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Pending</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 mb-3">Results are auto-forwarded to your doctor once ready.</p>
          <button
            onClick={() => onTabChange(DashboardTab.LABS)}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
          >
            View Lab Details
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800">Senior/PWD Benefit</h3>
              <p className="text-blue-600 text-sm font-semibold">
                {userProfile.hasSeniorPwdId ? 'ID Verified: 20% Applied' : 'No ID: Regular Pricing'}
              </p>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
            Update ID Documents
          </button>
        </div>
      </section>
    </div>
  );
};
