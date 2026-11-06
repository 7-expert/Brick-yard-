'use client';

import React, { useState } from 'react';
import PortalHero from '@/components/portal/PortalHero';
import PortalActionBanners from '@/components/portal/PortalActionBanners';
import BrowseNewProjects from '@/components/portal/BrowseNewProjects';
import MarketInsightsAndNeighbourhoods from '@/components/portal/MarketInsightsAndNeighbourhoods';
import PopularSearchesDirectory from '@/components/portal/PopularSearchesDirectory';
import BookingModal from '@/components/BookingModal';
import TruEstimateModal from '@/components/portal/TruEstimateModal';
import RentalPlans from '@/components/RentalPlans';
import ClientLogos from '@/components/ClientLogos';

export default function HomeClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTitle, setBookingTitle] = useState('');
  const [bookingType, setBookingType] = useState('General Inquiry');

  const [isEstimateOpen, setIsEstimateOpen] = useState(false);

  const handleOpenBooking = (title = 'General Inquiry', type = 'Property Consultation') => {
    setBookingTitle(title);
    setBookingType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="flex flex-col bg-[#FAF7F0] text-ink min-h-screen">
      {/* 1. Bayut-Style Hero Section (Matching Image 1) with Brickyard Brand Styling */}
      <PortalHero
        onOpenBooking={() => handleOpenBooking('Custom Property Search', 'Buyer/Tenant Inquiry')}
      />

      {/* 2. Action Banners & 3 Feature Cards (Matching Image 2) */}
      <PortalActionBanners
        onOpenBooking={handleOpenBooking}
        onOpenEstimate={() => setIsEstimateOpen(true)}
      />

      {/* 3. Browse New Projects Section (Matching Image 3) */}
      <BrowseNewProjects
        onRegisterInterest={(title, type) => handleOpenBooking(title, type)}
      />

      {/* Brand Partners Showcase */}
      <ClientLogos />

      {/* 4. Market Updates & Discover Popular Neighbourhoods (Matching Image 5) */}
      <MarketInsightsAndNeighbourhoods
        onSelectTopic={(topic) => handleOpenBooking(`Inquiry on ${topic}`, 'Intelligence & Advisory')}
      />

      {/* Rental & Corporate Leases Portfolio */}
      <div id="rental-plans">
        <RentalPlans onSelectPlan={(plan) => handleOpenBooking(plan, 'Rental Plan Booking')} />
      </div>

      {/* 5. Popular Real Estate Searches Directory (Matching Image 4) */}
      <PopularSearchesDirectory />

      {/* Modals connected to Supabase */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultItemTitle={bookingTitle}
        defaultType={bookingType}
      />

      <TruEstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
      />
    </div>
  );
}

