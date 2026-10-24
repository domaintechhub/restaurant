export interface Restaurant {
  id: string;
  name: string;
  subName?: string;
  neighbourhood: string;
  category: string;
  priceRange: string;
  rating: number;
  reviewsCount: number;
  highlightTag: string;
  tagColor?: string;
  image: string;
  description: string;
  vibes: string[];
  cuisines: string[];
  features?: string[];
  menuItems?: MenuItem[];
}

export interface MenuItem {
  name: string;
  category: 'Starters' | 'Mains & Grills' | 'Craft Cocktails' | 'Desserts';
  priceKes: number;
  description: string;
  dietary?: string;
}

export interface CuisineCategory {
  id: string;
  title: string;
  tag: string;
  venueCount: number;
  locations: string;
  description: string;
  exploreText: string;
  image: string;
}

export interface RestaurantType {
  id: string;
  title: string;
  venueCountText: string;
  description: string;
  iconName: string;
  featuredNames: string;
  accentBg: string;
  iconColor: string;
}

export interface EventItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  footerText: string;
  ctaText: string;
  iconType: string;
  theme: 'dark' | 'light';
  accentColor?: string;
}

// 1. SKYLINE ROOFTOPS DATA
export const SKYLINE_RESTAURANTS: Restaurant[] = [
  {
    id: 'asiatic-rooftop',
    name: 'Asiatic Rooftop Bar & Restaurant',
    neighbourhood: 'WESTLANDS',
    category: 'ROBATA & PAN-ASIAN',
    priceRange: '$$$',
    rating: 4.8,
    reviewsCount: 184,
    highlightTag: 'Live DJ Fri',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=80',
    description: 'Craft mixology, fresh nigiri & bao buns framed against sweeping views of Nairobi skyline.',
    vibes: ['Rooftop Bars', 'Nightlife', 'Live DJ', 'Scenic Views'],
    cuisines: ['Pan-Asian & Robata', 'Cocktails'],
    features: ['Panoramic Skyline Deck', 'Signature Dawa Highballs', 'Omakase Counter'],
    menuItems: [
      { name: 'Wagyu Beef Robata Skewers', category: 'Mains & Grills', priceKes: 3400, description: 'Bincho-tan charred A5 strip with black truffle tare and scallion glaze.' },
      { name: 'Truffle & Salmon Crispy Rice', category: 'Starters', priceKes: 1850, description: 'Seared Atlantic salmon, spicy mayo, ponzu pearls, micro shiso.' },
      { name: 'Nairobi Twilight Cocktail', category: 'Craft Cocktails', priceKes: 1450, description: 'Kenyan highland gin, passion fruit reduction, butterfly pea tea, smoked rosemary.' },
      { name: 'Matcha Fondant with Baobab Gelato', category: 'Desserts', priceKes: 1200, description: 'Molten green tea core, toasted sesame crumble, tart baobab sorbet.' }
    ]
  },
  {
    id: 'horizon-rooftop',
    name: 'Horizon Rooftop Restaurant & Bar',
    neighbourhood: 'GIGIRI',
    category: 'LOUNGE & BAR',
    priceRange: '$$$',
    rating: 4.7,
    reviewsCount: 142,
    highlightTag: 'Sunset Vibe',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    description: 'Open-air lounge deck, ambient chillout house, signature smoked cocktails, and sunset tapas.',
    vibes: ['Rooftop Bars', 'Sunset Views', 'Romantic', 'Chillout'],
    cuisines: ['International', 'Tapas & Small Plates'],
    features: ['Sunset Golden Hour Specials', 'Private Cabanas', 'Acoustic Sessions'],
    menuItems: [
      { name: 'Smoked Tamarind Pork Riblets', category: 'Mains & Grills', priceKes: 2800, description: 'Slow-smoked over acacia wood with Kilifi tamarind glaze and toasted peanuts.' },
      { name: 'Crispy Calamari with Harissa Aioli', category: 'Starters', priceKes: 1650, description: 'Line-caught Indian Ocean calamari dusted in spiced cornmeal.' },
      { name: 'Gigiri Golden Hour Spritz', category: 'Craft Cocktails', priceKes: 1350, description: 'Aperol, crisp prosecco, blood orange liqueur, cold-pressed grapefruit.' },
      { name: 'Passionfruit Panna Cotta', category: 'Desserts', priceKes: 1100, description: 'Velvety vanilla bean cream topped with Naivasha passion curd.' }
    ]
  },
  {
    id: 'troy-mediterranean',
    name: 'Troy Mediterranean Mezze & Roof',
    neighbourhood: 'WESTLANDS',
    category: 'MEDITERRANEAN MEZZE',
    priceRange: '$$$',
    rating: 4.9,
    reviewsCount: 210,
    highlightTag: 'Terrace Dining',
    tagColor: 'bg-orange-50 text-orange-800 border-orange-200',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    description: 'Greek souvlaki platters, woodfired flatbreads, and aromatic herb cocktails on an olive terrace.',
    vibes: ['Rooftop Bars', 'Outdoor Dining', 'Casual Chic', 'Date Night'],
    cuisines: ['French & Mediterranean', 'Greek'],
    features: ['Olive Tree Garden Terrace', 'Charcoal Pit', 'Bespoke Wine Flights'],
    menuItems: [
      { name: 'Wood-Fired Lamb Kleftiko', category: 'Mains & Grills', priceKes: 3200, description: '12-hour braised Mt. Kenya lamb shanks with oregano potatoes and feta jus.' },
      { name: 'Grand Mezze Platter', category: 'Starters', priceKes: 2200, description: 'Tirokafteri, charred aubergine dip, warm pita, Kalamata olives, falafel.' },
      { name: 'Aegean Herbal Mule', category: 'Craft Cocktails', priceKes: 1400, description: 'Mastika liqueur, lime juice, spicy ginger beer, fresh garden thyme.' },
      { name: 'Pistachio & Orange Blossom Baklava', category: 'Desserts', priceKes: 1250, description: 'Crisp layered filo, crushed Iranian pistachios, spiced honey syrup.' }
    ]
  },
  {
    id: '270-rooftop',
    name: '270° Rooftop',
    neighbourhood: 'WESTLANDS',
    category: 'PANORAMIC BAR',
    priceRange: '$$$',
    rating: 4.6,
    reviewsCount: 98,
    highlightTag: 'Heated Deck',
    tagColor: 'bg-rose-50 text-rose-800 border-rose-200',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
    description: 'Unrivaled 270-degree horizon views, international bites, late night lounge vibes with firepits.',
    vibes: ['Rooftop Bars', 'Late Night', 'Cocktails', 'Firepits'],
    cuisines: ['Steakhouses', 'International', 'Tapas'],
    features: ['Heated Glass Perimeter', 'Fire Pit Tables', 'Champagne Bar'],
    menuItems: [
      { name: 'Prime Aged Ribeye (350g)', category: 'Mains & Grills', priceKes: 4200, description: '35-day dry aged Morendat beef with bone marrow butter and truffle fries.' },
      { name: 'Yellowfin Tuna Tartare', category: 'Starters', priceKes: 1950, description: 'Avocado mousse, sesame ginger dressing, lotus root crisps.' },
      { name: 'Skyline Negroni', category: 'Craft Cocktails', priceKes: 1500, description: 'Smoked barrel-aged botanical gin, Campari, sweet vermouth, flamed orange peel.' },
      { name: 'Dark Chocolate Lava Cake', category: 'Desserts', priceKes: 1300, description: 'Single origin Tanzanian cocoa, vanilla gelato, salted caramel drizzle.' }
    ]
  }
];

