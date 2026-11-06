'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortalHero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Properties');
  const [listingType, setListingType] = useState('buy'); // 'buy' | 'rent'
  const [searchLocation, setSearchLocation] = useState('');

  const tabs = [
    { label: 'Properties', href: '#properties' },
    { label: 'New Projects', href: '#new-projects' },
    { label: 'Transactions', href: '#val-estimate' },
    { label: 'TruEstimate™', href: '#val-estimate', isNew: true },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (listingType === 'buy') query.set('type', 'sale');
    if (listingType === 'rent') query.set('type', 'rent');
    if (searchLocation.trim()) query.set('location', searchLocation.trim());
    router.push(`/listings?${query.toString()}`);
  };

  return (
    <div className="relative w-full min-h-[600px] sm:min-h-[660px] md:min-h-[720px] flex items-center justify-center pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Lifestyle Image (Matching Reference Image) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_lifestyle_banner.jpg"
          alt="Luxury living room with smartphone real estate portal"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Soft, clean vignette that keeps background visible while guaranteeing text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Hero Headlines (Carefully sized to avoid colliding with header on mobile) */}
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

        {/* Top Category Tabs (Floating horizontal pill strip - no wrapping on mobile) */}
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
                className={`whitespace-nowrap shrink-0 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-ink text-white shadow-md'
                    : 'text-ink-soft hover:text-ink hover:bg-black/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.isNew && (
                  <span className="ml-1 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#E53E3E] text-white tracking-wider uppercase">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Floating Main Search Box (Clean, balanced, mobile-optimized) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-3 sm:p-4 border border-ink/10 text-left"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
            {/* Buy / Rent Switch Pills (Full width 50/50 on mobile, hugging on desktop) */}
            <div className="w-full sm:w-auto grid grid-cols-2 sm:flex bg-[#F5F1E8] p-1 rounded-xl shrink-0 border border-ink/5">
              <button
                type="button"
                onClick={() => setListingType('buy')}
                className={`py-2 px-5 sm:px-6 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                  listingType === 'buy'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setListingType('rent')}
                className={`py-2 px-5 sm:px-6 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                  listingType === 'rent'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Location Input with MapPin */}
            <div className="relative flex-grow flex items-center bg-white rounded-xl px-3.5 sm:px-4 py-2.5 border border-ink/15 focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-400/20 transition-all">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Enter location, community or building..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-ink text-xs sm:text-base placeholder:text-ink/40 font-medium"
              />
            </div>

            {/* Search Submit Button (Full width on mobile for thumb friendliness) */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 sm:py-3.5 bg-ink text-gold-200 hover:bg-gold-500 hover:text-ink font-bold text-xs sm:text-base rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0 group cursor-pointer active:scale-95"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
