'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';
import ListingCard from '@/components/ui/ListingCard';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function SavedListingsPage() {
  const [savedIds, setSavedIds] = useState([]);
  const [mounted, setMounted] = useState(false);

  const loadSaved = () => {
    try {
      const items = JSON.parse(localStorage.getItem('brickyard_saved_listings') || '[]');
      setSavedIds(items);
    } catch (e) {
      setSavedIds([]);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadSaved();
    window.addEventListener('brickyard_saved_updated', loadSaved);
    return () => window.removeEventListener('brickyard_saved_updated', loadSaved);
  }, []);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all saved properties?')) {
      localStorage.setItem('brickyard_saved_listings', JSON.stringify([]));
      setSavedIds([]);
      window.dispatchEvent(new Event('brickyard_saved_updated'));
    }
  };

  const savedProperties = DUBAI_PROPERTIES.filter((p) => savedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24 md:pb-20">
      
      {/* Header */}
      <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Feed', href: '/' },
              { label: 'Saved Properties', href: '/saved' },
            ]}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                Saved Properties
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Compare your saved residences and investments in one place.
              </p>
            </div>

            {savedProperties.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="tap-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {!mounted ? (
          <div className="text-center py-20 text-slate-400">Loading saved residences...</div>
        ) : savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((prop) => (
              <ListingCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-10 text-center max-w-md mx-auto shadow-xs my-8">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1.5">No Saved Properties Yet</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Tap the heart icon on any property in your Feed to save residences you want to revisit or compare.
            </p>
            <Link
              href="/"
              className="tap-target inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Explore Feed</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