// 2. CUISINE CATEGORIES DATA
export const CUISINE_CATEGORIES: CuisineCategory[] = [
  {
    id: 'swahili-coastal',
    title: 'Swahili & Coastal',
    tag: 'COASTAL HERITAGE',
    venueCount: 18,
    locations: 'Karen & Westlands',
    description: 'Fresh coconut curries, tamarind-glazed seafood, Kilifi crab, and fragrant saffron pilau.',
    exploreText: 'Explore coastal spots',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'pan-asian-robata',
    title: 'Pan-Asian & Robata',
    tag: 'ROBATA & IZAKAYA',
    venueCount: 26,
    locations: 'Westlands & Gigiri',
    description: 'Bincho-tan skewers, melt-in-mouth sashimi, bao buns, and aromatic Thai curries.',
    exploreText: 'Explore pan-Asian spots',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'italian-neapolitan',
    title: 'Italian & Neapolitan',
    tag: 'WOODFIRED PIZZERIA',
    venueCount: 31,
    locations: 'Karen & Lavington',
    description: '48-hour fermented sourdough pizzas, hand-rolled pasta, burrata, and Tuscan wines.',
    exploreText: 'Explore Italian trattorias',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'nyama-choma',
    title: 'Nyama Choma & Koroga',
    tag: 'KENYAN FIRE & EMBER',
    venueCount: 22,
    locations: 'Citywide',
    description: 'Open-flame slow-roasted goat ribs, spicy Koroga stews cooked al fresco, kachumbari.',
    exploreText: 'Explore choma spots',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'ethiopian-eritrean',
    title: 'Ethiopian & Eritrean',
    tag: 'HORN OF AFRICA',
    venueCount: 15,
    locations: 'Kilimani & CBD',
    description: 'Teff injera platters, berbere-spiced tibs, doro wat, and aromatic coffee ceremonies.',
    exploreText: 'Explore Ethiopian tables',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'french-mediterranean',
    title: 'French & Mediterranean',
    tag: 'BISTRO & CELLAR',
    venueCount: 19,
    locations: 'Lavington & Gigiri',
    description: 'Bistro classics, duck confit, fresh mezze spreads, and artisanal cellar pairings.',
    exploreText: 'Explore French bistros',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80'
  }
];

