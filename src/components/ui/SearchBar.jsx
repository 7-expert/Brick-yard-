'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ChevronDown, Check, X, Sparkles, Building, SlidersHorizontal, Home } from 'lucide-react';
import { DUBAI_LOCATIONS, PROPERTY_TYPES } from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';

export default function SearchBar({
  initialPurpose = 'sale',
  initialLocation = '',
  initialType = '',
  initialBeds = '',
  initialPriceMin = '',
  initialPriceMax = '',
  className = '',
}) {
  const router = useRouter();

  // Search purpose: 'sale' | 'rent' | 'off-plan' | 'commercial'
  const [purpose, setPurpose] = useState(initialPurpose);
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState(initialType);
  const [beds, setBeds] = useState(initialBeds);
  const [priceMin, setPriceMin] = useState(initialPriceMin);
  const [priceMax, setPriceMax] = useState(initialPriceMax);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const locationRef = useRef(null);
  const priceRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setShowPriceDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = DUBAI_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationInput.toLowerCase())
  );

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();

    if (purpose === 'off-plan') {
      router.push('/projects');
      return;
    }

    if (purpose) params.set('purpose', purpose);
    if (locationInput.trim()) params.set('location', locationInput.trim());
    if (propertyType) params.set('type', propertyType);
    if (beds) params.set('beds', beds);
    if (priceMin) params.set('priceMin', priceMin);
    if (priceMax) params.set('priceMax', priceMax);

    router.push(`/listings?${params.toString()}`);
  };

  const tabs = [
    { key: 'sale', label: 'Buy' },
    { key: 'rent', label: 'Rent' },
    { key: 'off-plan', label: 'New Developments' },
    { key: 'commercial', label: 'Commercial' },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      
      {/* 1. PURPOSE SELECTOR TABS (Integrated luxury aesthetic) */}
      <div className="flex items-center gap-1 sm:gap-2 mb-3 overflow-x-auto scrollbar-none px-1">
        {tabs.map((tab) => {
          const isActive = purpose === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setPurpose(tab.key)}
              className={`tap-target px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md font-bold'
                  : 'bg-black/30 hover:bg-black/40 text-white/90 backdrop-blur-md border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. MAIN SEARCH CONSOLE CARD */}
      <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-4 sm:p-5 text-slate-900 transition-all">
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          
          {/* PRIMARY ROW: Location + Property Type + Beds + Price + Search Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-center">
            
            {/* Location Input (5 Cols on Desktop) */}
            <div ref={locationRef} className="relative lg:col-span-4">
              <div className="flex items-center bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-3 focus-within:border-[#0A5C4F] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0A5C4F]/15 transition-all">
                <MapPin className="w-4 h-4 text-[#0A5C4F] shrink-0 mr-2.5" />
                <input
                  type="text"
                  placeholder="Location, neighborhood or tower..."
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onFocus={() => setShowLocationSuggestions(true)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                />
                {locationInput && (
                  <button
                    type="button"
                    onClick={() => setLocationInput('')}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    aria-label="Clear location"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showLocationSuggestions && (
                <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-50 text-xs py-1.5 divide-y divide-slate-100 animate-fadeIn">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => (
                      <li
                        key={loc}
                        onClick={() => {
                          setLocationInput(loc);
                          setShowLocationSuggestions(false);
                        }}
                        className="px-4 py-2.5 hover:bg-[#E6F2F0] hover:text-[#0A5C4F] cursor-pointer flex items-center justify-between text-slate-700 font-medium transition-colors"
                      >
                        <span>{loc}</span>
                        {locationInput === loc && <Check className="w-3.5 h-3.5 text-[#0A5C4F]" />}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2.5 text-slate-400">No matching neighborhoods</li>
                  )}
                </ul>
              )}
            </div>

            {/* Property Type (2 Cols) */}
            <div className="relative lg:col-span-2">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="tap-target w-full appearance-none px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium focus:border-[#0A5C4F] focus:bg-white outline-none cursor-pointer pr-8"
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Bedrooms (2 Cols) */}
            <div className="relative lg:col-span-2">
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="tap-target w-full appearance-none px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium focus:border-[#0A5C4F] focus:bg-white outline-none cursor-pointer pr-8"
              >
                <option value="">Bedrooms</option>
                <option value="studio">Studio</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5">5+ Beds</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Price (AED) Selector (2 Cols) */}
            <div ref={priceRef} className="relative lg:col-span-2">
              <button
                type="button"
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="tap-target w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium focus:border-[#0A5C4F] focus:bg-white outline-none flex items-center justify-between gap-1 text-left cursor-pointer"
              >
                <span className="truncate">
                  {priceMin || priceMax
                    ? `${priceMin ? formatAED(priceMin) : '0'} - ${priceMax ? formatAED(priceMax) : 'Max'}`
                    : 'Price (AED)'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {showPriceDropdown && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-fadeIn">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Minimum Price (AED)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1,000,000"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#0A5C4F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Maximum Price (AED)</label>
                    <input
                      type="number"
                      placeholder="e.g. 15,000,000"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-[#0A5C4F]"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setPriceMin('');
                        setPriceMax('');
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPriceDropdown(false)}
                      className="px-4 py-1.5 bg-[#0A5C4F] text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-[#08493F]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search CTA Button (2 Cols) */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="tap-target w-full py-3 px-4 bg-[#FF6B35] hover:bg-[#e85522] text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </div>

          {/* SECONDARY ROW: Fast Community Links + AI Search Concierge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            
            {/* Popular Neighborhood Quick Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-medium">Trending:</span>
              {['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Dubai Hills'].map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => {
                    setLocationInput(area);
                    const params = new URLSearchParams();
                    params.set('location', area);
                    if (purpose) params.set('purpose', purpose);
                    router.push(`/listings?${params.toString()}`);
                  }}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#E6F2F0] hover:text-[#0A5C4F] text-slate-600 transition-colors cursor-pointer text-[11px] font-medium"
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Brickyard AI Search Link */}
            <Link
              href="/listings?ai=true"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Explore with Brickyard AI Concierge</span>
              <span>→</span>
            </Link>

          </div>

        </form>
      </div>

    </div>
  );
}
