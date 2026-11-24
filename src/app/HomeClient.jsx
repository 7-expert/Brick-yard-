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
  Compass as JourneyIcon,
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
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
      
      {/* 1. HERO HEADER SECTION (Exact Reference Screenshot Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {/* Kicker */}
            <span className="text-[#0A5C4F] font-bold text-xs tracking-widest uppercase block mb-3">
              A better way to find home
            </span>
            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Find a place that feels like you.
            </h1>
            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal leading-relaxed">
              Thoughtful homes, trusted details, and a little more room to imagine.
            </p>
          </div>

          {/* Explore the Map Pill Button */}
          <Link
            href="/listings?view=map"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs self-start md:self-end transition-all hover:shadow-sm"
          >
            <span className="text-xs text-[#0A5C4F]">✦</span>
            <span>Explore the map</span>
          </Link>
        </div>
      </section>

      {/* 2. FLOATING SEARCH CARD CONSOLE (Exact Reference Image 1 Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-4 sm:p-6 space-y-4">
          
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
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Dubai, United Arab Emirates"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-700 truncate mt-0.5"
                />
              </div>

              {/* 2. PROPERTY TYPE */}
              <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 relative hover:border-slate-300 transition-colors flex flex-col justify-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer pr-6 mt-0.5"
                >
                  <option value="">All residential</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>

              {/* 3. PRICE RANGE */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 relative hover:border-slate-300 transition-colors flex flex-col justify-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Price Range
                </label>
                <select
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer pr-6 mt-0.5"
                >
                  <option value="">AED 1M – 5M</option>
                  <option value="2000000">Under 2M AED</option>
                  <option value="5000000">AED 1M – 5M</option>
                  <option value="10000000">AED 5M – 10M</option>
                  <option value="25000000">AED 10M+</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>

              {/* 4. BEDS & BATHS */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 relative hover:border-slate-300 transition-colors flex flex-col justify-center">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Beds & Baths
                </label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer pr-6 mt-0.5"
                >
                  <option value="">Any</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
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

              <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <span className="border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-mono bg-slate-50">⌘ K</span>
                <span>Quick search</span>
              </div>
            </div>

          </form>

        </div>
      </section>

      {/* 3. SECTION: "Homes picked for you" (Exact Reference Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Homes picked for you
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              1,248 homes in Dubai · Updated just now
            </p>
          </div>

          {/* Recommended Sort Pill */}
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              <span>Recommended</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 3-Column Grid Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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

      {/* 5. EDITORIAL "ABOUT US" SECTION (Exact Content & Layout of Image 3 Top Block) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Terracotta/Orange Pill Eyebrow */}
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] block mb-3">
            about us
          </span>
          {/* Main Editorial Statement */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug mb-4">
            A home is more than an address. It is the setting for your ambitions, the backdrop to your everyday life, and an investment in what comes next.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            At Brickyard, we bring together distinctive properties and a more considered way to discover them — with thoughtful curation, local insight, and a personal approach.
          </p>
        </div>

        {/* 4 Feature Pillars (Exact 4 items from Image 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          
          {/* Pillar 1: Curated Excellence */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B35] flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <Gem className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Curated Excellence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover distinctive homes selected for their architecture, quality, and character.
              </p>
            </div>
          </div>

          {/* Pillar 2: Prime Locations */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0A5C4F] flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Prime Locations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore sought-after neighborhoods and exceptional addresses worth discovering.
              </p>
            </div>
          </div>

          {/* Pillar 3: Personal Guidance */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                Personal Guidance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get tailored support to help you make confident, informed property decisions.
              </p>
            </div>
          </div>

          {/* Pillar 4: A Seamless Journey */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                A Seamless Journey
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Move from discovery to your next chapter with a clear, thoughtfully guided process.
              </p>
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

    </div>
  );
}
