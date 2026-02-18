
import React, { useState } from 'react';
import { AppState, Medication, PrescriptionAnalysis, UserProfile, OnboardingData } from './types';
import { PrescriptionScanner } from './components/PrescriptionScanner';
import { MedicationPack } from './components/MedicationPack';
import { Consultation } from './components/Consultation';
import { Onboarding } from './components/Onboarding';
import { Payment } from './components/Payment';
import { About } from './components/About';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.LANDING);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Lola Rosa",
    age: 68,
    location: "Quezon City, PH",
    condition: "Hypertension",
    nextConsultation: "Tomorrow, 10:00 AM",
    isRegistered: false,
    hasSeniorPwdId: false,
    refillCycle: 30
  });

  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Amlodipine', dosage: '5mg', timing: 'Morning', frequency: 'Once a day', instruction: 'After breakfast', pharmacistVerified: true },
    { id: '2', name: 'Metformin', dosage: '500mg', timing: 'Evening', frequency: 'Once a day', instruction: 'With dinner', pharmacistVerified: true },
  ]);

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserProfile({
      ...userProfile,
      name: data.fullName,
      age: parseInt(data.age),
      nextConsultation: `${data.consultationDate} at ${data.consultationTime}`,
      isRegistered: true,
      hasSeniorPwdId: data.hasSeniorPwdId,
      refillCycle: data.refillCycle
    });
    setCurrentStep(AppState.PAYMENT);
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(AppState.DASHBOARD);
    alert("Subscription activated! Your pharmacist-verified pack is being prepared.");
  };

  const handleAnalysisComplete = (analysis: PrescriptionAnalysis) => {
    const verifiedMeds = analysis.medications.map(m => ({ ...m, pharmacistVerified: true }));
    setMeds(prev => [...prev, ...verifiedMeds]);
    setIsScannerOpen(false);
    setCurrentStep(AppState.DASHBOARD);
    alert("New medications sent to pharmacist for verification and added to your pack.");
  };

  const Landing = () => (
    <div className="flex flex-col min-h-screen bg-ivory">
      {/* Navigation */}
      <nav className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center relative z-20">
        <h1 className="text-2xl font-black text-stone-800 tracking-tight">
          <span className="text-blue-600">MEDI</span>LIVER <span className="text-blue-600 font-medium text-lg">PH</span>
        </h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => setCurrentStep(AppState.ABOUT)} className="font-semibold text-stone-500 hover:text-blue-700 transition-colors">About</button>
          <button onClick={() => setCurrentStep(AppState.ONBOARDING)} className="font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md">Register</button>
        </div>
      </nav>

      {/* Hero Section with Image */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
            {/* Left: Text Content */}
            <div className="relative z-10 py-12 lg:py-20">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Trusted by Filipino families
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-stone-800 mb-6 leading-[1.1]">
                Seamless Care for{' '}
                <span className="text-blue-600 italic">Filipino Seniors</span>
              </h1>
              <p className="text-xl md:text-2xl text-stone-500 max-w-xl leading-relaxed mb-4">
                Gamot na Sigurado, Hatid sa Inyo
              </p>
              <p className="text-lg text-stone-400 max-w-lg leading-relaxed mb-10">
                Physician-guided, pharmacist-verified maintenance medicine delivered to your doorstep every month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => setCurrentStep(userProfile.isRegistered ? AppState.DASHBOARD : AppState.ONBOARDING)}
                  className="bg-blue-600 text-white py-4 px-10 rounded-full text-xl font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform active:scale-[0.98]"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setCurrentStep(AppState.ABOUT)}
                  className="text-stone-600 py-4 px-10 rounded-full text-xl font-semibold border-2 border-stone-200 hover:border-blue-300 hover:text-blue-700 transition-all transform active:scale-[0.98]"
                >
                  Learn More
                </button>
              </div>

              {/* Senior Benefit Badge */}
              <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3 rounded-2xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Senior & PWD Discount</p>
                  <p className="text-xs opacity-80">20% automatically applied with valid ID</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl warm-glow">
                <img
                  src="https://images.unsplash.com/photo-1627146733272-dfecc12a4c29?auto=format&fit=crop&w=800&q=80"
                  alt="A Filipino family sharing a warm moment together"
                  className="w-full h-[560px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-blue-600/10"></div>
                {/* Floating Card on Image */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-stone-800">"Nanay's medicines arrive on time, every time."</p>
                      <p className="text-sm text-stone-500">— Maria, daughter from Quezon City</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative warm circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="lg:hidden px-6 pb-8">
          <div className="rounded-3xl overflow-hidden shadow-xl warm-glow">
            <img
              src="https://images.unsplash.com/photo-1627146733272-dfecc12a4c29?auto=format&fit=crop&w=800&q=80"
              alt="A Filipino family sharing a warm moment together"
              className="w-full h-64 object-cover"
            />
            <div className="bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-stone-800 text-sm">"Nanay's medicines arrive on time, every time."</p>
                  <p className="text-xs text-stone-500">— Maria, daughter from Quezon City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 border-t border-blue-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-stone-400 text-sm font-semibold uppercase tracking-widest mb-10">How we care for your family</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center transition-all group-hover:bg-blue-100 group-hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div className="text-center">
                <span className="text-stone-700 font-bold text-sm block">Physician Guided</span>
                <span className="text-stone-400 text-xs">Licensed MDs</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center transition-all group-hover:bg-emerald-100 group-hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="text-center">
                <span className="text-stone-700 font-bold text-sm block">Pharmacist Verified</span>
                <span className="text-stone-400 text-xs">DOH-licensed</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-100 group-hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <div className="text-center">
                <span className="text-stone-700 font-bold text-sm block">Auto Refill</span>
                <span className="text-stone-400 text-xs">Never miss a dose</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-center transition-all group-hover:bg-rose-100 group-hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
              </div>
              <div className="text-center">
                <span className="text-stone-700 font-bold text-sm block">Home Delivered</span>
                <span className="text-stone-400 text-xs">Right to your door</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">The reality</p>
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 text-center mb-6">
            Managing chronic illness shouldn't be this hard
          </h2>
          <p className="text-center text-stone-500 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
            For millions of Filipino seniors on maintenance medication, the monthly routine is exhausting — and skipping even one refill has real consequences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative pl-6 border-l-2 border-stone-200">
              <p className="font-display text-4xl text-stone-800 mb-2">50%</p>
              <p className="text-stone-500 leading-relaxed">
                of Filipino patients with hypertension don't take their medication consistently, often due to access barriers.
              </p>
            </div>
            <div className="relative pl-6 border-l-2 border-stone-200">
              <p className="font-display text-4xl text-stone-800 mb-2">3–4 hrs</p>
              <p className="text-stone-500 leading-relaxed">
                Average time a senior spends per month traveling to a doctor, waiting in line at a pharmacy, and going home.
              </p>
            </div>
            <div className="relative pl-6 border-l-2 border-stone-200">
              <p className="font-display text-4xl text-stone-800 mb-2">1 in 3</p>
              <p className="text-stone-500 leading-relaxed">
                Filipino seniors live with at least two chronic conditions requiring daily medication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">How it works</p>
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 text-center mb-14">
            Three steps. Then it just runs.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 font-display text-2xl">1</div>
              <h3 className="font-bold text-stone-800 text-lg mb-2">Register & consult</h3>
              <p className="text-stone-500 leading-relaxed">
                Sign up and book a quick teleconsult with a licensed physician. They'll review your prescription and care plan.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 font-display text-2xl">2</div>
              <h3 className="font-bold text-stone-800 text-lg mb-2">Pharmacist verifies</h3>
              <p className="text-stone-500 leading-relaxed">
                A DOH-licensed pharmacist checks every medicine, confirms dosages, and sorts your pack by time of day.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 font-display text-2xl">3</div>
              <h3 className="font-bold text-stone-800 text-lg mb-2">Delivered on schedule</h3>
              <p className="text-stone-500 leading-relaxed">
                Your medicine pack arrives at your door every 30, 60, or 90 days — before you run out. No trips, no lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions & Quiet CTA */}
      <section className="py-20 bg-stone-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-center text-blue-300 text-sm font-semibold uppercase tracking-widest mb-4">Built for continuity</p>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-6">
            Chronic conditions need consistent care
          </h2>
          <p className="text-center text-stone-400 text-lg max-w-xl mx-auto mb-14 leading-relaxed">
            We currently support patients managing the most common maintenance conditions in the Philippines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            <div className="bg-stone-700/50 border border-stone-600 rounded-2xl p-6 text-center hover:bg-stone-700/70 transition-colors">
              <p className="font-display text-2xl mb-1">Hypertension</p>
              <p className="text-stone-400 text-sm">Amlodipine, Losartan, Telmisartan, and more</p>
            </div>
            <div className="bg-stone-700/50 border border-stone-600 rounded-2xl p-6 text-center hover:bg-stone-700/70 transition-colors">
              <p className="font-display text-2xl mb-1">Diabetes</p>
              <p className="text-stone-400 text-sm">Metformin, Glimepiride, Insulin support</p>
            </div>
            <div className="bg-stone-700/50 border border-stone-600 rounded-2xl p-6 text-center hover:bg-stone-700/70 transition-colors">
              <p className="font-display text-2xl mb-1">Dyslipidemia</p>
              <p className="text-stone-400 text-sm">Atorvastatin, Rosuvastatin, Fenofibrate</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-stone-400 mb-6">If your condition isn't listed, reach out — we're expanding coverage regularly.</p>
            <button
              onClick={() => setCurrentStep(AppState.ONBOARDING)}
              className="bg-white text-stone-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-sm"
            >
              Check eligibility
            </button>
          </div>
        </div>
      </section>

      {/* Quiet Testimonial */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-200 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <blockquote className="font-display text-2xl md:text-3xl text-stone-700 italic leading-relaxed mb-6">
            Before Mediliver, I had to take a tricycle to the pharmacy, wait in line, sometimes they didn't have my Metformin. Now it just arrives. My anak set it up for me.
          </blockquote>
          <p className="text-stone-500 font-semibold">Lola Carmen, 72</p>
          <p className="text-stone-400 text-sm">Quezon City — Diabetes & Hypertension</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-blue-100 text-center">
        <p className="text-stone-400 text-sm">Mediliver PH — Chronic care, simplified for Filipino families.</p>
      </footer>
    </div>
  );

  const Dashboard = () => (
    <div className="pb-24 max-w-4xl mx-auto px-4 pt-8 bg-ivory min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-3xl text-stone-800">Hello, {userProfile.name}!</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-stone-400 text-lg">Active Subscription: {userProfile.refillCycle}-Day Cycle</p>
          </div>
        </div>
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" onClick={() => setCurrentStep(AppState.LANDING)}>
          <span className="text-xl">👩‍🦳</span>
        </div>
      </header>

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
          <MedicationPack medications={meds} />
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              onClick={() => setCurrentStep(AppState.CONSULTATION)}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors"
            >
              Start Consult
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

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 flex justify-around items-center z-40 max-w-4xl mx-auto rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
        <button onClick={() => setCurrentStep(AppState.DASHBOARD)} className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${currentStep === AppState.DASHBOARD ? 'text-blue-600' : 'text-stone-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className={`text-xs font-bold ${currentStep === AppState.DASHBOARD ? 'text-blue-600' : 'text-stone-400'}`}>HOME</span>
        </button>
        <button onClick={() => setIsScannerOpen(true)} className="flex flex-col items-center -mt-12 bg-blue-600 p-5 rounded-full shadow-xl hover:scale-105 transition-transform active:scale-95 border-4 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
        <button onClick={() => setCurrentStep(AppState.CONSULTATION)} className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${currentStep === AppState.CONSULTATION ? 'text-blue-600' : 'text-stone-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className={`text-xs font-bold ${currentStep === AppState.CONSULTATION ? 'text-blue-600' : 'text-stone-400'}`}>DOCTOR</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory selection:bg-blue-100">
      {currentStep === AppState.LANDING && <Landing />}

      {currentStep === AppState.ABOUT && (
        <About
          onBack={() => setCurrentStep(AppState.LANDING)}
          onRegister={() => setCurrentStep(AppState.ONBOARDING)}
        />
      )}

      {currentStep === AppState.ONBOARDING && (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-ivory flex items-center justify-center p-4">
          <Onboarding onComplete={handleOnboardingComplete} />
        </div>
      )}

      {currentStep === AppState.PAYMENT && (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-ivory flex items-center justify-center p-4">
          <Payment
            amount={userProfile.hasSeniorPwdId ? "₱1,000.00 / mo" : "₱1,250.00 / mo"}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setCurrentStep(AppState.ONBOARDING)}
          />
        </div>
      )}

      {currentStep === AppState.DASHBOARD && <Dashboard />}

      {currentStep === AppState.CONSULTATION && (
        <div className="p-4 pt-8 max-w-4xl mx-auto h-screen flex flex-col bg-ivory">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setCurrentStep(AppState.DASHBOARD)} className="text-3xl font-bold text-stone-400 hover:text-blue-600 transition-colors">&larr;</button>
            <h2 className="font-display text-3xl text-stone-800">Virtual Clinic</h2>
          </div>
          <Consultation medications={meds} />
        </div>
      )}

      {isScannerOpen && (
        <PrescriptionScanner
          onAnalysisComplete={handleAnalysisComplete}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
