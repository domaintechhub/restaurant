import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Restaurant } from '../data/diningData';

interface ReservationModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onSuccess: (bookingRef: string, restaurantName: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  restaurant,
  onClose,
  onSuccess
}) => {
  const [date, setDate] = useState('Today, Oct 24');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('2 guests');
  const [seating, setSeating] = useState('Rooftop Deck / View');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    ref: string;
    date: string;
    time: string;
    guests: string;
    seating: string;
  } | null>(null);

  if (!restaurant) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `UB-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedBooking({
        ref: generatedRef,
        date,
        time,
        guests,
        seating
      });
      setIsSubmitting(false);
      onSuccess(generatedRef, restaurant.name);
    }, 600);
  };

  const datesList = ['Today, Oct 24', 'Tomorrow, Oct 25', 'Sat, Oct 26', 'Sun, Oct 27', 'Next Friday'];
  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
  const guestOptions = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6+ guests'];
  const seatingOptions = ['Rooftop Deck / View', 'Garden Terrace', 'Main Dining Room', 'Chef Counter / Bar'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image banner */}
        <div className="relative h-44 w-full bg-[#1F1C1B] overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300 tracking-wider uppercase mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{restaurant.neighbourhood} · {restaurant.category}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white leading-tight">
              {restaurant.name}
            </h3>
          </div>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Reservation Confirmed
              </span>
              <h4 className="text-2xl font-serif font-bold text-[#1F1C1B] mt-3">
                Your Table is Secured!
              </h4>
              <p className="text-sm text-[#78716C] mt-1 max-w-md mx-auto">
                We've sent an SMS confirmation to <strong className="text-neutral-800">{phone}</strong> and an email pass to <strong className="text-neutral-800">{email || 'your inbox'}</strong>.
              </p>
            </div>

            {/* Reservation Summary Card */}
            <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EDE8DF] text-left space-y-3">
              <div className="flex justify-between items-center border-b border-[#E7E0D5] pb-2.5">
                <span className="text-xs text-[#78716C] uppercase font-semibold">Booking Reference</span>
                <span className="text-sm font-mono font-bold text-[#9E3319] bg-white px-2.5 py-0.5 rounded-md border border-[#EDE8DF]">
                  {confirmedBooking.ref}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-[#78716C] block">Date & Time</span>
                  <span className="font-semibold text-[#1F1C1B]">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
                <div>
                  <span className="text-xs text-[#78716C] block">Party & Seating</span>
                  <span className="font-semibold text-[#1F1C1B]">{confirmedBooking.guests} · {confirmedBooking.seating}</span>
                </div>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero wait guaranteed · Free instant cancellation up to 1h prior</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#9E3319] hover:bg-[#852912] text-white py-3.5 rounded-xl font-medium tracking-wide shadow-md transition-colors cursor-pointer"
            >
              Done & Return to Explorer
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleBook} className="p-6 space-y-5">
            {/* Guarantee Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl text-xs text-[#9A3412]">
              <Sparkles className="w-4 h-4 text-[#C2410C] shrink-0" />
              <span>Instant table confirmation & VIP welcome perks with Urban Bites Table Concierge.</span>
            </div>

            {/* Date Selection */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[#595149] uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#9E3319]" />
                Select Date
              </label>
              <div className="flex flex-wrap gap-2">
                {datesList.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDate(d)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      date === d 
                        ? 'bg-[#9E3319] text-white border-[#9E3319] shadow-xs' 
                        : 'bg-white text-[#595149] border-[#EDE8DF] hover:border-[#9E3319]/40'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-[#595149] uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-[#9E3319]" />
                Select Time Slot
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      time === t 
                        ? 'bg-[#1F1C1B] text-white border-[#1F1C1B]' 
                        : 'bg-white text-[#595149] border-[#EDE8DF] hover:border-[#1F1C1B]/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Party Size & Seating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#595149] uppercase tracking-wider mb-2">
                  <Users className="w-3.5 h-3.5 text-[#9E3319]" />
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                >
                  {guestOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#595149] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#9E3319]" />
                  Seating Area
                </label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                >
                  {seatingOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amani Kamau"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+254 712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#595149] uppercase tracking-wider mb-1">
                Special Requests or Dietary Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday anniversary, outdoor heater preference, nut allergy"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#EDE8DF] rounded-xl text-sm text-[#1F1C1B] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#9E3319]/30"
              />
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#9E3319] hover:bg-[#852912] active:scale-[0.99] text-white py-3.5 rounded-xl font-medium tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Confirm Table Reservation · Free</>
                )}
              </button>
              <p className="text-[11px] text-center text-[#78716C] mt-2">
                Direct booking backed by Urban Bites Table Concierge guarantee. No booking fees.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
