import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Search,
  Star,
  SlidersHorizontal,
  Sparkles,
  Car,
  Clock,
  ArrowRight,
  ExternalLink,
  Info,
  X,
  ChevronRight,
  Utensils,
  Wine,
  Flame,
  CheckCircle2,
  TreePine,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Restaurant, SKYLINE_RESTAURANTS, DISTRICT_GUIDES } from '../data/diningData';

export interface SpatialRestaurant extends Restaurant {
  coords: { x: number; y: number }; // Percentage 0-100 on the map
  driveTimeFromCBD: string;
  nearbyLandmark: string;
}

// Spatial coordinates and neighbourhood geography of Nairobi
export const NAIROBI_SPATIAL_RESTAURANTS: SpatialRestaurant[] = [
  // Westlands & Parklands
  {
    ...SKYLINE_RESTAURANTS[0], // Asiatic Rooftop
    coords: { x: 47, y: 35 },
    driveTimeFromCBD: '10 mins via Expressway',
    nearbyLandmark: 'Opposite GTC Tower, Westlands'
  },
  {
    ...DISTRICT_GUIDES[1].restaurants[0], // Ankole Grill Senteu
    coords: { x: 49, y: 38 },
    driveTimeFromCBD: '12 mins via Waiyaki Way',
    nearbyLandmark: 'Senteu Plaza, Galana / Ring Rd'
  },
  {
    ...DISTRICT_GUIDES[1].restaurants[1], // Inti - Nikkei
    coords: { x: 48, y: 32 },
    driveTimeFromCBD: '9 mins via Expressway',
    nearbyLandmark: '21st Floor One Africa Place'
  },
  {
    ...DISTRICT_GUIDES[1].restaurants[2], // Seven Seafood
    coords: { x: 52, y: 36 },
    driveTimeFromCBD: '14 mins via Parklands',
    nearbyLandmark: 'ABC Place, Waiyaki Way'
  },
  {
    ...DISTRICT_GUIDES[1].restaurants[3], // The Alchemist
    coords: { x: 45, y: 39 },
    driveTimeFromCBD: '11 mins via Parklands Rd',
    nearbyLandmark: 'Parklands Road creative hub'
  },

  // Gigiri, Muthaiga & Runda
  {
    ...SKYLINE_RESTAURANTS[1], // Horizon Rooftop
    coords: { x: 54, y: 19 },
    driveTimeFromCBD: '18 mins via Limuru Road',
    nearbyLandmark: 'Near Two Rivers Lifestyle Hub'
  },
  {
    ...DISTRICT_GUIDES[2].restaurants[0], // The Lord Erroll
    coords: { x: 56, y: 15 },
    driveTimeFromCBD: '22 mins via Runda Drive',
    nearbyLandmark: 'Ruaka Road, Runda Diplomatic Enclave'
  },
  {
    ...DISTRICT_GUIDES[2].restaurants[1], // About Thyme
    coords: { x: 50, y: 25 },
    driveTimeFromCBD: '14 mins via Forest Road',
    nearbyLandmark: 'Eldama Ravine Rd, Westlands / Gigiri border'
  },
  {
    ...DISTRICT_GUIDES[2].restaurants[2], // Jiko at Tribe Hotel
    coords: { x: 55, y: 22 },
    driveTimeFromCBD: '16 mins via Limuru Rd',
    nearbyLandmark: 'Village Market, UN Gigiri Quarter'
  },
  {
    ...DISTRICT_GUIDES[2].restaurants[3], // The Safari Club Dining
    coords: { x: 60, y: 27 },
    driveTimeFromCBD: '10 mins via Thika Rd / Muthaiga',
    nearbyLandmark: 'Muthaiga Road, Karura Forest fringe'
  },

  // Karen & Hardy
  {
    ...DISTRICT_GUIDES[0].restaurants[0], // Talisman
    coords: { x: 23, y: 67 },
    driveTimeFromCBD: '22 mins via Southern Bypass',
    nearbyLandmark: '320 Ngong Road, Karen Heart'
  },
  {
    ...DISTRICT_GUIDES[0].restaurants[1], // Cultiva
    coords: { x: 28, y: 73 },
    driveTimeFromCBD: '26 mins via Langata / Karen Rd',
    nearbyLandmark: 'Coop Academy Rd, Hardy Karen'
  },
  {
    ...DISTRICT_GUIDES[0].restaurants[2], // Hemingways Brasserie
    coords: { x: 19, y: 64 },
    driveTimeFromCBD: '24 mins via Ngong Rd',
    nearbyLandmark: 'Mbagathi Ridge, Ngong Hills view'
  },
  {
    ...DISTRICT_GUIDES[0].restaurants[3], // Matteo's Pizzeria
    coords: { x: 25, y: 63 },
    driveTimeFromCBD: '20 mins via Karen Roundabout',
    nearbyLandmark: 'Ngong Road, 2 mins from The Hub'
  },

  // Lavington & Kilimani
  {
    ...DISTRICT_GUIDES[3].restaurants[0], // Pallet Cafe
    coords: { x: 37, y: 46 },
    driveTimeFromCBD: '15 mins via James Gichuru',
    nearbyLandmark: 'James Gichuru Rd, Lavington Green'
  },
  {
    ...DISTRICT_GUIDES[3].restaurants[1], // Habesha
    coords: { x: 43, y: 53 },
    driveTimeFromCBD: '12 mins via Argwings Kodhek',
    nearbyLandmark: 'Argwings Kodhek, Kilimani'
  },
  {
    ...DISTRICT_GUIDES[3].restaurants[2], // Mama Ashanti
    coords: { x: 35, y: 50 },
    driveTimeFromCBD: '16 mins via Muthangari Rd',
    nearbyLandmark: 'Muthangari Drive, Lavington'
  },
  {
    ...DISTRICT_GUIDES[3].restaurants[3], // Osteria del Chianti
    coords: { x: 45, y: 49 },
    driveTimeFromCBD: '11 mins via Lenana Road',
    nearbyLandmark: 'Lenana Road, Hurlingham / Kilimani'
  },

  // Loresho & Kyuna
  {
    ...DISTRICT_GUIDES[4].restaurants[0], // Shamba Cafe
    coords: { x: 32, y: 29 },
    driveTimeFromCBD: '20 mins via Lower Kabete Rd',
    nearbyLandmark: 'Loresho Ridge farm sanctuary'
  },
  {
    ...DISTRICT_GUIDES[4].restaurants[1], // Wasp & Sprout
    coords: { x: 36, y: 32 },
    driveTimeFromCBD: '17 mins via Kyuna Road',
    nearbyLandmark: 'Old Loresho Crescent'
  }
];

