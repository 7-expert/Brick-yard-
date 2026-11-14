'use client';

import React, { useState, useRef } from 'react';
import { MapPin, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';

export default function BrowseNewProjects({ onRegisterInterest }) {
  const [activeLocation, setActiveLocation] = useState('All');
  const scrollContainerRef = useRef(null);

  const locations = ['All', 'New York', 'Miami Beach', 'Beverly Hills', 'Connecticut'];

  // All curated development cards matching Image 3
  const projects = [
    {
      id: 'proj-1',
      title: 'Provenza Residences',
      type: 'Luxury Condos',
      location: 'Provenza Residences, Downtown New York',
      city: 'New York',
      image: '/luxury_penthouse_1790348346204.jpg',
      launchPrice: '$1.25M',
      handover: 'Q4 2026',
    },
    {
      id: 'proj-2',
      title: 'Waterfront Villa Sanctuary',
      type: 'Private Villas',
      location: 'D Villas, Palm Oceanfront, Miami Beach',
      city: 'Miami Beach',
      image: '/waterfront_villa_1790348391865.jpg',
      launchPrice: '$4.85M',
      handover: 'Q4 2027',
    },
    {
      id: 'proj-3',
      title: 'Derby Heights',
      type: 'Boutique Lofts',
      location: 'Derby Heights, Tribeca Historic Quarter',
      city: 'New York',
      image: '/urban_loft_1790348368465.jpg',
      launchPrice: '$2.10M',
      handover: 'Q2 2027',
    },
    {
      id: 'proj-4',
      title: 'The Sovereign Manor',
      type: 'Historic Country Estates',
      location: 'The Sovereign, Backcountry Greenwich',
      city: 'Connecticut',
      image: '/suburban_home_1790348356763.jpg',
      launchPrice: '$2.85M',
      handover: 'Q1 2027',
    },
    {
      id: 'proj-5',
      title: 'Greencrest Glass House',
      type: 'Modernist Hilltop Villas',
      location: 'Greencrest Promontory, Beverly Hills',
      city: 'Beverly Hills',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      launchPrice: '$5.90M',
      handover: 'Ready',
    },
  ];

  const filteredProjects = activeLocation === 'All'
    ? projects
    : projects.filter(p => p.city === activeLocation);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
                onClick={() => setActiveLocation(loc)}
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

        {/* Responsive Horizontal Grid / Carousel (Matching Image 3) */}
        <div className="relative group/carousel mt-4">
          
          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="w-[280px] sm:w-[310px] md:w-[325px] shrink-0 bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between snap-start group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Details */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#162E22] tracking-tight group-hover:text-[#1B8354] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#6F7D75] mt-0.5">
                      {project.type}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-[#526058] mt-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1B8354] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    {/* Specs Box: Launch Price & Handover */}
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

                  {/* Register Interest Button (Green matching Image 3) */}
                  <button
                    type="button"
                    onClick={() => onRegisterInterest(project.title, `Curated Development: ${project.title}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#EAF7EE] hover:bg-[#D5EFE0] text-[#057A44] font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-[#057A44]" />
                    <span>Register Interest</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Next Arrow (Floating on the right edge) */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E0D7C9] text-[#162E22] hover:bg-[#162E22] hover:text-white transition-all items-center justify-center cursor-pointer active:scale-95"
            aria-label="Next properties"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Button matching Image 3 */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('#rental-plans');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-xl bg-[#EAF7EE] hover:bg-[#D5EFE0] text-[#057A44] font-bold text-xs tracking-wide transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>View all developments</span>
            <span>↗</span>
          </button>
        </div>

      </div>
    </section>
  );
}
