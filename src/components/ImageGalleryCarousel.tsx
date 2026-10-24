import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Sparkles,
  Utensils,
  Wine,
  Compass,
  Layers,
  Check
} from 'lucide-react';
import { Restaurant } from '../data/diningData';

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Venue & Ambiance' | 'Signature Dishes' | 'Cocktails & Cellar' | 'Terrace & Views';
  caption: string;
}

interface ImageGalleryCarouselProps {
  restaurant: Restaurant;
}

// Curated high-resolution photo galleries per venue category/restaurant
const RESTAURANT_GALLERIES: Record<string, GalleryItem[]> = {
  'asiatic-rooftop': [
    {
      id: 'ar-1',
      url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1600&q=85',
      title: 'Panoramic Westlands Skyline Deck',
      category: 'Terrace & Views',
      caption: 'Suspended above the Nairobi sprawl with illuminated city views and firepit lounge seating.'
    },
    {
      id: 'ar-2',
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=85',
      title: 'Bincho-tan Charred Robata Wagyu Skewers',
      category: 'Signature Dishes',
      caption: 'Smoked over Japanese white oak bincho-tan charcoal with truffle tare and scallion glaze.'
    },
    {
      id: 'ar-3',
      url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=85',
      title: 'Artisanal Nigiri & Salmon Crispy Rice',
      category: 'Signature Dishes',
      caption: 'Direct-flown Norwegian salmon, spicy ponzu pearls, micro shiso on toasted sushi rice.'
    },
    {
      id: 'ar-4',
      url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=85',
      title: 'Nairobi Twilight Smoked Highball',
      category: 'Cocktails & Cellar',
      caption: 'Single-estate Kenyan highland gin, cold-pressed passionfruit, and charred rosemary smoke.'
    },
    {
      id: 'ar-5',
      url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=85',
      title: 'Sunset DJ Lounge & Heated Perimeter Deck',
      category: 'Venue & Ambiance',
      caption: 'All-weather heated glass railings and ambient sound system for Nairobi twilight hours.'
    },
    {
      id: 'ar-6',
      url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1600&q=85',
      title: 'Handcrafted Steamed Duck Bao Buns',
      category: 'Signature Dishes',
      caption: 'Hoisin roasted duck breast, cucumber ribbons, and pickled daikon in pillowy steamed lotus buns.'
    }
  ],
  'talisman': [
    {
      id: 'tal-1',
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85',
      title: 'Lush Candlelit Karen Garden Veranda',
      category: 'Terrace & Views',
      caption: 'Dine among flowering bougainvillea and mature fever trees wrapped in warm lantern glow.'
    },
    {
      id: 'tal-2',
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85',
      title: 'Legendary Feta & Coriander Samosas',
      category: 'Signature Dishes',
      caption: 'The 1998 house original served with homemade Karen sweet ginger chilli reduction.'
    },
    {
      id: 'tal-3',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
      title: 'Fireside Pergola & Open Hearth Fires',
      category: 'Venue & Ambiance',
      caption: 'Carved Zanzibari daybeds and crackling acacia wood fires for cool Karen evenings.'
    },
    {
      id: 'tal-4',
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85',
      title: 'Zanzibar Seafood Curry with Saffron Rice',
      category: 'Signature Dishes',
      caption: 'Fresh Indian Ocean catch braised gently in spiced Swahili coconut cream and lime.'
    },
    {
      id: 'tal-5',
      url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=85',
      title: 'Classic Hand-Muddled Talisman Dawa',
      category: 'Cocktails & Cellar',
      caption: 'Highland Kenyan vodka, organic wild acacia honey, and crushed whole fresh limes.'
    },
    {
      id: 'tal-6',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      title: 'Kitengela Art Glass & Rustic Bohemian Saloon',
      category: 'Venue & Ambiance',
      caption: 'Eclectic artistic interior adorned with blown glass chandeliers and antique kilims.'
    }
  ]
};

