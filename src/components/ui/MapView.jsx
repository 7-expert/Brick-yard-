'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, X, Bed, Bath, Square, ExternalLink } from 'lucide-react';
import PriceTag from './PriceTag';
import { formatNumber } from '@/lib/tokens';

export default function MapView({ properties = [], activePropertyId = null, onSelectProperty }) {
  const [selectedProperty, setSelectedProperty] = useState(
    properties.find((p) => p.id === activePropertyId) || properties[0] || null
  );

  // Normalize Dubai coordinates into 100% SVG viewbox (Dubai coastline projection)
  // Dubai lat: ~25.0 to 25.25, lng: ~55.1 to 55.32
  const minLat = 25.04;
  const maxLat = 25.24;
  const minLng = 55.12;
  const maxLng = 55.30;

  const getCoordinates = (lat, lng) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 85 + 7;
    const y = 92 - ((lat - minLat) / (maxLat - minLat)) * 82;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <div className="relative w-full h-[620px] bg-[#E8F0EE] rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Dubai Coastline & Island Backdrop Graphic */}
      <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Arabian Gulf Water Background */}
        <rect width="100" height="100" fill="#E2ECE9" />
        {/* Coastline Sand Contour */}
        <path d="M 0,35 Q 25,48 50,42 T 100,20 L 100,100 L 0,100 Z" fill="#F4EDE2" />
        {/* Palm Jumeirah Stylized Fronds */}
        <circle cx="22" cy="42" r="8" fill="#E6DCCF" />
        <path d="M 22,42 L 22,52" stroke="#D5C7B3" strokeWidth="2" />
      </svg>

      {/* Map Control Title Bar */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-[#0A5C4F]" />
        <span>Dubai Interactive Map ({properties.length} Listings)</span>
      </div>

      {/* Property Marker Pins */}
      {properties.map((prop) => {
        const { x, y } = getCoordinates(prop.lat, prop.lng);
        const isSelected = selectedProperty?.id === prop.id;

        return (
          <button
            key={prop.id}
            type="button"
            onClick={() => {
              setSelectedProperty(prop);
              if (onSelectProperty) onSelectProperty(prop);
            }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`tap-target absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-200 ${
              isSelected ? 'scale-110 z-30' : 'hover:scale-105'
            }`}
            aria-label={`View ${prop.title}`}
          >
            {/* Price Pill Pin */}
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-tight shadow-md flex items-center gap-1 border whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-[#0A5C4F] text-white border-white ring-2 ring-[#0A5C4F]/40'
                  : 'bg-white text-slate-900 border-slate-200 hover:bg-[#E6F2F0] hover:text-[#0A5C4F]'
              }`}
            >
              <span>AED {(prop.price / 1000000).toFixed(1)}M</span>
            </div>
            {/* Pin point anchor */}
            <div
              className={`w-2 h-2 rotate-45 mx-auto -mt-1 shadow-xs ${
                isSelected ? 'bg-[#0A5C4F]' : 'bg-white'
              }`}
            />
          </button>
        );
      })}

      {/* Selected Property Floating Preview Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-30 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden p-3.5 flex gap-3.5 animate-fadeIn">
          <div className="relative w-28 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
            <img
              src={selectedProperty.images?.[0] || '/luxury_penthouse_1790348346204.jpg'}
              alt={selectedProperty.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-1">
                <PriceTag price={selectedProperty.price} period={selectedProperty.period} size="sm" />
                <button
                  type="button"
                  onClick={() => setSelectedProperty(null)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="font-semibold text-xs text-slate-900 line-clamp-1 mt-0.5">
                {selectedProperty.title}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">{selectedProperty.location}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3 text-slate-400" />
                <span>{selectedProperty.beds} Bed</span>
              </span>
              <span className="flex items-center gap-1">
                <Square className="w-3 h-3 text-slate-400" />
                <span>{formatNumber(selectedProperty.sqft)} sqft</span>
              </span>
              <Link
                href={`/listings/${selectedProperty.id}`}
                className="text-[#0A5C4F] font-bold flex items-center gap-0.5 hover:underline"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

