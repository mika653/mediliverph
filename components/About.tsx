
import React from 'react';

interface Props {
  onBack: () => void;
  onRegister: () => void;
}

export const About: React.FC<Props> = ({ onBack, onRegister }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 bg-ivory min-h-screen">
      <button onClick={onBack} className="mb-8 text-blue-700 font-bold flex items-center gap-2 text-lg hover:text-blue-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>

      <section className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 sm:mb-6">
          Our Mission
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-stone-800 mb-4 sm:mb-6">Redefining Chronic Care in the Philippines</h1>
        <p className="text-lg sm:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Mediliver PH is the first physician-guided subscription platform designed for all Filipinos managing long-term health conditions — from seniors needing reliable refills, to busy professionals who can't afford the wait, to anyone who values discreet, stigma-free medicine delivery.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
        <div className="bg-blue-50 border border-blue-100 p-5 sm:p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Physician-Guided</h3>
          <p className="text-stone-500 leading-relaxed">Every treatment plan is reviewed by our resident physicians to ensure clinical accuracy and safety.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-5 sm:p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Pharmacist-Verified</h3>
          <p className="text-stone-500 leading-relaxed">Meds are dispensed and verified by licensed partner pharmacies, sorted accurately for your peace of mind.</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-5 sm:p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">Refill Automation</h3>
          <p className="text-stone-500 leading-relaxed">Never miss a dose again. We track your supply and deliver your next pack before you run out.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-8 mb-10 sm:mb-16">
        <div className="bg-indigo-50 border border-indigo-100 p-5 sm:p-8 rounded-3xl hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">Labs & Monitoring</h3>
              <p className="text-stone-500 leading-relaxed">After every teleconsult, your physician can request labs directly through the platform. Visit any partner laboratory near you, and results are automatically forwarded to your doctor — no chasing paperwork, no extra trips.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-10 sm:mb-16 bg-stone-800 text-white p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="font-display text-2xl sm:text-3xl mb-6 sm:mb-8 text-center">Built for Continuity</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-blue-400 font-bold text-lg mb-1">HTN</p>
              <p className="text-sm text-stone-300">Hypertension Management</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-blue-400 font-bold text-lg mb-1">Diabetes</p>
              <p className="text-sm text-stone-300">Type 1 & 2 Care</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-blue-400 font-bold text-lg mb-1">Dyslipidemia</p>
              <p className="text-sm text-stone-300">Cholesterol Control</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-blue-400 font-bold text-lg mb-1">HIV / ART</p>
              <p className="text-sm text-stone-300">Discreet Antiretroviral Therapy</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-blue-400 font-bold text-lg mb-1">Mental Health</p>
              <p className="text-sm text-stone-300">Private Medication Delivery</p>
            </div>
            <div className="p-5 border border-stone-600 rounded-2xl bg-stone-700/40 hover:bg-stone-700/60 transition-colors">
              <p className="text-blue-400 font-bold text-lg mb-1">And More</p>
              <p className="text-sm text-stone-300">Thyroid, Asthma, GERD</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center mb-10 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl text-stone-800 mb-4 sm:mb-6">Our Partner Network</h2>
        <p className="text-stone-500 mb-8 max-w-lg mx-auto">
          We work exclusively with DOH-licensed pharmacies and board-certified Filipino physicians to provide the highest standard of care.
        </p>
        <div className="flex flex-wrap justify-center gap-6 opacity-50 grayscale">
          <div className="h-12 w-36 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-stone-400 text-sm">PHARMACY A</div>
          <div className="h-12 w-36 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-stone-400 text-sm">PHARMACY B</div>
          <div className="h-12 w-36 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-stone-400 text-sm">MEDICAL ASSOC</div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-4 py-12 border-t border-blue-100">
        <h3 className="font-display text-2xl text-stone-800">Ready to simplify your care?</h3>
        <p className="text-stone-500 mb-4">Join thousands of Filipinos who trust Mediliver PH</p>
        <button
          onClick={onRegister}
          className="bg-blue-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          Register for Mediliver PH
        </button>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 mb-8">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <p className="text-red-700 text-sm leading-relaxed">
          <strong>Emergency Disclaimer:</strong> Mediliver PH is for chronic maintenance care only. If you are experiencing a medical emergency, <strong>please go to your nearest Emergency Room or call 911 immediately.</strong>
        </p>
      </div>
    </div>
  );
};
