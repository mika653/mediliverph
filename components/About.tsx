
import React from 'react';

interface Props {
  onBack: () => void;
  onRegister: () => void;
}

export const About: React.FC<Props> = ({ onBack, onRegister }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-ivory min-h-screen">
      <button onClick={onBack} className="mb-8 text-amber-700 font-bold flex items-center gap-2 text-lg hover:text-amber-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>

      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          Our Mission
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-6">Redefining Chronic Care in the Philippines</h1>
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Mediliver PH is the first physician-guided subscription platform designed specifically for Filipinos managing long-term health conditions.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Physician-Guided</h3>
          <p className="text-stone-500 leading-relaxed">Every treatment plan is reviewed by our resident physicians to ensure clinical accuracy and safety.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Pharmacist-Verified</h3>
          <p className="text-stone-500 leading-relaxed">Meds are dispensed and verified by licensed partner pharmacies, sorted accurately for your peace of mind.</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Refill Automation</h3>
          <p className="text-stone-500 leading-relaxed">Never miss a dose again. We track your supply and deliver your next pack before you run out.</p>
        </div>
      </div>

      <section className="mb-16 bg-stone-800 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="font-display text-3xl mb-8 text-center">Built for Continuity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-amber-400 font-bold text-lg mb-1">HTN</p>
              <p className="text-sm text-stone-300">Hypertension Management</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-amber-400 font-bold text-lg mb-1">Diabetes</p>
              <p className="text-sm text-stone-300">Type 1 & 2 Care</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-amber-400 font-bold text-lg mb-1">Dyslipidemia</p>
              <p className="text-sm text-stone-300">Cholesterol Control</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="font-display text-3xl text-stone-800 mb-6">Our Partner Network</h2>
        <p className="text-stone-500 mb-8 max-w-lg mx-auto">
          We work exclusively with DOH-licensed pharmacies and board-certified Filipino physicians to provide the highest standard of care.
        </p>
        <div className="flex flex-wrap justify-center gap-6 opacity-50 grayscale">
          <div className="h-12 w-36 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-stone-400 text-sm">PHARMACY A</div>
          <div className="h-12 w-36 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-stone-400 text-sm">PHARMACY B</div>
          <div className="h-12 w-36 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-stone-400 text-sm">MEDICAL ASSOC</div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-4 py-12 border-t border-amber-100">
        <h3 className="font-display text-2xl text-stone-800">Ready to simplify your care?</h3>
        <p className="text-stone-500 mb-4">Join Filipino families who trust Mediliver PH</p>
        <button
          onClick={onRegister}
          className="bg-amber-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
        >
          Register for Mediliver PH
        </button>
      </div>
    </div>
  );
};
