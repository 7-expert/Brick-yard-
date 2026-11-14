'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BrowseNewProjects({ onRegisterInterest }) {
  const [activeLocation, setActiveLocation] = useState('All');

  const locations = ['All', 'New York', 'Miami Beach', 'Beverly Hills', 'Connecticut'];

  // Curated developments using our site's actual photos
  const developments = {
    featured: {
      id: 'dev-1',
      title: 'Provenza Residences',
      type: 'LUXURY CONDOMINIUMS',
      location: 'Downtown, New York',
      city: 'New York',
      image: '/luxury_penthouse_1790348346204.jpg',
      price: '$1.25M',
      handover: 'Q4 2026',
      badge: 'NEW LAUNCH',
    },
    stacked: [
      {
        id: 'dev-2',
        title: 'Derby Heights',
        type: 'BOUTIQUE LOFT RESIDENCES',
        location: 'Tribeca, New York',
        city: 'New York',
        image: '/urban_loft_1790348368465.jpg',
        price: '$2.10M',
        handover: 'Q2 2027',
        badge: 'FAST SELLING',
      },
      {
        id: 'dev-3',
        title: 'D Villas Waterfront',
        type: 'PRIVATE OCEANFRONT VILLAS',
        location: 'Miami Beach, Florida',
        city: 'Miami Beach',
        image: '/waterfront_villa_1790348391865.jpg',
        price: '$4.85M',
        handover: 'Q4 2027',
        badge: 'EXCLUSIVE',
      },
      {
        id: 'dev-4',
        title: 'Greencrest Modern Estates',
        type: 'CONTEMPORARY GLASS VILLAS',
        location: 'Beverly Hills, California',
        city: 'Beverly Hills',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        price: '$5.90M',
        handover: 'Ready',
        badge: 'FEATURED',
      },
      {
        id: 'dev-5',
        title: 'The Sovereign Manor',
        type: 'HISTORIC COUNTRY COMPOUND',
        location: 'Greenwich, Connecticut',
        city: 'Connecticut',
        image: '/suburban_home_1790348356763.jpg',
        price: '$2.85M',
        handover: 'Ready',
        badge: 'NEW RELEASE',
      },
    ],
  };

  const getFilteredProjects = () => {
    if (activeLocation === 'All') {
      return {
        featured: developments.featured,
        stacked: developments.stacked.slice(0, 2),
      };
    }
    const all = [developments.featured, ...developments.stacked];
    const matching = all.filter((p) => p.city === activeLocation);
    if (matching.length === 0) {
      return {
        featured: developments.featured,
        stacked: developments.stacked.slice(0, 2),
      };
    }
    return {
      featured: matching[0],
      stacked: matching.slice(1).concat(all.filter((p) => p.id !== matching[0].id)).slice(0, 2),
    };
  };

  const current = getFilteredProjects();

  return (
    <section className="w-full bg-[#FAF7F2] py-24 px-6 sm:px-8 lg:px-12 text-[#162E22]" id="new-projects">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#66776F] uppercase block mb-3">
              CURATED DEVELOPMENTS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#162E22] font-normal tracking-tight leading-[1.08]">
              Extraordinary places.<br />
              Exceptional possibilities.
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <p className="text-xs sm:text-sm text-[#506057] font-light max-w-xs md:text-right leading-relaxed">
              Explore world-class residential towers, private villas, and landmark developments.
            </p>
            <Link
              href="/listings"
              className="text-xs font-mono tracking-wider text-[#162E22] font-medium underline underline-offset-4 hover:text-[#254B38] transition-colors mt-1"
            >
              View all projects ↗
            </Link>
          </div>
        </div>

        {/* Location Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 my-8 scrollbar-none">
          {locations.map((loc) => {
            const isActive = activeLocation === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocation(loc)}
                className={`px-5 py-2 text-xs font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#162E22] text-[#FAF7F2]'
                    : 'bg-[#EDE5D8] hover:bg-[#E2D8C8] text-[#24332B]'
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>

        {/* Grid: 1 Large Left Card + 2 Stacked Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Large Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E8E1D5] flex flex-col justify-between shadow-sm overflow-hidden group">
            {/* Image */}
            <div className="relative h-[340px] sm:h-[440px] w-full overflow-hidden bg-black/5">
              <img
                src={current.featured.image}
                alt={current.featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-white/95 text-[#162E22] text-[10px] font-mono tracking-[0.15em] px-3 py-1 uppercase shadow-sm">
                {current.featured.badge}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-8 bg-[#FAF7F2] border-t border-[#E8E1D5] flex flex-col justify-between flex-grow">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#6B7971] block mb-1">
                  {current.featured.type}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#162E22] font-normal tracking-tight">
                  {current.featured.title}
                </h3>
                <p className="text-xs text-[#5C6A62] mt-1 font-light">
                  {current.featured.location}
                </p>
              </div>

              {/* Specs & Register Button */}
              <div className="mt-8 pt-6 border-t border-[#E8E1D5] flex items-end justify-between gap-4">
                <div className="flex gap-8">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-[#7A8880] uppercase block">
                      FROM
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-[#162E22] font-medium block mt-0.5">
                      {current.featured.price}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] text-[#7A8880] uppercase block">
                      HANDOVER
                    </span>
                    <span className="text-sm sm:text-base text-[#162E22] font-sans font-medium block mt-1">
                      {current.featured.handover}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRegisterInterest(current.featured.title, `Curated Development: ${current.featured.title}`)}
                  className="bg-[#162E22] hover:bg-[#254B38] text-[#FAF7F2] px-6 py-3 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Register Interest</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Stacked Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {current.stacked.map((item) => (
              <div
                key={item.id}
                className="bg-[#F4EEE4] border border-[#E8E1D5] flex flex-col sm:flex-row flex-1 shadow-sm overflow-hidden group"
              >
                {/* Image */}
                <div className="relative sm:w-[45%] h-52 sm:h-auto overflow-hidden bg-black/5 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-[#162E22] text-[9px] font-mono tracking-[0.15em] px-2.5 py-0.5 uppercase shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:w-[55%] flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#6B7971] block mb-1">
                      {item.type}
                    </span>
                    <h4 className="font-serif text-2xl text-[#162E22] font-normal tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5C6A62] mt-0.5 font-light">
                      {item.location}
                    </p>

                    {/* Specs */}
                    <div className="flex gap-6 mt-6 pt-4 border-t border-[#E8E1D5]/80">
                      <div>
                        <span className="text-[9px] font-mono tracking-[0.2em] text-[#7A8880] uppercase block">
                          FROM
                        </span>
                        <span className="font-serif text-lg text-[#162E22] font-medium block">
                          {item.price}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-[0.2em] text-[#7A8880] uppercase block">
                          HANDOVER
                        </span>
                        <span className="text-xs text-[#162E22] font-sans font-medium block mt-1">
                          {item.handover}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Register Interest Button */}
                  <button
                    type="button"
                    onClick={() => onRegisterInterest(item.title, `Curated Development: ${item.title}`)}
                    className="mt-6 w-full bg-[#162E22] hover:bg-[#254B38] text-[#FAF7F2] py-2.5 text-center text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Register Interest</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
