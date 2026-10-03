'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Buying a Property');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          inquiry_type: inquiryType,
          message,
          website: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setStatusMessage(data.error || 'Submission failed. Please try again.');
      } else {
        setIsError(false);
        setStatusMessage(data.message || 'Thank you! Your inquiry has been submitted.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err) {
      setIsError(true);
      setStatusMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-light p-10 rounded-xl border border-cream-dark shadow-sm">
      <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-ink mb-8">Send a Message</h2>
      
      {statusMessage && (
        <div className={`p-4 mb-6 rounded text-sm font-sans ${isError ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'}`}>
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
            placeholder="+1 (555) 000-0000"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Inquiry Type</label>
          <select 
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 appearance-none"
          >
            <option>Buying a Property</option>
            <option>Selling a Property</option>
            <option>Renting</option>
            <option>General Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Message</label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 resize-none"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-gradient text-white py-4 uppercase tracking-widest text-sm font-bold rounded shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
