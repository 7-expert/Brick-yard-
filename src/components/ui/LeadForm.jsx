'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackLeadSubmission } from '@/lib/analytics';

export default function LeadForm({
  propertyId = null,
  propertyTitle = 'General Inquiry',
  agentName = 'Brickyard Luxury Specialist',
  agentId = null,
  inquiryType = 'Property Inquiry',
  className = '',
}) {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    `Hello, I would like more information regarding ${propertyTitle}. Please contact me.`
  );
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const countryPrefixes = [
    { code: '+971', label: 'UAE (+971)' },
    { code: '+966', label: 'KSA (+966)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+1', label: 'US/CA (+1)' },
    { code: '+91', label: 'IN (+91)' },
    { code: '+7', label: 'RU (+7)' },
    { code: '+33', label: 'FR (+33)' },
    { code: '+49', label: 'DE (+49)' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      setErrorMessage('Please accept the consent terms to proceed.');
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    try {
      const fullPhone = `${countryCode} ${phone}`.trim();
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone: fullPhone,
          country_code: countryCode,
          inquiry_type: inquiryType,
          property_title: propertyTitle,
          property_id: propertyId,
          message: `${message} [Assigned Agent: ${agentName}]`,
          website: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Submission failed. Please check your details.');
      } else {
        setStatus('success');
        trackLeadSubmission({
          fullName,
          phone: fullPhone,
          propertyTitle,
          propertyId,
          inquiryType,
        });
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm ${className}`}>
      <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-1">
        Enquire About This Property
      </h3>
      <p className="text-xs text-slate-500 mb-5">
        Assigned advisor: <span className="font-medium text-slate-800">{agentName}</span>
      </p>

      {status === 'success' ? (
        <div className="bg-[#E6F2F0] border border-[#B3D6D0] rounded-xl p-5 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#0A5C4F] mx-auto mb-2" />
          <h4 className="text-sm font-bold text-[#0A5C4F]">Inquiry Submitted Successfully</h4>
          <p className="text-xs text-slate-600 mt-1">
            Our Brickyard luxury advisor has received your request and will contact you within 5 minutes.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus(null);
              setFullName('');
              setPhone('');
              setEmail('');
            }}
            className="mt-4 text-xs font-semibold text-[#0A5C4F] underline cursor-pointer"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Honeypot anti-spam field hidden from real humans */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="tap-target w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0A5C4F] focus:ring-1 focus:ring-[#0A5C4F] outline-none"
            />
          </div>

          {/* Phone with Country Code */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="tap-target w-32 px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:border-[#0A5C4F] outline-none shrink-0"
              >
                {countryPrefixes.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                required
                placeholder="50 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="tap-target w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0A5C4F] focus:ring-1 focus:ring-[#0A5C4F] outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tap-target w-full px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0A5C4F] focus:ring-1 focus:ring-[#0A5C4F] outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#0A5C4F] focus:ring-1 focus:ring-[#0A5C4F] outline-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-[#0A5C4F] cursor-pointer"
            />
            <label htmlFor="consent" className="text-[11px] text-slate-500 leading-tight cursor-pointer">
              I agree to Brickyard's <span className="underline">Terms of Use</span> and consent to be contacted regarding this property.
            </label>
          </div>

          {/* Submit CTA button (Amber accent #FF6B35 for primary CTA) */}
          <button
            type="submit"
            disabled={loading}
            className="tap-target w-full py-3 px-4 rounded-lg bg-[#FF6B35] hover:bg-[#E85522] text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting...' : 'Send Inquiry to Agent'}</span>
          </button>
        </form>
      )}
    </div>
  );
}

