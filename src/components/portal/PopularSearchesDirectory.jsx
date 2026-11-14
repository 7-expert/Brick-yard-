'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Search, ExternalLink } from 'lucide-react';

export default function PopularSearchesDirectory() {
  const [activeMode, setActiveMode] = useState('Sale'); // 'Sale' | 'Rent'
  const [activeRegion, setActiveRegion] = useState('New York');
  const [isExpanded, setIsExpanded] = useState(false);

  const regions = ['New York', 'Miami', 'Los Angeles', 'Connecticut'];

  const directoryData = {
    'New York': {
      apartments: [
        { label: 'Apartments for sale in Downtown Manhattan', href: '/listings?type=sale&location=Downtown' },
        { label: 'Penthouses with Private Terrace in Manhattan', href: '/listings?type=sale&location=Penthouse' },
        { label: 'Tribeca Luxury Lofts with High Ceilings', href: '/listings?type=sale&location=Tribeca' },
        { label: 'Condos near Central Park with Skyline Views', href: '/listings?type=sale&location=Manhattan' },
        { label: 'Pre-War Historic Cooperatives in Upper East', href: '/listings?type=sale&location=New+York' },
      ],
      villas: [
        { label: 'Townhouses in West Village', href: '/listings?type=sale&location=Village' },
        { label: 'Brownstones in Brooklyn Heights', href: '/listings?type=sale&location=Brooklyn' },
        { label: 'Full-Floor Townhomes in Greenwich Village', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Waterfront Penthouses with Boat Slips', href: '/listings?type=sale&location=Waterfront' },
        { label: 'Carriage Houses with Private Garages', href: '/listings?type=sale&location=New+York' },
      ],
      other: [
        { label: 'Commercial Creative Offices in SoHo', href: '/contact?service=commercial' },
        { label: 'Art Gallery & Flagship Retail Spaces', href: '/contact?service=retail' },
        { label: 'Furnished Executive Extended Stay Suites', href: '/listings?type=rent' },
        { label: 'Boutique Hotel & Hospitality Conversions', href: '/contact?service=investment' },
        { label: 'Prime Development Plots & Air Rights', href: '/contact?service=development' },
      ],
    },
    'Miami': {
      apartments: [
        { label: 'Oceanfront Luxury Condos in Miami Beach', href: '/listings?type=sale&location=Miami' },
        { label: 'Brickell High-Rise Luxury Penthouses', href: '/listings?type=sale&location=Miami' },
        { label: 'South Beach Designer Furnished Residences', href: '/listings?type=rent&location=Miami' },
        { label: 'Sunny Isles Private Elevators & Sky Villas', href: '/listings?type=sale&location=Miami' },
        { label: 'Bal Harbour Direct Beach Access Condos', href: '/listings?type=sale&location=Miami' },
      ],
      villas: [
        { label: 'Waterfront Villas with Deepwater Docks', href: '/listings?type=sale&location=Miami' },
        { label: 'Star Island Architectural Compounds', href: '/listings?type=sale&location=Miami' },
        { label: 'Venetian Islands Modernist Masterpieces', href: '/listings?type=sale&location=Miami' },
        { label: 'Gables Estates Gated Waterfront Mansions', href: '/listings?type=sale&location=Miami' },
        { label: 'Coconut Grove Tropical Modern Villas', href: '/listings?type=sale&location=Miami' },
      ],
      other: [
        { label: 'Design District Retail & Showrooms', href: '/contact?service=commercial' },
        { label: 'Wynwood Creative Office Lofts', href: '/contact?service=commercial' },
        { label: 'Private Yacht Club Residences', href: '/listings?type=sale' },
        { label: 'Turnkey Luxury Rental Investments', href: '/listings?type=rent' },
        { label: 'Pre-Construction Oceanfront Towers', href: '#new-projects' },
      ],
    },
    'Los Angeles': {
      apartments: [
        { label: 'Century City Luxury High-Rise Residences', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Sunset Strip Modern View Penthouses', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Beverly Hills Full-Service Concierge Condos', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Santa Monica Oceanfront Residences', href: '/listings?type=rent&location=Beverly+Hills' },
        { label: 'Downtown LA Industrial Heritage Lofts', href: '/listings?type=sale&location=Downtown' },
      ],
      villas: [
        { label: 'Beverly Hills Cantilevered Glass Estates', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Bel Air Gated Promontory Mansions', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Hollywood Hills Mid-Century Architectural Classics', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Brentwood Modern Farmhouse Compounds', href: '/listings?type=sale&location=Beverly+Hills' },
        { label: 'Malibu Ocean Bluff Private Sanctuaries', href: '/listings?type=sale&location=Beverly+Hills' },
      ],
      other: [
        { label: 'Rodeo Drive Boutique Showrooms', href: '/contact?service=commercial' },
        { label: 'Production Studio & Creative Campuses', href: '/contact?service=commercial' },
        { label: 'Private Equestrian Estates', href: '/listings?type=sale' },
        { label: 'Short-Term Luxury Film Location Leases', href: '/contact?service=events' },
        { label: 'Custom Build-to-Suit Hillside Plots', href: '/contact?service=development' },
      ],
    },
    'Connecticut': {
      apartments: [
        { label: 'Greenwich Harbor Luxury Condos', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Stamford Modern Waterfront Residences', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Historic Village Lofts', href: '/listings?type=rent&location=Greenwich' },
        { label: 'Luxury Townhomes near Commuter Rail', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Waterfront Penthouse Suites', href: '/listings?type=sale&location=Greenwich' },
      ],
      villas: [
        { label: 'Historic Victorian Estates on 5+ Acres', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Backcountry Gated Country Compounds', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Belle Haven Waterfront Coastal Estates', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Equestrian Farms with Heated Stables', href: '/listings?type=sale&location=Greenwich' },
        { label: 'Stone Manor Homes with Tennis Courts', href: '/listings?type=sale&location=Greenwich' },
      ],
      other: [
        { label: 'Executive Family Offices on the Avenue', href: '/contact?service=commercial' },
        { label: 'Private School Campus Sites', href: '/contact?service=commercial' },
        { label: 'Subdividable Country Parcels', href: '/contact?service=development' },
        { label: 'Seasonal Summer Country Leases', href: '/listings?type=rent' },
        { label: 'Historic Carriage Houses', href: '/listings?type=sale' },
      ],
    },
  };

  const currentData = directoryData[activeRegion] || directoryData['New York'];

  return (
    <section className="w-full bg-[#FAF7F2] py-20 px-6 sm:px-8 lg:px-12 border-t border-[#E8E1D5] text-[#162E22]">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="mb-6">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#66776F] uppercase block mb-2">
            DIRECTORY & MARKETS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#162E22] font-normal tracking-tight">
            Popular Real Estate Searches
          </h2>
        </div>

        {/* Sale / Rent Toggle */}
        <div className="flex gap-8 border-b border-[#E8E1D5] pb-3 mb-6">
          {['Sale', 'Rent'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setActiveMode(mode)}
              className={`font-mono text-xs uppercase tracking-wider pb-2 transition-all cursor-pointer ${
                activeMode === mode
                  ? 'text-[#162E22] border-b-2 border-[#162E22] font-bold'
                  : 'text-[#7D8A82] hover:text-[#162E22]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Region Sub-tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {regions.map((region) => {
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#162E22] text-[#FAF7F2]'
                    : 'bg-[#EDE5D8] hover:bg-[#E2D8C8] text-[#24332B]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          
          {/* Column 1: Apartments */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#66776F] mb-4 pb-2 border-b border-[#E8E1D5]">
              Apartments & Penthouses
            </h3>
            <ul className="space-y-3">
              {currentData.apartments.slice(0, isExpanded ? undefined : 4).map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#4A5750] hover:text-[#162E22] transition-colors leading-relaxed block hover:translate-x-0.5 duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Villas */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#66776F] mb-4 pb-2 border-b border-[#E8E1D5]">
              Villas & Private Estates
            </h3>
            <ul className="space-y-3">
              {currentData.villas.slice(0, isExpanded ? undefined : 4).map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#4A5750] hover:text-[#162E22] transition-colors leading-relaxed block hover:translate-x-0.5 duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Commercial & Other */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#66776F] mb-4 pb-2 border-b border-[#E8E1D5]">
              Commercial & Specialty
            </h3>
            <ul className="space-y-3">
              {currentData.other.slice(0, isExpanded ? undefined : 4).map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#4A5750] hover:text-[#162E22] transition-colors leading-relaxed block hover:translate-x-0.5 duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* View More Button */}
        <div className="mt-8 pt-4 border-t border-[#E8E1D5] flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#162E22] hover:underline cursor-pointer"
          >
            <span>{isExpanded ? 'View Less' : 'View More Categories'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </section>
  );
}

