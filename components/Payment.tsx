
import React, { useState } from 'react';

interface Props {
  amount: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const Payment: React.FC<Props> = ({ amount, onSuccess, onCancel }) => {
  const [method, setMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  const methods = [
    { id: 'gcash', name: 'GCash', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    )},
    { id: 'maya', name: 'Maya', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )},
    { id: 'card', name: 'Credit/Debit Card', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
    )},
    { id: 'bank', name: 'Bank Transfer', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    )}
  ];

  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl max-w-md mx-auto border border-amber-100/50">
      <h2 className="font-display text-3xl text-stone-800 mb-2 text-center">Checkout</h2>
      <p className="text-stone-400 text-center mb-8 text-lg">Monthly Subscription: <span className="font-bold text-amber-600">{amount}</span></p>

      {loading ? (
        <div className="flex flex-col items-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mb-6"></div>
          <p className="text-xl font-bold text-stone-700">Processing Payment...</p>
          <p className="text-stone-400 text-sm mt-2">Please wait a moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="font-bold text-stone-500 mb-4">Select Payment Method:</p>
          <div className="grid grid-cols-1 gap-3">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-lg ${
                  method === m.id ? 'border-amber-500 bg-amber-50 shadow-sm' : 'border-stone-100 hover:border-amber-200'
                }`}
              >
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center">
                  {m.icon}
                </div>
                <span className="font-bold text-stone-700">{m.name}</span>
                {method === m.id && (
                  <span className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              disabled={!method}
              onClick={handlePay}
              className={`w-full py-5 rounded-2xl text-2xl font-bold transition-all shadow-lg ${
                method ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-xl' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Pay Now
            </button>
            <button onClick={onCancel} className="w-full text-stone-400 font-bold py-2 hover:text-stone-600 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
