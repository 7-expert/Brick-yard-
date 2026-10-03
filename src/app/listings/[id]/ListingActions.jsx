'use client';

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

export default function ListingActions({ propertyTitle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Request Details');

  const openDetailsModal = () => {
    setModalType('Property Request Details');
    setIsModalOpen(true);
  };

  const openTourModal = () => {
    setModalType('Schedule Tour');
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mt-6 space-y-4">
        <button 
          onClick={openDetailsModal}
          className="w-full bg-ink text-white py-4 uppercase tracking-widest text-sm font-bold rounded shadow-lg hover:bg-ink-soft transition-colors flex justify-center items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          Request Details
        </button>
        <button 
          onClick={openTourModal}
          className="w-full bg-white text-ink border-2 border-ink py-4 uppercase tracking-widest text-sm font-bold rounded hover:bg-cream transition-colors cursor-pointer"
        >
          Schedule Tour
        </button>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultItemTitle={propertyTitle}
        defaultType={modalType}
      />
    </>
  );
}
