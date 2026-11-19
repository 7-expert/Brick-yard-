'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import Badge from './Badge';
import PriceTag from './PriceTag';
import { formatNumber } from '@/lib/tokens';

export default function ListingCard({ property, onQuickView }) {
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

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* 4:3 Photo Carousel with intrinsic ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        <Link href={`/listings/${property.id}`} className="block w-full h-full">
          <img
            src={images[currentImageIdx]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {property.badge === 'Verified' && (
            <Badge variant="verified">Verified</Badge>
          )}
          {property.isPremium && (
            <Badge variant="premium">Premium</Badge>
          )}
          {property.isReduced && (
            <Badge variant="reduced">Reduced</Badge>
          )}
        </div>

        {/* Save to Favourites Heart Toggle */}
        <button
          type="button"
          onClick={toggleSave}
          aria-label={isSaved ? "Remove from saved" : "Save property"}
          className="tap-target absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm transition-all z-10 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'text-red-500 fill-red-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Carousel Prev/Next Buttons (Visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Price Tag Prominent in AED */}
          <div className="flex items-baseline justify-between mb-1.5">
            <PriceTag
              price={property.price}
              period={property.period}
              size="default"
              isAccent={true}
            />
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
          </div>

          {/* Key Specs Row: Beds • Baths • Area */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 mb-2">
            <span className="inline-flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-500" />
              <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-500" />
              <span>{property.baths} Baths</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1">
              <Square className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatNumber(property.sqft)} sqft</span>
            </span>
          </div>

          {/* Title & Location */}
          <Link href={`/listings/${property.id}`} className="block group-hover:text-[#0A5C4F] transition-colors">
            <h3 className="font-semibold text-sm text-slate-900 leading-snug line-clamp-1 mb-1">
              {property.title}
            </h3>
          </Link>

          <p className="flex items-center gap-1 text-xs text-slate-500 truncate mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.subLocation || property.location}</span>
          </p>
        </div>

        {/* Agency line & Contact CTAs */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-5 h-5 rounded-full bg-[#E6F2F0] text-[#0A5C4F] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            </span>
            <span className="text-[11px] font-medium text-slate-600 truncate">
              {property.agent?.agency || 'Brickyard Real Estate'}
            </span>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={`tel:${property.agent?.phone?.replace(/\s+/g, '') || '+971501182342'}`}
              className="tap-target w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors"
              title="Call agent"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A5C4F]" />
            </a>
            <a
              href={`https://wa.me/${property.agent?.whatsapp || '971501182342'}?text=Hi,%20I%20am%20interested%20in%20listing%20${property.referenceNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target w-8 h-8 rounded-lg bg-[#0A5C4F] hover:bg-[#08493F] text-white flex items-center justify-center transition-colors"
              title="WhatsApp agent"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

