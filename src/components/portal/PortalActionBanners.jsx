'use client';

import React from 'react';
import Link from 'next/link';

export default function PortalActionBanners({ onOpenBooking, onOpenEstimate }) {
  return (
    <section className="w-full bg-[#121614] text-[#FAF7F2] py-20 px-6 sm:px-8 lg:px-12 border-t border-[#1C2520]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#222E27]">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#869A8E] uppercase block mb-2">
              INTELLIGENCE, MEETS INTUITION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal tracking-tight">
              Designed around your life.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9BB1A5] font-light max-w-sm md:text-right leading-relaxed">
            More clarity. More possibilities. A better way home.
          </p>
        </div>

        {/* 3 Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10" id="val-estimate">
          
          {/* Card 1: TrueEstimate™ (Deep Forest Green) */}
          <div
            onClick={onOpenEstimate}
            className="group relative bg-[#1B382B] border border-[#274B3B] hover:border-[#3D6E57] p-8 flex flex-col justify-between min-h-[380px] transition-all duration-300 cursor-pointer shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8EB8A1]">
                  PROPERTY VALUATION
                </span>
                {/* Architectural Line-art: Modern house with upward graph */}
                <svg className="w-16 h-12 text-[#8EB8A1] stroke-current fill-none stroke-[1.2]" viewBox="0 0 64 48">
                  {/* House outline */}
                  <path d="M6 38V22H32V38H6Z" />
                  <path d="M18 22V12H44V38H32" />
                  <path d="M44 18H56V38H44" />
                  {/* Window lines */}
                  <line x1="12" y1="26" x2="26" y2="26" />
                  <line x1="12" y1="32" x2="26" y2="32" />
                  <line x1="24" y1="16" x2="38" y2="16" />
                  {/* Upward trend line & arrow */}
                  <path d="M38 12L52 4M52 4H44M52 4V12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal mt-16 group-hover:text-white transition-colors">
                TrueEstimate™
              </h3>
              <p className="text-xs sm:text-sm text-[#A8C8B7] mt-3 font-light leading-relaxed">
                Find out how much your property is worth in today's shifting market.
              </p>
            </div>

            <div className="pt-6 border-t border-[#274B3B]">
              <span className="text-xs font-mono tracking-wider text-[#8EB8A1] group-hover:text-white flex items-center gap-1.5 transition-colors">
                Calculate value <span>↗</span>
              </span>
            </div>
          </div>

          {/* Card 2: Search 2.0 (Warm Sand / Linen Beige) */}
          <Link
            href="/listings"
            className="group relative bg-[#DECEBA] text-[#16241C] p-8 flex flex-col justify-between min-h-[380px] transition-all duration-300 shadow-lg hover:brightness-105"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#665B4C]">
                  LIFESTYLE SEARCH
                </span>
                {/* Architectural Line-art: Compass & House crosshair */}
                <svg className="w-14 h-14 text-[#594F40] stroke-current fill-none stroke-[1.2]" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" strokeDasharray="3 3" />
                  <circle cx="28" cy="28" r="16" />
                  <line x1="28" y1="4" x2="28" y2="12" />
                  <line x1="28" y1="44" x2="28" y2="52" />
                  <line x1="4" y1="28" x2="12" y2="28" />
                  <line x1="44" y1="28" x2="52" y2="28" />
                  {/* House symbol in center */}
                  <path d="M21 32V25L28 20L35 25V32H21Z" />
                </svg>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#16241C] font-normal mt-16">
                Search 2.0
              </h3>
              <p className="text-xs sm:text-sm text-[#483F33] mt-3 font-light leading-relaxed">
                Filter homes by commute time, private school districts, and lifestyle amenities.
              </p>
            </div>

            <div className="pt-6 border-t border-[#CCAFA0]/60">
              <span className="text-xs font-mono tracking-wider text-[#16241C] group-hover:underline flex items-center gap-1.5 font-semibold">
                Explore lifestyle filters <span>↗</span>
              </span>
            </div>
          </Link>

          {/* Card 3: Interactive Property Map (Deep Architectural Charcoal) */}
          <Link
            href="/listings"
            className="group relative bg-[#18201C] border border-[#243029] hover:border-[#384A40] p-8 flex flex-col justify-between min-h-[380px] transition-all duration-300 shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8EB8A1]">
                  LOCATION INTELLIGENCE
                </span>
                {/* Architectural Line-art: Isometric 3D polygon map grid with pin */}
                <svg className="w-16 h-14 text-[#8EB8A1] stroke-current fill-none stroke-[1.2]" viewBox="0 0 64 56">
                  {/* Perspective grid polygon */}
                  <path d="M32 20L58 32L32 46L6 32L32 20Z" />
                  <path d="M19 26L45 38" strokeDasharray="2 2" />
                  <path d="M45 26L19 38" strokeDasharray="2 2" />
                  <line x1="32" y1="20" x2="32" y2="46" />
                  {/* Map Pin floating above */}
                  <circle cx="32" cy="12" r="4" fill="currentColor" />
                  <path d="M32 16L32 26" strokeWidth="1.5" />
                </svg>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-normal mt-16 group-hover:text-white transition-colors">
                Interactive Property Map
              </h3>
              <p className="text-xs sm:text-sm text-[#9BB1A5] mt-3 font-light leading-relaxed">
                Search for properties in your target neighbourhoods using interactive polygon boundaries.
              </p>
            </div>

            <div className="pt-6 border-t border-[#243029]">
              <span className="text-xs font-mono tracking-wider text-[#8EB8A1] group-hover:text-white flex items-center gap-1.5 transition-colors">
                Launch map search <span>↗</span>
              </span>
            </div>
          </Link>

        </div>

        {/* Bottom Banner: Sell or Rent Your Property */}
        <div className="mt-8 border border-[#25322A] bg-[#141A17] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8EB8A1] block mb-1">
              VERIFIED LISTING SERVICE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-normal tracking-tight">
              Sell or rent your property with confidence.
            </h3>
            <p className="text-xs sm:text-sm text-[#9BB1A5] font-light mt-1">
              Connect directly with verified valuation tools and private client services.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Sell or Rent Property Consultation', 'Property Listing & Valuation')}
            className="bg-[#DECEBA] hover:bg-[#E8DAC8] text-[#16241C] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Get started</span>
            <span>↗</span>
          </button>
        </div>

      </div>
    </section>
  );
}
