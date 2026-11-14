'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortalHero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Properties');
  const [listingType, setListingType] = useState('buy'); // 'buy' | 'rent'
  const [searchLocation, setSearchLocation] = useState('');

  // Secondary filters matching Image 1
  const [projectStatus, setProjectStatus] = useState('All'); // 'All' | 'Ready' | 'Off-Plan'
  const [propertyCategory, setPropertyCategory] = useState('Residential');
  const [bedsBaths, setBedsBaths] = useState('Beds & Baths');
  const [priceRange, setPriceRange] = useState('Price');

  // Removed TruEstimate from hero tabs as requested
  const tabs = [
    { label: 'Properties', href: '#properties' },
    { label: 'New Projects', href: '#new-projects' },
    { label: 'Transactions', href: '#val-estimate' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (listingType === 'buy') query.set('type', 'sale');
    if (listingType === 'rent') query.set('type', 'rent');
    if (searchLocation.trim()) query.set('location', searchLocation.trim());
    if (projectStatus !== 'All') query.set('status', projectStatus.toLowerCase());
    router.push(`/listings?${query.toString()}`);
  };

  return (
    <div className="relative w-full min-h-[640px] sm:min-h-[700px] md:min-h-[740px] flex items-center justify-center pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Lifestyle Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_lifestyle_banner.jpg"
          alt="Luxury living room with smartphone real estate portal"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Soft vignette for optimal text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Hero Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 sm:mb-8 px-2"
        >
          <h1 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-white tracking-tight leading-[1.12] mb-2 drop-shadow-md">
            Real homes live here
          </h1>
          <p className="font-sans text-xs sm:text-base md:text-lg text-white/90 font-light tracking-wide max-w-xl mx-auto drop-shadow-sm">
            Real Data. Real Brokers. Real Properties.
          </p>
        </motion.div>

        {/* Top Category Tabs (Floating horizontal pill strip - no TruEstimate) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full sm:w-auto max-w-full overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 mb-3 bg-white/95 backdrop-blur-md p-1 sm:p-1.5 rounded-full shadow-lg border border-white/60"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => {
                  setActiveTab(tab.label);
                  if (tab.href.startsWith('#')) {
                    const el = document.querySelector(tab.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`whitespace-nowrap shrink-0 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#162E22] text-white shadow-md'
                    : 'text-ink-soft hover:text-ink hover:bg-black/5'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Floating Main Search Box (Matching Image 1 with Row 1 & Row 2 filters) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-3 sm:p-4 border border-ink/10 text-left space-y-3"
        >
          {/* Row 1: Buy/Rent toggle + Location input + Search button */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
            {/* Buy / Rent Switch Pills */}
            <div className="w-full sm:w-auto grid grid-cols-2 sm:flex bg-[#EAF5EF] p-1 rounded-xl shrink-0 border border-[#162E22]/10">
              <button
                type="button"
                onClick={() => setListingType('buy')}
                className={`py-2 px-5 sm:px-6 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                  listingType === 'buy'
                    ? 'bg-white text-[#162E22] shadow-sm'
                    : 'text-[#4A5D52] hover:text-[#162E22]'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setListingType('rent')}
                className={`py-2 px-5 sm:px-6 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                  listingType === 'rent'
                    ? 'bg-white text-[#162E22] shadow-sm'
                    : 'text-[#4A5D52] hover:text-[#162E22]'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Location Input with MapPin */}
            <div className="relative flex-grow flex items-center bg-white rounded-xl px-3.5 sm:px-4 py-2.5 border border-ink/15 focus-within:border-[#162E22] focus-within:ring-2 focus-within:ring-[#162E22]/20 transition-all">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#162E22] shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Enter location, community or building..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-ink text-xs sm:text-base placeholder:text-ink/40 font-medium"
              />
            </div>

            {/* Search Submit Button (Vibrant Luxury Green matching Image 1) */}
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 sm:py-3.5 bg-[#1B8354] hover:bg-[#166D46] text-white font-bold text-xs sm:text-base rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0 group cursor-pointer active:scale-95"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
          </form>

          {/* Row 2: Secondary Filter Controls (Matching Image 1) */}
          <div className="pt-2 border-t border-ink/5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {/* All / Ready / Off-Plan Toggle */}
            <div className="flex bg-[#F4F1EA] p-0.5 rounded-lg border border-ink/5 col-span-2 sm:col-span-1">
              {['All', 'Ready', 'Off-Plan'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setProjectStatus(st)}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[11px] font-semibold transition-all ${
                    projectStatus === st
                      ? 'bg-white text-[#162E22] shadow-xs'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Residential Dropdown */}
            <div className="relative flex items-center bg-white rounded-lg px-2.5 py-1.5 border border-ink/15 text-ink-soft text-xs">
              <select
                value={propertyCategory}
                onChange={(e) => setPropertyCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-ink font-medium pr-4 appearance-none cursor-pointer"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Villa Compound</option>
                <option>Penthouse</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-ink/50 absolute right-2 pointer-events-none" />
            </div>

            {/* Beds & Baths Dropdown */}
            <div className="relative flex items-center bg-white rounded-lg px-2.5 py-1.5 border border-ink/15 text-ink-soft text-xs">
              <select
                value={bedsBaths}
                onChange={(e) => setBedsBaths(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-ink font-medium pr-4 appearance-none cursor-pointer"
              >
                <option>Beds & Baths</option>
                <option>1 Bed</option>
                <option>2 Beds</option>
                <option>3 Beds</option>
                <option>4+ Beds</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-ink/50 absolute right-2 pointer-events-none" />
            </div>

            {/* Price Dropdown */}
            <div className="relative flex items-center bg-white rounded-lg px-2.5 py-1.5 border border-ink/15 text-ink-soft text-xs">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-ink font-medium pr-4 appearance-none cursor-pointer"
              >
                <option>Price (USD)</option>
                <option>Up to $1M</option>
                <option>$1M - $3M</option>
                <option>$3M - $6M</option>
                <option>$6M+</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-ink/50 absolute right-2 pointer-events-none" />
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