// 3. RESTAURANT TYPES
export const RESTAURANT_TYPES: RestaurantType[] = [
  {
    id: 'cozy-cafes',
    title: 'Cozy Cafes & Roasteries',
    venueCountText: '28+ Venues',
    description: 'Single-origin Kenyan coffee, quiet leafy courtyards, work-friendly Wi-Fi.',
    iconName: 'Coffee',
    featuredNames: 'Spring Nosh-ery, Barista & Co., Was...',
    accentBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#C2410C]'
  },
  {
    id: 'dog-friendly',
    title: 'Dog-Friendly Garden Patios',
    venueCountText: '24+ Venues',
    description: 'Expansive lawns, water bowls & artisan biscuits for your four-legged companions.',
    iconName: 'PawPrint',
    featuredNames: 'Talisman, Pallet Cafe, The Fig & Oli...',
    accentBg: 'bg-[#F0FDF4]',
    iconColor: 'text-[#15803D]'
  },
  {
    id: 'chefs-table',
    title: "Intimate Chef's Table & Fine Dining",
    venueCountText: '14+ Venues',
    description: 'Multi-course tasting menus, bespoke pairings, open kitchen theatre.',
    iconName: 'UtensilsCrossed',
    featuredNames: 'Ate, Jiko, Chophouse',
    accentBg: 'bg-[#FEFCE8]',
    iconColor: 'text-[#A16207]'
  },
  {
    id: 'cocktail-speakeasies',
    title: 'Cocktail Bars & Speakeasies',
    venueCountText: '19+ Venues',
    description: 'Botanical mixology, bespoke ice, vinyl grooves & skyline sunsets.',
    iconName: 'Wine',
    featuredNames: 'Hero, Jekyll & Hyde, The General',
    accentBg: 'bg-[#FFF1F2]',
    iconColor: 'text-[#BE123C]'
  },
  {
    id: 'open-air-koroga',
    title: 'Open-Air Koroga & BBQ Bandas',
    venueCountText: '16+ Venues',
    description: 'Cook your own curry bands, wood embers, weekend communal feasts.',
    iconName: 'Flame',
    featuredNames: 'The Hide, Parklands Bandas',
    accentBg: 'bg-[#FFFBEB]',
    iconColor: 'text-[#B45309]'
  },
  {
    id: 'wine-bars',
    title: 'Wine Bars & European Cellars',
    venueCountText: '12+ Venues',
    description: 'Sommelier-curated flights, artisanal charcuterie, natural & biodynamic pours.',
    iconName: 'GlassWater',
    featuredNames: 'Le Bar à Vin, Cave à Manger',
    accentBg: 'bg-[#FAF5FF]',
    iconColor: 'text-[#7E22CE]'
  }
];

// 4. NEIGHBOURHOOD GUIDES
export interface DistrictGuide {
  id: string;
  tabLabel: string;
  restaurants: Restaurant[];
}

