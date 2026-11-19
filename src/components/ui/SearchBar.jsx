'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ChevronDown, Check, X, Sparkles, Building2, SlidersHorizontal } from 'lucide-react';
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

  // Top pill tab selection
  const [activeCategory, setActiveCategory] = useState('properties'); // 'properties' | 'projects' | 'transactions' | 'agents'
  
  // Search parameters
  const [purpose, setPurpose] = useState(initialPurpose); // 'sale' | 'rent'
  const [subType, setSubType] = useState('all'); // 'all' | 'ready' | 'off-plan'
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

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === 'projects') {
      router.push('/projects');
    } else if (category === 'agents') {
      router.push('/agents');
    } else if (category === 'transactions') {
      router.push('/listings?view=transactions');
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();

    if (purpose) params.set('purpose', purpose);
    if (subType && subType !== 'all') params.set('status', subType);
    if (locationInput.trim()) params.set('location', locationInput.trim());
    if (propertyType) params.set('type', propertyType);
    if (beds) params.set('beds', beds);
    if (priceMin) params.set('priceMin', priceMin);
    if (priceMax) params.set('priceMax', priceMax);

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto flex flex-col items-center ${className}`}>
      
      {/* 1. TOP PILL TABS (Properties, New Projects, Transactions, Agents - TruEstimate removed per user instruction) */}
      {/* Mobile-optimized: horizontal scrollable single row without squishing */}
      <div className="w-full flex justify-center mb-2 px-1">
        <div className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full p-1 shadow-md border border-slate-200/90 max-w-full overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => handleCategoryClick('properties')}
            className={`tap-target px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'properties'
                ? 'bg-[#E6F2F0] text-[#0A5C4F] font-bold shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Properties
          </button>

          <button
            type="button"
            onClick={() => handleCategoryClick('projects')}
            className={`tap-target px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'projects'
                ? 'bg-[#E6F2F0] text-[#0A5C4F] font-bold shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            New Projects
          </button>

          <button
            type="button"
            onClick={() => handleCategoryClick('transactions')}
            className={`tap-target px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'transactions'
                ? 'bg-[#E6F2F0] text-[#0A5C4F] font-bold shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Transactions
          </button>

          <button
            type="button"
            onClick={() => handleCategoryClick('agents')}
            className={`tap-target px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'agents'
                ? 'bg-[#E6F2F0] text-[#0A5C4F] font-bold shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Agents
          </button>
        </div>
      </div>

      {/* 2. MAIN WHITE SEARCH CONTAINER */}
      <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 sm:p-5 text-slate-900">
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          
          {/* ROW 1: Buy / Rent Toggle + Location Combobox + Search Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            
            {/* Buy / Rent Toggle Pill */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setPurpose('sale')}
                className={`tap-target px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  purpose === 'sale'
                    ? 'bg-[#E6F2F0] text-[#0A5C4F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setPurpose('rent')}
                className={`tap-target px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-[#E6F2F0] text-[#0A5C4F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Location Combobox with Autocomplete */}
            <div ref={locationRef} className="relative flex-1">
              <div className="flex items-center bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 sm:py-3 focus-within:border-[#0A5C4F] focus-within:ring-2 focus-within:ring-[#0A5C4F]/20 transition-all">
                <MapPin className="w-4 h-4 text-[#0A5C4F] shrink-0 mr-2.5" />
                <input
                  type="text"
                  placeholder="Enter location, community or building..."
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
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showLocationSuggestions && (
                <ul className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto z-50 text-xs py-1.5 divide-y divide-slate-100">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => (
                      <li
                        key={loc}
                        onClick={() => {
                          setLocationInput(loc);
                          setShowLocationSuggestions(false);
                        }}
                        className="px-4 py-2.5 hover:bg-[#E6F2F0] hover:text-[#0A5C4F] cursor-pointer flex items-center justify-between text-slate-700 transition-colors"
                      >
                        <span className="font-medium">{loc}</span>
                        {locationInput === loc && <Check className="w-3.5 h-3.5 text-[#0A5C4F]" />}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2.5 text-slate-400">No matching areas found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Main Green Search Button (Always enabled, deep green #0A5C4F) */}
            <button
              type="submit"
              className="tap-target px-7 py-3 bg-[#0A5C4F] hover:bg-[#08493F] text-white font-bold text-sm tracking-wide rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* ROW 2: Filter Controls (All / Ready / Off-Plan | Residential | Beds & Baths | Price) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
            
            {/* All / Ready / Off-Plan Sub-Toggle */}
            <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-lg shrink-0">
              {['all', 'ready', 'off-plan'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSubType(st)}
                  className={`tap-target px-3 py-1.5 rounded-md text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                    subType === st
                      ? 'bg-white text-[#0A5C4F] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st === 'all' ? 'All' : st === 'ready' ? 'Ready' : 'Off-Plan'}
                </button>
              ))}
            </div>

            {/* Property Type Dropdown */}
            <div className="relative flex-1 min-w-[130px]">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="tap-target w-full appearance-none px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:border-[#0A5C4F] outline-none cursor-pointer pr-7"
              >
                <option value="">Residential</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Beds Dropdown */}
            <div className="relative flex-1 min-w-[110px]">
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="tap-target w-full appearance-none px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:border-[#0A5C4F] outline-none cursor-pointer pr-7"
              >
                <option value="">Beds & Baths</option>
                <option value="studio">Studio</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5">5+ Beds</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Price (AED) Selector Popover */}
            <div ref={priceRef} className="relative flex-1 min-w-[130px]">
              <button
                type="button"
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="tap-target w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:border-[#0A5C4F] outline-none flex items-center justify-between gap-1 text-left cursor-pointer"
              >
                <span className="truncate">
                  {priceMin || priceMax
                    ? `${priceMin ? formatAED(priceMin) : '0'} - ${priceMax ? formatAED(priceMax) : 'Max'}`
                    : 'Price (AED)'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {showPriceDropdown && (
                <div className="absolute top-full right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Minimum Price (AED)</label>
                    <input
                      type="number"
                      placeholder="e.g. 500,000"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs outline-none focus:border-[#0A5C4F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Maximum Price (AED)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5,000,000"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs outline-none focus:border-[#0A5C4F]"
                    />
                  </div>
                  <div className="flex justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setPriceMin('');
                        setPriceMax('');
                      }}
                      className="text-[11px] text-slate-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPriceDropdown(false)}
                      className="px-3.5 py-1 bg-[#0A5C4F] text-white rounded-md text-[11px] font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* ROW 3: AI Assistant strip (As seen in image 1 & 3) */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Want to find out more about real estate using AI?</span>
            </div>
            <Link
              href="/listings?ai=true"
              className="font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors flex items-center gap-1"
            >
              <span>Try Brickyard AI</span>
              <span>→</span>
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
}
