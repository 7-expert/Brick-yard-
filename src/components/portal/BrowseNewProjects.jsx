'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MapPin, MessageSquare, ChevronLeft, ChevronRight, Sparkles, Building2, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BrowseNewProjects({ onRegisterInterest }) {
  const [activeLocation, setActiveLocation] = useState('All');
  const scrollContainerRef = useRef(null);

  const locations = ['All', 'New York', 'Miami Beach', 'Beverly Hills', 'Connecticut', 'Scottsdale'];

  const projects = [
    {
      id: 'proj-1',
      title: 'Provenza Residences',
      type: 'Luxury Condominiums',
      location: 'Downtown, New York',
      city: 'New York',
      image: '/luxury_penthouse_1790348346204.jpg',
      launchPrice: '$1.25M',
      handover: 'Q4 2026',
      badge: 'New Launch',
    },
    {
      id: 'proj-2',
      title: 'Derby Heights',
      type: 'Boutique Loft Residences',
      location: 'Tribeca, New York',
      city: 'New York',
      image: '/urban_loft_1790348368465.jpg',
      launchPrice: '$2.10M',
      handover: 'Q2 2027',
      badge: 'Fast Selling',
    },
    {
      id: 'proj-3',
      title: 'D Villas Waterfront',
      type: 'Private Oceanfront Villas',
      location: 'Miami Beach, Florida',
      city: 'Miami Beach',
      image: '/waterfront_villa_1790348391865.jpg',
      launchPrice: '$4.85M',
      handover: 'Q4 2027',
      badge: 'Exclusive',
    },
    {
      id: 'proj-4',
      title: 'Greencrest Glass House',
      type: 'Contemporary Architectural Estates',
      location: 'Beverly Hills, California',
      city: 'Beverly Hills',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      launchPrice: '$5.90M',
      handover: 'Ready to Move',
      badge: 'Ready',
    },
    {
      id: 'proj-5',
      title: 'The Sovereign Estate',
      type: 'Historic Manor & Grounds',
      location: 'Greenwich, Connecticut',
      city: 'Connecticut',
      image: '/suburban_home_1790348356763.jpg',
      launchPrice: '$2.85M',
      handover: 'Ready to Move',
      badge: 'Featured',
    },
    {
      id: 'proj-6',
      title: 'Sonoran Courtyard Sanctuary',
      type: 'Resort-Style Desert Villas',
      location: 'Scottsdale, Arizona',
      city: 'Scottsdale',
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      launchPrice: '$3.75M',
      handover: 'Q1 2027',
      badge: 'Upcoming',
    },
  ];

  const filteredProjects = activeLocation === 'All'
    ? projects
    : projects.filter(p => p.city === activeLocation);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="new-projects">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Curated Developments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-ink tracking-tight">
            Browse New Projects
          </h2>
          <p className="text-sm sm:text-base text-ink-soft mt-2 max-w-xl">
            Explore world-class residential towers, private villas, and landmark architectural developments.
          </p>
        </div>

        {/* Carousel arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-11 h-11 rounded-full border border-ink/15 bg-white text-ink hover:bg-ink hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-11 h-11 rounded-full border border-ink/15 bg-white text-ink hover:bg-ink hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Next projects"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Location Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {locations.map((loc) => {
          const isActive = activeLocation === loc;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => setActiveLocation(loc)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-ink text-gold-200 shadow-md ring-2 ring-gold-400/40'
                  : 'bg-white text-ink-soft hover:text-ink hover:bg-cream-dark border border-ink/10'
              }`}
            >
              {loc}
            </button>
          );
        })}
      </div>

      {/* Projects Cards Horizontal Scroll/Grid */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="min-w-[300px] sm:min-w-[340px] md:min-w-[360px] max-w-[380px] bg-white rounded-2xl overflow-hidden border border-ink/10 shadow-md hover:shadow-xl hover:border-gold-400/70 transition-all duration-300 flex flex-col snap-start group"
          >
            {/* Card Image */}
            <div className="relative h-56 w-full overflow-hidden bg-ink/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              
              {/* Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/95 text-ink shadow-sm backdrop-blur-md">
                {project.badge}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                <span className="text-xs font-semibold text-gold-700 uppercase tracking-wider block mb-1">
                  {project.type}
                </span>
                <h3 className="text-xl font-bold text-ink tracking-tight group-hover:text-gold-700 transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-1.5 text-xs text-ink-soft mt-1.5 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>

                {/* Specs Box: Launch Price & Handover */}
                <div className="grid grid-cols-2 gap-2 bg-cream-light/80 p-3 rounded-xl border border-ink/5 mb-5 text-center">
                  <div className="border-r border-ink/10 pr-2">
                    <span className="text-[10px] text-ink-soft/80 uppercase font-semibold block tracking-wider">
                      Launch Price
                    </span>
                    <span className="text-sm font-bold text-ink font-sans">
                      {project.launchPrice}
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="text-[10px] text-ink-soft/80 uppercase font-semibold block tracking-wider">
                      Handover
                    </span>
                    <span className="text-sm font-bold text-gold-700 font-sans">
                      {project.handover}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Register Interest */}
              <button
                type="button"
                onClick={() => onRegisterInterest(project.title, `New Development: ${project.title}`)}
                className="w-full py-3 px-4 rounded-xl bg-ink hover:bg-gold-500 text-gold-200 hover:text-ink font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-gold-400 group-hover:text-ink transition-colors" />
                <span>Register Interest</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

