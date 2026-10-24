import React, { useState, useRef } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  Plus,
  Bell,
  Heart,
  Star,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Calendar,
  Sparkles,
  Utensils,
  Wine,
  Coffee,
  CheckCircle2,
  Gift,
  Mail,
  RotateCcw,
  GlassWater,
  Compass,
  Store,
  X
} from 'lucide-react';
import {
  SKYLINE_RESTAURANTS,
  CUISINE_CATEGORIES,
  RESTAURANT_TYPES,
  DISTRICT_GUIDES,
  CULINARY_EVENTS,
  Restaurant,
  CuisineCategory
} from './data/diningData';
import { ReservationModal } from './components/ReservationModal';
import { MenuModal } from './components/MenuModal';
import { ListRestaurantModal } from './components/ListRestaurantModal';
import { EventPriorityModal } from './components/EventPriorityModal';
import { RestaurantDetailView } from './components/RestaurantDetailView';
import { NairobiDiningMap } from './components/NairobiDiningMap';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Location state
  const [currentCity, setCurrentCity] = useState('Nairobi');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  // Filter Bar state in Hero
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('All Areas (Nairobi)');
  const [selectedCuisine, setSelectedCuisine] = useState('Any Cuisine');
  const [selectedVibe, setSelectedVibe] = useState('All Vibes');

  // Palate & Mood Filter Tabs
  const [activeMoodFilter, setActiveMoodFilter] = useState('All Cuisines');

  // Neighbourhood Guides Tab & View Mode
  const [activeDistrictTab, setActiveDistrictTab] = useState('Karen & Hardy');
  const [neighbourhoodViewMode, setNeighbourhoodViewMode] = useState<'cards' | 'map'>('cards');

  // Favorites
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Active viewed restaurant (When clicked, shows full restaurant detail view)
  const [activeViewedRestaurant, setActiveViewedRestaurant] = useState<Restaurant | null>(null);

  // Modals state
  const [reservationRestaurant, setReservationRestaurant] = useState<Restaurant | null>(null);
  const [menuRestaurant, setMenuRestaurant] = useState<Restaurant | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Palate scroll ref
  const moodScrollRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      const nextState = !prev[id];
      showToast(nextState ? `Saved ${name} to your Saved Places` : `Removed ${name} from Saved Places`);
      return { ...prev, [id]: nextState };
    });
  };

  const scrollMood = (direction: 'left' | 'right') => {
    if (moodScrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      moodScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Get current district restaurants
  const currentDistrict = DISTRICT_GUIDES.find(d => d.tabLabel === activeDistrictTab) || DISTRICT_GUIDES[0];

  // Palate & Mood options with icons
  const moodOptions = [
    { label: 'All Cuisines', icon: Utensils },
    { label: 'Rooftop Bars', icon: Wine },
    { label: 'Swahili & Coastal', icon: Compass },
    { label: 'Steakhouses', icon: Flame },
    { label: 'Italian & Pizzerias', icon: Sparkles },
    { label: 'Cozy Cafes', icon: Coffee },
    { label: "Chef's Table", icon: Gift },
    { label: 'Vegetarian & Vegan', icon: Sparkles }
  ];

  const handleHeroSearch = () => {
    const el = document.getElementById('skyline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      showToast(`Showing tables for ${selectedNeighbourhood} · ${selectedCuisine} · ${selectedVibe}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1C1B] selection:bg-[#9E3319] selection:text-white font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1C1B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveViewedRestaurant(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              {/* Flame/Fork stylized circular logo */}
              <div className="w-10 h-10 rounded-full bg-[#FAF3EE] border border-[#F0DFD7] flex items-center justify-center p-1.5 shadow-xs">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E0532B] to-[#9E3319] flex items-center justify-center text-white shadow-xs">
                  <Flame className="w-4 h-4 fill-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1F1C1B] leading-none group-hover:text-[#9E3319] transition-colors">
                  Urban Bites
                </span>
                <span className="text-[9px] font-bold tracking-[0.18em] text-[#9E3319] uppercase mt-1">
                  East Africa's Curated Table Authority
                </span>
              </div>
            </a>

            {/* Main Nav Links (Clean typography, no pills) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#595149]">
              <a href="#neighbourhood-section" className="hover:text-[#9E3319] transition-colors">
                Neighbourhoods
              </a>
              <a
                href="#neighbourhood-section"
                onClick={() => setNeighbourhoodViewMode('map')}
                className="hover:text-[#9E3319] transition-colors flex items-center gap-1.5"
              >
                <span>Spatial Map</span>
                <span className="text-[10px] bg-[#9E3319]/10 text-[#9E3319] px-2 py-0.5 rounded-full font-bold tracking-wider">
                  NEW
                </span>
              </a>
              <a href="#cuisines-section" className="hover:text-[#9E3319] transition-colors">
                Cuisines
              </a>
              <a href="#experiences-section" className="hover:text-[#9E3319] transition-colors">
                Curated Guides
              </a>
              <a href="#events-section" className="hover:text-[#9E3319] transition-colors">
                Events & Weeks
              </a>
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Location selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#595149] hover:bg-[#FAF7F2] border border-transparent hover:border-[#EDE8DF] transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#9E3319]" />
                <span>{currentCity}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#EDE8DF] py-2 z-50">
                  {['Nairobi', 'Mombasa & Diani', 'Naivasha & Rift Valley', 'Kilifi & Watamu'].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setCurrentCity(city);
                        setIsCityDropdownOpen(false);
                        showToast(`Switched region to ${city}`);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#FAF7F2] transition-colors ${
                        currentCity === city ? 'text-[#9E3319] font-bold bg-[#FAF7F2]' : 'text-[#595149]'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Icon */}
            <button 
              onClick={() => {
                const el = document.getElementById('search-box');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-[#595149] hover:text-[#1F1C1B] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
              title="Quick Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* List a Restaurant Button */}
            <button
              onClick={() => setIsListModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#9E3319] hover:bg-[#852912] active:scale-[0.98] text-white text-xs font-medium px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List a Restaurant</span>
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => showToast('No new dining alerts today. You are up to date!')}
              className="relative p-2 text-[#595149] hover:text-[#1F1C1B] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#9E3319] rounded-full" />
            </button>

            {/* User Avatar */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="User Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#EDE8DF] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Conditionally Render Restaurant Detail View or Discovery Feed */}
      {activeViewedRestaurant ? (
        <RestaurantDetailView
          restaurant={activeViewedRestaurant}
          onBack={() => {
            setActiveViewedRestaurant(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBookSuccess={(ref, name) => {
            showToast(`Table confirmed at ${name}! Reference: ${ref}`);
          }}
          onSelectRestaurant={(res) => {
            setActiveViewedRestaurant(res);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <>
          {/* ======================================================== */}
          {/* 2. HERO SECTION */}
          {/* ======================================================== */}
          <section className="relative pt-10 pb-14 overflow-hidden border-b border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E9C7BA] bg-[#FCF6F2] text-[#9E3319] text-[11px] font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E3319] animate-pulse" />
                <span>URBAN BITES • EAST AFRICA'S CURATED TABLE AUTHORITY</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1C1B] font-bold tracking-tight leading-[1.12]">
                Discover Nairobi's<br />
                <span className="italic font-normal text-[#9E3319]">Vibrant Dining</span> Scene
              </h1>

              {/* Subtitle / Intro paragraph */}
              <p className="text-[#6B655F] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                From Westlands rooftop cocktail bars to lush garden dining in Karen, artisanal aged steakhouses in Gigiri, and authentic Swahili & Ethiopian flavours.
              </p>

              {/* Search / Filter Card */}
              <div id="search-box" className="bg-white p-3 sm:p-3.5 rounded-2xl shadow-sm border border-[#EDE8DF]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  
                  {/* Neighbourhood */}
                  <div className="md:col-span-3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-[#EDE8DF]">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8C827A] uppercase tracking-wider mb-0.5">
                      <Compass className="w-3 h-3 text-[#9E3319]" />
                      <span>Neighbourhood</span>
                    </div>
                    <select
                      value={selectedNeighbourhood}
                      onChange={(e) => setSelectedNeighbourhood(e.target.value)}
                      className="w-full text-xs font-semibold text-[#1F1C1B] bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="All Areas (Nairobi)">All Areas (Nairobi)</option>
                      <option value="Westlands">Westlands</option>
                      <option value="Karen & Hardy">Karen & Hardy</option>
                      <option value="Gigiri & Muthaiga">Gigiri & Muthaiga</option>
                      <option value="Kilimani & Lavington">Kilimani & Lavington</option>
                    </select>
                  </div>

                  {/* Cuisine */}
                  <div className="md:col-span-3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-[#EDE8DF]">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8C827A] uppercase tracking-wider mb-0.5">
                      <Utensils className="w-3 h-3 text-[#9E3319]" />
                      <span>Cuisine</span>
                    </div>
                    <select
                      value={selectedCuisine}
                      onChange={(e) => setSelectedCuisine(e.target.value)}
                      className="w-full text-xs font-semibold text-[#1F1C1B] bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="Any Cuisine">Any Cuisine</option>
                      <option value="Swahili & Coastal">Swahili & Coastal</option>
                      <option value="Pan-Asian & Robata">Pan-Asian & Robata</option>
                      <option value="Italian & Neapolitan">Italian & Neapolitan</option>
                      <option value="Nyama Choma & Grills">Nyama Choma & Grills</option>
                      <option value="French & Mediterranean">French & Mediterranean</option>
                    </select>
                  </div>

                  {/* Vibe & Occasion */}
                  <div className="md:col-span-3 px-3 py-1.5 border-b md:border-b-0 md:border-r border-[#EDE8DF]">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8C827A] uppercase tracking-wider mb-0.5">
                      <Wine className="w-3 h-3 text-[#9E3319]" />
                      <span>Vibe & Occasion</span>
                    </div>
                    <select
                      value={selectedVibe}
                      onChange={(e) => setSelectedVibe(e.target.value)}
                      className="w-full text-xs font-semibold text-[#1F1C1B] bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="All Vibes">All Vibes</option>
                      <option value="Rooftop & Sunset">Rooftop & Sunset</option>
                      <option value="Romantic Candlelight">Romantic Candlelight</option>
                      <option value="Sunny Garden Patio">Sunny Garden Patio</option>
                      <option value="Chef's Table">Chef's Table</option>
                    </select>
                  </div>

                  {/* Action Button */}
                  <div className="md:col-span-3 p-1">
                    <button
                      onClick={handleHeroSearch}
                      className="w-full bg-[#9E3319] hover:bg-[#852912] active:scale-[0.98] text-white py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Find Tables & Menus</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Trending this week row */}
              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <div className="flex items-center gap-1 text-[#9E3319] font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-[#9E3319]" />
                  <span>Trending this week:</span>
                </div>
                {[
                  { name: 'Asiatic Rooftop', target: 'asiatic-rooftop' },
                  { name: 'Talisman Karen', target: 'talisman' },
                  { name: 'Cultiva Farm-to-Fork', target: 'cultiva' },
                  { name: 'The Hide Steakhouse', target: 'skyline-section' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const res = SKYLINE_RESTAURANTS.find(r => r.id === item.target) || 
                                  DISTRICT_GUIDES[0].restaurants.find(r => r.id === item.target);
                      if (res) {
                        setActiveViewedRestaurant(res);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        const el = document.getElementById('skyline-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-[#6B655F] hover:text-[#9E3319] transition-colors cursor-pointer"
                  >
                    {item.name}
                    {idx < 3 && <span className="ml-2 text-neutral-300">·</span>}
                  </button>
                ))}
                <span className="text-neutral-300">·</span>
                <button
                  onClick={() => setIsPriorityModalOpen(true)}
                  className="font-semibold text-[#9E3319] hover:underline cursor-pointer"
                >
                  Nairobi Restaurant Week 2026
                </button>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-100 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                  alt="Curated Plated Gastronomy Nairobi"
                  className="w-full h-full object-cover"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                {/* Top Right Editor's Pick Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full border border-white/20 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>EDITOR'S PICK • NAIROBI</span>
                </div>

                {/* Bottom Left Floating Badge: 520+ Venues */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#EDE8DF] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] text-[#9E3319] flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-[#1F1C1B] leading-none">
                      520+ Venues
                    </span>
                    <span className="text-[11px] text-[#78716C]">
                      Direct reservations
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. GASTRONOMIC SPECTRUM: EXPLORE BY PALATE & MOOD */}
      {/* ======================================================== */}
      <section className="py-8 border-b border-[#EDE8DF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C827A]">
                GASTRONOMIC SPECTRUM
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F1C1B]">
                Explore by Palate & Mood
              </h2>
            </div>

            {/* Scroll navigation buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollMood('left')}
                className="w-8 h-8 rounded-full border border-[#EDE8DF] flex items-center justify-center text-[#595149] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollMood('right')}
                className="w-8 h-8 rounded-full border border-[#EDE8DF] flex items-center justify-center text-[#595149] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills Carousel */}
          <div 
            ref={moodScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          >
            {moodOptions.map((item) => {
              const Icon = item.icon;
              const isActive = activeMoodFilter === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveMoodFilter(item.label);
                    showToast(`Filtered by ${item.label}`);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#9E3319] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#595149] border border-[#EDE8DF] hover:border-[#9E3319]/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8C827A]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ICONIC HEIGHTS: RESTAURANTS WITH BEST SKYLINE VIEWS */}
      {/* ======================================================== */}
      <section id="skyline-section" className="py-14 border-b border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#9E3319]">
                ICONIC HEIGHTS
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#1F1C1B] mt-1">
                Restaurants with Best Skyline Views
              </h2>
              <p className="text-sm text-[#6B655F] mt-1">
                Sunset cocktails, pan-Asian robata grilling, and Mediterranean mezze suspended above Nairobi's urban sprawl.
              </p>
            </div>

            <button 
              onClick={() => showToast('Displaying all 18 curated rooftop venues across Westlands & Gigiri')}
              className="text-xs font-bold text-[#9E3319] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View all 18 Rooftops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4-Card Rooftop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKYLINE_RESTAURANTS.map((restaurant) => {
              const isFav = favorites[restaurant.id];
              return (
                <div
                  key={restaurant.id}
                  onClick={() => {
                    setActiveViewedRestaurant(restaurant);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl overflow-hidden border border-[#EDE8DF] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                >
                  {/* Image container with badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient top and bottom overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

                    {/* Top Left: Neighbourhood */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                      {restaurant.neighbourhood}
                    </div>

                    {/* Top Right: Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(restaurant.id, restaurant.name);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white hover:bg-black/70 transition-colors cursor-pointer"
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                    </button>

                    {/* Bottom Left: Category */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                      {restaurant.category}
                    </div>

                    {/* Bottom Right: Price Range */}
                    <div className="absolute bottom-3 right-3 text-white text-xs font-bold font-mono">
                      {restaurant.priceRange}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1F1C1B] leading-snug group-hover:text-[#9E3319] transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-xs text-[#6B655F] mt-1.5 line-clamp-2 leading-relaxed">
                        {restaurant.description}
                      </p>
                    </div>

                    <div className="pt-4 space-y-3">
                      {/* Rating & Highlight Tag */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-[#1F1C1B]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{restaurant.rating}</span>
                          <span className="text-[#8C827A] font-normal">({restaurant.reviewsCount} reviews)</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${restaurant.tagColor || 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}>
                          {restaurant.highlightTag}
                        </span>
                      </div>

                      {/* Action Buttons: Reserve Table & Menu */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveViewedRestaurant(restaurant);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 bg-[#9E3319] hover:bg-[#852912] active:scale-[0.98] text-white py-2 px-3 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer text-center"
                        >
                          Reserve Table
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuRestaurant(restaurant);
                          }}
                          className="p-2 border border-[#EDE8DF] hover:bg-[#FAF7F2] text-[#595149] rounded-xl transition-colors cursor-pointer"
                          title="View Menu"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. EXPLORE DELICIOUS CUISINES */}
      {/* ======================================================== */}
      <section id="cuisines-section" className="py-14 border-b border-[#EDE8DF] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C827A]">
                GASTRONOMIC SPECTRUM
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#1F1C1B] mt-1">
                Explore Delicious Cuisines
              </h2>
              <p className="text-sm text-[#6B655F] mt-1 max-w-2xl">
                From fragrant Swahili coastal curries to smoky open-fire Koroga, embark on a sensory tour of Nairobi's rich gastronomic repertoire.
              </p>
            </div>

            <button 
              onClick={() => showToast('Opening directory of 40+ regional & international culinary categories')}
              className="text-xs font-bold text-[#9E3319] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View all 40+ Cuisines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Cuisine Cards (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUISINE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EDE8DF] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                onClick={() => {
                  setSelectedCuisine(cat.title);
                  showToast(`Selected ${cat.title}. Filter applied.`);
                }}
              >
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                  {/* Top Left Tag */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                    {cat.tag}
                  </div>

                  {/* Bottom Left Venue count */}
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                    {cat.venueCount} Venues
                  </div>

                  {/* Bottom Right Locations */}
                  <div className="absolute bottom-3 right-3 text-white text-xs font-medium">
                    {cat.locations}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1F1C1B] group-hover:text-[#9E3319] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#9E3319]">
                    <span>{cat.exploreText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FIND BY RESTAURANT TYPE (CURATED EXPERIENCES) */}
      {/* ======================================================== */}
      <section id="experiences-section" className="py-16 border-b border-[#EDE8DF] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C827A]">
            CURATED EXPERIENCES
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1F1C1B] mt-1">
            Find by Restaurant Type
          </h2>
          <p className="text-sm text-[#6B655F] mt-1 max-w-xl mx-auto">
            Whether you need a pet-friendly sunny garden for Sunday brunch or an intimate chef's counter for celebrations.
          </p>

          {/* 6 Restaurant Type Cards (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left">
            {RESTAURANT_TYPES.map((type) => {
              // Icon mapping
              let IconComponent = Coffee;
              if (type.iconName === 'PawPrint') IconComponent = Sparkles;
              if (type.iconName === 'UtensilsCrossed') IconComponent = Utensils;
              if (type.iconName === 'Wine') IconComponent = Wine;
              if (type.iconName === 'Flame') IconComponent = Flame;
              if (type.iconName === 'GlassWater') IconComponent = GlassWater;

              return (
                <div
                  key={type.id}
                  className="bg-white rounded-2xl p-6 border border-[#EDE8DF] shadow-xs hover:shadow-md hover:border-[#9E3319]/30 transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => showToast(`Opening directory for ${type.title}`)}
                >
                  <div>
                    {/* Icon and Venue count header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${type.accentBg} ${type.iconColor} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-[#8C827A] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EDE8DF]">
                        {type.venueCountText}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#1F1C1B] group-hover:text-[#9E3319] transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  {/* Card Footer: sample spots + explore link */}
                  <div className="pt-6 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                    <span className="text-[#8C827A] truncate max-w-[170px]">
                      {type.featuredNames}
                    </span>
                    <span className="font-semibold text-[#9E3319] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. CURATED NEIGHBOURHOOD GUIDES */}
      {/* ======================================================== */}
      <section id="neighbourhood-section" className="py-16 border-b border-[#EDE8DF] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#9E3319]">
            NAIROBI BY DISTRICT
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1F1C1B] mt-1">
            Curated Neighbourhood Guides
          </h2>
          <p className="text-sm text-[#6B655F] mt-1 max-w-xl mx-auto">
            Every district has its own distinct culinary rhythm. Switch tabs to reveal authentic neighbourhood recommendations.
          </p>

          {/* View Mode Toggle: Cards vs Spatial Cartography Map */}
          <div className="flex items-center justify-center mt-5 mb-2">
            <div className="inline-flex items-center p-1 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] shadow-2xs">
              <button
                onClick={() => setNeighbourhoodViewMode('cards')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  neighbourhoodViewMode === 'cards'
                    ? 'bg-white text-[#9E3319] shadow-xs border border-[#EDE8DF]'
                    : 'text-[#6B655F] hover:text-[#1F1C1B]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Featured Cards ({currentDistrict.tabLabel})</span>
              </button>

              <button
                onClick={() => setNeighbourhoodViewMode('map')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  neighbourhoodViewMode === 'map'
                    ? 'bg-[#9E3319] text-white shadow-xs'
                    : 'text-[#6B655F] hover:text-[#1F1C1B]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Nairobi Spatial Map</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  neighbourhoodViewMode === 'map' ? 'bg-white/20 text-white' : 'bg-[#9E3319]/10 text-[#9E3319]'
                }`}>
                  Interactive
                </span>
              </button>
            </div>
          </div>

          {neighbourhoodViewMode === 'map' ? (
            /* ======================================================== */
            /* SPATIAL MAP VIEW */
            /* ======================================================== */
            <div className="mt-6 text-left">
              <NairobiDiningMap
                onSelectRestaurant={(res) => {
                  setActiveViewedRestaurant(res);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBookTable={(res) => {
                  setReservationRestaurant(res);
                }}
              />
            </div>
          ) : (
            /* ======================================================== */
            /* CARDS VIEW WITH NEIGHBOURHOOD PILLS */
            /* ======================================================== */
            <>
              {/* District Pill Tabs */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-6 mt-1">
                {DISTRICT_GUIDES.map((d) => {
                  const isActive = activeDistrictTab === d.tabLabel;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        setActiveDistrictTab(d.tabLabel);
                        showToast(`Showing recommendations for ${d.tabLabel}`);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#9E3319] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#595149] border border-[#EDE8DF] hover:border-[#9E3319]/40'
                      }`}
                    >
                      {d.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* 4 Featured District Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-2">
                {currentDistrict.restaurants.map((res) => {
                  const isFav = favorites[res.id];
                  return (
                    <div
                      key={res.id}
                      onClick={() => {
                        setActiveViewedRestaurant(res);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white rounded-2xl overflow-hidden border border-[#EDE8DF] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                        <img
                          src={res.image}
                          alt={res.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                        {/* Top Left Tag */}
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                          {res.category}
                        </div>

                        {/* Price Range */}
                        <div className="absolute bottom-3 right-3 text-white text-xs font-bold font-mono">
                          {res.priceRange}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-serif text-lg font-bold text-[#1F1C1B] group-hover:text-[#9E3319] transition-colors truncate">
                              {res.subName || res.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs font-semibold text-[#1F1C1B] shrink-0">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{res.rating}</span>
                            </div>
                          </div>

                          <p className="text-xs text-[#6B655F] mt-2 line-clamp-3 leading-relaxed">
                            {res.description}
                          </p>

                          {/* Feature tags */}
                          {res.features && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {res.features.map((feat, idx) => (
                                <span 
                                  key={idx}
                                  className="text-[10px] bg-[#FAF7F2] text-[#595149] px-2 py-0.5 rounded-md border border-[#EDE8DF]"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action button: Reserve at ... */}
                        <div className="pt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveViewedRestaurant(res);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full bg-[#F5EFE9] hover:bg-[#EFE5DB] active:scale-[0.98] text-[#1F1C1B] py-2 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-center"
                          >
                            Reserve at {res.name.split(' ')[0]}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Spatial Map Exploration Callout Banner */}
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] text-[#9E3319] flex items-center justify-center shrink-0 border border-[#F0DFD7]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F1C1B]">
                      Prefer a spatial geographic overview of Nairobi's dining scene?
                    </h4>
                    <p className="text-[11px] text-[#6B655F] mt-0.5">
                      Explore all 20+ restaurants positioned across Karen, Westlands, Gigiri, Lavington and Loresho with arterial transit routes, Karura Forest boundaries, and driving times.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setNeighbourhoodViewMode('map')}
                  className="bg-[#9E3319] hover:bg-[#852912] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-2xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Open Interactive Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FOOD WEEKS & CULINARY EVENTS */}
      {/* ======================================================== */}
      <section id="events-section" className="py-16 border-b border-[#EDE8DF] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#9E3319]">
                EATOUT SIGNATURE FESTIVALS
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#1F1C1B] mt-1">
                Food Weeks & Culinary Events
              </h2>
            </div>

            <button 
              onClick={() => showToast('Opening 2026 National Gastronomy Calendar')}
              className="text-xs font-semibold text-[#8C827A] hover:text-[#1F1C1B] transition-colors cursor-pointer"
            >
              Annual National Gastronomy Calendar
            </button>
          </div>

          {/* Bento-Style Events Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Big Dark Card: Nairobi Restaurant Week 2026 */}
            <div className="lg:col-span-8 bg-[#1F1C1B] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
              {/* Background subtle radial warm glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E3319]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>COMING EARLY 2026</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  Nairobi Restaurant Week 2026
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  10 thrilling days of exclusive fixed-price chef tasting menus across 80+ elite establishments. Unlock limited-edition culinary creations before reservations close.
                </p>
              </div>

              {/* Bottom Buttons / Venue status */}
              <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
                <button
                  onClick={() => setIsPriorityModalOpen(true)}
                  className="bg-[#9E3319] hover:bg-[#B33C1E] active:scale-[0.98] text-white text-xs font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <span>Join Priority Access List</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>80+ Participating Venues</span>
                </div>
              </div>
            </div>

            {/* Top Right Card: Chef's Table Tastings */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DF] shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FEFCE8] text-[#A16207] flex items-center justify-center mb-4">
                  <Gift className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#A16207]">
                  CURATED EXPERIENCE
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1F1C1B] mt-1 group-hover:text-[#9E3319] transition-colors">
                  Chef's Table Tastings
                </h3>
                <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                  Witness master culinary techniques up-close with multi-course paired tasting dinners at Chophouse, Jiko, and The Hide.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                <span className="text-[#8C827A]">12 Exclusive Tables</span>
                <button 
                  onClick={() => showToast('Opening Chef Table reservations')}
                  className="font-semibold text-[#9E3319] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Row of 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            
            {/* 1. Dog-Friendly Garden Cafes */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8DF] shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] text-[#15803D] flex items-center justify-center mb-4">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#15803D]">
                  CANINE COMPANION GUIDE
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F1C1B] mt-1 group-hover:text-[#9E3319] transition-colors">
                  Dog-Friendly Garden Cafes
                </h3>
                <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                  Sun-dappled lawns, fresh water bowls, and artisanal coffee at The Fig & Olive, Wasp & Sprout, and Pallet Cafe Lavington.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                <span className="text-[#8C827A]">24 Pet-Approved Patios</span>
                <button 
                  onClick={() => showToast('Exploring 24 pet-approved patios')}
                  className="font-semibold text-[#9E3319] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Out of Town Dining */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8DF] shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] text-[#B45309] flex items-center justify-center mb-4">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B45309]">
                  COASTAL & ESCAPES
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F1C1B] mt-1 group-hover:text-[#9E3319] transition-colors">
                  Out of Town Dining
                </h3>
                <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                  Fresh dhow-caught seafood, Swahili coconut curries, and sunset dining in Diani, Lamu, Watamu, Kilifi, and Naivasha.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                <span className="text-[#8C827A]">40+ Getaway Venues</span>
                <button 
                  onClick={() => showToast('Exploring coastal & lake getaways')}
                  className="font-semibold text-[#9E3319] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Burger & Pizza Weeks */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8DF] shadow-xs flex flex-col justify-between group">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#BE123C] flex items-center justify-center mb-4">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#BE123C]">
                  SEASONAL FESTIVAL LINEUP
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F1C1B] mt-1 group-hover:text-[#9E3319] transition-colors">
                  Burger & Pizza Weeks
                </h3>
                <p className="text-xs text-[#6B655F] mt-2 leading-relaxed">
                  Mark your calendar for Nairobi Burger Week (Sep 2026) followed by Nairobi Pizza Week and Nairobi Wine Week.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                <span className="text-[#8C827A]">3 Upcoming Weeks</span>
                <button 
                  onClick={() => showToast('Opening Festival Timeline')}
                  className="font-semibold text-[#9E3319] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>View Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. BOTTOM CALL-TO-ACTION SPLIT SECTION */}
      {/* ======================================================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Card: Instant Confirmed Tables, Zero Waiting */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8DF] shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#9E3319] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#9E3319]" />
                  <span>POWERED BY URBAN BITES & TABLE CONCIERGE</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C1B] leading-tight">
                  Instant Confirmed Tables,<br />
                  <span className="italic font-normal text-[#9E3319]">Zero Waiting.</span>
                </h3>

                <p className="text-sm text-[#6B655F] leading-relaxed">
                  Book real-time reservations without back-and-forth phone calls. Enjoy guaranteed prime seating, welcome drinks, and loyalty rewards on every booking.
                </p>

                {/* 3 Value props with icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1C1B]">
                    <Mail className="w-4 h-4 text-[#9E3319] shrink-0" />
                    <span>SMS & Email Confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1C1B]">
                    <Gift className="w-4 h-4 text-[#9E3319] shrink-0" />
                    <span>Urban Bites Club Rewards</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1C1B]">
                    <RotateCcw className="w-4 h-4 text-[#9E3319] shrink-0" />
                    <span>Free Instant Cancellation</span>
                  </div>
                </div>
              </div>

              {/* Bottom Button & Metrics */}
              <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => {
                    setReservationRestaurant(SKYLINE_RESTAURANTS[0]);
                  }}
                  className="bg-[#9E3319] hover:bg-[#852912] active:scale-[0.98] text-white py-3 px-6 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer text-center"
                >
                  Explore Available Tables Tonight
                </button>
                <span className="text-xs text-[#8C827A]">
                  Over 14,000 reservations fulfilled this month
                </span>
              </div>
            </div>

            {/* Right Card: Grow Your Restaurant with East Africa's #1 Dining Hub */}
            <div className="bg-[#9E3319] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white mb-2">
                  <Store className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200">
                  FOR RESTAURANT OWNERS
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Grow Your Restaurant with East Africa's #1 Dining Hub
                </h3>

                <p className="text-sm text-white/85 leading-relaxed font-light">
                  Showcase your menus, manage table turns with intelligent guest management software, and reach over 500,000 dedicated culinary explorers every month.
                </p>

                {/* 3 Checkmarks */}
                <div className="space-y-2.5 pt-2 text-xs font-medium text-white/95">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>List your restaurant for FREE on Urban Bites</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Eat App reservation & table management engine</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Feature in Nairobi Restaurant Week & seasonal guides</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-8 relative z-10">
                <button
                  onClick={() => setIsListModalOpen(true)}
                  className="w-full bg-white hover:bg-[#FAF7F2] active:scale-[0.98] text-[#9E3319] py-3.5 px-6 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer text-center"
                >
                  Launch with Urban Bites Today
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

          {/* ======================================================== */}
          {/* 10. SHARED FOOTER WITH NEWSLETTER & DIRECTORY */}
          {/* ======================================================== */}
          <Footer
            onSelectNeighbourhood={(n) => {
              const tab = DISTRICT_GUIDES.find(d => d.tabLabel.toLowerCase().includes(n.toLowerCase()));
              if (tab) setActiveDistrictTab(tab.tabLabel);
              const el = document.getElementById('neighbourhood-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}
      <ReservationModal
        restaurant={reservationRestaurant}
        onClose={() => setReservationRestaurant(null)}
        onSuccess={(ref, name) => {
          showToast(`Table reserved at ${name}! Reference: ${ref}`);
        }}
      />

      <MenuModal
        restaurant={menuRestaurant}
        onClose={() => setMenuRestaurant(null)}
        onReserve={(res) => setReservationRestaurant(res)}
      />

      <ListRestaurantModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onSuccess={() => {
          showToast('Restaurant listing request received!');
          setIsListModalOpen(false);
        }}
      />

      <EventPriorityModal
        isOpen={isPriorityModalOpen}
        onClose={() => setIsPriorityModalOpen(false)}
        onSuccess={(email) => {
          showToast(`VIP Priority invitation reserved for ${email}!`);
          setIsPriorityModalOpen(false);
        }}
      />

    </div>
  );
}