// Fallback high-resolution photos for other venues
const DEFAULT_GALLERY = (res: Restaurant): GalleryItem[] => [
  {
    id: 'def-1',
    url: res.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    title: `${res.name} — Main Dining Experience`,
    category: 'Venue & Ambiance',
    caption: `Prime seating in ${res.neighbourhood} offering authentic ${res.category} hospitality.`
  },
  {
    id: 'def-2',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
    title: 'Woodfired Grill & Signature Cuts',
    category: 'Signature Dishes',
    caption: 'Chef-crafted seasonal tasting plates prepared over fragrant native hardwood charcoal.'
  },
  {
    id: 'def-3',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85',
    title: 'Fresh Market Harvest & Artisanal Plating',
    category: 'Signature Dishes',
    caption: 'Hyper-seasonal regional ingredients paired with aromatic African and global flavours.'
  },
  {
    id: 'def-4',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=85',
    title: 'Botanical Craft Cocktails & Sommelier Pairings',
    category: 'Cocktails & Cellar',
    caption: 'Signature mixology program infused with local citrus, honey, and imported fine vintages.'
  },
  {
    id: 'def-5',
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=85',
    title: 'Al Fresco Terrace & Evening Ambiance',
    category: 'Terrace & Views',
    caption: 'Candlelit tables, garden pergolas, and sweeping views of the surrounding district.'
  },
  {
    id: 'def-6',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85',
    title: 'Private Gathering & Dining Spaces',
    category: 'Venue & Ambiance',
    caption: 'Intimate settings for celebrations, anniversaries, and executive dinners.'
  }
];

export const ImageGalleryCarousel: React.FC<ImageGalleryCarouselProps> = ({ restaurant }) => {
  const photos: GalleryItem[] = RESTAURANT_GALLERIES[restaurant.id] || DEFAULT_GALLERY(restaurant);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  // Keep index within bounds if category changes
  const activeIndex = currentIndex >= filteredPhotos.length ? 0 : currentIndex;
  const currentPhoto = filteredPhotos[activeIndex] || photos[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, filteredPhotos.length]);

  // Touch Swipe Handlers (Mobile & Tablet)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Mouse Drag Handlers (Desktop Swiping)
  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    const distance = mouseStartX - e.clientX;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    setIsMouseDown(false);
    setMouseStartX(null);
  };

  const categories = ['All', 'Venue & Ambiance', 'Signature Dishes', 'Terrace & Views', 'Cocktails & Cellar'];

  return (
    <div className="w-full space-y-3.5 select-none">
      
      {/* Top Filter Chips & Photos Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' ? photos.length : photos.filter(p => p.category === cat).length;
            if (cat !== 'All' && count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F1C1B] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#595149] border border-[#EDE8DF] hover:border-[#9E3319]/40'
                }`}
              >
                <span>{cat}</span>
                <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#9E3319] hover:text-[#852912] transition-colors cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>View All {photos.length} High-Res Photos</span>
        </button>
      </div>

      {/* Main Image Carousel Frame (Swipeable) */}
      <div
        className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden bg-neutral-900 shadow-md border border-[#EDE8DF] cursor-grab active:cursor-grabbing group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        {/* Active High-Quality Image */}
        <img
          key={currentPhoto.id}
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className="w-full h-full object-cover transition-opacity duration-300 animate-in fade-in"
          draggable={false}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

        {/* Top-Left: Category Tag & Caption */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 pointer-events-none z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{currentPhoto.category}</span>
          </div>
        </div>

        {/* Top-Right: Photo Counter & Fullscreen Trigger */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide">
            {activeIndex + 1} / {filteredPhotos.length}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="p-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-lg cursor-pointer z-10 group-hover:scale-105 active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-lg cursor-pointer z-10 group-hover:scale-105 active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Banner with Title & Description */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white pointer-events-none">
          <div className="max-w-xl space-y-1">
            <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {currentPhoto.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 drop-shadow-sm font-light">
              {currentPhoto.caption}
            </p>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {filteredPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  activeIndex === idx 
                    ? 'w-7 bg-white shadow-xs' 
                    : 'w-2 bg-white/45 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Swipe hint for first-time visitors */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/35 backdrop-blur-xs text-[10px] text-white/75 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Drag or use arrow keys to swipe photos</span>
        </div>
      </div>

      {/* Interactive Thumbnail Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {filteredPhotos.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                isSelected 
                  ? 'border-[#9E3319] ring-2 ring-[#9E3319]/30 scale-[1.02] shadow-sm' 
                  : 'border-transparent opacity-75 hover:opacity-100 hover:border-neutral-300'
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`} />
              <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] text-white font-medium truncate drop-shadow-xs">
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10 z-20" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg font-bold">
                {restaurant.name}
              </span>
              <span className="text-xs text-neutral-400">·</span>
              <span className="text-xs text-neutral-300">
                Photo {activeIndex + 1} of {filteredPhotos.length}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 my-auto overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            />

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer with Caption and Mini Thumbnails */}
          <div className="space-y-3 z-20" onClick={(e) => e.stopPropagation()}>
            <div className="text-center text-white">
              <h4 className="font-serif text-lg font-semibold">{currentPhoto.title}</h4>
              <p className="text-xs text-neutral-400 max-w-lg mx-auto mt-0.5">{currentPhoto.caption}</p>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
              {filteredPhotos.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeIndex === idx ? 'border-[#E0532B] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
