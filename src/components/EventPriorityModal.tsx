import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Bell, Sparkles } from 'lucide-react';

interface EventPriorityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const EventPriorityModal: React.FC<EventPriorityModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+254 ');
  const [preferredArea, setPreferredArea] = useState('Westlands & Karen');
  const [joined, setJoined] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
    setTimeout(() => {
      onSuccess(email);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#1F1C1B] text-white rounded-3xl shadow-2xl border border-neutral-700 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E3319]/40 border border-[#9E3319] text-[#FFA187] text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Priority VIP Access · Early 2026</span>
          </div>

          <h3 className="text-3xl font-serif font-bold text-white leading-tight">
            Nairobi Restaurant Week 2026
          </h3>
          <p className="text-sm text-neutral-300 mt-2">
            Be the first to unlock 10 days of exclusive chef tasting menus, complimentary signature cocktails, and priority reservations at 80+ elite venues.
          </p>

          {joined ? (
            <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">
                You're on the VIP Priority List!
              </h4>
              <p className="text-xs text-neutral-400">
                We'll email you 48 hours before general reservations open to public booking.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#9E3319] hover:bg-[#852912] text-white px-5 py-2 rounded-xl text-xs font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="dining@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#9E3319] focus:ring-1 focus:ring-[#9E3319]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Mobile Number (For WhatsApp Early Alerts)
                </label>
                <input
                  type="tel"
                  placeholder="+254 7..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#9E3319] focus:ring-1 focus:ring-[#9E3319]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Preferred Dining District
                </label>
                <select
                  value={preferredArea}
                  onChange={(e) => setPreferredArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#2B2724] border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#9E3319]"
                >
                  <option value="Westlands & Karen">Westlands & Karen</option>
                  <option value="Gigiri & Muthaiga">Gigiri & Muthaiga</option>
                  <option value="Lavington & Kilimani">Lavington & Kilimani</option>
                  <option value="All Districts">All Nairobi Districts</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#9E3319] hover:bg-[#B33C1E] text-white py-3 rounded-xl font-medium tracking-wide shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                <span>Join Priority Access List (Free)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
