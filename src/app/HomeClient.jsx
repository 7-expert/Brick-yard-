'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, SlidersHorizontal, MapPin, Sparkles, Building2, MessageCircle } from 'lucide-react';
import ListingCard from '@/components/ui/ListingCard';
import LeadForm from '@/components/ui/LeadForm';
import {
  DUBAI_PROPERTIES,
  DUBAI_PROJECTS,
  DUBAI_AREA_GUIDES,
} from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';

export default function HomeClient() {
  const [activeCategory, setActiveCategory] = useState('Houses');
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'Houses', label: 'Houses', type: 'Villa' },
    { key: 'Apartments', label: 'Apartments', type: 'Apartment' },
    { key: 'Multi-family', label: 'Multi-family', type: 'Townhouse' },
    { key: 'Penthouses', label: 'Penthouses', type: 'Penthouse' },
    { key: 'Commercial', label: 'Commercial', type: 'Commercial' },
  ];

  // Filter listings
  const filteredCategoryListings = DUBAI_PROPERTIES.filter((p) => {
    const matchedCategory = categories.find((c) => c.key === activeCategory);
    if (!matchedCategory || activeCategory === 'Houses') return true;
    return p.type.toLowerCase().includes(matchedCategory.type.toLowerCase());
  });

  const homeForYou = filteredCategoryListings.slice(0, 6);
  const homeNearby = DUBAI_PROPERTIES.filter((p) => p.purpose === 'rent').slice(0, 6);

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24 md:pb-16">
      
      {/* 1. TOP CATEGORY PILLS BAR (Exact Match to User Reference Screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`tap-target px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* QUICK INLINE SEARCH STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              window.location.href = `/listings?location=${encodeURIComponent(searchQuery.trim())}`;
            }
          }}
          className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:bg-white focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200 transition-all"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
          <input
            type="text"
            placeholder="Search location, community or development..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium"
          />
          <Link
            href="/listings"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 shrink-0 ml-2 flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </Link>
        </form>
      </section>

      {/* 2. SECTION 1: "Home For You" (Exact Reference Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Home For You
          </h2>
          <Link
            href="/listings"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            See all
          </Link>
        </div>

        {/* Card Track: Horizontal Swipe with snap on Mobile, Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {homeForYou.map((property) => (
            <div key={property.id} className="snap-start shrink-0">
              <ListingCard property={property} />
            </div>
          ))}
        </div>

      </section>

      {/* 3. SECTION 2: "Home Nearby" (Exact Reference Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Home Nearby
          </h2>
          <Link
            href="/listings?purpose=rent"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            See all
          </Link>
        </div>

        {/* Card Track */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {homeNearby.map((property) => (
            <div key={property.id} className="snap-start shrink-0">
              <ListingCard property={property} />
            </div>
          ))}
        </div>

      </section>

      {/* 4. SECTION 3: "New Projects" (Curated Developments in UAE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
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

      {/* 5. POPULAR COMMUNITIES RAIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Explore Neighborhoods
          </h2>
          <Link
            href="/areas"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DUBAI_AREA_GUIDES.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={area.heroImage}
                alt={area.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-emerald-300 block">
                  ROI: {area.roi}
                </span>
                <h4 className="text-sm font-bold truncate leading-tight">
                  {area.name}
                </h4>
              </div>
            </Link>
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
