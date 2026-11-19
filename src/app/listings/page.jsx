'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, Map, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ListingCard from '@/components/ui/ListingCard';
import FilterRail from '@/components/ui/FilterRail';
import MapView from '@/components/ui/MapView';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';
import Pagination from '@/components/ui/Pagination';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';

const ITEMS_PER_PAGE = 8;

export function ListingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL query params
  const purposeParam = searchParams.get('purpose') || searchParams.get('type') || 'sale';
  const locationParam = searchParams.get('location') || '';
  const typeParam = searchParams.get('type') || '';
  const bedsParam = searchParams.get('beds') || '';
  const bathsParam = searchParams.get('baths') || '';
  const priceMinParam = searchParams.get('priceMin') || '';
  const priceMaxParam = searchParams.get('priceMax') || '';
  const furnishingParam = searchParams.get('furnishing') || '';
  const completionStatusParam = searchParams.get('completionStatus') || '';
  const sortParam = searchParams.get('sort') || 'recommended';
  const viewParam = searchParams.get('view') || 'grid';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState(viewParam); // 'grid' | 'map'
  const [currentPage, setCurrentPage] = useState(pageParam);

  // Sync state with URL
  const filters = useMemo(() => ({
    purpose: purposeParam === 'rent' ? 'rent' : 'sale',
    location: locationParam,
    type: typeParam,
    beds: bedsParam,
    baths: bathsParam,
    priceMin: priceMinParam,
    priceMax: priceMaxParam,
    furnishing: furnishingParam,
    completionStatus: completionStatusParam,
  }), [
    purposeParam,
    locationParam,
    typeParam,
    bedsParam,
    bathsParam,
    priceMinParam,
    priceMaxParam,
    furnishingParam,
    completionStatusParam,
  ]);

  const updateURL = (newFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v === '' || v === null || v === undefined) {
        params.delete(k);
      } else {
        params.set(k, String(v));
      }
    });
    params.set('page', '1');
    setCurrentPage(1);
    router.push(`/listings?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (key, value) => {
    updateURL({ [key]: value });
  };

  const handleResetFilters = () => {
    router.push('/listings?purpose=sale', { scroll: false });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`/listings?${params.toString()}`, { scroll: false });
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', mode);
    router.push(`/listings?${params.toString()}`, { scroll: false });
  };

  // Filter properties in memory under 10ms
  const filteredProperties = useMemo(() => {
    let result = DUBAI_PROPERTIES.filter((p) => {
      // Purpose check (sale / rent / commercial)
      if (filters.purpose && p.purpose !== filters.purpose) return false;

      // Location search
      if (filters.location) {
        const query = filters.location.toLowerCase();
        const matchesLoc = p.location?.toLowerCase().includes(query) ||
          p.subLocation?.toLowerCase().includes(query) ||
          p.title?.toLowerCase().includes(query);
        if (!matchesLoc) return false;
      }

      // Property type
      if (filters.type && p.type?.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }

      // Beds
      if (filters.beds) {
        if (filters.beds === '5' && p.beds < 5) return false;
        if (filters.beds !== '5' && String(p.beds) !== String(filters.beds)) return false;
      }

      // Baths
      if (filters.baths && p.baths < Number(filters.baths)) {
        return false;
      }

      // Price Min / Max
      if (filters.priceMin && p.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && p.price > Number(filters.priceMax)) return false;

      // Furnishing
      if (filters.furnishing && p.furnished?.toLowerCase() !== filters.furnishing.toLowerCase()) {
        return false;
      }

      // Completion status
      if (filters.completionStatus && p.completionStatus?.toLowerCase() !== filters.completionStatus.toLowerCase()) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortParam === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortParam === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [filters, sortParam]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const resultTitle = `${filteredProperties.length} Properties for ${
    filters.purpose === 'rent' ? 'Rent' : 'Sale'
  }${filters.location ? ` in ${filters.location}` : ' in Dubai'}`;

  return (
    <div className="w-full min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: filters.purpose === 'rent' ? 'For Rent' : 'For Sale', href: `/listings?purpose=${filters.purpose}` },
            { label: filters.location || 'Dubai' },
          ]}
        />

        {/* Search Results Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              {resultTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified title deeds and live prices updated hourly.
            </p>
          </div>

          {/* Controls Cluster: Filter Button on Mobile, Sort Dropdown, Grid/Map Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="tap-target lg:hidden px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0A5C4F]" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="relative flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select
                value={sortParam}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer pr-1"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Grid / Map View Toggle */}
            <div className="flex bg-slate-200 p-0.5 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => handleViewToggle('grid')}
                aria-label="Grid View"
                className={`tap-target px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0A5C4F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => handleViewToggle('map')}
                aria-label="Map View"
                className={`tap-target px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-[#0A5C4F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: FilterRail + Cards Grid OR Map View */}
        <div className="flex items-start gap-8">
          {/* Sticky Sidebar Filter Rail (Desktop) */}
          <FilterRail
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredProperties.length}
            isOpenMobile={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
          />

          {/* Results Container */}
          <div className="flex-1 min-w-0">
            {viewMode === 'map' ? (
              <MapView properties={filteredProperties} />
            ) : filteredProperties.length === 0 ? (
              <EmptyState onReset={handleResetFilters} />
            ) : (
              <>
                {/* 4-col/3-col Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginatedProperties.map((property) => (
                    <ListingCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('page', String(page));
                    router.push(`/listings?${params.toString()}`);
                  }}
                />
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <ListingsContent />
    </Suspense>
  );
}
