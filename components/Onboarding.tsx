
import React, { useState } from 'react';
import { OnboardingData } from '../types';

interface Props {
  onComplete: (data: OnboardingData) => void;
}

export const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    age: '',
    contactNumber: '',
    consultationDate: '',
    consultationTime: '',
    hasSeniorPwdId: false,
    refillCycle: 30
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const Progress = () => (
    <div className="flex justify-between items-center mb-8 px-2">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex flex-col items-center flex-1 relative">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors ${
            step >= s ? 'bg-blue-600 text-white' : 'bg-stone-200 text-stone-400'
          }`}>
            {step > s ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            ) : s}
          </div>
          {s < 4 && (
            <div className={`absolute left-[50%] top-4 w-full h-1 -z-0 ${
              step > s ? 'bg-blue-600' : 'bg-stone-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl min-h-[650px] flex flex-col border border-blue-100/50">
      <div className="text-center mb-4">
        <h1 className="text-xl font-black tracking-tight">
          <span className="text-blue-600">MEDI</span><span className="text-stone-800">LIVER PH</span>
        </h1>
        <p className="text-stone-400 text-sm font-bold uppercase tracking-widest">Patient Registration</p>
      </div>

      <Progress />

      {step === 1 && (
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h2 className="font-display text-3xl text-stone-800 mb-4">How it works</h2>
          <p className="text-stone-500 mb-6 text-lg">Your journey to hassle-free chronic care starts here.</p>
          <div className="space-y-4 text-left w-full mt-4">
            <div className="flex gap-4 items-start bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div>
                <p className="font-bold text-stone-800">Doctor-Guided</p>
                <p className="text-sm text-stone-500">Resident physicians verify all prescriptions for chronic care (Diabetes, HTN).</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <p className="font-bold text-stone-800">Pharmacist-Verified</p>
                <p className="text-sm text-stone-500">All medicines are checked and packed by licensed partner pharmacists.</p>
              </div>
            </div>
          </div>
          <button onClick={nextStep} className="mt-auto w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-colors">
            Start Registration
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <h2 className="font-display text-3xl text-stone-800 mb-6">Patient Details</h2>
          <div className="space-y-4 flex-1">
            <input
              type="text"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              placeholder="Full Name"
              className="w-full p-4 rounded-xl border-2 border-stone-200 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <input
              type="number"
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
              placeholder="Age"
              className="w-full p-4 rounded-xl border-2 border-stone-200 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <div className="p-4 bg-blue-50/50 rounded-xl border-2 border-blue-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasSeniorPwdId}
                  onChange={e => setFormData({...formData, hasSeniorPwdId: e.target.checked})}
                  className="w-6 h-6 rounded accent-blue-600"
                />
                <span className="text-lg font-semibold text-stone-700">I have a Senior / PWD ID</span>
              </label>
              <p className="text-sm text-stone-400 mt-2 ml-9">Check this to optimize your medicine discounts.</p>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={prevStep} className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-2xl font-bold hover:bg-stone-200 transition-colors">Back</button>
            <button onClick={nextStep} className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-colors">Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col">
          <h2 className="font-display text-3xl text-stone-800 mb-6">Refill Preference</h2>
          <p className="text-stone-500 mb-6 text-lg">Choose how often you want your maintenance medicines delivered.</p>
          <div className="grid grid-cols-1 gap-4 flex-1">
            {[30, 60, 90].map(days => (
              <button
                key={days}
                onClick={() => setFormData({...formData, refillCycle: days as 30|60|90})}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  formData.refillCycle === days ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-stone-100 hover:border-blue-200'
                }`}
              >
                <span className="block text-2xl font-bold text-stone-800">{days} Days</span>
                <span className="text-stone-500 italic">Every {days / 30} month{days > 30 ? 's' : ''} refill automation</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={prevStep} className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-2xl font-bold hover:bg-stone-200 transition-colors">Back</button>
            <button onClick={nextStep} className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-colors">Continue</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex-1 flex flex-col">
          <h2 className="font-display text-3xl text-stone-800 mb-6">Medical Consultation</h2>
          <p className="text-stone-500 mb-4 text-lg">Prescriptions are required. Book a call with our physician to verify your care plan.</p>
          <div className="space-y-4 flex-1">
            <input
              type="date"
              value={formData.consultationDate}
              onChange={e => setFormData({...formData, consultationDate: e.target.value})}
              className="w-full p-4 rounded-xl border-2 border-stone-200 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <select
              value={formData.consultationTime}
              onChange={e => setFormData({...formData, consultationTime: e.target.value})}
              className="w-full p-4 rounded-xl border-2 border-stone-200 text-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            >
              <option value="">Select time slot</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={prevStep} className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-2xl font-bold hover:bg-stone-200 transition-colors">Back</button>
            <button
              onClick={() => onComplete(formData)}
              className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-emerald-700 transition-colors"
            >
              Finish Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
