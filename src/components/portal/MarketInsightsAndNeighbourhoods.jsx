'use client';

import React from 'react';
import Link from 'next/link';

export default function MarketInsightsAndNeighbourhoods({ onSelectTopic }) {
  const featuredArticle = {
    id: 'art-main',
    tag: 'MARKET TRENDS',
    title: 'Manhattan vs Miami Beach: Where Prime Capital is Flowing...',
    readTime: '4 min read',
    image: '/luxury_penthouse_1790348346204.jpg',
  };

  const stackedArticles = [
    {
      id: 'art-1',
      tag: 'ARCHITECTURE',
      title: 'The Evolution of Glass Architecture & Climate-Smart...',
      readTime: '6 min read',
      image: '/urban_loft_1790348368465.jpg',
    },
    {
      id: 'art-2',
      tag: 'INVESTMENT',
      title: 'Yield Optimization Strategies for Prime Luxury Rental Portfolios',
      readTime: '5 min read',
      image: '/commercial_space_1790348379162.jpg',
    },
    {
      id: 'art-3',
      tag: 'LIFESTYLE',
      title: 'Private Sanctuaries: Why Historic Estates Are Seeing Record...',
      readTime: '3 min read',
      image: '/suburban_home_1790348356763.jpg',
    },
  ];

  return (
    <section className="w-full bg-[#FAF7F2] py-24 px-6 sm:px-8 lg:px-12 text-[#162E22] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#66776F] uppercase block mb-2">
              EDITORIAL & INTELLIGENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#162E22] font-normal tracking-tight">
              Real estate updates from Brickyard Insights
            </h2>
          </div>

          <Link
            href="/about"
            className="text-xs font-mono tracking-wider text-[#162E22] font-semibold underline underline-offset-4 hover:text-[#254B38] transition-colors shrink-0"
          >
            View all ↗
          </Link>
        </div>

        {/* Layout: Left Large Article + Right 3 Stacked Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Large Column (7 cols) */}
          <div
            onClick={() => onSelectTopic && onSelectTopic(featuredArticle.title)}
            className="lg:col-span-7 flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative h-80 sm:h-[420px] w-full overflow-hidden bg-black/5">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="pt-6">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#66776F] block mb-2">
                {featuredArticle.tag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-[#162E22] font-normal leading-snug group-hover:text-[#28573E] transition-colors">
                {featuredArticle.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-[#5C6A62] mt-6 pt-4 border-t border-[#E8E1D5]">
                <span className="font-light">{featuredArticle.readTime}</span>
                <span className="font-mono text-[11px] text-[#162E22] font-medium flex items-center gap-1 group-hover:underline">
                  Read article <span>↗</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Stacked Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {stackedArticles.map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onSelectTopic && onSelectTopic(art.title)}
                className={`flex gap-5 items-center group cursor-pointer pb-6 ${
                  idx !== stackedArticles.length - 1 ? 'border-b border-[#E8E1D5]' : ''
                }`}
              >
                {/* Thumbnail Image */}
                <div className="w-28 sm:w-36 h-24 sm:h-28 overflow-hidden bg-black/5 shrink-0">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#66776F] block mb-1">
                      {art.tag}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg text-[#162E22] font-normal leading-snug group-hover:text-[#28573E] transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#5C6A62] mt-3">
                    <span className="font-light">{art.readTime}</span>
                    <span className="font-mono text-[#162E22] font-medium flex items-center gap-1 group-hover:underline">
                      Read article <span>↗</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
