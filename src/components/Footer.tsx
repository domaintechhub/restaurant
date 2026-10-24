import React, { useState } from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectNeighbourhood?: (neighbourhood: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNeighbourhood }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="border-t border-[#EDE8DF] bg-white py-14 text-[#6B655F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Newsletter + Directory Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & The Weekly Bite Newsletter Box */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF3EE] border border-[#F0DFD7] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-[#9E3319] flex items-center justify-center text-white">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1F1C1B]">
                Urban Bites
              </span>
            </div>

            <p className="text-xs text-[#6B655F] leading-relaxed max-w-sm">
              Urban Bites Kenya — Modern Dining & Culinary Discovery. The premier guide for discerning food lovers across East Africa.
            </p>

            {/* The Weekly Bite Newsletter Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] space-y-2.5 max-w-md">
              <div>
                <h4 className="text-xs font-bold text-[#1F1C1B]">The Weekly Bite</h4>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  Curated tables, chef dispatches, and secret soft launches directly to your inbox.
                </p>
              </div>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome to The Weekly Bite VIP list!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-[#EDE8DF] rounded-xl text-xs text-[#1F1C1B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#9E3319]"
                  />
                  <button
                    type="submit"
                    className="bg-[#9E3319] hover:bg-[#852912] active:scale-[0.98] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Directory Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Neighbourhoods */}
            <div>
              <h5 className="font-bold uppercase tracking-wider text-[#1F1C1B] text-[11px] mb-3">
                Neighbourhoods
              </h5>
              <ul className="space-y-2.5 text-[#6B655F]">
                {['Karen', 'Kilimani', 'Westlands', 'Gigiri & Runda', 'Lavington', 'Kitisuru'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => onSelectNeighbourhood?.(item)}
                      className="hover:text-[#9E3319] transition-colors cursor-pointer text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuisines */}
            <div>
              <h5 className="font-bold uppercase tracking-wider text-[#1F1C1B] text-[11px] mb-3">
                Cuisines
              </h5>
              <ul className="space-y-2.5 text-[#6B655F]">
                {[
                  'Swahili Coastal Fusion',
                  'Artisanal Nyama Choma',
                  'Pan-Asian & Robata',
                  'Mediterranean & Wine Bars',
                  'Contemporary Ethiopian',
                  'Artisan Bakery & Brunch'
                ].map((item) => (
                  <li key={item}>
                    <a href="#cuisines-section" className="hover:text-[#9E3319] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curated Guides & Events */}
            <div>
              <h5 className="font-bold uppercase tracking-wider text-[#1F1C1B] text-[11px] mb-3">
                Curated Guides & Events
              </h5>
              <ul className="space-y-2.5 text-[#6B655F]">
                {[
                  'Top 50 Terrace Brunches',
                  'Sunset Cocktail Lounges',
                  'Nairobi Restaurant Week',
                  'Burger Week',
                  'Pizza Festival',
                  'Cocktail Safari'
                ].map((item) => (
                  <li key={item}>
                    <a href="#events-section" className="hover:text-[#9E3319] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal / Origin Line */}
        <div className="pt-8 border-t border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C827A] gap-4">
          <p>© 2026 Urban Bites Ltd. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="hover:text-[#1F1C1B] cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-[#1F1C1B] cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-[#1F1C1B] cursor-pointer">Culinary Ethics</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#9E3319] font-medium text-[11px]">
            <Flame className="w-3.5 h-3.5 fill-[#9E3319]" />
            <span>Crafted for East Africa's epicures</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
