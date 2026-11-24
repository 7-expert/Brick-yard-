'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackImpression, trackClick } from '@/lib/analytics';
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Share2,
  Heart,
  Flag,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  Mail,
  Video,
  Map as MapIcon,
  Award,
  Check,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import PriceTag from '@/components/ui/PriceTag';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AgentCard from '@/components/ui/AgentCard';
import LeadForm from '@/components/ui/LeadForm';
import MortgageCalculator from '@/components/ui/MortgageCalculator';
import ListingCard from '@/components/ui/ListingCard';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';
import { formatNumber, formatAED } from '@/lib/tokens';

export default function ListingDetailClient({ property }) {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'floorplan' | 'map'
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/luxury_penthouse_1790348346204.jpg', '/waterfront_villa_1790348391865.jpg'];

  const similarListings = DUBAI_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.purpose === property.purpose || p.location === property.location)
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  // Track property listing impression accurately
  useEffect(() => {
    if (property?.id) {
      trackImpression(
        typeof window !== 'undefined' ? window.location.pathname : `/listings/${property.id}`,
        property.title,
        { propertyId: property.id, propertyTitle: property.title }
      );
    }
  }, [property?.id, property?.title]);

  const agent = property.agent || {
    name: "Muhammad Shahzad",
    title: "Senior Luxury Specialist",
    agency: "Brickyard Real Estate",
    phone: "+971 50 118 2342",
    whatsapp: "971501182342",
    email: "shahzad@brickyard.ae",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    verified: true,
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* 1. TOP BAR (Matching Image 1: < Back to Search | Breadcrumb | Save | Share) */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-14 sm:top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          
          <div className="flex items-center gap-3 min-w-0">
            {/* < Back to Search Button */}
            <Link
              href="/listings"
              className="tap-target px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
              <span>Back to Search</span>
            </Link>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 truncate">
              <Link href="/" className="hover:text-slate-800">🏠</Link>
              <span>›</span>
              <Link href={`/listings?purpose=${property.purpose}`} className="hover:text-slate-800">
                {property.purpose === 'rent' ? 'Apartments for Rent in Dubai' : 'Properties for Sale in Dubai'}
              </Link>
              <span>›</span>
              <span className="text-slate-700 font-medium truncate">{property.location}</span>
              <span>›</span>
              <span className="text-slate-400 truncate">{property.title}</span>
            </div>
          </div>

          {/* Save & Share Buttons (Matching Image 1) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleSave}
              className={`tap-target px-3.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="tap-target px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN DETAIL CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Two-Column Grid: Left (Gallery + Specs) + Right (Agent Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Gallery with Map & Video buttons + Property Specs (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* HERO PHOTO CONTAINER (Matching Image 1) */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              
              {/* Main Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900 group">
                <img
                  src={images[selectedImageIdx]}
                  alt={property.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                />

                {/* Top-Left: TruCheck™ Verified Badge (Exact Image 1 layout) */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>TruCheck™</span>
                  </div>
                </div>

                {/* Top-Right: Agency Watermark */}
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                  <div className="px-3 py-1 rounded-md bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
                    Brickyard Real Estate
                  </div>
                </div>

                {/* Floating Bottom-Left: Map & Request Video Buttons (Exact Image 1 layout) */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('property-map');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="tap-target px-3.5 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer"
                  >
                    <MapIcon className="w-3.5 h-3.5 text-white" />
                    <span>Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="tap-target px-3.5 py-1.5 rounded-lg bg-[#0A5C4F]/90 hover:bg-[#0A5C4F] text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Request video</span>
                  </button>
                </div>

                {/* Bottom-Right: Fullscreen trigger */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="tap-target absolute bottom-4 right-4 bg-black/60 hover:bg-black text-white px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>

                {/* Photo Carousel Prev / Next */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="tap-target absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="tap-target absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Rail */}
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-none bg-slate-900/90 border-t border-slate-800">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === selectedImageIdx ? 'border-[#0A5C4F] scale-98 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Title on Mobile/Tablet */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                  {property.priceAED ? formatAED(property.priceAED) : property.price}
                  <span className="text-sm font-normal text-slate-500 ml-1.5">
                    {property.purpose === 'rent' ? 'Yearly' : ''}
                  </span>
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
                {property.title}
              </h1>

              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-[#0A5C4F] shrink-0" />
                <span>{property.address || property.location || 'Downtown Dubai, UAE'}</span>
              </p>

              {/* Quick Specs Strip */}
              <div className="grid grid-cols-3 gap-4 pt-5 mt-5 border-t border-slate-100 text-center">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Bedrooms</span>
                  <span className="text-base font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-1">
                    <Bed className="w-4 h-4 text-[#0A5C4F]" />
                    <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Bathrooms</span>
                  <span className="text-base font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-1">
                    <Bath className="w-4 h-4 text-[#0A5C4F]" />
                    <span>{property.baths} Baths</span>
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Area Size</span>
                  <span className="text-base font-bold text-slate-800 mt-0.5 flex items-center justify-center gap-1">
                    <Square className="w-4 h-4 text-[#0A5C4F]" />
                    <span>{formatNumber(property.sqft)} sqft</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Property Overview & Amenities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Property Description</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>

              <h3 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(property.amenities || [
                  'Balcony',
                  'Built-in Wardrobes',
                  'Central A/C',
                  'Covered Parking',
                  'Shared Gym',
                  'Concierge Service',
                ]).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0A5C4F] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Location Map Section */}
            <div id="property-map" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Location & Nearby</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{property.location}, Dubai, United Arab Emirates</p>
                </div>
              </div>

              {/* Map embed / simulated interactive container */}
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location + ' Dubai')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full"
                  title="Property Location Map"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Verified Advisor Card + Community Card */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-32">
            
            {/* VERIFIED AGENT CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Verified Banner Header */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#0A5C4F] text-white px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs tracking-wider uppercase">Brickyard Verified</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Prime Specialist
                </span>
              </div>

              {/* Agent Profile & Badges */}
              <div className="p-5 flex flex-col items-center text-center">
                {/* Agent Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 mb-3 shadow-sm bg-slate-100">
                  <img
                    src={agent.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold text-lg text-slate-900 leading-snug">
                  {agent.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {agent.agency || "Brickyard Real Estate"}
                </p>

                {/* Two Pill Badges */}
                <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Premier Partner
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold">
                    <span>⚡</span> Fast Responder
                  </span>
                </div>

                {/* Action Buttons: Email | Call | WhatsApp */}
                <div className="grid grid-cols-3 gap-2 w-full mt-5">
                  <a
                    href={`mailto:${agent.email || 'info@brickyard.ae'}?subject=Inquiry: ${encodeURIComponent(property.title)}`}
                    onClick={() => trackClick('email_agent_click', 'Agent Email Contact', { propertyId: property.id, propertyTitle: property.title })}
                    className="tap-target py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>

                  <a
                    href={`tel:${agent.phone || '+971501182342'}`}
                    onClick={() => trackClick('call_agent_click', 'Agent Phone Call', { propertyId: property.id, propertyTitle: property.title })}
                    className="tap-target py-2 px-2 rounded-xl bg-[#0A5C4F] hover:bg-[#08493F] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${agent.whatsapp || '971501182342'}?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                    onClick={() => trackClick('whatsapp_agent_click', 'Agent WhatsApp Contact', { propertyId: property.id, propertyTitle: property.title })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target py-2 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <Link
                  href="/agents"
                  className="text-xs font-semibold text-[#0A5C4F] hover:underline mt-4 flex items-center gap-0.5"
                >
                  <span>View all properties</span>
                  <span>›</span>
                </Link>
              </div>
            </div>

            {/* COMMUNITY CARD (Matching Image 1: Community Attractions & Lifestyle) */}
            <Link
              href={`/areas`}
              className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src="/waterfront_villa_1790348391865.jpg"
                    alt={property.location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0A5C4F] transition-colors truncate">
                    {property.location}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    See the community attractions, price trends, and lifestyle.
                  </p>
                </div>
              </div>
            </Link>

            {/* DIRECT INQUIRY FORM */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="font-bold text-sm text-slate-900 mb-3">Enquire About This Property</h4>
              <LeadForm
                propertyId={property.id}
                propertyTitle={property.title}
                agentName={agent.name}
              />
            </div>

          </div>

        </div>

      </div>

      {/* VIDEO REQUEST MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              ✕
            </button>
            <div className="mb-4">
              <span className="text-xs font-bold text-[#0A5C4F] uppercase tracking-wider">
                Video Walkthrough
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Request Video Tour
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our agent will send a high-resolution video walkthrough directly to your WhatsApp or Email.
              </p>
            </div>
            <LeadForm
              purpose="video_tour"
              propertyId={property.id}
              propertyTitle={property.title}
              agentName={agent.name}
              onSuccess={() => {
                setTimeout(() => setVideoModalOpen(false), 2000);
              }}
            />
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between text-white text-sm">
            <span>{selectedImageIdx + 1} / {images.length}</span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="text-white hover:text-slate-300 p-2 cursor-pointer text-lg font-bold"
            >
              ✕ Close
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4">
            <img
              src={images[selectedImageIdx]}
              alt=""
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setSelectedImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="tap-target absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="tap-target absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto justify-center py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 ${
                  idx === selectedImageIdx ? 'border-white' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