// District centroid & spatial zones definition
export const NAIROBI_DISTRICTS = [
  {
    id: 'all',
    name: 'All Nairobi County',
    shortName: 'All Areas',
    center: { x: 50, y: 50 },
    zoom: 1,
    tag: '20+ Curated Venues',
    description: 'Explore the full gastronomic topography across Nairobi’s vibrant culinary enclaves.'
  },
  {
    id: 'karen-hardy',
    name: 'Karen & Hardy',
    shortName: 'Karen',
    center: { x: 24, y: 67 },
    zoom: 1.5,
    tag: 'Garden Dining & Farm-to-Fork',
    description: 'Tranquil acreage, colonial fireplaces, organic farms, and candlelit courtyard verandas.'
  },
  {
    id: 'westlands-parklands',
    name: 'Westlands & Parklands',
    shortName: 'Westlands',
    center: { x: 48, y: 35 },
    zoom: 1.5,
    tag: 'Skyline Rooftops & Robata',
    description: 'Pulsing urban epicenter with illuminated skyscraper lounges, Asian robata, and night energy.'
  },
  {
    id: 'gigiri-muthaiga',
    name: 'Gigiri, Muthaiga & Runda',
    shortName: 'Gigiri & Runda',
    center: { x: 54, y: 21 },
    zoom: 1.5,
    tag: 'Diplomatic Enclave & Manors',
    description: 'Historic manor estates, Karura Forest borders, and discerning international embassies.'
  },
  {
    id: 'lavington-kilimani',
    name: 'Lavington & Kilimani',
    shortName: 'Lavington / Kilimani',
    center: { x: 40, y: 50 },
    zoom: 1.5,
    tag: 'Leafy Bistros & Communal Gems',
    description: 'Shaded coffee patios, legendary communal Ethiopian feasts, and authentic Tuscan cellars.'
  },
  {
    id: 'loresho-kyuna',
    name: 'Loresho & Kyuna',
    shortName: 'Loresho',
    center: { x: 34, y: 30 },
    zoom: 1.6,
    tag: 'Organic Farm Sanctuaries',
    description: 'Artisan stone pizza ovens, farm shops, and bohemian coffee houses amidst green hills.'
  }
];

