import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Download,
  ShieldCheck,
  Sparkles,
  Flame,
  Music,
  Car,
  Wifi,
  Phone,
  MessageSquare,
  Gift,
  ChevronDown,
  Compass,
  Check,
  Award,
  Utensils,
  BookOpen,
  Info
} from 'lucide-react';
import { Restaurant } from '../data/diningData';
import { Footer } from './Footer';
import { ImageGalleryCarousel } from './ImageGalleryCarousel';
import { NairobiDiningMap } from './NairobiDiningMap';

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
  onBack: () => void;
  onBookSuccess: (ref: string, name: string) => void;
  onSelectRestaurant?: (res: Restaurant) => void;
}

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onBack,
  onBookSuccess,
  onSelectRestaurant,
}) => {
  // Booking sidebar state
  const [partySize, setPartySize] = useState('2 Guests');
  const [selectedDateTab, setSelectedDateTab] = useState('Today');
  const [dateInput, setDateInput] = useState('2026-10-24');
  const [selectedAmbiance, setSelectedAmbiance] = useState('Lush Candlelit Garden Veranda (Outdoor)');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('7:45 PM');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    ref: string;
    party: string;
    date: string;
    time: string;
    ambiance: string;
  } | null>(null);

  // Menu tab state
  const [activeMenuTab, setActiveMenuTab] = useState('Starters & Small Plates');

  // Favorite toggle
  const [isFavorited, setIsFavorited] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `UB-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingConfirmed({
        ref: generatedRef,
        party: partySize,
        date: selectedDateTab === 'Today' ? 'Today' : dateInput,
        time: selectedTimeSlot,
        ambiance: selectedAmbiance
      });
      setIsSubmitting(false);
      onBookSuccess(generatedRef, restaurant.name);
      showToastMsg(`Table confirmed at ${restaurant.name}! Reference: ${generatedRef}`);
    }, 600);
  };

  // Menu items for detail view matching the screenshot
  const menuCategories = [
    'Starters & Small Plates',
    'Mains & Hearth Grills',
    'Pan-Asian Curries & Seafood',
    'Desserts & Cellar'
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1C1B] font-sans pb-24">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1C1B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Top Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-[#EDE8DF] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-[#595149] hover:text-[#9E3319] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Nairobi Dining Guide</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsFavorited(!isFavorited);
                showToastMsg(!isFavorited ? `Added ${restaurant.name} to Saved Places` : `Removed from Saved Places`);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EDE8DF] text-xs font-medium text-[#595149] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : 'text-neutral-500'}`} />
              <span>{isFavorited ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToastMsg('Restaurant link copied to clipboard');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EDE8DF] text-xs font-medium text-[#595149] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery Carousel on top of restaurant view */}
      <div className="bg-white border-b border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
          <ImageGalleryCarousel restaurant={restaurant} />
        </div>

        {/* Restaurant Header Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
          <div className="space-y-3">
            {/* Metadata Line requested specifically by user: Above this line is the carousel */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="bg-[#FAF3EE] text-[#9E3319] border border-[#F0DFD7] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {restaurant.category || 'CULT CLASSIC'}
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-[#6B655F] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#9E3319]" />
                {restaurant.neighbourhood}, Nairobi
              </span>
              <span className="text-neutral-400">·</span>
              <span className="font-mono text-[#1F1C1B]">{restaurant.priceRange}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F1C1B] tracking-tight">
              {restaurant.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-[#1F1C1B]">{restaurant.rating}</span>
              </div>
              <span className="text-[#6B655F]">({restaurant.reviewsCount} verified reviews)</span>
              <span className="text-neutral-300">·</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Urban Bites Authority Partner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: ABOUT, MENU, AMENITIES, REVIEWS, HOURS */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Story / Overview Section */}
            <section className="space-y-6">
              <div className="space-y-4 text-base sm:text-lg text-[#443F3A] leading-relaxed font-normal">
                <p>
                  Reigned for over two decades as Nairobi's definitive bohemian culinary sanctuary. Founded as an intimate gathering ground for artists, naturalists, and wanderers, the restaurant gracefully marries rustic colonial architecture with warm African craftsmanship, Kitengela art glass, and vibrant carved Zanzibari daybeds.
                </p>
                <p>
                  The kitchen operates under an ethos of borderless culinary curiosity. Helmed by seasoned executive talent, the menu transitions effortlessly from the bold, fiery aromatics of Thai street curries and coastal Swahili seafood to delicate European bistro hearth-roasts. Fresh organic herbs and delicate microgreens are harvested daily from dedicated kitchen garden beds scattered across the 2-acre grounds, while prime beef is aged 35 days exclusively from Morendat Farm in Naivasha.
                </p>
              </div>

              {/* 3 Highlight Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* 1. Artisanal Sourcing */}
                <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E3319] uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-[#9E3319]" />
                    <span>Artisanal Sourcing</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Grass-fed Naivasha beef & daily Indian Ocean catch flown into Wilson Airport.
                  </p>
                </div>

                {/* 2. Subtropical Grounds */}
                <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E3319] uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-[#9E3319]" />
                    <span>Subtropical Grounds</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Al fresco dining among indigenous fever trees, flowering bougainvillea and fire pits.
                  </p>
                </div>

                {/* 3. Convivial Spirit */}
                <div className="p-4 rounded-2xl bg-white border border-[#EDE8DF] shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E3319] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#9E3319]" />
                    <span>Convivial Spirit</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Live acoustic jazz on Sundays, dog-friendly garden pergolas & heated blankets.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Curated Seasonal Menu */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DF] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#F2ECE4] pb-5">
                <div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#9E3319]">
                    THE HEARTH & WOK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1C1B] mt-0.5">
                    Curated Seasonal Menu
                  </h2>
                </div>
                <span className="text-xs text-[#8C827A] font-medium">
                  Updated for March 2025
                </span>
              </div>

              {/* Menu Categories Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {menuCategories.map((cat) => {
                  const isActive = activeMenuTab === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveMenuTab(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1F1C1B] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#595149] border border-[#EDE8DF] hover:border-neutral-400'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Menu Items matching image */}
              <div className="space-y-4 pt-2">
                {/* Item 1: Feta & Coriander Samosas */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2]/60 border border-[#EDE8DF] hover:border-[#9E3319]/30 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-lg font-serif font-bold text-[#1F1C1B]">
                          Feta & Coriander Samosas
                        </h4>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
                          LEGENDARY STAPLE
                        </span>
                      </div>
                      <p className="text-xs text-[#6B655F] leading-relaxed max-w-xl">
                        Hand-folded pastry parcels packed with creamy feta, fresh Karen estate coriander, and fragrant spices. Served alongside Talisman's homemade sweet chilli ginger jam.
                      </p>
                    </div>
                    <span className="text-base font-bold font-mono text-[#9E3319] shrink-0">
                      KES 1,250
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#15803D] font-medium pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                    <span>Vegetarian • House Original Recipe since 1998</span>
                  </div>
                </div>

                {/* Item 2: Seven-Spice Crispy Calamari */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2]/60 border border-[#EDE8DF] hover:border-[#9E3319]/30 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-lg font-serif font-bold text-[#1F1C1B]">
                          Seven-Spice Crispy Calamari
                        </h4>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7]">
                          GUEST FAVORITE
                        </span>
                      </div>
                      <p className="text-xs text-[#6B655F] leading-relaxed max-w-xl">
                        Lightly flash-fried Indian Ocean calamari tossed in Japanese Togarashi seven-spice blend, fresh scallions, lime zest, and sweet tamarind-garlic dipping emulsion.
                      </p>
                    </div>
                    <span className="text-base font-bold font-mono text-[#9E3319] shrink-0">
                      KES 1,950
                    </span>
                  </div>
                </div>

                {/* Item 3: Smoked Karen Duck Liver Parfait */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2]/60 border border-[#EDE8DF] hover:border-[#9E3319]/30 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="text-lg font-serif font-bold text-[#1F1C1B]">
                        Smoked Karen Duck Liver Parfait
                      </h4>
                      <p className="text-xs text-[#6B655F] leading-relaxed max-w-xl">
                        Velvety local duck liver mousse infused with port wine and thyme, topped with clarified spiced butter, spiced fig chutney, and warm grilled artisanal brioche.
                      </p>
                    </div>
                    <span className="text-base font-bold font-mono text-[#9E3319] shrink-0">
                      KES 1,800
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Catalog Callout Box */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE8DF] flex items-center justify-center text-[#9E3319] shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1F1C1B]">
                      Full Wine Cellar Catalog & Kids Menu Available
                    </h5>
                    <p className="text-[11px] text-[#78716C]">
                      Over 180 curated bottles from Stellenbosch, Bordeaux & Marlborough
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToastMsg('Downloading full seasonal dining PDF catalog...')}
                  className="px-4 py-2 rounded-xl bg-white border border-[#EDE8DF] hover:bg-neutral-50 text-xs font-semibold text-[#1F1C1B] shadow-2xs transition-colors shrink-0 cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            </section>

            {/* 3. Dining Environment & Amenities */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DF] shadow-xs space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C827A]">
                  HOSPITALITY DETAILS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1C1B] mt-0.5">
                  Dining Environment & Amenities
                </h2>
              </div>

              {/* 6 Amenities Grid (2 cols x 3 rows) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Dietary Flexibility */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#EDE8DF] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Dietary Flexibility</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Halal-certified chicken & lamb cuts available on request. Dedicated vegan prep station & extensive nut-free safeguards.
                  </p>
                </div>

                {/* 2. Pet-Friendly Veranda */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#EDE8DF] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <Sparkles className="w-4 h-4 text-[#9E3319]" />
                    <span>Pet-Friendly Veranda</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Well-behaved dogs warmly welcomed across garden tables. Complimentary artisan water bowls and dog biscuits on arrival.
                  </p>
                </div>

                {/* 3. Heated Pergolas & Fires */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#EDE8DF] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <Flame className="w-4 h-4 text-[#EA580C]" />
                    <span>Heated Pergolas & Fires</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    When the cool Karen night breeze arrives, open wood fires, outdoor gas heaters, and plush fleece throws keep every terrace warm.
                  </p>
                </div>

                {/* 4. Acoustic Sundays */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#EDE8DF] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <Music className="w-4 h-4 text-[#DC2626]" />
                    <span>Acoustic Sundays</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Live acoustic guitar & soul saxophone sessions during Sunday long lunches from 1:00 PM to 4:30 PM.
                  </p>
                </div>

                {/* 5. Complimentary Valet */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#EDE8DF] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <Car className="w-4 h-4 text-[#D97706]" />
                    <span>Complimentary Valet</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Secure on-premise walled parking with professional valet attendants and 24/7 security protocol.
                  </p>
                </div>

                {/* 6. High-Speed Fibre */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2]/80 border border-[#EDE8DF] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <Wifi className="w-4 h-4 text-[#059669]" />
                    <span>High-Speed Fibre</span>
                  </div>
                  <p className="text-xs text-[#6B655F] leading-relaxed">
                    Seamless 150 Mbps Wi-Fi for outdoor afternoon remote working or quiet creative business meetings.
                  </p>
                </div>

              </div>
            </section>

            {/* 4. Critic & Diner Impressions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DF] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#F2ECE4] pb-4">
                <div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C827A]">
                    GASTRONOMIC REVIEW
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1C1B] mt-0.5">
                    Critic & Diner Impressions
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-[#1F1C1B]">4.9</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Critic Review Quote Card */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] relative overflow-hidden">
                <span className="absolute right-4 bottom-2 text-7xl font-serif text-[#EDE8DF] select-none pointer-events-none font-bold leading-none">
                  ”
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Wanjiru Mwangi"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#EDE8DF]"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-[#1F1C1B]">Wanjiru Mwangi</h5>
                    <span className="text-[11px] text-[#78716C]">Chief Gastronomy Editor, Urban Bites</span>
                  </div>
                </div>

                <blockquote className="font-serif italic text-base sm:text-lg text-[#1F1C1B] leading-relaxed pr-8 font-medium">
                  “Talisman remains an unshakeable Nairobi culinary institution. It is that rare, magical sanctuary where rustic Karen warmth, crackling fireplaces, and refined pan-Asian flair coexist in flawless equilibrium.”
                </blockquote>
              </div>

              {/* User Reviews */}
              <div className="space-y-4 pt-2">
                {/* Review 1: Amina Kariuki */}
                <div className="border-b border-[#F2ECE4] pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-xs flex items-center justify-center">
                        AK
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-[#1F1C1B]">Amina Kariuki</h6>
                        <span className="text-[10px] text-[#8C827A]">
                          Visited for 10-Year Anniversary • Garden Table
                        </span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#595149] leading-relaxed">
                    “The feta and coriander samosas are every bit as legendary as claimed—that sweet ginger dip is addictive. The candlelit veranda was breathtaking at 8 PM with the log fire blazing. Incredible cocktail list too!”
                  </p>
                  <span className="text-[10px] text-[#8C827A] block">March 2, 2025</span>
                </div>

                {/* Review 2: David Leakey */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#92400E] font-bold text-xs flex items-center justify-center">
                        DL
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-[#1F1C1B]">David Leakey</h6>
                        <span className="text-[10px] text-[#8C827A]">
                          Sunday Family Brunch • Courtyard
                        </span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#595149] leading-relaxed">
                    “They welcomed our Golden Retriever with cold fresh water and biscuits immediately. The tamarind prawns and ribeye steak were cooked to absolute perfection. Unmatched hospitality in Nairobi.”
                  </p>
                  <span className="text-[10px] text-[#8C827A] block">February 24, 2025</span>
                </div>
              </div>
            </section>

            {/* 5. Location & Operating Hours */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DF] shadow-xs space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C827A]">
                  GETTING HERE
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1C1B] mt-0.5">
                  Location & Operating Hours
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                
                {/* Left: Schedule */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[#1F1C1B] pb-1 border-b border-[#EDE8DF]">
                    <Clock className="w-4 h-4 text-[#9E3319]" />
                    <span>Weekly Service Schedule</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6B655F]">Tuesday – Friday</span>
                      <span className="font-semibold text-[#1F1C1B]">11:30 AM – 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B655F]">Saturday & Sunday</span>
                      <span className="font-semibold text-[#1F1C1B]">10:00 AM – 11:00 PM</span>
                    </div>
                    <div className="flex justify-between text-[#C2410C]">
                      <span>Mondays</span>
                      <span className="font-semibold">Closed for Estate Maintenance</span>
                    </div>
                    <div className="text-[11px] text-[#15803D] flex items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                      <span>Last kitchen orders taken at 10:15 PM nightly</span>
                    </div>
                  </div>
                </div>

                {/* Right: Visitor Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-[#1F1C1B] pb-1 border-b border-[#EDE8DF]">
                    <MapPin className="w-4 h-4 text-[#9E3319]" />
                    <span>Essential Visitor Info</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#6B655F] shrink-0">Address:</span>
                      <span className="font-semibold text-[#1F1C1B] text-right">
                        320 Ngong Road, Karen (Near Karen Roundabout), Nairobi
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#6B655F] shrink-0">Dress Code:</span>
                      <span className="font-semibold text-[#1F1C1B]">Smart Casual • Sophisticated Al Fresco</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#6B655F] shrink-0">Phone / Tel:</span>
                      <span className="font-semibold text-[#9E3319] font-mono">+254 705 999 900</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#6B655F] shrink-0">Reservations:</span>
                      <span className="font-semibold text-[#C2410C]">Recommended for dinner & weekend lunch</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Interactive Spatial Neighbourhood Map */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F1C1B]">
                    <Compass className="w-4 h-4 text-[#9E3319]" />
                    <span>Neighbourhood Spatial Context: {restaurant.neighbourhood}, Nairobi</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#8C827A] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#EDE8DF]">
                    Interactive Spatial Cartography Placeholder
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#EDE8DF] shadow-xs">
                  <NairobiDiningMap
                    focusedRestaurantId={restaurant.id}
                    isCompact={true}
                    onSelectRestaurant={onSelectRestaurant}
                  />
                </div>
              </div>
            </section>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: STICKY RESERVATION WIDGET */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 sticky top-36">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8DF] shadow-lg space-y-6">
              
              {/* Widget Header */}
              <div className="flex items-center justify-between border-b border-[#F2ECE4] pb-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#9E3319]">
                    INSTANT TABLE RESERVATION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1C1B]">
                    Book Your Experience
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#FFF7ED] text-[#9E3319] flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
              </div>

              {bookingConfirmed ? (
                /* Success booking message */
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-emerald-950">
                    Reservation Secured!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Booking ref: <strong className="font-mono text-sm">{bookingConfirmed.ref}</strong>
                  </p>
                  <p className="text-xs text-emerald-700">
                    {bookingConfirmed.party} on {bookingConfirmed.date} at {bookingConfirmed.time}. Instant SMS sent to your phone.
                  </p>
                  <button
                    onClick={() => setBookingConfirmed(null)}
                    className="mt-2 text-xs font-semibold text-emerald-900 underline cursor-pointer"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBooking} className="space-y-4">
                  
                  {/* 1. Party Size */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F1C1B] mb-1.5">
                      1. Party Size
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['2 Guests', '4 Guests', '6 Guests', '8+ Party'].map((size) => {
                        const isSelected = partySize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setPartySize(size)}
                            className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1F1C1B] text-white border-[#1F1C1B]'
                                : 'bg-[#FAF7F2] text-[#595149] border-[#EDE8DF] hover:border-neutral-400'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Dining Date */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F1C1B] mb-1.5">
                      2. Dining Date
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      {['Today', 'Tomorrow', 'Fri, Mar 7'].map((d) => {
                        const isSelected = selectedDateTab === d;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDateTab(d)}
                            className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1F1C1B] text-white border-[#1F1C1B]'
                                : 'bg-[#FAF7F2] text-[#595149] border-[#EDE8DF] hover:border-neutral-400'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => {
                          setDateInput(e.target.value);
                          setSelectedDateTab('Custom');
                        }}
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-xs font-medium text-[#1F1C1B] focus:outline-none focus:ring-1 focus:ring-[#9E3319]"
                      />
                    </div>
                  </div>

                  {/* 3. Preferred Ambiance & Area */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F1C1B] mb-1.5">
                      3. Preferred Ambiance & Area
                    </label>
                    <select
                      value={selectedAmbiance}
                      onChange={(e) => setSelectedAmbiance(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-xs font-medium text-[#1F1C1B] focus:outline-none focus:ring-1 focus:ring-[#9E3319] cursor-pointer"
                    >
                      <option value="Lush Candlelit Garden Veranda (Outdoor)">
                        Lush Candlelit Garden Veranda (Outdoor)
                      </option>
                      <option value="Cozy Fireside Indoor Saloon">
                        Cozy Fireside Indoor Saloon
                      </option>
                      <option value="Covered Heated Pergola">
                        Covered Heated Pergola
                      </option>
                      <option value="Zanzibari Daybed Lounge">
                        Zanzibari Daybed Lounge
                      </option>
                    </select>
                  </div>

                  {/* 4. Available Time Slots */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F1C1B] mb-1.5">
                      4. Available Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { time: '12:30 PM', prime: false },
                        { time: '1:15 PM', prime: false },
                        { time: '7:00 PM', prime: true },
                        { time: '7:45 PM', prime: true },
                        { time: '8:30 PM', prime: false },
                        { time: '9:15 PM', prime: false }
                      ].map((slot) => {
                        const isSelected = selectedTimeSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`relative py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1F1C1B] text-white border-[#1F1C1B]'
                                : 'bg-[#FAF7F2] text-[#595149] border-[#EDE8DF] hover:border-neutral-400'
                            }`}
                          >
                            {slot.prime && (
                              <span className="absolute -top-1.5 -right-1 text-[8px] font-bold bg-[#9E3319] text-white px-1 py-0.2 rounded-full uppercase">
                                Prime
                              </span>
                            )}
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#595149] mb-1">
                      Special Notes (Dietary, Anniversary, Pet)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bringing one dog, gluten intolerance..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EDE8DF] rounded-xl text-xs text-[#1F1C1B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#9E3319]"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9E3319] hover:bg-[#852912] active:scale-[0.98] text-white py-3.5 px-4 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Reserve Table (Instant SMS Confirmation)</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-[#78716C] mt-2">
                      Zero reservation fee • Free cancellation up to 1 hr prior
                    </p>
                  </div>
                </form>
              )}

              {/* Urban Bites Dining Club Card */}
              <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7] flex items-start gap-3">
                <Gift className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#92400E] block">
                    Urban Bites Dining Club
                  </span>
                  <p className="text-[#B45309] mt-0.5 leading-relaxed">
                    Earn <strong>150 Club Points</strong> & receive a complimentary Welcome Garden Aperitif.
                  </p>
                </div>
              </div>

              {/* Banquet & Concierge Link */}
              <div className="pt-1 text-center space-y-1">
                <p className="text-[11px] text-[#78716C]">
                  Planning a private banquet, wedding or group celebration?
                </p>
                <button
                  onClick={() => showToastMsg('Connecting with Talisman Concierge VIP desk (+254 705 999 900)...')}
                  className="text-xs font-bold text-[#9E3319] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Connect directly with Talisman Concierge</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer matching mockup */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};
