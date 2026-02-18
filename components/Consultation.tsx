
import React, { useState, useEffect, useRef } from 'react';
import { getHealthGuidance } from '../services/gemini';
import { Medication } from '../types';

interface Props {
  medications: Medication[];
}

export const Consultation: React.FC<Props> = ({ medications }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai' | 'doctor', text: string}[]>([
    { role: 'doctor', text: 'Hello! I am Dr. Reyes. Do you have any questions about your maintenance medications or your health today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await getHealthGuidance(userMsg, medications);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Could you please try again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <div>
          <h3 className="text-xl font-bold">Health Assistant</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <p className="text-amber-100 text-sm">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-lg ${
              msg.role === 'user'
                ? 'bg-amber-600 text-white rounded-tr-sm'
                : 'bg-white text-stone-700 rounded-tl-sm border border-stone-200 shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-stone-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 p-4 rounded-xl border-2 border-stone-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-lg transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="bg-amber-600 text-white px-6 rounded-xl font-bold text-lg hover:bg-amber-700 active:scale-95 transition-all disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
