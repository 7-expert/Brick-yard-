'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Navigation as NavIcon, Map, ChevronRight } from 'lucide-react';

export default function PortalActionBanners({ onOpenBooking, onOpenEstimate }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Banner: Sell or Rent Your Property with Confidence */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#191917] via-[#2A2722] to-[#191917] border border-gold-200/20 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 group">
        {/* Ambient background decoration */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 top-0 bottom-0 w-32 bg-white/[0.02] -skew-x-12 pointer-events-none"></div>

        <div className="flex items-center gap-5 z-10 w-full md:w-auto">
          {/* Stylized architectural icon block */}
          <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gold-400/20 border border-gold-400/40 items-center justify-center shrink-0 shadow-inner">
            <span className="text-2xl">🏛️</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-200 text-[11px] font-bold tracking-wider uppercase mb-2">
              <span>Verified Listing Service</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-white tracking-tight">
              Sell or Rent Your Property with Confidence
            </h2>
            <p className="text-sm sm:text-base text-cream-light/80 mt-1 max-w-xl">
              Connect directly with verified valuation tools and private client services to secure the best deal, faster.
            </p>
          </div>
        </div>

        <div className="z-10 w-full md:w-auto shrink-0 flex justify-end">
          <button
            type="button"
            onClick={() => onOpenBooking('Sell or Rent Property Consultation', 'Property Listing & Valuation')}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-ink font-bold text-sm sm:text-base rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3-Card Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2" id="val-estimate">
        
        {/* Card 1: TruEstimate™ */}
        <div
          onClick={onOpenEstimate}
          className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-ink/10 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                AI Powered
              </span>
              <div className="w-10 h-10 rounded-xl bg-gold-100/60 text-gold-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-ink group-hover:text-gold-700 transition-colors">
              TruEstimate™
            </h4>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              Find out how much your property is worth in today's shifting market with real comps.
            </p>
          </div>

          <div className="mt-6 flex items-center text-sm font-bold text-ink group-hover:text-gold-700 transition-colors gap-1.5">
            <span>Calculate Value</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Search 2.0 */}
        <Link
          href="/listings"
          className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-ink/10 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink bg-cream-dark px-2.5 py-1 rounded-full border border-ink/10">
                Commute & Lifestyle
              </span>
              <div className="w-10 h-10 rounded-xl bg-ink/5 text-ink flex items-center justify-center group-hover:scale-110 transition-transform">
                <NavIcon className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-ink group-hover:text-gold-700 transition-colors">
              Search 2.0
            </h4>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              Filter homes by commute drive time, private school districts, and lifestyle amenities.
            </p>
          </div>

          <div className="mt-6 flex items-center text-sm font-bold text-ink group-hover:text-gold-700 transition-colors gap-1.5">
            <span>Explore Lifestyle Filters</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Map View */}
        <Link
          href="/listings"
          className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-ink/10 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink bg-cream-dark px-2.5 py-1 rounded-full border border-ink/10">
                Interactive
              </span>
              <div className="w-10 h-10 rounded-xl bg-ink/5 text-ink flex items-center justify-center group-hover:scale-110 transition-transform">
                <Map className="w-5 h-5" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-ink group-hover:text-gold-700 transition-colors">
              Interactive Map View
            </h4>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              Search for properties in your target neighborhoods using interactive polygon map boundaries.
            </p>
          </div>

          <div className="mt-6 flex items-center text-sm font-bold text-ink group-hover:text-gold-700 transition-colors gap-1.5">
            <span>Launch Map Search</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>

      </div>
    </section>
  );
}
