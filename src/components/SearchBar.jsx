"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl mx-auto -mt-16 relative z-10 border border-gold-100">
      <div className="flex space-x-8 mb-6 border-b border-cream-dark">
        {["buy", "rent", "sell"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-serif uppercase tracking-widest text-sm transition-colors relative ${
              activeTab === tab ? "text-gold-600 font-bold" : "text-ink-soft hover:text-ink"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-gradient" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Location</label>
          <input
            type="text"
            placeholder="City, Neighborhood, or Zip"
            className="w-full bg-cream-light border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-shadow"
          />
        </div>
        <div>
          <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Property Type</label>
          <select className="w-full bg-cream-light border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-shadow appearance-none">
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Penthouse</option>
            <option>Commercial</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full bg-gold-gradient text-white font-sans text-sm tracking-wide rounded px-6 py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
