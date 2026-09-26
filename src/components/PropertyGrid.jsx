"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";

export default function PropertyGrid() {
  const [filterType, setFilterType] = useState("all");
  const [sort, setSort] = useState("newest");

  // Basic filtering and sorting logic
  let filtered = properties;
  if (filterType !== "all") {
    filtered = properties.filter((p) => p.type === filterType);
  }

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/4">
        <div className="bg-cream p-6 rounded-xl border border-cream-dark sticky top-28">
          <h3 className="font-serif font-bold text-xl uppercase tracking-widest text-ink mb-6">Filters</h3>
          
          <div className="mb-6">
            <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-3">Status</label>
            <div className="space-y-2">
              {["all", "sale", "rent"].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    className="accent-gold-500 w-4 h-4"
                    checked={filterType === type}
                    onChange={() => setFilterType(type)}
                  />
                  <span className="text-sm font-sans text-ink capitalize">{type === "all" ? "All Properties" : `For ${type}`}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-3">Bedrooms</label>
            <select className="w-full bg-white border border-cream-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400">
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-3">Max Price</label>
            <select className="w-full bg-white border border-cream-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400">
              <option>No Max</option>
              <option>$1,000,000</option>
              <option>$2,500,000</option>
              <option>$5,000,000</option>
              <option>$10,000,000</option>
            </select>
          </div>

          <button className="w-full bg-gold-gradient text-white py-3 uppercase tracking-widest text-sm font-bold rounded hover:opacity-90 transition-opacity">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-sans text-ink-soft">Showing {filtered.length} properties</p>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-cream-dark rounded px-4 py-2 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          <button className="w-10 h-10 rounded border border-gold-400 text-gold-600 flex items-center justify-center font-sans hover:bg-gold-50 transition-colors">1</button>
          <button className="w-10 h-10 rounded bg-gold-gradient text-white flex items-center justify-center font-sans">2</button>
          <button className="w-10 h-10 rounded border border-cream-dark text-ink-soft flex items-center justify-center font-sans hover:bg-cream transition-colors">3</button>
        </div>
      </div>
    </div>
  );
}
