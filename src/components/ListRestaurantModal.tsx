import React, { useState } from 'react';
import { X, Store, CheckCircle2, Shield, Utensils, Award } from 'lucide-react';

interface ListRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ListRestaurantModal: React.FC<ListRestaurantModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('Westlands');
  const [cuisine, setCuisine] = useState('Pan-Asian & Robata');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-[#9E3319] text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold">
            For Restaurateurs & General Managers
          </span>
          <h3 className="text-2xl font-serif font-bold text-white mt-1">
            Grow Your Restaurant with Urban Bites
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Join East Africa's #1 curated dining guide and table reservation engine.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-[#1F1C1B]">
              Application Submitted!
            </h4>
            <p className="text-sm text-[#78716C]">
              Our Nairobi Partner Concierge team will review <strong>{restaurantName}</strong> and contact you at {phone} within 24 hours to finalize your listing.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#9E3319] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#852912] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                Restaurant Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mara Rooftop Bistro"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                  Neighbourhood
                </label>
                <select
                  value={neighbourhood}
                  onChange={(e) => setNeighbourhood(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                >
                  <option value="Westlands">Westlands</option>
                  <option value="Karen">Karen & Hardy</option>
                  <option value="Gigiri">Gigiri & Muthaiga</option>
                  <option value="Kilimani">Kilimani & Lavington</option>
                  <option value="CBD">Nairobi CBD</option>
                  <option value="Spring Valley">Spring Valley</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                  Primary Cuisine
                </label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                >
                  <option value="Pan-Asian & Robata">Pan-Asian & Robata</option>
                  <option value="Swahili & Coastal">Swahili & Coastal</option>
                  <option value="Italian & Neapolitan">Italian & Neapolitan</option>
                  <option value="Steakhouses">Steakhouses</option>
                  <option value="Mediterranean">French & Mediterranean</option>
                  <option value="Ethiopian & Eritrean">Ethiopian & Eritrean</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Manager / Owner Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+254 7..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                Official Email *
              </label>
              <input
                type="email"
                required
                placeholder="reservations@yourrestaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#9E3319] hover:bg-[#852912] text-white py-3 rounded-xl font-medium tracking-wide shadow-md transition-colors cursor-pointer"
              >
                Submit Listing Request · Free Onboarding
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#78716C] mt-2">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero listing fee · Eat App table engine integration available</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
