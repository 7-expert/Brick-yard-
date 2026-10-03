'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingModal({ isOpen, onClose, defaultItemTitle = '', defaultType = 'General Inquiry' }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          message: message || `Inquiry for ${defaultItemTitle}`,
          inquiry_type: defaultType,
          property_title: defaultItemTitle,
          website: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setStatusMessage(data.error || 'Submission failed.');
      } else {
        setIsError(false);
        setStatusMessage(data.message || 'Thank you! Your request has been received.');
        setTimeout(() => {
          onClose();
          setStatusMessage(null);
          setFullName('');
          setEmail('');
          setPhone('');
          setMessage('');
        }, 2000);
      }
    } catch (err) {
      setIsError(true);
      setStatusMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FCFAF5] p-8 max-w-lg w-full rounded-lg border border-gold-200/60 shadow-2xl z-10 font-sans"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-ink-soft hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="font-serif text-2xl font-bold text-ink mb-2 uppercase tracking-wide">
            Request Information
          </h3>
          {defaultItemTitle && (
            <p className="text-sm font-sans text-gold-600 mb-6 font-medium">
              Target: {defaultItemTitle}
            </p>
          )}

          {statusMessage && (
            <div className={`p-4 mb-4 rounded text-sm ${isError ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'}`}>
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-soft mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-cream-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-soft mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-cream-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
                placeholder="+971 50 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-soft mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-cream-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-soft mb-1">Message (Optional)</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white border border-cream-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400 resize-none"
                placeholder="I would like more information..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient text-white font-bold py-3 uppercase tracking-widest text-xs rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