interface NairobiDiningMapProps {
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  onBookTable?: (restaurant: Restaurant) => void;
  focusedRestaurantId?: string;
  isCompact?: boolean;
}

export const NairobiDiningMap: React.FC<NairobiDiningMapProps> = ({
  onSelectRestaurant,
  onBookTable,
  focusedRestaurantId,
  isCompact = false
}) => {
  // State
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('all');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
    focusedRestaurantId || null
  );
  const [hoveredRestaurantId, setHoveredRestaurantId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTheme, setMapTheme] = useState<'warm' | 'satellite'>('warm');
  const [showHighways, setShowHighways] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showPriceTags, setShowPriceTags] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExpandedModal, setIsExpandedModal] = useState(false);

  // Active district configuration
  const currentDistrict = useMemo(() => {
    return NAIROBI_DISTRICTS.find((d) => d.id === selectedDistrictId) || NAIROBI_DISTRICTS[0];
  }, [selectedDistrictId]);

  // Filtered restaurants
  const filteredRestaurants = useMemo(() => {
    return NAIROBI_SPATIAL_RESTAURANTS.filter((res) => {
      // District filter
      if (selectedDistrictId !== 'all') {
        if (selectedDistrictId === 'karen-hardy' && res.neighbourhood !== 'KAREN') return false;
        if (selectedDistrictId === 'westlands-parklands' && res.neighbourhood !== 'WESTLANDS') return false;
        if (
          selectedDistrictId === 'gigiri-muthaiga' &&
          !['GIGIRI', 'RUNDA', 'MUTHAIGA'].includes(res.neighbourhood)
        )
          return false;
        if (
          selectedDistrictId === 'lavington-kilimani' &&
          !['LAVINGTON', 'KILIMANI'].includes(res.neighbourhood)
        )
          return false;
        if (selectedDistrictId === 'loresho-kyuna' && res.neighbourhood !== 'LORESHO') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = res.name.toLowerCase().includes(query);
        const matchesNeighbourhood = res.neighbourhood.toLowerCase().includes(query);
        const matchesCategory = res.category.toLowerCase().includes(query);
        const matchesCuisine = res.cuisines?.some((c) => c.toLowerCase().includes(query));
        return matchesName || matchesNeighbourhood || matchesCategory || matchesCuisine;
      }

      return true;
    });
  }, [selectedDistrictId, searchQuery]);

  // Active selected restaurant object
  const activeRestaurant = useMemo(() => {
    const id = selectedRestaurantId || hoveredRestaurantId;
    if (!id) return null;
    return NAIROBI_SPATIAL_RESTAURANTS.find((r) => r.id === id) || null;
  }, [selectedRestaurantId, hoveredRestaurantId]);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.8));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedDistrictId('all');
    setSelectedRestaurantId(null);
  };

  // Switch district & center
  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    const district = NAIROBI_DISTRICTS.find((d) => d.id === districtId);
    if (district && district.id !== 'all') {
      setZoomLevel(district.zoom);
      // Pan toward centroid
      const dx = (50 - district.center.x) * 1.5;
      const dy = (50 - district.center.y) * 1.5;
      setPanOffset({ x: dx, y: dy });
    } else {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-[#EDE8DF] shadow-sm transition-all ${
        mapTheme === 'satellite' ? 'bg-[#15191E] text-white' : 'bg-[#FAF7F2] text-[#1F1C1B]'
      } ${isCompact ? 'p-0' : 'p-4 sm:p-6'}`}
    >
      {/* Top Header & Map Controls */}
      {!isCompact && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#EDE8DF]/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#9E3319]/10 text-[#9E3319] border border-[#9E3319]/20">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                <span>SPATIAL DINING CARTOGRAPHY</span>
              </span>
              <span className="text-xs text-[#8C827A] font-medium hidden sm:inline">
                Nairobi Metropolitan Dining Scene
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-1">
              Neighbourhood Spatial Explorer
            </h2>
            <p className="text-xs sm:text-sm text-[#6B655F] mt-0.5 max-w-2xl">
              Visualise restaurant locations within their respective micro-districts, arterial corridors, and proximity to scenic Nairobi landmarks.
            </p>
          </div>

          {/* Quick Search & Theme Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C827A]" />
              <input
                type="text"
                placeholder="Find restaurant or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border transition-colors outline-none ${
                  mapTheme === 'satellite'
                    ? 'bg-[#1E232A] border-white/10 text-white placeholder-white/40 focus:border-[#9E3319]'
                    : 'bg-white border-[#EDE8DF] text-[#1F1C1B] placeholder-[#8C827A] focus:border-[#9E3319]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Map Theme Toggle */}
            <div
              className={`flex items-center p-0.5 rounded-xl border ${
                mapTheme === 'satellite' ? 'bg-[#1E232A] border-white/10' : 'bg-white border-[#EDE8DF]'
              }`}
            >
              <button
                onClick={() => setMapTheme('warm')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mapTheme === 'warm'
                    ? 'bg-[#9E3319] text-white shadow-xs'
                    : 'text-[#6B655F] hover:text-[#1F1C1B]'
                }`}
              >
                Editorial Warm
              </button>
              <button
                onClick={() => setMapTheme('satellite')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mapTheme === 'satellite'
                    ? 'bg-[#9E3319] text-white shadow-xs'
                    : 'text-[#6B655F] hover:text-[#1F1C1B]'
                }`}
              >
                Night Skyline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* District Pill Navigation Bar */}
      {!isCompact && (
        <div className="py-3 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {NAIROBI_DISTRICTS.map((district) => {
              const isActive = selectedDistrictId === district.id;
              const count =
                district.id === 'all'
                  ? NAIROBI_SPATIAL_RESTAURANTS.length
                  : NAIROBI_SPATIAL_RESTAURANTS.filter((r) => {
                      if (district.id === 'karen-hardy') return r.neighbourhood === 'KAREN';
                      if (district.id === 'westlands-parklands') return r.neighbourhood === 'WESTLANDS';
                      if (district.id === 'gigiri-muthaiga')
                        return ['GIGIRI', 'RUNDA', 'MUTHAIGA'].includes(r.neighbourhood);
                      if (district.id === 'lavington-kilimani')
                        return ['LAVINGTON', 'KILIMANI'].includes(r.neighbourhood);
                      if (district.id === 'loresho-kyuna') return r.neighbourhood === 'LORESHO';
                      return false;
                    }).length;

              return (
                <button
                  key={district.id}
                  onClick={() => handleSelectDistrict(district.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#9E3319] text-white shadow-sm'
                      : mapTheme === 'satellite'
                      ? 'bg-[#1E232A] text-neutral-300 border border-white/10 hover:border-[#9E3319]/50'
                      : 'bg-white text-[#595149] border border-[#EDE8DF] hover:border-[#9E3319]/50 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <MapPin
                    className={`w-3 h-3 ${
                      isActive
                        ? 'text-white'
                        : district.id === 'all'
                        ? 'text-[#9E3319]'
                        : 'text-[#8C827A]'
                    }`}
                  />
                  <span>{district.shortName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : mapTheme === 'satellite'
                        ? 'bg-white/10 text-neutral-400'
                        : 'bg-[#F2ECE4] text-[#6B655F]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Layer toggles dropdown/pills */}
          <div className="hidden xl:flex items-center gap-3 text-xs text-[#6B655F]">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showHighways}
                onChange={(e) => setShowHighways(e.target.checked)}
                className="accent-[#9E3319] rounded cursor-pointer"
              />
              <span>Highways & Bypass</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLandmarks}
                onChange={(e) => setShowLandmarks(e.target.checked)}
                className="accent-[#9E3319] rounded cursor-pointer"
              />
              <span>Reserves & Landmarks</span>
            </label>
          </div>
        </div>
      )}

      {/* Main Interactive Map Canvas & Floating Panels */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden select-none border ${
          mapTheme === 'satellite'
            ? 'bg-[#0D1117] border-white/10'
            : 'bg-[#F4EEE6] border-[#EDE8DF]'
        } ${isCompact ? 'h-[360px]' : 'h-[520px] sm:h-[580px]'}`}
      >
        {/* Dynamic Zoom & Pan Container */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out origin-center"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
          }}
        >
          {/* ======================================================== */}
          {/* SVG CARTOGRAPHY LAYER: Arterials, Natural Sanctuaries, Contours */}
          {/* ======================================================== */}
          <svg
            className="w-full h-full absolute inset-0 pointer-events-none"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Grid pattern */}
              <pattern
                id="carto-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? 'rgba(255,255,255,0.03)' : 'rgba(158,51,25,0.04)'}
                  strokeWidth="1"
                />
              </pattern>

              {/* Highway glow filter for satellite mode */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Grid background */}
            <rect width="1000" height="700" fill="url(#carto-grid)" />

            {/* ======================================================== */}
            {/* NATURAL RESERVES & TOPOGRAPHY */}
            {/* ======================================================== */}
            {showLandmarks && (
              <>
                {/* 1. Karura Forest Reserve (Between Westlands & Gigiri) */}
                <path
                  d="M 480 140 Q 560 120 620 180 Q 640 230 590 260 Q 520 280 470 240 Z"
                  fill={mapTheme === 'satellite' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(34, 197, 94, 0.14)'}
                  stroke={mapTheme === 'satellite' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(34, 197, 94, 0.3)'}
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />

                {/* 2. Nairobi National Park (Southern Green Savanna Buffer) */}
                <path
                  d="M 420 540 Q 600 500 850 560 L 1000 640 L 1000 700 L 380 700 Q 400 600 420 540 Z"
                  fill={mapTheme === 'satellite' ? 'rgba(234, 179, 8, 0.08)' : 'rgba(202, 138, 4, 0.1)'}
                  stroke={mapTheme === 'satellite' ? 'rgba(234, 179, 8, 0.25)' : 'rgba(202, 138, 4, 0.25)'}
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                />

                {/* 3. Ngong Hills Foothills Ridge (Southwest buffer) */}
                <path
                  d="M 0 520 Q 120 540 180 620 Q 220 680 200 700 L 0 700 Z"
                  fill={mapTheme === 'satellite' ? 'rgba(148, 163, 184, 0.08)' : 'rgba(120, 113, 108, 0.1)'}
                  stroke={mapTheme === 'satellite' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(120, 113, 108, 0.2)'}
                  strokeWidth="1"
                />
              </>
            )}

            {/* ======================================================== */}
            {/* DISTRICT SHADING ZONES (Subtle spatial aura per district) */}
            {/* ======================================================== */}
            {/* Karen & Hardy Enclave */}
            <circle
              cx="240"
              cy="470"
              r="130"
              fill={selectedDistrictId === 'karen-hardy' ? 'rgba(158, 51, 25, 0.1)' : 'rgba(158, 51, 25, 0.03)'}
              stroke="rgba(158, 51, 25, 0.12)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Westlands Commercial Hub */}
            <ellipse
              cx="480"
              cy="250"
              rx="90"
              ry="60"
              fill={selectedDistrictId === 'westlands-parklands' ? 'rgba(158, 51, 25, 0.12)' : 'rgba(158, 51, 25, 0.04)'}
              stroke="rgba(158, 51, 25, 0.15)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Gigiri Diplomatic Quarter */}
            <circle
              cx="540"
              cy="150"
              r="85"
              fill={selectedDistrictId === 'gigiri-muthaiga' ? 'rgba(158, 51, 25, 0.1)' : 'rgba(158, 51, 25, 0.03)'}
              stroke="rgba(158, 51, 25, 0.12)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Lavington & Kilimani */}
            <ellipse
              cx="400"
              cy="350"
              rx="80"
              ry="70"
              fill={selectedDistrictId === 'lavington-kilimani' ? 'rgba(158, 51, 25, 0.1)' : 'rgba(158, 51, 25, 0.03)'}
              stroke="rgba(158, 51, 25, 0.12)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Loresho & Kyuna */}
            <circle
              cx="340"
              cy="210"
              r="65"
              fill={selectedDistrictId === 'loresho-kyuna' ? 'rgba(158, 51, 25, 0.1)' : 'rgba(158, 51, 25, 0.03)'}
              stroke="rgba(158, 51, 25, 0.12)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* ======================================================== */}
            {/* MAJOR TRANSIT ARTERIALS & HIGHWAYS */}
            {/* ======================================================== */}
            {showHighways && (
              <>
                {/* 1. Nairobi Expressway & Uhuru Highway (Mombasa Rd -> CBD -> Westlands) */}
                <path
                  d="M 780 700 Q 640 500 580 340 T 480 240 Q 420 180 360 140"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? '#F59E0B' : '#C2410C'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 780 700 Q 640 500 580 340 T 480 240 Q 420 180 360 140"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="8 6"
                  opacity={0.8}
                />

                {/* 2. Waiyaki Way Corridor (Westlands -> Kangemi -> Limuru) */}
                <path
                  d="M 600 320 L 480 250 L 320 220 L 100 190"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? '#94A3B8' : '#A8A29E'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* 3. Southern Bypass (Mombasa Rd -> Langata -> Karen -> Kikuyu) */}
                <path
                  d="M 750 560 Q 480 520 320 540 Q 200 560 100 480"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? '#38BDF8' : '#0284C7'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 3"
                />

                {/* 4. Ngong Road (CBD -> Kilimani -> Karen Roundabout) */}
                <path
                  d="M 570 340 Q 440 380 320 440 L 230 470 L 120 500"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? '#94A3B8' : '#A8A29E'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* 5. Limuru Road (Westlands / Forest Rd -> Muthaiga -> Gigiri -> Ruaka) */}
                <path
                  d="M 480 240 Q 510 180 540 140 L 560 80"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? '#94A3B8' : '#A8A29E'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* 6. James Gichuru Road (Waiyaki Way -> Lavington) */}
                <path
                  d="M 420 230 L 370 320 L 350 370"
                  fill="none"
                  stroke={mapTheme === 'satellite' ? '#64748B' : '#CBD5E1'}
                  strokeWidth="1.8"
                />
              </>
            )}
          </svg>

          {/* ======================================================== */}
          {/* STATIC LANDMARK LABELS */}
          {/* ======================================================== */}
          {showLandmarks && (
            <>
              {/* Karura Forest label */}
              <div
                className="absolute text-center pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '55%', top: '27%' }}
              >
                <div
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs ${
                    mapTheme === 'satellite'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-50/80 text-emerald-800 border border-emerald-200/80'
                  }`}
                >
                  <TreePine className="w-3 h-3 text-emerald-500" />
                  <span>Karura Forest Reserve</span>
                </div>
              </div>

              {/* Nairobi National Park label */}
              <div
                className="absolute text-center pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '68%', top: '88%' }}
              >
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-xs ${
                    mapTheme === 'satellite'
                      ? 'bg-amber-950/50 text-amber-300 border border-amber-500/30'
                      : 'bg-amber-50/80 text-amber-900 border border-amber-200'
                  }`}
                >
                  <span>🦁 Nairobi National Park Wildlife Sanctuary</span>
                </div>
              </div>

              {/* Central Business District / KICC Reference Marker */}
              <div
                className="absolute text-center pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '58%', top: '48%' }}
              >
                <div
                  className={`px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${
                    mapTheme === 'satellite'
                      ? 'bg-neutral-800/80 text-neutral-300 border border-neutral-700'
                      : 'bg-white/80 text-neutral-600 border border-neutral-200'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>Nairobi CBD • KICC</span>
                </div>
              </div>

              {/* Highway Route Badges */}
              {showHighways && (
                <>
                  <div
                    className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: '68%', top: '65%' }}
                  >
                    <span className="text-[9px] font-mono font-bold text-amber-600 bg-white/70 px-1 rounded shadow-2xs border border-amber-200">
                      Nairobi Expressway
                    </span>
                  </div>
                  <div
                    className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: '26%', top: '78%' }}
                  >
                    <span className="text-[9px] font-mono font-bold text-sky-700 bg-white/70 px-1 rounded shadow-2xs border border-sky-200">
                      Southern Bypass
                    </span>
                  </div>
                </>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* NEIGHBOURHOOD WATERMARK HEADINGS */}
          {/* ======================================================== */}
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: '24%', top: '60%' }}
          >
            <span
              className={`text-xs font-serif font-bold tracking-widest uppercase opacity-40 ${
                mapTheme === 'satellite' ? 'text-white' : 'text-[#8C827A]'
              }`}
            >
              KAREN & HARDY
            </span>
          </div>

          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: '48%', top: '29%' }}
          >
            <span
              className={`text-xs font-serif font-bold tracking-widest uppercase opacity-40 ${
                mapTheme === 'satellite' ? 'text-white' : 'text-[#8C827A]'
              }`}
            >
              WESTLANDS & PARKLANDS
            </span>
          </div>

          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: '55%', top: '13%' }}
          >
            <span
              className={`text-xs font-serif font-bold tracking-widest uppercase opacity-40 ${
                mapTheme === 'satellite' ? 'text-white' : 'text-[#8C827A]'
              }`}
            >
              GIGIRI & RUNDA
            </span>
          </div>

          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: '39%', top: '44%' }}
          >
            <span
              className={`text-xs font-serif font-bold tracking-widest uppercase opacity-40 ${
                mapTheme === 'satellite' ? 'text-white' : 'text-[#8C827A]'
              }`}
            >
              LAVINGTON & KILIMANI
            </span>
          </div>

          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: '33%', top: '25%' }}
          >
            <span
              className={`text-xs font-serif font-bold tracking-widest uppercase opacity-40 ${
                mapTheme === 'satellite' ? 'text-white' : 'text-[#8C827A]'
              }`}
            >
              LORESHO
            </span>
          </div>

          {/* ======================================================== */}
          {/* INTERACTIVE RESTAURANT PINS */}
          {/* ======================================================== */}
          {filteredRestaurants.map((restaurant) => {
            const isSelected = selectedRestaurantId === restaurant.id;
            const isHovered = hoveredRestaurantId === restaurant.id;
            const isFocused = focusedRestaurantId === restaurant.id;
            const isHighlighted = isSelected || isHovered || isFocused;

            // Pick icon based on vibes
            let PinIcon = Utensils;
            if (restaurant.vibes.includes('Rooftop Bars')) PinIcon = Wine;
            if (restaurant.vibes.includes('Steakhouses')) PinIcon = Flame;

            return (
              <div
                key={restaurant.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                style={{
                  left: `${restaurant.coords.x}%`,
                  top: `${restaurant.coords.y}%`
                }}
                onMouseEnter={() => setHoveredRestaurantId(restaurant.id)}
                onMouseLeave={() => setHoveredRestaurantId(null)}
                onClick={() => {
                  setSelectedRestaurantId(restaurant.id);
                  if (onSelectRestaurant && isCompact) {
                    onSelectRestaurant(restaurant);
                  }
                }}
              >
                {/* Pulsing ring when active or selected */}
                {isHighlighted && (
                  <span className="absolute -inset-2.5 rounded-full bg-[#9E3319] opacity-35 animate-ping pointer-events-none" />
                )}

                {/* Pin Container */}
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full border shadow-md transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-[#9E3319] text-white border-white scale-110 z-30 ring-4 ring-[#9E3319]/25'
                      : mapTheme === 'satellite'
                      ? 'bg-[#1E232A]/90 text-white border-white/20 hover:border-[#9E3319] hover:scale-105'
                      : 'bg-white text-[#1F1C1B] border-[#EDE8DF] hover:border-[#9E3319] hover:scale-105'
                  }`}
                >
                  <PinIcon
                    className={`w-3 h-3 ${isHighlighted ? 'text-white' : 'text-[#9E3319]'}`}
                  />
                  <span className="text-[11px] font-bold whitespace-nowrap">
                    {restaurant.name.split(' ')[0]}
                  </span>
                  {showPriceTags && (
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                        isHighlighted
                          ? 'bg-black/30 text-white'
                          : mapTheme === 'satellite'
                          ? 'bg-white/10 text-neutral-300'
                          : 'bg-[#FAF7F2] text-[#8C827A]'
                      }`}
                    >
                      {restaurant.priceRange}
                    </span>
                  )}
                </div>

                {/* Downward triangle pointer */}
                <div
                  className={`w-0 h-0 mx-auto border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 transition-colors ${
                    isHighlighted
                      ? 'border-t-[#9E3319]'
                      : mapTheme === 'satellite'
                      ? 'border-t-[#1E232A]'
                      : 'border-t-white'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* MAP OVERLAY: FLOATING CONTROLS (Top Right) */}
        {/* ======================================================== */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
          <div
            className={`p-1 rounded-xl shadow-md border flex flex-col ${
              mapTheme === 'satellite' ? 'bg-[#1E232A]/90 border-white/10' : 'bg-white/95 border-[#EDE8DF]'
            }`}
          >
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#595149] hover:text-[#9E3319] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#595149] hover:text-[#9E3319] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#595149] hover:text-[#9E3319] hover:bg-[#FAF7F2] transition-colors cursor-pointer border-t border-[#EDE8DF]/60"
              title="Reset View"
              aria-label="Reset map"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAP OVERLAY: COMPASS ROSE & SCALE (Bottom Left) */}
        {/* ======================================================== */}
        <div className="absolute bottom-4 left-4 z-30 pointer-events-none hidden sm:flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-xl border shadow-xs backdrop-blur-md flex items-center gap-2 text-[10px] ${
              mapTheme === 'satellite'
                ? 'bg-[#15191E]/80 border-white/10 text-neutral-300'
                : 'bg-white/80 border-[#EDE8DF] text-[#6B655F]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-[#9E3319] transform rotate-45" />
            <span className="font-bold tracking-wider">NAIROBI GRID • 1:50,000</span>
            <span className="text-neutral-400">|</span>
            <span>Approx ~15km Urban Span</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAP OVERLAY: INTERACTIVE SELECTED VENUE PREVIEW CARD */}
        {/* ======================================================== */}
        {activeRestaurant && (
          <div className="absolute bottom-4 right-4 z-30 max-w-sm w-full animate-fade-in">
            <div
              className={`rounded-2xl p-4 shadow-xl border backdrop-blur-md transition-all ${
                mapTheme === 'satellite'
                  ? 'bg-[#1E232A]/95 border-white/15 text-white'
                  : 'bg-white/95 border-[#EDE8DF] text-[#1F1C1B]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Photo thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
                  <img
                    src={activeRestaurant.image}
                    alt={activeRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-2xs text-white text-[9px] font-mono px-1 rounded">
                    {activeRestaurant.priceRange}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E3319] truncate">
                      {activeRestaurant.neighbourhood} • {activeRestaurant.category}
                    </span>
                    <button
                      onClick={() => setSelectedRestaurantId(null)}
                      className="text-[#8C827A] hover:text-[#1F1C1B] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-bold truncate mt-0.5">
                    {activeRestaurant.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs mt-1">
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{activeRestaurant.rating}</span>
                    </div>
                    <span className="text-[#8C827A] text-[11px]">
                      ({activeRestaurant.reviewsCount} reviews)
                    </span>
                  </div>

                  {/* Proximity / driving estimate */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#6B655F] mt-1.5">
                    <Car className="w-3 h-3 text-[#9E3319] shrink-0" />
                    <span className="truncate">{activeRestaurant.driveTimeFromCBD}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-3 border-t border-[#EDE8DF]/50 flex items-center gap-2">
                {onSelectRestaurant && (
                  <button
                    onClick={() => onSelectRestaurant(activeRestaurant)}
                    className="flex-1 bg-[#FAF7F2] hover:bg-[#F2ECE4] text-[#1F1C1B] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#EDE8DF]"
                  >
                    <span>View Venue Page</span>
                    <ArrowRight className="w-3 h-3 text-[#9E3319]" />
                  </button>
                )}
                {onBookTable && (
                  <button
                    onClick={() => onBookTable(activeRestaurant)}
                    className="flex-1 bg-[#9E3319] hover:bg-[#852B15] text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Instant Reserve</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* SPATIAL NEIGHBOURHOOD QUICK DIRECTORY STRIP (Synchronized) */}
      {/* ======================================================== */}
      {!isCompact && (
        <div className="mt-4 pt-4 border-t border-[#EDE8DF]/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1F1C1B]">
                {currentDistrict.name} Directory
              </span>
              <span className="text-xs text-[#8C827A]">
                ({filteredRestaurants.length} mapped locations)
              </span>
            </div>
            <div className="text-xs text-[#8C827A] hidden sm:block">
              Click any venue pin to highlight and inspect driving route
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredRestaurants.slice(0, 4).map((restaurant) => {
              const isSelected = selectedRestaurantId === restaurant.id;
              return (
                <div
                  key={restaurant.id}
                  onClick={() => {
                    setSelectedRestaurantId(restaurant.id);
                    if (onSelectRestaurant) {
                      onSelectRestaurant(restaurant);
                    }
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#FAF3EE] border-[#9E3319] ring-2 ring-[#9E3319]/20'
                      : mapTheme === 'satellite'
                      ? 'bg-[#1E232A] border-white/10 hover:border-white/30'
                      : 'bg-white border-[#EDE8DF] hover:border-[#9E3319]/40 hover:shadow-xs'
                  }`}
                >
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#1F1C1B] truncate">
                        {restaurant.name}
                      </h4>
                      <span className="text-[10px] text-amber-500 font-bold flex items-center">
                        ★ {restaurant.rating}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B655F] truncate">
                      {restaurant.neighbourhood} • {restaurant.category}
                    </p>
                    <div className="flex items-center gap-1 text-[9px] text-[#8C827A] mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-[#9E3319]" />
                      <span className="truncate">{restaurant.driveTimeFromCBD}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
