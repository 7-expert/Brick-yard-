'use client';

import React from 'react';
import { X, Filter, RotateCcw, Check } from 'lucide-react';
import { DUBAI_AMENITIES, PROPERTY_TYPES } from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';

export default function FilterRail({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
  isOpenMobile = false,
  onCloseMobile,
}) {
  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    onFilterChange('amenities', updated);
  };

  const activeChips = [];
  if (filters.purpose) activeChips.push({ key: 'purpose', label: `For ${filters.purpose}` });
  if (filters.location) activeChips.push({ key: 'location', label: filters.location });
  if (filters.type) activeChips.push({ key: 'type', label: filters.type });
  if (filters.beds) activeChips.push({ key: 'beds', label: `${filters.beds} Beds` });
  if (filters.baths) activeChips.push({ key: 'baths', label: `${filters.baths}+ Baths` });
  if (filters.furnishing) activeChips.push({ key: 'furnishing', label: filters.furnishing });
  if (filters.completionStatus) activeChips.push({ key: 'completionStatus', label: filters.completionStatus });
  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach((am) => activeChips.push({ key: `amenity_${am}`, label: am, isAmenity: true, value: am }));
  }

  const content = (
    <div className="space-y-6">
      {/* Header + Result Count */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h3 className="font-semibold text-base text-slate-900 tracking-tight flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#0A5C4F]" />
            <span>Filters</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            <span className="font-bold text-[#0A5C4F]">{totalResults}</span> properties available
          </p>
        </div>

        {activeChips.length > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-[#0A5C4F] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Applied Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E6F2F0] text-[#0A5C4F] text-[11px] font-medium border border-[#B3D6D0]"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={() => {
                  if (chip.isAmenity) {
                    handleAmenityToggle(chip.value);
                  } else {
                    onFilterChange(chip.key, '');
                  }
                }}
                className="hover:text-red-600 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Purpose: Buy / Rent */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Purpose
        </label>
        <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {['sale', 'rent'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onFilterChange('purpose', p)}
              className={`tap-target py-1.5 text-xs font-semibold rounded-md transition-all ${
                filters.purpose === p
                  ? 'bg-white text-[#0A5C4F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p === 'sale' ? 'For Sale' : 'For Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Price Range (AED)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min AED"
            value={filters.priceMin || ''}
            onChange={(e) => onFilterChange('priceMin', e.target.value)}
            className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-200 outline-none focus:border-[#0A5C4F]"
          />
          <input
            type="number"
            placeholder="Max AED"
            value={filters.priceMax || ''}
            onChange={(e) => onFilterChange('priceMax', e.target.value)}
            className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-200 outline-none focus:border-[#0A5C4F]"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Bedrooms
        </label>
        <div className="grid grid-cols-5 gap-1 text-xs">
          {['Studio', '1', '2', '3', '4+'].map((b) => {
            const val = b === 'Studio' ? '0' : b.replace('+', '');
            const isSelected = String(filters.beds) === val;
            return (
              <button
                key={b}
                type="button"
                onClick={() => onFilterChange('beds', isSelected ? '' : val)}
                className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#0A5C4F] text-white border-[#0A5C4F]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Furnishing Status */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Furnishing
        </label>
        <select
          value={filters.furnishing || ''}
          onChange={(e) => onFilterChange('furnishing', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#0A5C4F]"
        >
          <option value="">All Furnishing</option>
          <option value="Furnished">Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Completion Status */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Completion Status
        </label>
        <div className="flex gap-2 text-xs">
          {['Ready', 'Off-plan'].map((st) => {
            const isSelected = filters.completionStatus?.toLowerCase() === st.toLowerCase();
            return (
              <button
                key={st}
                type="button"
                onClick={() => onFilterChange('completionStatus', isSelected ? '' : st)}
                className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#0A5C4F] text-white border-[#0A5C4F]'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Amenities
        </label>
        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-none text-xs">
          {DUBAI_AMENITIES.map((amenity) => {
            const isChecked = (filters.amenities || []).includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 p-1 rounded hover:bg-slate-50 cursor-pointer text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="accent-[#0A5C4F] rounded cursor-pointer"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Rail */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-xl border border-slate-200 p-5 shadow-sm self-start sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        {content}
      </aside>

      {/* Mobile Slide-Over Bottom Sheet / Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl z-10">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="pt-4 mt-4 border-t border-slate-200 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 rounded-lg bg-[#0A5C4F] text-white font-bold text-sm shadow-sm"
              >
                Show {totalResults} Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