export const DISTRICT_GUIDES: DistrictGuide[] = [
  {
    id: 'karen-hardy',
    tabLabel: 'Karen & Hardy',
    restaurants: [
      {
        id: 'talisman',
        name: 'Talisman',
        neighbourhood: 'KAREN',
        category: 'CULT CLASSIC',
        priceRange: '$$$',
        rating: 4.9,
        reviewsCount: 420,
        highlightTag: 'Dog Friendly',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
        description: 'Eclectic African, pan-Asian and Mediterranean plates served in serene, candlelit Karen gardens.',
        vibes: ['Garden Dining', 'Romantic', 'Pet Friendly'],
        cuisines: ['Pan-Asian', 'African Fusion', 'Mediterranean'],
        features: ['Dog Friendly', 'Fireplace'],
        menuItems: [
          { name: 'Famous Feta & Coriander Samosas', category: 'Starters', priceKes: 1100, description: 'Crisp handmade pastry with spicy ginger-chilli dip.' },
          { name: 'Wasabi Crab Cakes with Avocado Tartar', category: 'Starters', priceKes: 1950, description: 'Lamu white crab, pickled ginger, sesame crisp.' },
          { name: 'Zanzibar Seafood Curry', category: 'Mains & Grills', priceKes: 2950, description: 'Simmered in rich spiced coconut cream with saffron basmati.' },
          { name: 'Talisman Signature Dawa', category: 'Craft Cocktails', priceKes: 1250, description: 'Kenyan vodka, crushed whole lime, pure organic acacia honey.' }
        ]
      },
      {
        id: 'cultiva',
        name: 'Cultiva',
        neighbourhood: 'KAREN',
        category: 'FARM TO FORK',
        priceRange: '$$$',
        rating: 4.8,
        reviewsCount: 310,
        highlightTag: 'Artisan Smoker',
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80',
        description: 'Artisanal farm-to-table cuisine driven by hyper-seasonal ingredients harvested directly from Kenyan soil.',
        vibes: ['Farm to Table', 'Artisanal', 'Outdoor Courtyard'],
        cuisines: ['Ecuadorian Fusion', 'Contemporary Kenyan', 'Smoked Meats'],
        features: ['Artisan Smoker', 'Garden Dining'],
        menuItems: [
          { name: 'Smoked Heirloom Beet Tartare', category: 'Starters', priceKes: 1450, description: 'Cultiva garden beets, smoked goat cheese mousse, roasted sunflower seed praline.' },
          { name: 'Wild Sea Bass Ceviche with Tamarillo Tigre', category: 'Starters', priceKes: 1850, description: 'Fresh Indian Ocean sea bass cured in tree-tomato leche de tigre.' },
          { name: 'Smoked Brisket 14-Hour Fire Cooked', category: 'Mains & Grills', priceKes: 3100, description: 'Served with charred green plantain puree and pickled garden shallots.' },
          { name: 'Spiced Naivasha Honeycomb Pavlova', category: 'Desserts', priceKes: 1150, description: 'Whipped mascarpone cream, passionfruit pulp, edible nasturtium blooms.' }
        ]
      },
      {
        id: 'hemingways-brasserie',
        name: 'The Brasserie | Hemingways',
        subName: 'The Brasserie | Hemi...',
        neighbourhood: 'KAREN',
        category: 'FINE DINING',
        priceRange: '$$$',
        rating: 4.9,
        reviewsCount: 260,
        highlightTag: 'Ngong Hills View',
        image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=900&q=80',
        description: 'Sophisticated contemporary European dining, prime Josper-grilled cuts, and fine vintage wine selections.',
        vibes: ['Fine Dining', 'Scenic Views', 'Elegant', 'Wine Cellar'],
        cuisines: ['European', 'Josper Grill', 'French'],
        features: ['Ngong Hills View', 'Sommelier'],
        menuItems: [
          { name: 'Josper-Grilled Morendat Ribeye', category: 'Mains & Grills', priceKes: 4400, description: 'Dry-aged Kenyan beef grilled over acacia lumpwood charcoal with béarnaise.' },
          { name: 'Lamu Lobster Thermidor', category: 'Mains & Grills', priceKes: 4800, description: 'Rich Gruyère and mustard velouté, herb crust, buttered asparagus.' },
          { name: 'French Onion Soup Gratinée', category: 'Starters', priceKes: 1550, description: 'Caramelised sweet onions, beef consommé, aged Gruyère sourdough.' },
          { name: 'Sommelier Reserve Wine Flight', category: 'Craft Cocktails', priceKes: 3500, description: 'Curated 4-glass flight of premier grand crus and South African gems.' }
        ]
      },
      {
        id: 'matteos',
        name: "Matteo's",
        neighbourhood: 'KAREN',
        category: 'PIZZERIA',
        priceRange: '$$$',
        rating: 4.7,
        reviewsCount: 380,
        highlightTag: 'Wood Oven',
        image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=900&q=80',
        description: 'Authentic Neapolitan woodfired pizzas, handcrafted pastas, and rustic outdoor courtyard warmth.',
        vibes: ['Italian', 'Family Friendly', 'Woodfired Oven'],
        cuisines: ['Italian & Neapolitan', 'Pasta', 'Pizza'],
        features: ['Wood Oven', 'Family Friendly'],
        menuItems: [
          { name: 'Pizza Diavola Napoletana', category: 'Mains & Grills', priceKes: 1950, description: 'San Marzano DOP tomatoes, fior di latte, spicy spianata calabrese, fresh basil.' },
          { name: 'Burrata Pugliese con Pomodorini', category: 'Starters', priceKes: 1800, description: 'Imported creamy burrata, slow-roasted cherry tomatoes, aged balsamic reduction.' },
          { name: 'Handmade Truffle Tagliolini', category: 'Mains & Grills', priceKes: 2450, description: 'Egg pasta tossed in cultured butter, parmesan broth, and shaved black truffle.' },
          { name: 'Classic Tiramisu Tradizionale', category: 'Desserts', priceKes: 1100, description: 'Savoiardi soaked in Kenyan espresso, mascarpone sabayon, dark cocoa.' }
        ]
      }
    ]
  },
  {
    id: 'westlands-parklands',
    tabLabel: 'Westlands & Parklands',
    restaurants: [
      {
        id: 'ankole-grill',
        name: 'Ankole Grill Senteu',
        neighbourhood: 'WESTLANDS',
        category: 'AFRICAN STEAKHOUSE',
        priceRange: '$$$',
        rating: 4.8,
        reviewsCount: 295,
        highlightTag: 'Live Jazz Sun',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        description: 'Celebrating African cattle heritage with premium prime cuts, artisanal biltong, and rich soul-infused sides.',
        vibes: ['Steakhouses', 'Jazz Music', 'Rustic Luxury'],
        cuisines: ['Steakhouses', 'African Grill'],
        features: ['Live Jazz', 'Whiskey Bar'],
        menuItems: [
          { name: '400g T-Bone Prime Steak', category: 'Mains & Grills', priceKes: 3800, description: 'Flame grilled with chimichurri and sukuma wiki creamed mash.' },
          { name: 'Oxtail Potjie Dumplings', category: 'Starters', priceKes: 1650, description: 'Slow-braised rich oxtail in steamed ginger-garlic bao dumplings.' }
        ]
      },
      {
        id: 'inti-nikkei',
        name: 'Inti - A Nikkei Experience',
        neighbourhood: 'WESTLANDS',
        category: 'JAPANESE-PERUVIAN',
        priceRange: '$$$$',
        rating: 4.9,
        reviewsCount: 340,
        highlightTag: '21st Floor View',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        description: 'Dramatic skyscraper dining combining intricate Japanese culinary discipline with vibrant Peruvian spices.',
        vibes: ['Luxury Dining', 'Skyline Panorama', 'Sensory Cocktails'],
        cuisines: ['Pan-Asian', 'Nikkei', 'Sushi'],
        features: ['Panoramic Deck', 'Sake Sommelier'],
        menuItems: [
          { name: 'Black Cod with White Miso', category: 'Mains & Grills', priceKes: 4600, description: 'Wild Alaskan cod marinated 72 hours in Saikyo miso.' }
        ]
      },
      {
        id: 'seven-seafood',
        name: 'Seven Seafood & Grill',
        neighbourhood: 'WESTLANDS',
        category: 'SEAFOOD BOUTIQUE',
        priceRange: '$$$',
        rating: 4.7,
        reviewsCount: 215,
        highlightTag: 'Oyster Bar',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
        description: 'Indian Ocean oysters, grilled king prawns, and signature spiced fish platters cooked to perfection.',
        vibes: ['Seafood', 'Cocktails', 'Cosmopolitan'],
        cuisines: ['Seafood', 'Grills'],
        features: ['Raw Oyster Bar', 'Champagne Flights'],
        menuItems: [
          { name: 'Grilled Jumbo Tiger Prawns', category: 'Mains & Grills', priceKes: 3600, description: 'Garlic peri-peri butter, charred lemon, and coconut pilau.' }
        ]
      },
      {
        id: 'the-alchemist',
        name: 'Brioche & Street Feast at Alchemist',
        neighbourhood: 'WESTLANDS',
        category: 'CRAFT & SOCIAL',
        priceRange: '$$',
        rating: 4.6,
        reviewsCount: 512,
        highlightTag: 'Night Market',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80',
        description: 'Vibrant outdoor creative hub with food trucks, artisanal smash burgers, craft beers and live DJ sets.',
        vibes: ['Vibrant', 'Outdoor Food Hub', 'Casual'],
        cuisines: ['Street Food', 'Burgers', 'Craft Beer'],
        features: ['Live Music', 'Craft Beer on Tap'],
        menuItems: [
          { name: 'Smash Double Wagyu Burger', category: 'Mains & Grills', priceKes: 1650, description: 'Aged cheddar, caramelized onion jam, brioche bun, house fries.' }
        ]
      }
    ]
  },
  {
    id: 'gigiri-muthaiga',
    tabLabel: 'Gigiri & Muthaiga',
    restaurants: [
      {
        id: 'lord-erroll',
        name: 'The Lord Erroll Gourmet',
        neighbourhood: 'RUNDA',
        category: 'HERITAGE FINE DINING',
        priceRange: '$$$$',
        rating: 4.9,
        reviewsCount: 310,
        highlightTag: 'Manicured Gardens',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        description: 'Historic fine-dining manor set amidst lush streams and manicured rose gardens in the diplomatic enclave.',
        vibes: ['Colonial Luxury', 'Garden Manor', 'Formal High Tea'],
        cuisines: ['French', 'Contemporary European'],
        features: ['High Tea Pavilion', 'Private Dining Rooms'],
        menuItems: [
          { name: 'Pan-Roasted Duck Breast', category: 'Mains & Grills', priceKes: 3900, description: 'Blackberry gastrique, parsnip puree, butter-glazed baby vegetables.' }
        ]
      },
      {
        id: 'about-thyme',
        name: 'About Thyme Restaurant',
        neighbourhood: 'GIGIRI',
        category: 'GARDEN BISTRO',
        priceRange: '$$$',
        rating: 4.8,
        reviewsCount: 460,
        highlightTag: 'Secluded Courtyard',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
        description: 'Charming leafy retreat popular with UN diplomats, serving creative eclectic brunch and comfort classics.',
        vibes: ['Garden Dining', 'Brunch Spot', 'Casual Elegance'],
        cuisines: ['Bistro', 'European', 'Vegetarian'],
        features: ['Fairy Light Canopy', 'Gluten-Free Specials'],
        menuItems: [
          { name: 'Pan-Fried Red Snapper fillet', category: 'Mains & Grills', priceKes: 2750, description: 'Lemony caper butter sauce, crushed baby potatoes, green beans.' }
        ]
      },
      {
        id: 'jiko-tribe',
        name: 'Jiko at Tribe Hotel',
        neighbourhood: 'GIGIRI',
        category: 'CONTEMPORARY GRILL',
        priceRange: '$$$$',
        rating: 4.8,
        reviewsCount: 190,
        highlightTag: 'Chef Tasting',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        description: 'Sensory African-inspired woodfired gastronomy celebrating regional produce with modern architectural flair.',
        vibes: ['Design Hotel', 'Boutique', 'Sommelier Selection'],
        cuisines: ['African Contemporary', 'Woodfire Grill'],
        features: ['Wine Vault', 'Art Gallery Setting'],
        menuItems: [
          { name: 'Josper-Seared Wild Grouper', category: 'Mains & Grills', priceKes: 3600, description: 'Coconut moringa reduction, cassava crisps, charred lime.' }
        ]
      },
      {
        id: 'muthaiga-country-bistro',
        name: 'The Safari Club Dining',
        neighbourhood: 'MUTHAIGA',
        category: 'BRITISH & CONTINENTAL',
        priceRange: '$$$',
        rating: 4.7,
        reviewsCount: 140,
        highlightTag: 'Fireplace & Books',
        image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=900&q=80',
        description: 'Refined colonial setting with mahogany panelling, library shelves, and classic slow-braised venison & beef.',
        vibes: ['Historic', 'Cozy Lounge', 'Club Dining'],
        cuisines: ['Continental', 'Steaks'],
        features: ['Open Fireplace', 'Fine Port Cellar'],
        menuItems: [
          { name: 'Braised Beef Short Ribs', category: 'Mains & Grills', priceKes: 3200, description: 'Rich red wine jus, truffle polenta, crispy leeks.' }
        ]
      }
    ]
  },
  {
    id: 'lavington-kilimani',
    tabLabel: 'Lavington & Kilimani',
    restaurants: [
      {
        id: 'pallet-cafe',
        name: 'Pallet Cafe Lavington',
        neighbourhood: 'LAVINGTON',
        category: 'COMMUNITY & ART',
        priceRange: '$$',
        rating: 4.8,
        reviewsCount: 390,
        highlightTag: 'Social Enterprise',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
        description: 'Vibrant garden haven empowering deaf staff, offering healthy sourdough toasts, fresh juices, and tranquil work areas.',
        vibes: ['Garden Cafe', 'Pet Friendly', 'Calm Work Spot'],
        cuisines: ['Cafe', 'Healthy & Organic'],
        features: ['Dog Friendly', 'Outdoor Studio'],
        menuItems: [
          { name: 'Avocado Tartine with Poached Organic Eggs', category: 'Starters', priceKes: 1100, description: 'House sourdough, chili flakes, whipped lemon ricotta.' }
        ]
      },
      {
        id: 'habesha-kilimani',
        name: 'Habesha Ethiopian Restaurant',
        neighbourhood: 'KILIMANI',
        category: 'AUTHENTIC ETHIOPIAN',
        priceRange: '$$',
        rating: 4.9,
        reviewsCount: 520,
        highlightTag: 'Coffee Ceremony',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80',
        description: 'Lush outdoor garden huts where guests gather for authentic communal injera feasts and fresh roasted coffee.',
        vibes: ['Communal Dining', 'Traditional Bandas', 'Rich Spices'],
        cuisines: ['Ethiopian & Eritrean'],
        features: ['Traditional Bandas', 'Live Coffee Roasting'],
        menuItems: [
          { name: 'Grand Habesha Special Tibs & Veg Combo', category: 'Mains & Grills', priceKes: 2400, description: 'Sizzling rosemary lamb tibs, misir wat, shiro, gomen, warm teff injera.' }
        ]
      },
      {
        id: 'mama-ashanti',
        name: 'Mama Ashanti West African',
        neighbourhood: 'LAVINGTON',
        category: 'WEST AFRICAN',
        priceRange: '$$',
        rating: 4.7,
        reviewsCount: 280,
        highlightTag: 'Jollof Specialists',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        description: 'Spicy Nigerian and Ghanaian classics including legendary smoky party jollof rice, egusi soup, and tender goat.',
        vibes: ['West African Feast', 'Leafy Garden', 'Family Friendly'],
        cuisines: ['African Fusion', 'Nigerian', 'Ghanaian'],
        features: ['Playground Garden', 'Spiced Hibiscus Zobo'],
        menuItems: [
          { name: 'Smoked Party Jollof with Grilled Croaker Fish', category: 'Mains & Grills', priceKes: 2200, description: 'Slow-cooked in fire tomato reduction with sweet fried plantains (kelewele).' }
        ]
      },
      {
        id: 'osteria-del-chianti',
        name: 'Osteria del Chianti',
        neighbourhood: 'KILIMANI',
        category: 'TUSCAN TRATTORIA',
        priceRange: '$$$',
        rating: 4.7,
        reviewsCount: 310,
        highlightTag: 'Homemade Gelato',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
        description: 'Long-standing Italian institution famous for fresh lobster linguine, Chianti wines, and artisanal pistachio gelato.',
        vibes: ['Italian Romance', 'Wine Cellar', 'Classic Trattoria'],
        cuisines: ['Italian & Neapolitan', 'Seafood'],
        features: ['Gelateria Counter', 'Terrace Pergola'],
        menuItems: [
          { name: 'Linguine all’Aragosta', category: 'Mains & Grills', priceKes: 3200, description: 'Fresh egg pasta with sautéed rock lobster, cherry tomatoes, and white wine.' }
        ]
      }
    ]
  },
  {
    id: 'loresho-kyuna',
    tabLabel: 'Loresho & Kyuna',
    restaurants: [
      {
        id: 'shamba-cafe',
        name: 'Shamba Cafe & Shop',
        neighbourhood: 'LORESHO',
        category: 'ORGANIC FARM CAFE',
        priceRange: '$$$',
        rating: 4.9,
        reviewsCount: 440,
        highlightTag: 'Woodfire & Farm',
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80',
        description: 'Eco-conscious green sanctuary in Loresho with organic farm shop, stone pizza oven, and weekend farmer markets.',
        vibes: ['Farm to Table', 'Family Friendly', 'Sunny Lawn'],
        cuisines: ['Organic', 'Pizza & Grill', 'Brunch'],
        features: ['Farm Animals', 'Artisan Bakery'],
        menuItems: [
          { name: 'Shamba Farm-Fresh Green Bowl', category: 'Starters', priceKes: 1350, description: 'Harvested morning leaves, avocado, toasted pumpkin seeds, tahini-lime dressing.' }
        ]
      },
      {
        id: 'wasp-sprout',
        name: 'Wasp & Sprout',
        neighbourhood: 'LORESHO',
        category: 'UPCYCLED CAFE',
        priceRange: '$$',
        rating: 4.8,
        reviewsCount: 290,
        highlightTag: 'Artisanal Roastery',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
        description: 'Bohemian cafe styled with repurposed furniture, serving Kenyan single-origin beans and all-day shakshuka.',
        vibes: ['Hipster Cafe', 'Artisan Coffee', 'Creative Workspace'],
        cuisines: ['Cafe', 'Breakfast & Brunch'],
        features: ['Pour-Over Bar', 'Handmade Furniture Shop'],
        menuItems: [
          { name: 'Spicy Harissa & Feta Shakshuka', category: 'Mains & Grills', priceKes: 1250, description: 'Baked free-range eggs, cumin-tomato sugo, grilled sourdough slices.' }
        ]
      },
      {
        id: 'boho-eatery',
        name: 'Boho Eatery Forest Gate',
        neighbourhood: 'KYUNA',
        category: 'BOTANICAL EATERY',
        priceRange: '$$$',
        rating: 4.8,
        reviewsCount: 220,
        highlightTag: 'Vegan Friendly',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        description: 'Plant-forward culinary sanctuary tucked inside green gardens, known for colorful nourish bowls and superfood lattes.',
        vibes: ['Boho Chic', 'Healthy Dining', 'Lush Greenhouse'],
        cuisines: ['Vegetarian & Vegan', 'Asian Fusion'],
        features: ['Plant-Based Desserts', 'Cold-Pressed Bar'],
        menuItems: [
          { name: 'Balinese Coconut Tempeh Bowl', category: 'Mains & Grills', priceKes: 1850, description: 'Crisp tempeh, turmeric rice, pickled cucumber ribbons, peanut sambal.' }
        ]
      },
      {
        id: 'kyuna-terrace',
        name: 'The Kyuna Deck & Grill',
        neighbourhood: 'KYUNA',
        category: 'RESIDENTIAL HIDEAWAY',
        priceRange: '$$$',
        rating: 4.7,
        reviewsCount: 160,
        highlightTag: 'Valley Vista',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
        description: 'Hidden hillside haven overlooking the Kyuna river valley, serving charcoal-smoked trout and crisp sauvignon blanc.',
        vibes: ['Secluded', 'Sundowners', 'Scenic Lawn'],
        cuisines: ['Grill & BBQ', 'Continental'],
        features: ['Valley Sunset View', 'Private Gazebos'],
        menuItems: [
          { name: 'Charcoal Naivasha Rainbow Trout', category: 'Mains & Grills', priceKes: 2600, description: 'Stuffed with fresh dill and garden lemons, served with potato rosti.' }
        ]
      }
    ]
  },
  {
    id: 'spring-valley-kitisuru',
    tabLabel: 'Spring Valley & Kitisuru',
    restaurants: [
      {
        id: 'zen-garden',
        name: 'Zen Garden (Bamboo)',
        neighbourhood: 'SPRING VALLEY',
        category: 'ORIENTAL GARDEN',
        priceRange: '$$$',
        rating: 4.9,
        reviewsCount: 480,
        highlightTag: 'Dim Sum Sunday',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        description: 'Serene botanical landscape offering pan-Asian culinary theatre, steamed dim sum baskets, and artisan patisserie.',
        vibes: ['Zen Garden', 'Pan-Asian', 'Celebration Dining'],
        cuisines: ['Pan-Asian & Robata', 'Dim Sum'],
        features: ['Pecan Tree Gardens', 'Patisserie Counter'],
        menuItems: [
          { name: 'Bamboo Steamed Dim Sum Symphony', category: 'Starters', priceKes: 2200, description: 'Har gao prawn dumplings, chicken sui mai, truffle mushroom crystal bao.' }
        ]
      },
      {
        id: 'spring-valley-coffee',
        name: 'Spring Valley Coffee Roastery',
        neighbourhood: 'SPRING VALLEY',
        category: 'SPECIALTY COFFEE',
        priceRange: '$$',
        rating: 4.8,
        reviewsCount: 310,
        highlightTag: 'Micro Lot Brews',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
        description: "Kenya's pioneering craft roastery since 2009, featuring micro-lot single origins from Mt. Kenya and Aberdares.",
        vibes: ['Roastery', 'Specialty Coffee', 'Work Friendly'],
        cuisines: ['Cafe', 'Artisanal Roastery'],
        features: ['Direct Trade Beans', 'Cupping Masterclasses'],
        menuItems: [
          { name: 'Nyeri Peaberry Cold Drip Flight', category: 'Craft Cocktails', priceKes: 850, description: 'Slow-extracted 18 hours with bright notes of blackcurrant and jasmine.' }
        ]
      },
      {
        id: 'the-arbor',
        name: 'The Arbor Eco-Cafe',
        neighbourhood: 'KITISURU',
        category: 'ECO-GARDEN CAFE',
        priceRange: '$$',
        rating: 4.8,
        reviewsCount: 370,
        highlightTag: 'Lush Forest Nook',
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80',
        description: 'Eco-conscious green cafe with tree canopies, organic Asian-inspired bowls, and sustainable gift boutique.',
        vibes: ['Tranquil Nature', 'Garden Dining', 'Eco Friendly'],
        cuisines: ['Pan-Asian', 'Noodles', 'Cafe'],
        features: ['Dog Friendly', 'Handcrafted Goods'],
        menuItems: [
          { name: 'Arbor Vietnamese Pho Bo', category: 'Mains & Grills', priceKes: 1750, description: '16-hour bone broth, tender beef slices, rice noodles, fresh Thai basil.' }
        ]
      },
      {
        id: 'spinners-web',
        name: 'Tamambo Kitisuru Deck',
        neighbourhood: 'KITISURU',
        category: 'CONTINENTAL & GRILL',
        priceRange: '$$$',
        rating: 4.7,
        reviewsCount: 230,
        highlightTag: 'Historic Deck',
        image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=900&q=80',
        description: 'Expansive wooden verandah surrounded by native trees, famous for fresh Mombasa oysters and pepper steaks.',
        vibes: ['Wood Verandah', 'Classic Seafood', 'Family Gathering'],
        cuisines: ['Continental', 'Seafood', 'Steaks'],
        features: ['Verandah Bar', 'Outdoor Lawn'],
        menuItems: [
          { name: 'Madagascar Green Peppercorn Steak', category: 'Mains & Grills', priceKes: 3300, description: 'Aged beef fillet with creamy flamed brandy peppercorn sauce and gratin.' }
        ]
      }
    ]
  }
];

