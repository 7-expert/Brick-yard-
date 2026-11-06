'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowUpRight, TrendingUp, Sparkles, Building, Compass } from 'lucide-react';

export default function MarketInsightsAndNeighbourhoods({ onSelectTopic }) {
  const [filterType, setFilterType] = useState('All'); // 'All' | 'Ready' | 'Off-Plan'

  const articles = [
    {
      id: 'art-1',
      tag: 'MARKET TRENDS',
      title: 'Manhattan vs Miami Beach: Where Prime Capital is Flowing in 2026',
      readTime: '4 min read',
      image: '/luxury_penthouse_1790348346204.jpg',
    },
    {
      id: 'art-2',
      tag: 'ARCHITECTURE',
      title: 'The Evolution of Glass Architecture & Climate-Smart Luxury Homes',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-3',
      tag: 'INVESTMENT',
      title: 'Yield Optimization Strategies for Prime Luxury Rental Portfolios',
      readTime: '5 min read',
      image: '/commercial_space_1790348379162.jpg',
    },
    {
      id: 'art-4',
      tag: 'LIFESTYLE',
      title: 'Private Sanctuaries: Why Historic Estates Are Seeing Record Demand',
      readTime: '3 min read',
      image: '/suburban_home_1790348356763.jpg',
    },
  ];

  const neighbourhoods = [
    {
      id: 'n-1',
      name: 'Downtown Waterfront',
      type: 'Ready',
      propertiesCount: '48 Available',
      image: '/waterfront_villa_1790348391865.jpg',
      query: 'Downtown',
    },
    {
      id: 'n-2',
      name: 'Tribeca Historic Quarter',
      type: 'Ready',
      propertiesCount: '34 Available',
      image: '/urban_loft_1790348368465.jpg',
      query: 'Tribeca',
    },
    {
      id: 'n-3',
      name: 'Beverly Hills Modern Estates',
      type: 'Off-Plan',
      propertiesCount: '19 Available',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      query: 'Beverly Hills',
    },
    {
      id: 'n-4',
      name: 'Greenwich Country Enclaves',
      type: 'Ready',
      propertiesCount: '27 Available',
      image: '/suburban_home_1790348356763.jpg',
      query: 'Greenwich',
    },
  ];

  const filteredNeighbourhoods = filterType === 'All'
    ? neighbourhoods
    : neighbourhoods.filter(n => n.type === filterType);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* SECTION 1: Real Estate Updates From Brickyard Insights */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold uppercase tracking-widest mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-gold-600" />
              <span>Editorial & Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans text-ink tracking-tight">
              Real Estate Updates From Brickyard Insights
            </h2>
          </div>

          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-gold-700 transition-colors group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectTopic && onSelectTopic(art.title)}
              className="group bg-white rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-44 w-full overflow-hidden bg-ink/5">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-ink/80 text-gold-200 backdrop-blur-md border border-gold-400/30">
                  {art.tag}
                </span>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-base font-bold text-ink leading-snug group-hover:text-gold-700 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-ink-soft/70 mt-3 pt-3 border-t border-ink/5">
                  <span>{art.readTime}</span>
                  <span className="font-semibold text-gold-700 flex items-center gap-1">
                    Read article <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Discover Popular Neighbourhoods */}
      <div className="pt-8 border-t border-ink/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-dark border border-ink/10 text-ink text-xs font-bold uppercase tracking-widest mb-2">
              <Compass className="w-3.5 h-3.5 text-gold-700" />
              <span>Location Scouting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans text-ink tracking-tight">
              Discover Popular Neighbourhoods
            </h2>
          </div>

          {/* Toggle Ready / Off-Plan */}
          <div className="flex items-center gap-2 bg-cream-dark/60 p-1 rounded-xl self-start sm:self-auto border border-ink/10">
            {['All', 'Ready', 'Off-Plan'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === type
                    ? 'bg-ink text-gold-200 shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {type === 'All' ? 'All Areas' : type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNeighbourhoods.map((n) => (
            <Link
              key={n.id}
              href={`/listings?location=${encodeURIComponent(n.query)}`}
              className="group relative rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] flex flex-col justify-end p-5 text-white"
            >
              <img
                src={n.image}
                alt={n.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                {n.type}
              </span>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white group-hover:text-gold-200 transition-colors">
                  {n.name}
                </h3>
                <p className="text-xs text-cream-light/80 mt-0.5">
                  {n.propertiesCount}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}

