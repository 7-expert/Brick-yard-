'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  MapPin,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  Compass,
  Play,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import ListingCard from '@/components/ui/ListingCard';
import Badge from '@/components/ui/Badge';
import LeadForm from '@/components/ui/LeadForm';
import {
  DUBAI_PROPERTIES,
  DUBAI_PROJECTS,
  DUBAI_AREA_GUIDES,
  TRUBROKER_AGENTS,
} from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';

export default function HomeClient() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter curated subsets
  const verifiedSaleListings = DUBAI_PROPERTIES.filter((p) => p.purpose === 'sale');
  const rentalListings = DUBAI_PROPERTIES.filter((p) => p.purpose === 'rent');

  const openProjectLeadModal = (project) => {
    setSelectedProject(project);
    setLeadModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col bg-slate-50 text-slate-900">
      
      {/* 1. SEARCH-FIRST HERO (Bayut Information Architecture & Visual Reference) */}
      <section className="relative w-full bg-slate-900 text-white pt-10 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden">
        {/* Lifestyle Interior Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_lifestyle_banner.jpg"
            alt="Real homes live here - Luxury living space"
            className="w-full h-full object-cover object-center brightness-60"
          />
          {/* Subtle gradient overlay to guarantee text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 pointer-events-none" />
        </div>

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.12] mb-2 sm:mb-3">
            Real homes live here
          </h1>
          <p className="text-sm sm:text-lg text-emerald-100 font-medium max-w-xl mb-6 sm:mb-8">
            Real Data. Real Brokers. Real Properties.
          </p>

          {/* SearchBar (Properties, New Projects, Transactions, Agents - TruEstimate removed per user instruction) */}
          <SearchBar className="text-left w-full" />

          {/* Experience the Journey Pill */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('featured-projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
              </div>
              <span>Experience the Journey</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. SECTION AFTER HERO: 2 BANNERS + 3 LIGHT FEATURE CARDS (Reference Image 2) */}
      <section className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-12 space-y-5">
        
        {/* BANNER 1: Sell or Rent Your Property with Confidence */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A5C4F] via-[#0C6A5B] to-[#0A5C4F] text-white p-5 sm:p-7 shadow-sm border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left: Illustrated city graphic */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden md:flex shrink-0 items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
              <Building2 className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-emerald-100">
                  Sale & Rent
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Sell or Rent Your Property with Confidence
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100">
                Connect with a trusted agent to secure the best deal, faster.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <Link
            href="/contact?type=sell-or-rent"
            className="tap-target px-5 py-2.5 rounded-lg bg-white hover:bg-emerald-50 text-[#0A5C4F] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* BANNER 2: Find a TruBroker™ */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A5C4F] text-white p-4 sm:p-6 shadow-sm border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Overlapping Agent Avatars */}
            <div className="flex -space-x-2 shrink-0">
              {TRUBROKER_AGENTS.map((agent, idx) => (
                <div key={agent.id} className="relative w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-700">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900" />
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center justify-center sm:justify-start gap-1.5">
                <span>Find a TruBroker™</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Find trusted agents awarded for their excellent performance
              </p>
            </div>
          </div>

          {/* Right Button */}
          <Link
            href="/agents"
            className="tap-target px-5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs shrink-0 flex items-center gap-1.5"
          >
            <span>Find My Agent</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 LIGHT FEATURE CARDS (TruEstimate, Search 2.0, Map View - Reference Image 2 "make light this design") */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
          
          {/* Card 1: TruEstimate™ */}
          <Link
            href="/contact?type=valuation"
            className="group relative bg-[#F0FDF9] hover:bg-[#E6F8F2] border border-emerald-100/90 rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between min-h-[170px]"
          >
            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0A5C4F] transition-colors">
                TruEstimate™
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1 group-hover:text-[#0A5C4F]">
                <span>Find out how much your property is worth</span>
                <span className="text-[#0A5C4F] font-bold">›</span>
              </p>
            </div>

            {/* Illustration: Vector Building with Price Tag */}
            <div className="mt-4 flex items-end justify-between">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                AI Valuation
              </span>
              <div className="w-16 h-14 relative flex items-end justify-center">
                <svg viewBox="0 0 64 56" className="w-full h-full text-emerald-600/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="18" y="12" width="28" height="40" rx="2" fill="#E6F2F0" />
                  <line x1="24" y1="20" x2="28" y2="20" />
                  <line x1="34" y1="20" x2="38" y2="20" />
                  <line x1="24" y1="28" x2="28" y2="28" />
                  <line x1="34" y1="28" x2="38" y2="28" />
                  <line x1="24" y1="36" x2="28" y2="36" />
                  <line x1="34" y1="36" x2="38" y2="36" />
                  <circle cx="48" cy="14" r="8" fill="#FF6B35" stroke="none" />
                  <text x="48" y="17" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">$$</text>
                </svg>
              </div>
            </div>
          </Link>

          {/* Card 2: Search 2.0 */}
          <Link
            href="/listings"
            className="group relative bg-[#F0FDF9] hover:bg-[#E6F8F2] border border-emerald-100/90 rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between min-h-[170px]"
          >
            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0A5C4F] transition-colors">
                Search 2.0
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1 group-hover:text-[#0A5C4F]">
                <span>Find homes by drive time</span>
                <span className="text-[#0A5C4F] font-bold">›</span>
              </p>
            </div>

            {/* Illustration: Vector Car on road */}
            <div className="mt-4 flex items-end justify-between">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                Commute Filter
              </span>
              <div className="w-18 h-14 relative flex items-end justify-center">
                <svg viewBox="0 0 72 48" className="w-full h-full text-emerald-600/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 38 L68 38" strokeDasharray="3 3" />
                  <path d="M12 34 L18 20 Q22 16 32 16 L44 16 Q52 16 56 22 L62 34 Z" fill="#0A5C4F" stroke="none" />
                  <circle cx="24" cy="36" r="5" fill="#334155" stroke="none" />
                  <circle cx="50" cy="36" r="5" fill="#334155" stroke="none" />
                  <circle cx="56" cy="12" r="3" fill="#10B981" stroke="none" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card 3: Map View */}
          <Link
            href="/listings?view=map"
            className="group relative bg-[#F0FDF9] hover:bg-[#E6F8F2] border border-emerald-100/90 rounded-2xl p-6 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between min-h-[170px]"
          >
            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#0A5C4F] transition-colors">
                Map View
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1 group-hover:text-[#0A5C4F]">
                <span>Search for properties in preferred areas using a map</span>
                <span className="text-[#0A5C4F] font-bold">›</span>
              </p>
            </div>

            {/* Illustration: Map Pin on hills */}
            <div className="mt-4 flex items-end justify-between">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                Polygon Search
              </span>
              <div className="w-18 h-14 relative flex items-end justify-center">
                <svg viewBox="0 0 72 48" className="w-full h-full text-emerald-600/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 40 Q24 24 40 34 T70 30" fill="none" stroke="#A7F3D0" strokeWidth="2" />
                  <circle cx="48" cy="18" r="6" fill="#F59E0B" stroke="none" />
                  <path d="M48 24 L48 34" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="26" cy="22" r="4" fill="#0A5C4F" stroke="none" />
                </svg>
              </div>
            </div>
          </Link>

        </div>

      </section>

      {/* 3. POPULAR NEW PROJECTS IN UAE (Image 8 Benchmark Card Grid) */}
      <section id="featured-projects" className="w-full bg-white border-y border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0A5C4F] text-xs font-semibold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Off-Plan Releases</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Popular New Projects in UAE
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Handpicked developer releases in prime master communities with direct developer payment plans.
              </p>
            </div>

            <Link
              href="/projects"
              className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
            >
              <span>Explore all new projects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Projects Card Grid (Design Reference Image 8) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUBAI_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                {/* 4:3 Project Thumbnail with badge */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 text-slate-900 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                    {project.badge}
                  </span>
                </div>

                {/* Project Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0A5C4F] transition-colors leading-snug">
                      {project.name}
                    </h3>
                    
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      {project.unitsAvailable.includes('Villa') ? 'Villas' : 'Apartments'}
                    </span>

                    <p className="flex items-center gap-1 text-xs text-slate-500 mt-1.5 mb-3.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.location}, Dubai</span>
                    </p>

                    {/* Side-by-Side Specs Box (Launch Price | Handover - Reference Image 8) */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs mb-4 flex items-center justify-between">
                      <div className="flex-1 pr-2 border-r border-slate-200/80">
                        <span className="text-slate-400 text-[10px] uppercase font-semibold block">Launch Price</span>
                        <span className="font-bold text-[#0A5C4F] text-xs sm:text-sm">
                          {formatAED(project.startingPrice)}
                        </span>
                      </div>
                      <div className="flex-1 pl-3">
                        <span className="text-slate-400 text-[10px] uppercase font-semibold block">Handover</span>
                        <span className="font-bold text-slate-800 text-xs sm:text-sm">
                          {project.handoverDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Register Interest WhatsApp Action Button (Image 8 style) */}
                  <button
                    type="button"
                    onClick={() => openProjectLeadModal(project)}
                    className="tap-target w-full py-2.5 px-3 rounded-lg bg-[#E6F2F0] hover:bg-[#D5EBE8] text-[#0A5C4F] font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 text-[#0A5C4F]" />
                    <span>Register Interest</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom "View all projects in Dubai >" button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="tap-target inline-flex items-center gap-1 px-6 py-2.5 rounded-full bg-[#E6F2F0] hover:bg-[#D5EBE8] text-[#0A5C4F] text-xs sm:text-sm font-bold tracking-wide transition-colors"
            >
              <span>View all projects in Dubai</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. CURATED RAIL: TruBroker™ Verified Sale Listings */}
      <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F2F0] text-[#0A5C4F] text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>TruBroker™ Certified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Properties for Sale
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked residences verified for title deed, price accuracy, and immediate availability.
            </p>
          </div>

          <Link
            href="/listings?purpose=sale"
            className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
          >
            <span>View all properties for sale</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-col Responsive Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {verifiedSaleListings.slice(0, 4).map((property) => (
            <ListingCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 5. CURATED RAIL: Popular Dubai Communities */}
      <section className="w-full bg-white border-y border-slate-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
                <Compass className="w-3.5 h-3.5 text-[#0A5C4F]" />
                <span>Location Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Explore Popular Dubai Communities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                In-depth rental yields, price trends, schools, and transport guides for Dubai's prime submarkets.
              </p>
            </div>

            <Link
              href="/areas"
              className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
            >
              <span>View all area guides</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Community Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUBAI_AREA_GUIDES.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={area.heroImage}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block mb-0.5">
                      Average ROI: {area.roi}
                    </span>
                    <h3 className="font-bold text-base leading-tight text-white">
                      {area.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 text-xs">
                  <p className="text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {area.overview}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                    <span>1BHK Avg: <strong>{formatAED(area.avgRent1Bed)}/yr</strong></span>
                    <span className="font-semibold text-[#0A5C4F] group-hover:underline flex items-center gap-0.5">
                      Read guide →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CURATED RAIL: Recently Added Verified Rentals */}
      <section className="w-full max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Rental Market</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Verified Dubai Rentals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse move-in ready apartments and townhouses with yearly and flexible payment terms.
            </p>
          </div>

          <Link
            href="/listings?purpose=rent"
            className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
          >
            <span>View all rental properties</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rentalListings.slice(0, 3).map((property) => (
            <ListingCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 7. HIGH-CONVERSION LANDLORD & OWNER VALUATION BANNER */}
      <section className="w-full max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-12">
        <div className="bg-[#0A5C4F] rounded-2xl text-white p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-3">
              Owners & Landlords
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
              Thinking of selling or leasing your Dubai home?
            </h2>
            <p className="text-sm text-emerald-100 font-normal leading-relaxed">
              Connect with our licensed TruBroker™ specialists to get an instant comparative market valuation and reach 250,000+ verified active buyers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/contact?type=valuation"
              className="tap-target px-6 py-3.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85522] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all text-center"
            >
              Request Free Valuation
            </Link>
            <a
              href="tel:+971501182342"
              className="tap-target px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm transition-colors text-center"
            >
              Speak with Advisor
            </a>
          </div>
        </div>
      </section>

      {/* LEAD MODAL FOR NEW PROJECTS */}
      {leadModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              ✕
            </button>
            
            <div className="mb-4">
              <span className="text-xs font-bold text-[#0A5C4F] uppercase tracking-wider">
                Register Your Interest
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
