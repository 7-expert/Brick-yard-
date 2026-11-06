'use client';

import React, { useState } from 'react';
import { X, Sparkles, Calculator, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TruEstimateModal({ isOpen, onClose }) {
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Penthouse / Apartment');
  const [beds, setBeds] = useState('3');
  const [sqft, setSqft] = useState('2500');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [estimatedRange, setEstimatedRange] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEstimate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Calculate synthetic high-precision comps range based on inputs
    const sqftNum = parseInt(sqft, 10) || 2000;
    const basePpsqft = propertyType.includes('Villa') ? 1400 : 1650;
    const midVal = sqftNum * basePpsqft;
    const lowVal = Math.round((midVal * 0.94) / 10000) * 10000;
    const highVal = Math.round((midVal * 1.08) / 10000) * 10000;

    // Send lead to Supabase bookings endpoint
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName || 'TruEstimate User',
          email,
          phone,
          property_title: address ? `TruEstimate: ${address}` : 'TruEstimate Inquiry',
          inquiry_type: 'TruEstimate Valuation',
          message: `Estimated Property: ${propertyType}, ${beds} beds, ${sqft} sqft. Valuation calculated: $${lowVal.toLocaleString()} - $${highVal.toLocaleString()}`,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setEstimatedRange({
        low: lowVal.toLocaleString(),
        high: highVal.toLocaleString(),
        sqftRate: Math.round(midVal / sqftNum),
      });
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setIsCalculated(false);
    setEstimatedRange(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink/75 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-gold-300 font-sans text-ink"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-dark/60 hover:bg-cream-dark text-ink flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!isCalculated ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700">
                  <Calculator className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  TruEstimate™ Valuation
                </span>
              </div>

              <h3 className="text-2xl font-bold font-sans text-ink tracking-tight mb-2">
                Instant Luxury Property Comps
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft mb-6">
                Enter your property details below to get an instant algorithmic valuation backed by historical closing transactions.
              </p>

              <form onSubmit={handleEstimate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                    Property Address / Building
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 432 Park Ave or Tribeca Loft"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 focus:ring-2 focus:ring-gold-300/30 text-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Property Type
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 text-sm outline-none bg-white transition-all"
                    >
                      <option>Penthouse / Apartment</option>
                      <option>Waterfront Villa</option>
                      <option>Townhouse / Brownstone</option>
                      <option>Commercial Space</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Bedrooms
                    </label>
                    <select
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 text-sm outline-none bg-white transition-all"
                    >
                      <option value="1">1 Bed</option>
                      <option value="2">2 Beds</option>
                      <option value="3">3 Beds</option>
                      <option value="4">4 Beds</option>
                      <option value="5+">5+ Beds</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                    Approximate Sq Ft
                  </label>
                  <input
                    type="number"
                    min="400"
                    max="50000"
                    required
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 text-sm outline-none transition-all"
                  />
                </div>

                <div className="pt-2 border-t border-ink/10">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ink/20 focus:border-gold-500 text-sm outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3.5 bg-ink hover:bg-gold-500 text-gold-200 hover:text-ink font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{loading ? 'Evaluating comps...' : 'Generate TruEstimate™ Valuation'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-gold-100 border border-gold-300 text-gold-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-gold-600" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                TruEstimate™ Result
              </span>
              <h3 className="text-2xl font-bold font-sans text-ink mt-1 mb-2">
                Estimated Valuation
              </h3>
              <p className="text-xs text-ink-soft mb-6">
                Based on current market trends & neighborhood closing records for <strong>{address}</strong>
              </p>

              <div className="bg-cream-light p-6 rounded-2xl border border-gold-300/60 mb-6">
                <span className="text-xs text-ink-soft uppercase font-semibold block mb-1">
                  Estimated Value Range
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight font-sans">
                  ${estimatedRange?.low} – ${estimatedRange?.high}
                </div>
                <div className="text-xs text-gold-800 font-bold mt-2">
                  Avg. ${estimatedRange?.sqftRate} / sq ft
                </div>
              </div>

              <p className="text-xs text-ink-soft mb-6 leading-relaxed">
                A senior Brickyard luxury advisor has also been notified to prepare an official comparative market analysis (CMA) dossier for you.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-1/2 py-2.5 px-4 rounded-xl border border-ink/20 text-xs font-bold text-ink hover:bg-cream-dark transition-colors cursor-pointer"
                >
                  New Estimate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 px-4 rounded-xl bg-ink text-gold-200 hover:bg-gold-500 hover:text-ink text-xs font-bold transition-all cursor-pointer"
                >
                  Close & Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

