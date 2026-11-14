'use client';

import React, { useState } from 'react';
import { MapPin, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export default function BrowseNewProjects({ onRegisterInterest }) {
  const [activeLocation, setActiveLocation] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const locations = ['All', 'New York', 'Miami Beach', 'Beverly Hills', 'Connecticut'];

  // All curated development places using site photos
  const allProjects = [
    {
      id: 'proj-1',
      title: 'Provenza Residences',
      type: 'Luxury Condominiums',
      location: 'Downtown, New York',
      city: 'New York',
      image: '/luxury_penthouse_1790348346204.jpg',
      launchPrice: '$1.25M',
      handover: 'Q4 2026',
      badge: 'NEW LAUNCH',
    },
    {
      id: 'proj-2',
      title: 'Waterfront Villa Sanctuary',
      type: 'Private Oceanfront Villas',
      location: 'Palm Oceanfront, Miami Beach',
      city: 'Miami Beach',
      image: '/waterfront_villa_1790348391865.jpg',
      launchPrice: '$4.85M',
      handover: 'Q4 2027',
      badge: 'EXCLUSIVE',
    },
    {
      id: 'proj-3',
      title: 'Derby Heights',
      type: 'Boutique Loft Residences',
      location: 'Tribeca Historic Quarter, NY',
      city: 'New York',
      image: '/urban_loft_1790348368465.jpg',
      launchPrice: '$2.10M',
      handover: 'Q2 2027',
      badge: 'BOUTIQUE',
    },
    {
      id: 'proj-4',
      title: 'The Sovereign Manor',
      type: 'Historic Country Estates',
      location: 'Backcountry, Greenwich CT',
      city: 'Connecticut',
      image: '/suburban_home_1790348356763.jpg',
      launchPrice: '$2.85M',
      handover: 'Ready',
      badge: 'FEATURED',
    },
    {
      id: 'proj-5',
      title: 'Greencrest Modern Estates',
      type: 'Cantilevered Glass Villas',
      location: 'Promontory, Beverly Hills CA',
      city: 'Beverly Hills',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      launchPrice: '$5.90M',
      handover: 'Ready to Move',
      badge: 'ICONIC',
    },
    {
      id: 'proj-6',
      title: 'SoHo Design Atelier',
      type: 'Architectural Showroom Space',
      location: 'Cast Iron District, New York',
      city: 'New York',
      image: '/commercial_space_1790348379162.jpg',
      launchPrice: '$3.40M',
      handover: 'Q3 2026',
      badge: 'COMMERCIAL',
    },
    {
      id: 'proj-7',
      title: 'Sonoran Courtyard Sanctuary',
      type: 'Resort-Style Desert Villas',
      location: 'Private Gated Enclave, Scottsdale',
      city: 'Beverly Hills',
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      launchPrice: '$3.75M',
      handover: 'Q1 2027',
      badge: 'RESORT STYLE',
    },
    {
      id: 'proj-8',
      title: 'Modern Alpine Glass Villa',
      type: 'Ski-in / Ski-out Mountain Retreat',
      location: 'Red Mountain, Aspen CO',
      city: 'Connecticut',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      launchPrice: '$2.10M',
      handover: 'Ready to Move',
      badge: 'ALPINE',
    },
  ];

  const filteredProjects = activeLocation === 'All'
    ? allProjects
    : allProjects.filter((p) => p.city === activeLocation);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section className="w-full bg-[#FAF7F2] py-20 px-6 sm:px-8 lg:px-12 text-[#162E22]" id="new-projects">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#6A7870] uppercase block mb-2">
              CURATED DEVELOPMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#162E22] font-normal tracking-tight leading-[1.1]">
              Extraordinary places.<br />
              Exceptional possibilities.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#526058] font-light max-w-xs md:text-right leading-relaxed">
            Explore world-class residential towers, private villas, and landmark architectural developments.
          </p>
        </div>

        {/* Location Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 my-6 scrollbar-none">
          {locations.map((loc) => {
            const isActive = activeLocation === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setActiveLocation(loc);
                  setShowAll(false);
                }}
                className={`px-5 py-2 text-xs font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer rounded-sm ${
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

        {/* CSS Grid (4 Columns Desktop, 2 Columns Tablet, 1 Column Mobile) - NO SCROLLBAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[#162E22] text-[9px] font-mono tracking-[0.15em] px-2.5 py-1 uppercase shadow-xs">
                  {project.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#162E22] tracking-tight group-hover:text-[#1B8354] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#6F7D75] mt-0.5">
                    {project.type}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-[#526058] mt-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1B8354] shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  {/* Two-Column Specs Box */}
                  <div className="grid grid-cols-2 gap-2 bg-[#F6FAF8] p-3 rounded-xl border border-[#E8F2EC] my-4 text-center">
                    <div className="border-r border-[#E2EBE6] pr-2">
                      <span className="text-[10px] text-[#6F7D75] uppercase font-medium block">
                        Launch Price
                      </span>
                      <span className="text-sm font-bold text-[#162E22]">
                        {project.launchPrice}
                      </span>
                    </div>
                    <div className="pl-2">
                      <span className="text-[10px] text-[#6F7D75] uppercase font-medium block">
                        Handover
                      </span>
                      <span className="text-sm font-bold text-[#1B8354]">
                        {project.handover}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Register Interest Button */}
                <button
                  type="button"
                  onClick={() => onRegisterInterest(project.title, `Curated Development: ${project.title}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF7EE] hover:bg-[#1B8354] hover:text-white text-[#057A44] font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group/btn"
                >
                  <MessageSquare className="w-4 h-4 text-[#057A44] group-hover/btn:text-white transition-colors" />
                  <span>Register Interest</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All / Toggle Button at Bottom */}
        {filteredProjects.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-xl bg-[#EAF7EE] hover:bg-[#D5EFE0] text-[#057A44] font-bold text-xs tracking-wide transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Developments' : `View All ${filteredProjects.length} Developments`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
