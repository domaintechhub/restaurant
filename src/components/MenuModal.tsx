import React, { useState } from 'react';
import { X, BookOpen, Utensils, Wine, Award, Sparkles } from 'lucide-react';
import { Restaurant, MenuItem } from '../data/diningData';

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onReserve: (restaurant: Restaurant) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  restaurant,
  onClose,
  onReserve
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  if (!restaurant) return null;

  const defaultItems: MenuItem[] = restaurant.menuItems || [
    { name: 'Chef Signature Tasting Trio', category: 'Starters', priceKes: 2200, description: 'Handcrafted seasonal trio with tamarind glaze, crispy shallots, and fresh garden herbs.' },
    { name: 'Flame-Seared Prime Cut (300g)', category: 'Mains & Grills', priceKes: 3600, description: 'Charcoal grilled local highland beef with roasted garlic marrow butter and truffle jus.' },
    { name: 'Nairobi Botanical Elixir', category: 'Craft Cocktails', priceKes: 1400, description: 'Single-estate Kenyan gin, passion fruit reduction, tonic, charred rosemary.' },
    { name: 'Warm Baobab Tartlet', category: 'Desserts', priceKes: 1100, description: 'Single-origin dark chocolate, baobab fruit curd, vanilla bean crumble.' }
  ];

  const categories = ['All', 'Starters', 'Mains & Grills', 'Craft Cocktails', 'Desserts'];

  const filteredItems = activeTab === 'All' 
    ? defaultItems 
    : defaultItems.filter(item => item.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EDE8DF] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#EDE8DF] flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#9E3319]/10 text-[#9E3319] text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curated Menu Preview</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1F1C1B]">
              {restaurant.name}
            </h3>
            <p className="text-sm text-[#78716C] mt-1">
              Prices in Kenyan Shillings (KES). Sourced with local organic ingredients and artisanal techniques.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-[#EDE8DF] bg-white flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#1F1C1B] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#595149] hover:bg-neutral-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE8DF] hover:border-[#9E3319]/30 transition-colors flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-base font-serif font-bold text-[#1F1C1B]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#78716C] mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-semibold text-[#9E3319] font-mono">
                    KES {item.priceKes.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="p-5 bg-white border-t border-[#EDE8DF] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Seasonal menu updated this week</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onReserve(restaurant);
            }}
            className="w-full sm:w-auto bg-[#9E3319] hover:bg-[#852912] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm cursor-pointer"
          >
            Reserve Table at {restaurant.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
};
