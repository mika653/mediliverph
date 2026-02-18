
import React, { useState } from 'react';
import { UserRole, AuthSession } from '../types';

interface Props {
  defaultRole: UserRole;
  onSuccess: (session: AuthSession) => void;
  onBack: () => void;
}

const DEMO_ACCOUNTS: Record<UserRole, { email: string; password: string; name: string }> = {
  patient: { email: 'patient@demo.ph', password: 'demo1234', name: 'Lola Rosa' },
  pharmacy: { email: 'pharmacy@demo.ph', password: 'pharma123', name: 'MedExpress QC Branch' },
  doctor: { email: 'doctor@demo.ph', password: 'doctor123', name: 'Dr. Maria Reyes' },
};

const ROLE_CONFIG: { key: UserRole; label: string; icon: React.ReactNode }[] = [
  {
    key: 'patient',
    label: 'Patient',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    key: 'pharmacy',
    label: 'Pharmacy',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    key: 'doctor',
    label: 'Doctor',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export const Login: React.FC<Props> = ({ defaultRole, onSuccess, onBack }) => {
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const account = DEMO_ACCOUNTS[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === account.email && password === account.password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess({ role, name: account.name, email });
      }, 1000);
    } else {
      setError('Incorrect email or password. Use the demo credentials shown below.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl border border-blue-100/50 p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-stone-800 tracking-tight mb-2">
            <span className="text-blue-600">MEDI</span>LIVER <span className="text-blue-600 font-medium text-lg">PH</span>
          </h1>
          <p className="text-stone-500 text-lg">Sign in to your account</p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 mb-8 bg-stone-50 p-1.5 rounded-2xl">
          {ROLE_CONFIG.map((r) => (
            <button
              key={r.key}
              onClick={() => { setRole(r.key); setError(''); setEmail(''); setPassword(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === r.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-500 hover:text-stone-700 hover:bg-white'
              }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={account.email}
              className="w-full p-4 rounded-xl border-2 border-stone-200 text-lg focus:border-blue-400 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-4 rounded-xl border-2 border-stone-200 text-lg focus:border-blue-400 focus:outline-none transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-semibold text-center bg-red-50 p-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
          <p className="text-blue-800 text-xs font-bold mb-2 uppercase tracking-wide">Demo Credentials</p>
          <div className="space-y-1">
            <p className="text-blue-700 text-sm font-mono">
              Email: <span className="font-bold">{account.email}</span>
            </p>
            <p className="text-blue-700 text-sm font-mono">
              Password: <span className="font-bold">{account.password}</span>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <button
          onClick={onBack}
          className="w-full text-stone-400 font-bold py-2 hover:text-stone-600 transition-colors text-center"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
