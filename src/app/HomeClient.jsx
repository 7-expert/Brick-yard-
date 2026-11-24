'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Map as MapIcon,
  Star,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Building2,
  Gem,
  Compass,
  Users,
  Play,
  Coins,
  Bed,
  Home as HomeIcon,
  X,
} from 'lucide-react';
import ListingCard from '@/components/ui/ListingCard';
import LeadForm from '@/components/ui/LeadForm';
import {
  DUBAI_PROPERTIES,
  DUBAI_PROJECTS,
  DUBAI_AREA_GUIDES,
  PROPERTY_TYPES,
} from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';

export default function HomeClient() {
  const [activeCategory, setActiveCategory] = useState('Houses');
  // Modal and Map states
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedMapArea, setSelectedMapArea] = useState('Dubai, UAE');

  // SearchBar state (matching Image 2)
  const [purpose, setPurpose] = useState('sale'); // 'sale' | 'rent'
  const [status, setStatus] = useState('all'); // 'all' | 'ready' | 'off-plan'
  const [locationInput, setLocationInput] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [beds, setBeds] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // Testimonial slide state (matching Image 3)
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  const testimonials = [
    {
      quote: "The team guided us through every detail with professionalism and transparency. We always felt informed, supported, and confident in our decision.",
      author: "Emily R.",
      role: "Business Consultant",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Found our dream waterfront penthouse on Palm Jumeirah in under two weeks. The market valuation data and direct developer access were second to none.",
      author: "Alexander M.",
      role: "Private Equity Partner",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "Exceptional advisory on off-plan releases with guaranteed payment plans. Truly a modern and transparent real estate experience.",
      author: "Sophie D.",
      role: "International Investor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const categories = [
    { key: 'Houses', label: 'Houses', type: 'Villa' },
    { key: 'Apartments', label: 'Apartments', type: 'Apartment' },
    { key: 'Multi-family', label: 'Multi-family', type: 'Townhouse' },
    { key: 'Penthouses', label: 'Penthouses', type: 'Penthouse' },
    { key: 'Commercial', label: 'Commercial', type: 'Commercial' },
  ];

  const filteredCategoryListings = DUBAI_PROPERTIES.filter((p) => {
    const matchedCategory = categories.find((c) => c.key === activeCategory);
    if (!matchedCategory || activeCategory === 'Houses') return true;
    return p.type.toLowerCase().includes(matchedCategory.type.toLowerCase());
  });

  const homeForYou = filteredCategoryListings.slice(0, 6);
  const homeNearby = DUBAI_PROPERTIES.filter((p) => p.purpose === 'rent').slice(0, 6);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (purpose) params.set('purpose', purpose);
    if (status !== 'all') params.set('status', status);
    if (locationInput.trim()) params.set('location', locationInput.trim());
    if (propertyType) params.set('type', propertyType);
    if (beds) params.set('beds', beds);
    if (priceMax) params.set('priceMax', priceMax);
    window.location.href = `/listings?${params.toString()}`;
  };

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 pb-24 md:pb-16 font-sans">
      
      {/* 1. HERO SECTION (2-Column Architecture Matching Reference Screenshot) */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 bg-[#FAF9F5]">
        
        {/* Soft background ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Headline, Kicker, Subtitle, Action Buttons */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Kicker with horizontal line */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[2px] bg-[#0A5C4F]"></span>
                <span className="text-[#0A5C4F] font-bold text-xs tracking-widest uppercase">
                  A better way to find home
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-slate-900 tracking-tight leading-[1.04]">
                Find a place that <br className="hidden sm:inline" />
                feels like <span className="text-[#0A5C4F]">you.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
                Thoughtful homes, trusted details, and a little more room to imagine.
              </p>

              {/* Action Buttons: Explore map + Watch video */}
              <div className="flex items-center gap-4 pt-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setMapModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#0A5C4F] hover:bg-[#08493F] text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  <MapIcon className="w-4 h-4 text-emerald-200" />
                  <span>Explore the map</span>
                  <span className="text-sm">→</span>
                </button>

                <span className="w-[1px] h-6 bg-slate-300 hidden sm:inline-block"></span>

                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-800 hover:text-[#0A5C4F] transition-colors cursor-pointer group"
                >
                  <span className="w-9 h-9 rounded-full bg-white border border-slate-200 group-hover:border-[#0A5C4F] flex items-center justify-center text-slate-900 shadow-xs transition-colors">
                    <Play className="w-3.5 h-3.5 fill-slate-900 text-slate-900 ml-0.5" />
                  </span>
                  <span>Watch video</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Architectural Modern Luxury Villa with Arch Backdrop */}
            <div className="lg:col-span-6 relative">
              
              {/* Soft arch shaped backdrop from screenshot */}
              <div className="absolute -top-10 -right-10 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full bg-[#EAE6DC]/60 -z-10 pointer-events-none" />

              {/* Architectural Villa Photo with rounded top-left arch */}
              <div className="relative rounded-3xl lg:rounded-tl-[200px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury Architectural Villa in Dubai"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH CARD CONSOLE (Matching Reference Image) */}
      <section className="relative z-20 -mt-6 sm:-mt-10 lg:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-5 sm:p-7 space-y-4">
          
          {/* Top Toggle Tabs: Buy, Rent, New projects, Commercial */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'sale', label: 'Buy' },
              { id: 'rent', label: 'Rent' },
              { id: 'new-projects', label: 'New projects' },
              { id: 'commercial', label: 'Commercial' },
            ].map((tab) => {
              const isActive = purpose === tab.id || (tab.id === 'sale' && purpose === 'sale');
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === 'new-projects') {
                      window.location.href = '/projects';
                    } else if (tab.id === 'commercial') {
                      setPropertyType('Commercial');
                      setPurpose('sale');
                    } else {
                      setPurpose(tab.id);
                    }
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Segmented Inputs Form */}
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-stretch">
              
              {/* 1. LOCATION */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 hover:border-slate-300 transition-colors flex flex-col justify-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Location
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Dubai, United Arab Emirates"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-800 truncate"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* 2. PROPERTY TYPE */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 hover:border-slate-300 transition-colors flex flex-col justify-center relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Property Type
                </label>
                <div className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer pr-4"
                  >
                    <option value="">All residential</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* 3. PRICE RANGE */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 hover:border-slate-300 transition-colors flex flex-col justify-center relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer pr-4"
                  >
                    <option value="">AED 1M – 5M</option>
                    <option value="2000000">Under 2M AED</option>
                    <option value="5000000">AED 1M – 5M</option>
                    <option value="10000000">AED 5M – 10M</option>
                    <option value="25000000">AED 10M+</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* 4. BEDS & BATHS */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 hover:border-slate-300 transition-colors flex flex-col justify-center relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Beds & Baths
                </label>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer pr-4"
                  >
                    <option value="">Any</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5">5+ Beds</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* 5. SEARCH BUTTON */}
              <div className="lg:col-span-2 flex items-center">
                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#0A5C4F] hover:bg-[#08493F] text-white font-bold text-sm tracking-wide rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search homes</span>
                </button>
              </div>

            </div>

            {/* Bottom Sub-Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                {['all', 'ready', 'off-plan'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`px-3.5 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                      status === st
                        ? 'bg-slate-100 text-slate-900 font-bold'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {st === 'all' ? 'All' : st === 'ready' ? 'Ready' : 'Off-plan'}
                  </button>
                ))}
                <Link
                  href="/listings"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1"
                >
                  + More filters
                </Link>
              </div>

              <Link
                href="/listings"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Quick search</span>
              </Link>
            </div>

          </form>

        </div>
      </section>

      {/* 3. SECTION: "Homes picked for you" (Matching Reference Image with Carousel Arrows) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            {/* Green line kicker */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#0A5C4F]"></span>
              <span className="text-[#0A5C4F] font-bold text-xs tracking-widest uppercase">
                Premium Properties
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Homes picked for you
            </h2>
          </div>

          {/* Carousel Next/Prev Arrow Buttons from Screenshot */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('homes-picked-grid');
                if (el) el.scrollBy({ left: -340, behavior: 'smooth' });
              }}
              aria-label="Previous homes"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('homes-picked-grid');
                if (el) el.scrollBy({ left: 340, behavior: 'smooth' });
              }}
              aria-label="Next homes"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Grid Matching Reference */}
        <div
          id="homes-picked-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {DUBAI_PROPERTIES.slice(0, 6).map((property) => (
            <div key={property.id}>
              <ListingCard property={property} />
            </div>
          ))}
        </div>

        {/* Centered Show More Homes Button */}
        <div className="mt-12 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs transition-all hover:shadow-sm"
          >
            <span>Show more homes</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* 5. EDITORIAL "ABOUT US" SECTION (Matching Reference Image with Creative Luxury Styling) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-100/80 overflow-hidden">
        
        {/* Subtle Decorative Ambient Lighting & Grid Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-100/30 via-emerald-50/20 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          {/* Terracotta/Orange Kicker Eyebrow matching image */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1.5px] bg-[#FF6B35]"></span>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B35]">
              about us
            </span>
            <span className="w-6 h-[1.5px] bg-[#FF6B35]"></span>
          </div>

          {/* Main Editorial Statement matching image */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.22] mb-5">
            A home is more than an address. It is the setting for your ambitions, the backdrop to your everyday life, and an investment in what comes next.
          </h2>

          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-normal">
            At Brickyard, we bring together distinctive properties and a more considered way to discover them — with thoughtful curation, local insight, and a personal approach.
          </p>
        </div>

        {/* 4 Feature Pillars matching image with elevated luxury cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* Pillar 1: Curated Excellence */}
          <div className="relative group p-7 rounded-3xl bg-white/90 backdrop-blur-xs border border-slate-200/90 hover:border-orange-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(255,107,53,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3ED] text-[#FF6B35] ring-1 ring-[#FF6B35]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Gem className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                  01 // CURATION
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#FF6B35] transition-colors">
                Curated Excellence
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                Discover distinctive homes selected for their architecture, quality, and character.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View architectural portfolio →</span>
            </div>
          </div>

          {/* Pillar 2: Prime Locations */}
          <div className="relative group p-7 rounded-3xl bg-white/90 backdrop-blur-xs border border-slate-200/90 hover:border-emerald-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(10,92,79,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5F1] text-[#0A5C4F] ring-1 ring-[#0A5C4F]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                  02 // PRIME
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#0A5C4F] transition-colors">
                Prime Locations
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                Explore sought-after neighborhoods and exceptional addresses worth discovering.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-[#0A5C4F] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Explore top neighborhoods →</span>
            </div>
          </div>

          {/* Pillar 3: Personal Guidance */}
          <div className="relative group p-7 rounded-3xl bg-white/90 backdrop-blur-xs border border-slate-200/90 hover:border-amber-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(217,119,6,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                  03 // ADVISORY
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                Personal Guidance
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                Get tailored support to help you make confident, informed property decisions.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Connect with private desk →</span>
            </div>
          </div>

          {/* Pillar 4: A Seamless Journey */}
          <div className="relative group p-7 rounded-3xl bg-white/90 backdrop-blur-xs border border-slate-200/90 hover:border-indigo-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                  04 // JOURNEY
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                A Seamless Journey
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                Move from discovery to your next chapter with a clear, thoughtfully guided process.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View buying step guide →</span>
            </div>
          </div>

        </div>

      </section>

      {/* 6. TESTIMONIAL & SOCIAL PROOF SECTION (Exact Content & Layout of Image 3 Bottom Block) */}
      <section className="bg-slate-50/80 py-14 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row: Title on Left, Stats on Right (Exact Image 3 Layout) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] block mb-2">
                testimonial
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Stories behind <span className="font-serif italic font-normal">extraordinary homes</span>
              </h2>
            </div>

            {/* 3 Stats Columns (Exact Image 3 Numbers) */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-200">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#FF6B35] block tracking-tight">850+</span>
                <span className="text-xs text-slate-500 font-medium">Verified Reviews</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#0A5C4F] block tracking-tight">24+</span>
                <span className="text-xs text-slate-500 font-medium">Global Destinations</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 block tracking-tight">2.5K+</span>
                <span className="text-xs text-slate-500 font-medium">Successful Transactions</span>
              </div>
            </div>
          </div>

          {/* Testimonial Showcase Box (Exact Image 3 Split Architecture) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Col: Villa Photo with Customer Satisfaction Pill Overlay (5 cols) */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-sm min-h-[300px] lg:min-h-[380px] bg-slate-900">
              <img
                src="/waterfront_villa_1790348391865.jpg"
                alt="Extraordinary Home"
                className="w-full h-full object-cover"
              />
              {/* White Overlay Pill in Bottom-Left */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80" alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80" alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block leading-none">Customer Satisfaction</span>
                  <span className="text-xs font-bold text-slate-900">⭐ 4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Col: White Testimonial Card with 5 Stars, Quote, Author & Carousel Controls (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs flex flex-col justify-between">
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-base sm:text-xl text-slate-800 font-medium leading-relaxed mb-8">
                  "{testimonials[currentTestimonialIdx].quote}"
                </blockquote>

                {/* Author Avatar & Role */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[currentTestimonialIdx].avatar}
                    alt={testimonials[currentTestimonialIdx].author}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">
                      {testimonials[currentTestimonialIdx].author}
                    </span>
                    <span className="text-xs text-slate-500">
                      {testimonials[currentTestimonialIdx].role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prev / Next Carousel Buttons (Bottom Right, matching Image 3) */}
              <div className="flex items-center justify-end gap-2 pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-[#FF6B35] hover:bg-[#e85522] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. POPULAR NEW DEVELOPMENTS RAIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Popular New Projects
          </h2>
          <Link
            href="/projects"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            See all
          </Link>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {DUBAI_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="snap-start shrink-0 w-[290px] sm:w-auto flex flex-col justify-between group cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-xs group-hover:shadow-md transition-all">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-semibold">
                  {project.badge}
                </span>
              </div>

              <div className="mt-3 px-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{project.developer}</span>
                  <span className="text-indigo-600 font-semibold">{project.handoverDate}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">
                  {project.name}
                </h3>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  From {formatAED(project.startingPrice)}
                </span>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {project.location}, Dubai
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEAD MODAL */}
      {leadModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
            <div className="mb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Direct Registration
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {selectedProject.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedProject.developer} • {selectedProject.location}
              </p>
            </div>
            <LeadForm
              purpose="project_interest"
              itemOrProjectName={selectedProject.name}
              agentName="Brickyard Off-Plan Desk"
              onSuccess={() => {
                setTimeout(() => setLeadModalOpen(false), 2000);
              }}
            />
          </div>
        </div>
      )}

      {/* VIDEO TOUR LIGHTBOX MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <video
                src="/video.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-5 bg-slate-900 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h4 className="font-bold text-white text-base">Brickyard Luxury Walkthrough</h4>
                <p className="text-xs text-slate-400">Cinematic Dubai property tour & architectural overview</p>
              </div>
              <Link
                href="/listings"
                className="px-4 py-2 rounded-xl bg-[#0A5C4F] hover:bg-[#08493F] text-white text-xs font-bold transition-colors"
              >
                Browse All Homes
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DUBAI GOOGLE MAP LIGHTBOX MODAL */}
      {mapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-5xl h-[88vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A5C4F]/10 text-[#0A5C4F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                    Dubai Interactive Google Map
                  </h3>
                  <p className="text-xs text-slate-500">
                    Explore prime neighborhoods and developments across Dubai, UAE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapArea + ' Dubai United Arab Emirates')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setMapModalOpen(false)}
                  aria-label="Close map"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Area Filter Pills Bar */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                Jump To Area:
              </span>
              {[
                { name: 'Dubai, UAE', label: 'All Dubai' },
                { name: 'Downtown Dubai', label: 'Downtown & Burj' },
                { name: 'Palm Jumeirah', label: 'Palm Jumeirah' },
                { name: 'Dubai Marina', label: 'Dubai Marina' },
                { name: 'Dubai Creek Harbour', label: 'Creek Harbour' },
                { name: 'Dubai Hills Estate', label: 'Dubai Hills' },
                { name: 'Business Bay', label: 'Business Bay' },
                { name: 'Jumeirah Village Circle', label: 'JVC' },
              ].map((area) => (
                <button
                  key={area.name}
                  type="button"
                  onClick={() => setSelectedMapArea(area.name)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedMapArea === area.name
                      ? 'bg-[#0A5C4F] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>

            {/* Live Dubai Google Map Embed */}
            <div className="flex-1 w-full relative bg-slate-100">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapArea + ' Dubai United Arab Emirates')}&t=&z=${selectedMapArea === 'Dubai, UAE' ? 11 : 14}&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full"
                title="Dubai Google Map"
              />
            </div>

            {/* Footer with Direct Action to View All Listings on Map */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Centered on: <strong className="text-slate-800">{selectedMapArea}</strong></span>
              </div>
              <Link
                href="/listings?view=map"
                onClick={() => setMapModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#0A5C4F] hover:bg-[#08493F] text-white text-xs font-bold transition-colors shadow-xs"
              >
                Browse All Properties in Map View →
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
