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
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Calculator,
  Navigation,
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
      
      {/* 1. CINEMATIC HERO SECTION (Unique Luxury Architectural Aesthetic) */}
      <section className="relative w-full min-h-[580px] sm:min-h-[660px] flex items-center justify-center text-white px-4 sm:px-6 lg:px-12 py-16 sm:py-24 overflow-hidden">
        {/* Luxury Architectural Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/waterfront_villa_1790348391865.jpg"
            alt="Exceptional Dubai Living - Waterfront Villa"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000"
          />
          {/* Rich luxury charcoal & emerald vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85 pointer-events-none" />
        </div>

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10 w-full">
          
          {/* Eyebrow Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>Dubai's Premier Architectural Brokerage</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.12] mb-3">
            Exceptional Living in Dubai
          </h1>
          <p className="text-sm sm:text-lg text-emerald-100/90 font-normal max-w-2xl mb-8 leading-relaxed">
            Curated luxury residences, verified market data, and private client advisory across Dubai’s most coveted master communities.
          </p>

          {/* Luxury Cohesive Search Console */}
          <SearchBar className="text-left w-full" />

        </div>
      </section>

      {/* 2. TRUST & MARKET VOLUME STRIP */}
      <section className="w-full bg-white border-b border-slate-200/80 py-6 px-4 sm:px-6 lg:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
          <div className="flex flex-col items-center px-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">AED 18.5B+</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Transacted Volume</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#0A5C4F] tracking-tight">15,200+</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Verified Dubai Residences</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">100% RERA</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Regulated & Compliant</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#FF6B35] tracking-tight">&lt; 5 mins</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Prime Advisor Response Time</span>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL INTELLIGENCE & PRIVATE CLIENT SERVICES (Original Bespoke Design) */}
      <section className="w-full max-w-7xl mx-auto py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4F] bg-[#E6F2F0] px-3 py-1 rounded-full inline-block mb-2">
            Intelligence Meets Intuition
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Designed around your property journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Advanced valuation algorithms, lifestyle navigation, and bespoke private client brokerage tailored to discerning buyers and investors.
          </p>
        </div>

        {/* 3 Architectural Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Valuation Engine */}
          <Link
            href="/contact?type=valuation"
            className="group bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6F2F0] text-[#0A5C4F] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Property Valuation
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0A5C4F] transition-colors mb-2">
                Instant Market Estimate
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Receive algorithmic market valuations calculated against official Dubai Land Department transaction history and live absorption metrics.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#0A5C4F] group-hover:underline">
              <span>Calculate home value</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Lifestyle & Commute Filter */}
          <Link
            href="/listings"
            className="group bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#FF6B35] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Lifestyle Navigation
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0A5C4F] transition-colors mb-2">
                Commute & Lifestyle Search
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Filter Dubai residences by exact commute times to DIFC and Downtown, proximity to accredited private schools, and marina yacht moorings.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#0A5C4F] group-hover:underline">
              <span>Explore lifestyle filters</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Interactive Location Map */}
          <Link
            href="/listings?view=map"
            className="group bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0A5C4F] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Navigation className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Location Intelligence
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0A5C4F] transition-colors mb-2">
                Interactive Polygon Map
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pinpoint prime waterfront and golf communities using dynamic polygon boundaries, live price clustering, and metro proximity overlays.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#0A5C4F] group-hover:underline">
              <span>Launch interactive map</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* Private Client Advisory Full-Width Strip */}
        <div className="bg-gradient-to-r from-[#0A5C4F] to-[#08493F] rounded-2xl text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block mb-1">
              Private Client Advisory
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
              Selling or leasing an exceptional Dubai property?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Connect directly with our licensed senior advisors for discreet marketing, institutional valuation, and targeted exposure to verified international buyers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact?type=sell-or-rent"
              className="tap-target px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0A5C4F] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs"
            >
              List with Brickyard
            </Link>
            <a
              href="tel:+971501182342"
              className="tap-target px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Specialist</span>
            </a>
          </div>
        </div>

      </section>

      {/* 4. CURATED DEVELOPMENTS: New Projects in UAE */}
      <section className="w-full bg-white border-y border-slate-200/80 py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] bg-amber-50 px-3 py-1 rounded-full inline-block mb-2">
                Off-Plan Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Curated New Developments
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Master-planned residences from Emaar, Nakheel, and Sobha with developer payment flexibility.
              </p>
            </div>

            <Link
              href="/projects"
              className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
            >
              <span>View all projects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Projects Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUBAI_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* 4:3 Project Thumbnail with badge */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                    {project.badge}
                  </span>
                </div>

                {/* Project Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#0A5C4F] uppercase tracking-wider block mb-1">
                      {project.developer}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0A5C4F] transition-colors leading-snug">
                      {project.name}
                    </h3>

                    <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.location}, Dubai</span>
                    </p>

                    {/* Architectural Spec Box */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs mb-4 flex items-center justify-between">
                      <div className="flex-1 pr-2 border-r border-slate-200/80">
                        <span className="text-slate-400 text-[10px] uppercase font-semibold block">Starting Price</span>
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

                  {/* Register Interest Action Button */}
                  <button
                    type="button"
                    onClick={() => openProjectLeadModal(project)}
                    className="tap-target w-full py-2.5 px-3 rounded-xl bg-[#0A5C4F] hover:bg-[#08493F] text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>Register Private Interest</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. VERIFIED PROPERTIES FOR SALE (4-Col Card Grid) */}
      <section className="w-full max-w-7xl mx-auto py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A5C4F] bg-[#E6F2F0] px-3 py-1 rounded-full inline-block mb-2">
              Verified Marketplace
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Featured Properties for Sale
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked residences verified for title deed, price authenticity, and immediate availability.
            </p>
          </div>

          <Link
            href="/listings?purpose=sale"
            className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
          >
            <span>View all sale properties</span>
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

      {/* 6. POPULAR DUBAI COMMUNITIES */}
      <section className="w-full bg-white border-y border-slate-200/80 py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full inline-block mb-2">
                Submarket Guides
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Explore Dubai Communities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                In-depth rental yields, price trends, and infrastructure analyses for Dubai’s premier enclaves.
              </p>
            </div>

            <Link
              href="/areas"
              className="tap-target inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors group"
            >
              <span>View all neighborhood guides</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Community Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUBAI_AREA_GUIDES.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={area.heroImage}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
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
                      Explore guide →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED RENTALS RAIL */}
      <section className="w-full max-w-7xl mx-auto py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
              Rental Collection
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Verified Dubai Rentals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse move-in ready residences with certified contracts and flexible payment cheques.
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

      {/* 8. HIGH-CONVERSION LANDLORD VALUATION BANNER */}
      <section className="w-full max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-12">
        <div className="bg-[#0A5C4F] rounded-3xl text-white p-8 sm:p-14 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle background motif */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-96 h-96">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
              <polygon points="50,0 100,50 50,100 0,50" />
            </svg>
          </div>

          <div className="max-w-xl relative z-10 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block mb-3">
              Owners & Institutional Landlords
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              List your Dubai residence with verified advisors.
            </h2>
            <p className="text-sm text-emerald-100 font-normal leading-relaxed">
              Connect directly with our licensed property directors to receive a complimentary comparative market analysis and present your home to verified pre-qualified buyers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 relative z-10">
            <Link
              href="/contact?type=valuation"
              className="tap-target px-7 py-3.5 rounded-xl bg-[#FF6B35] hover:bg-[#e85522] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all text-center active:scale-98"
            >
              Request Valuation
            </Link>
            <a
              href="tel:+971501182342"
              className="tap-target px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm transition-colors text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+971 50 118 2342</span>
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
                Direct Developer Registration
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