// 5. CULINARY EVENTS
export const CULINARY_EVENTS: EventItem[] = [
  {
    id: 'restaurant-week',
    badge: 'COMING EARLY 2026',
    title: 'Nairobi Restaurant Week 2026',
    description: '10 thrilling days of exclusive fixed-price chef tasting menus across 80+ elite establishments. Unlock limited-edition culinary creations before reservations close.',
    footerText: '80+ Participating Venues',
    ctaText: 'Join Priority Access List',
    iconType: 'Calendar',
    theme: 'dark'
  },
  {
    id: 'chefs-table',
    badge: 'CURATED EXPERIENCE',
    title: "Chef's Table Tastings",
    description: 'Witness master culinary techniques up-close with multi-course paired tasting dinners at Chophouse, Jiko, and The Hide.',
    footerText: '12 Exclusive Tables',
    ctaText: 'Explore',
    iconType: 'Gift',
    theme: 'light'
  },
  {
    id: 'dog-friendly-cafes',
    badge: 'CANINE COMPANION GUIDE',
    title: 'Dog-Friendly Garden Cafes',
    description: 'Sun-dappled lawns, fresh water bowls, and artisanal coffee at The Fig & Olive, Wasp & Sprout, and Pallet Cafe Lavington.',
    footerText: '24 Pet-Approved Patios',
    ctaText: 'Explore',
    iconType: 'PawPrint',
    theme: 'light',
    accentColor: 'text-[#16A34A]'
  },
  {
    id: 'out-of-town',
    badge: 'COASTAL & ESCAPES',
    title: 'Out of Town Dining',
    description: 'Fresh dhow-caught seafood, Swahili coconut curries, and sunset dining in Diani, Lamu, Watamu, Kilifi, and Naivasha.',
    footerText: '40+ Getaway Venues',
    ctaText: 'Explore',
    iconType: 'Anchor',
    theme: 'light',
    accentColor: 'text-[#D97706]'
  },
  {
    id: 'burger-pizza-weeks',
    badge: 'SEASONAL FESTIVAL LINEUP',
    title: 'Burger & Pizza Weeks',
    description: 'Mark your calendar for Nairobi Burger Week (Sep 2026) followed by Nairobi Pizza Week and Nairobi Wine Week.',
    footerText: '3 Upcoming Weeks',
    ctaText: 'View Timeline',
    iconType: 'Sparkles',
    theme: 'light',
    accentColor: 'text-[#E11D48]'
  }
];
