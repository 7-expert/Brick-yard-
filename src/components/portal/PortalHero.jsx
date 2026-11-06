'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortalHero({ onOpenAI }) {
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
    <div className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[760px] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Lifestyle Image (Matching Reference Image) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_lifestyle_banner.jpg"
          alt="Luxury living room with smartphone real estate portal"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Soft, clean vignette that keeps background visible while guaranteeing text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Hero Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-white tracking-tight leading-[1.1] mb-2 drop-shadow-md">
            Real homes live here
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 font-light tracking-wide max-w-xl mx-auto drop-shadow-sm">
            Real Data. Real Brokers. Real Properties.
          </p>
        </motion.div>

        {/* Top Category Tabs (Floating Pills matching reference) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center flex-wrap gap-1 mb-3.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-white/60"
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
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-ink text-white shadow-md'
                    : 'text-ink-soft hover:text-ink hover:bg-black/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.isNew && (
                  <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#E53E3E] text-white tracking-wider uppercase">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Floating Main Search Box (Clean, elevated UI matching reference) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-3 sm:p-4 border border-ink/10 text-left"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
            {/* Buy / Rent Switch Pills */}
            <div className="flex bg-[#F5F1E8] p-1 rounded-xl self-start sm:self-auto shrink-0 border border-ink/5">
              <button
                type="button"
                onClick={() => setListingType('buy')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
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
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  listingType === 'rent'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Location Input with MapPin */}
            <div className="relative flex-grow flex items-center bg-white rounded-xl px-4 py-2.5 border border-ink/15 focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-400/20 transition-all">
              <MapPin className="w-5 h-5 text-gold-600 shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Enter location, community or building..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-ink text-sm sm:text-base placeholder:text-ink/40 font-medium"
              />
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="px-8 py-3.5 bg-ink text-gold-200 hover:bg-gold-500 hover:text-ink font-bold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0 group cursor-pointer active:scale-95"
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
