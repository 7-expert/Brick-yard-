'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { formatNumber, formatAED } from '@/lib/tokens';

export default function ListingCard({ property, className = '' }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/luxury_penthouse_1790348346204.jpg'];

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('brickyard_saved_listings') || '[]');
      setIsSaved(saved.includes(property.id));
    } catch (e) {}
  }, [property.id]);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem('brickyard_saved_listings') || '[]');
      let updated;
      if (saved.includes(property.id)) {
        updated = saved.filter((id) => id !== property.id);
        setIsSaved(false);
      } else {
        updated = [...saved, property.id];
        setIsSaved(true);
      }
      localStorage.setItem('brickyard_saved_listings', JSON.stringify(updated));
      window.dispatchEvent(new Event('brickyard_saved_updated'));
    } catch (e) {}
  };

  const badgeText = property.badge || (property.isPremium ? 'Popular' : 'Popular');

  return (
    <article className={`group flex flex-col shrink-0 w-[290px] sm:w-auto transition-all ${className}`}>
      {/* 1. Large Rounded Image Container (Matching Reference) */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-xs group-hover:shadow-md transition-all duration-300">
        <Link href={`/listings/${property.id}`} className="block w-full h-full">
          <img
            src={images[currentImageIdx]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Top-Left 'Popular' / 'Verified' Pill Badge */}
        <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
          <span className="px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide shadow-xs">
            {badgeText}
          </span>
        </div>

        {/* Top-Right Circular Heart Button */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
          className="tap-target absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all z-10 cursor-pointer active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'text-red-500 fill-red-500' : 'text-slate-800 fill-slate-800/10'
            }`}
          />
        </button>
      </div>

      {/* 2. Specs Row (Bath, Bed, Sqft) - Exact Reference Layout */}
      <div className="flex items-center gap-4 text-xs text-slate-600 font-medium mt-3 px-1">
        <span className="inline-flex items-center gap-1.5">
          <Bath className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{property.baths} baths</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Bed className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{property.beds} beds</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Square className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{formatNumber(property.sqft)} sqft</span>
        </span>
      </div>

      {/* 3. Bold Price Tag */}
      <div className="mt-1 px-1">
        <Link href={`/listings/${property.id}`} className="block">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#0A5C4F] transition-colors">
            {property.priceAED ? formatAED(property.priceAED) : property.price}
          </span>
          {property.purpose === 'rent' && (
            <span className="text-xs text-slate-500 font-normal ml-1">/year</span>
          )}
        </Link>
      </div>

      {/* 4. Address & Title Line */}
      <div className="mt-0.5 px-1">
        <p className="text-xs sm:text-sm text-slate-500 truncate font-normal">
          {property.address || property.location || '10 Tranquility Way, Downtown Dubai, UAE'}
        </p>
      </div>
    </article>
  );
}
