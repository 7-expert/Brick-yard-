'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import PriceTag from '@/components/ui/PriceTag';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AgentCard from '@/components/ui/AgentCard';
import LeadForm from '@/components/ui/LeadForm';
import MortgageCalculator from '@/components/ui/MortgageCalculator';
import ListingCard from '@/components/ui/ListingCard';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';
import { formatNumber } from '@/lib/tokens';

export default function ListingDetailClient({ property }) {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'floorplan'
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/luxury_penthouse_1790348346204.jpg'];

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

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20">
      
      {/* 1. Header Navigation & Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { label: property.purpose === 'rent' ? 'For Rent' : 'For Sale', href: `/listings?purpose=${property.purpose}` },
              { label: property.location, href: `/listings?location=${encodeURIComponent(property.location)}` },
              { label: property.title },
            ]}
          />

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="tap-target px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
        
        {/* Title, Badges & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="verified">TruBroker™ Verified</Badge>
              {property.isPremium && <Badge variant="premium">Premium</Badge>}
              <span className="text-xs text-slate-500 font-mono">Ref: {property.referenceNumber}</span>
              {property.permitNumber && (
                <span className="text-xs text-slate-400">| RERA Permit: {property.permitNumber}</span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-sm text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-[#0A5C4F] shrink-0" />
              <span>{property.subLocation || property.location}</span>
            </p>
          </div>

          <div className="lg:text-right">
            <PriceTag
              price={property.price}
              period={property.period}
              size="hero"
              isAccent={true}
            />
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {property.purpose === 'sale' ? 'Estimated Total Price' : 'Annual Rental Price'}
            </p>
          </div>
        </div>

        {/* 3. Photo & Floor Plan Gallery */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8">
          {/* Gallery View Switcher Tabs */}
          <div className="flex items-center border-b border-slate-100 px-4 py-2 gap-3 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('photos')}
              className={`py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-[#0A5C4F] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Photos ({images.length})
            </button>
            {property.floorPlanImage && (
              <button
                type="button"
                onClick={() => setActiveTab('floorplan')}
                className={`py-1.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'floorplan'
                    ? 'bg-[#0A5C4F] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2D Floor Plan</span>
              </button>
            )}
          </div>

          {activeTab === 'photos' ? (
            <div>
              {/* Main Photo View */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-slate-900 group">
                <img
                  src={images[selectedImageIdx]}
                  alt={`${property.title} - photo ${selectedImageIdx + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                />

                {/* Lightbox Launch Button */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="tap-target absolute bottom-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Fullscreen</span>
                </button>

                {/* Prev / Next controls */}
                <button
                  type="button"
                  onClick={() => setSelectedImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="tap-target absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="tap-target absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-none bg-slate-50 border-t border-slate-100">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 sm:w-24 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === selectedImageIdx ? 'border-[#0A5C4F] scale-98 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 flex flex-col items-center justify-center bg-slate-100 min-h-[380px]">
              <img
                src={property.floorPlanImage}
                alt="2D Architectural Floor Plan"
                className="max-h-[460px] object-contain rounded-lg shadow-sm bg-white p-4"
              />
              <p className="text-xs text-slate-500 mt-4">
                Verified floor plan with accurate room dimensions and balcony layouts.
              </p>
            </div>
          )}
        </div>

        {/* 4. Two-Column Layout: Details (Left) + Sticky Inquiry Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Specifications, Amenities, Description, Map, POIs (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Specs Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Bedrooms</span>
                <span className="text-lg font-bold text-slate-900 mt-0.5 flex items-center justify-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#0A5C4F]" />
                  <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Bathrooms</span>
                <span className="text-lg font-bold text-slate-900 mt-0.5 flex items-center justify-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#0A5C4F]" />
                  <span>{property.baths} Baths</span>
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Property Area</span>
                <span className="text-lg font-bold text-slate-900 mt-0.5 flex items-center justify-center gap-1.5">
                  <Square className="w-4 h-4 text-[#0A5C4F]" />
                  <span>{formatNumber(property.sqft)} sqft</span>
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Completion</span>
                <span className="text-lg font-bold text-[#0A5C4F] mt-0.5 block">
                  {property.completionStatus || 'Ready'}
                </span>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-4 pb-2 border-b border-slate-100">
                Property Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Property Type</span>
                  <span className="font-semibold text-slate-800">{property.type}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Purpose</span>
                  <span className="font-semibold text-slate-800 uppercase">{property.purpose}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Furnishing</span>
                  <span className="font-semibold text-slate-800">{property.furnished}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Developer</span>
                  <span className="font-semibold text-slate-800">{property.developer || 'Emaar Properties'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">Handover Status</span>
                  <span className="font-semibold text-[#0A5C4F]">{property.handoverDate || 'Immediate'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">RERA Title Deed</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities Grid with Icons */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-4 pb-2 border-b border-slate-100">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 p-2 rounded-lg bg-slate-50">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C4F] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-4 pb-2 border-b border-slate-100">
                Property Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-light">
                {property.description}
              </p>
            </div>

            {/* Nearby Points of Interest (POIs) */}
            {property.nearbyPOIs && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-slate-900 tracking-tight mb-4 pb-2 border-b border-slate-100">
                  Neighborhood Transit & Landmarks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {property.nearbyPOIs.map((poi, idx) => (
                    <div key={idx} className="p-3 bg-[#E6F2F0] rounded-xl border border-[#B3D6D0] flex flex-col justify-between">
                      <span className="font-bold text-[#0A5C4F] text-sm">{poi.name}</span>
                      <span className="text-slate-600 mt-1">{poi.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Mortgage Calculator */}
            {property.purpose === 'sale' && (
              <MortgageCalculator defaultPrice={property.price} />
            )}

            {/* Report Listing Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="text-xs text-slate-400 hover:text-red-600 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report inaccurate price or details on this listing</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Agent Contact & LeadForm (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* TruBroker Agent Card */}
            <AgentCard agent={property.agent} />

            {/* Lead Form */}
            <LeadForm
              propertyTitle={property.title}
              agentName={property.agent?.name}
              inquiryType={`${property.purpose === 'sale' ? 'Buying' : 'Renting'} Inquiry`}
            />
          </div>

        </div>

        {/* 5. Similar Listings Rail */}
        {similarListings.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
              Similar Properties in {property.location}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarListings.map((sim) => (
                <ListingCard key={sim.id} property={sim} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 6. Fixed Bottom Contact Bar for Mobile Phones */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 lg:hidden flex items-center justify-between gap-2 shadow-lg">
        <div className="min-w-0">
          <PriceTag price={property.price} period={property.period} size="sm" isAccent={true} />
          <span className="text-[10px] text-slate-500 block truncate">{property.referenceNumber}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={`tel:${property.agent?.phone?.replace(/\s+/g, '') || '+971501182342'}`}
            className="tap-target px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 font-semibold text-xs flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#0A5C4F]" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/${property.agent?.whatsapp || '971501182342'}?text=Hi,%20I%20am%20interested%20in%20listing%20${property.referenceNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target px-4 py-2 rounded-lg bg-[#FF6B35] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-white text-xs">
            <span>Photo {selectedImageIdx + 1} of {images.length}</span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={images[selectedImageIdx]}
              alt=""
              className="max-h-[85vh] max-w-full object-contain"
            />
          </div>

          <div className="flex justify-center gap-4 py-2">
            <button
              type="button"
              onClick={() => setSelectedImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setSelectedImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Report Listing Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative text-xs">
            <button
              type="button"
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            {reportSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-[#0A5C4F] mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Report Received</h4>
                <p className="text-slate-500 mt-1">Our quality assurance team has been notified to re-verify this title deed and price.</p>
                <button
                  type="button"
                  onClick={() => {
                    setReportModalOpen(false);
                    setReportSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 bg-[#0A5C4F] text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">Report This Listing</h3>
                <p className="text-slate-500 mb-4">Please select the reason for reporting Ref: {property.referenceNumber}</p>
                <div className="space-y-2 mb-4">
                  {['Inaccurate price', 'Property already sold/rented', 'Misleading photos', 'Incorrect location'].map((r) => (
                    <label key={r} className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer text-slate-700">
                      <input type="radio" name="report_reason" defaultChecked={r === 'Inaccurate price'} className="accent-[#0A5C4F]" />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setReportSubmitted(true)}
                  className="w-full py-2.5 rounded-lg bg-[#FF6B35] text-white font-bold"
                >
                  Submit Quality Flag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
