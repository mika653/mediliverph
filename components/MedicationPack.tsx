
import React from 'react';
import { Medication } from '../types';

interface Props {
  medications: Medication[];
}

export const MedicationPack: React.FC<Props> = ({ medications }) => {
  const periods: Medication['timing'][] = ['Morning', 'Afternoon', 'Evening', 'Before Bed'];

  const periodStyles: Record<string, { bg: string; text: string; icon: string }> = {
    Morning: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: 'bg-amber-100' },
    Afternoon: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', icon: 'bg-orange-100' },
    Evening: { bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', icon: 'bg-indigo-100' },
    'Before Bed': { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', icon: 'bg-purple-100' },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h3 className="font-display text-2xl text-stone-800">Your Mediliver Pack Today</h3>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          Pharmacist Verified
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {periods.map(period => {
          const medsForPeriod = medications.filter(m => m.timing === period);
          if (medsForPeriod.length === 0) return null;
          const style = periodStyles[period] || periodStyles.Morning;

          return (
            <div key={period} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide border ${style.bg} ${style.text}`}>
                  {period}
                </span>
                <span className="text-stone-400 font-medium text-sm">8:00 AM Expected</span>
              </div>
              <ul className="space-y-3">
                {medsForPeriod.map(med => (
                  <li key={med.id} className="flex flex-col border-b border-stone-50 pb-2 last:border-0">
                    <div className="flex justify-between items-start">
                      <span className="text-xl font-bold text-stone-800">{med.name}</span>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Verified
                      </span>
                    </div>
                    <span className="text-stone-500">{med.dosage} - {med.instruction}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <button className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-amber-700 transition-colors">
                  I have taken my medicine
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
