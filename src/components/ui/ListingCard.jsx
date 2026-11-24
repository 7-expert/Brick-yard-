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

  const badgeText = property.purpose === 'rent' ? 'For Rent' : 'For Sale';
  const numPrice = typeof property.price === 'number' ? property.price : Number(String(property.price || 0).replace(/[^0-9.-]+/g, ''));
  const sqftPrice = (numPrice && property.sqft) ? Math.round(numPrice / property.sqft) : null;

  return (
    <article className={`group flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-3 sm:p-3.5 ${className}`}>
      
      {/* 1. Large Rounded Image Container (Matching Reference) */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-xs group-hover:shadow-sm transition-all duration-300">
        <Link href={`/listings/${property.id}`} className="block w-full h-full cursor-pointer">
          <img
            src={images[currentImageIdx]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Top-Left 'For Sale' / 'For Rent' Dark Pill Badge (Matching Screenshot) */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#1E293B]/85 backdrop-blur-xs text-white text-[11px] font-bold tracking-wide shadow-xs">
            {badgeText}
          </span>
        </div>

        {/* Top-Right Circular Heart Button */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
          className="tap-target absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-xs transition-all z-10 cursor-pointer active:scale-95"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isSaved ? 'text-red-500 fill-red-500' : 'text-slate-800 fill-slate-800/10'
            }`}
          />
        </button>

        {/* Bottom-Left Location Overlay on Image */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none z-10">
          <span className="text-white text-xs font-semibold drop-shadow-md">
            {property.location || 'Dubai, UAE'}
          </span>
        </div>

        {/* Bottom-Right Carousel Indicator Dots */}
        <div className="absolute bottom-2.5 right-3 pointer-events-none z-10 flex items-center gap-1 opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
        </div>
      </div>

      {/* 2. Card Content (Matching Reference Layout) */}
      <div className="pt-4 pb-2 px-1 flex-1 flex flex-col justify-between">
        <Link href={`/listings/${property.id}`} className="block cursor-pointer space-y-1">
          
          {/* Price Row: Bold Price Left, ~ AED / sq ft Right */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#0A5C4F] transition-colors">
              {property.priceAED ? formatAED(property.priceAED) : (typeof property.price === 'number' ? `AED ${property.price.toLocaleString('en-AE')}` : property.price)}
              {property.purpose === 'rent' && (
                <span className="text-xs text-slate-500 font-normal ml-1">/year</span>
              )}
            </div>
            {sqftPrice && (
              <span className="text-[11px] text-slate-400 font-medium shrink-0">
                ~ AED {formatNumber(sqftPrice)} / sq ft
              </span>
            )}
          </div>

          {/* Property Title */}
          <h3 className="font-bold text-base text-slate-900 leading-snug truncate pt-0.5 group-hover:text-[#0A5C4F] transition-colors">
            {property.title}
          </h3>

          {/* SubLocation / Community */}
          <p className="text-xs text-slate-500 truncate">
            {property.subLocation || property.address || property.location}
          </p>

          {/* Specs Row: 3 beds · 4 baths · 2,690 sq ft · Villa */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-2 flex-wrap">
            <span>{property.beds} beds</span>
            <span className="text-slate-300">·</span>
            <span>{property.baths} baths</span>
            <span className="text-slate-300">·</span>
            <span>{formatNumber(property.sqft)} sq ft</span>
            <span className="text-slate-300">·</span>
            <span>{property.type}</span>
          </div>

        </Link>

        {/* View Property Details Link */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/listings/${property.id}`}
            className="text-[11px] font-bold text-[#0A5C4F] hover:text-[#08493F] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <span>View property details</span>
            <span>→</span>
          </Link>
        </div>

      </div>

    </article>
  );
}
