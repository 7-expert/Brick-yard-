'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, X, Bed, Bath, Square, ExternalLink, Compass } from 'lucide-react';
import PriceTag from './PriceTag';
import { formatNumber } from '@/lib/tokens';

export default function MapView({ properties = [], activePropertyId = null, onSelectProperty }) {
  const [selectedProperty, setSelectedProperty] = useState(
    properties.find((p) => p.id === activePropertyId) || properties[0] || null
  );

  const [activeArea, setActiveArea] = useState('Dubai, UAE');

  const dubaiAreas = [
    { label: 'All Dubai', query: 'Dubai, UAE' },
    { label: 'Downtown Dubai', query: 'Downtown Dubai, UAE' },
    { label: 'Palm Jumeirah', query: 'Palm Jumeirah, Dubai, UAE' },
    { label: 'Dubai Marina', query: 'Dubai Marina, UAE' },
    { label: 'Dubai Creek Harbour', query: 'Dubai Creek Harbour, UAE' },
    { label: 'Dubai Hills Estate', query: 'Dubai Hills Estate, UAE' },
    { label: 'Business Bay', query: 'Business Bay, Dubai, UAE' },
  ];

  // If a property is selected, search for that property; otherwise search for the active area
  const mapQuery = selectedProperty
    ? `${selectedProperty.location} Dubai United Arab Emirates`
    : `${activeArea} United Arab Emirates`;

  const zoomLevel = selectedProperty ? 15 : activeArea === 'Dubai, UAE' ? 11 : 14;

  return (
    <div className="relative w-full h-[660px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      
      {/* Top Map Control Bar */}
      <div className="z-20 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0A5C4F]/10 text-[#0A5C4F] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Dubai Interactive Google Map
            </span>
            <span className="text-[11px] text-slate-500">
              {properties.length} Active Dubai Properties
            </span>
          </div>
        </div>

        {/* Quick Area Jump Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {dubaiAreas.map((area) => (
            <button
              key={area.label}
              type="button"
              onClick={() => {
                setActiveArea(area.query);
                setSelectedProperty(null);
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeArea === area.query && !selectedProperty
                  ? 'bg-[#0A5C4F] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>

        {/* Direct Google Maps External Link */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#0A5C4F] hover:text-[#08493F] transition-colors"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Google Maps Embed View */}
      <div className="relative flex-1 w-full h-full bg-slate-200">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full"
          title="Dubai Live Google Map"
        />

        {/* Floating Property Selector Rail on Top-Right */}
        <div className="absolute top-3 right-3 z-20 max-w-[260px] max-h-[380px] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg p-2 hidden md:block">
          <div className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase text-slate-400">
            Pin Location:
          </div>
          <div className="space-y-1">
            {properties.slice(0, 8).map((prop) => (
              <button
                key={prop.id}
                type="button"
                onClick={() => {
                  setSelectedProperty(prop);
                  if (onSelectProperty) onSelectProperty(prop);
                }}
                className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                  selectedProperty?.id === prop.id
                    ? 'bg-[#0A5C4F] text-white font-bold'
                    : 'hover:bg-slate-100 text-slate-700 font-medium'
                }`}
              >
                <div className="truncate">
                  <span className="block truncate">{prop.title}</span>
                  <span className={`text-[10px] ${selectedProperty?.id === prop.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {prop.location}
                  </span>
                </div>
                <span className="text-[10px] shrink-0 font-bold">
                  {(prop.price / 1000000).toFixed(1)}M
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Property Floating Preview Card (Bottom Left) */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[380px] z-30 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-3.5 flex gap-3.5 animate-fadeIn">
            <div className="relative w-28 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
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
                    aria-label="Close preview"
                    className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">
                  {selectedProperty.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{selectedProperty.location}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-slate-100">
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

    </div>
  );
}
