'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackImpression, trackClick } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef('');

  // 1. Track page impressions on navigation
  useEffect(() => {
    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Avoid double logging the exact same path
    if (fullPath !== lastPathRef.current) {
      lastPathRef.current = fullPath;
      trackImpression(fullPath, document.title);
    }
  }, [pathname, searchParams]);

  // 2. Automatically capture WhatsApp, Phone Call and External clicks
  useEffect(() => {
    function handleDocumentClick(e) {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.innerText?.trim() || target.getAttribute('aria-label') || '';

      if (href.startsWith('https://wa.me') || href.includes('whatsapp') || text.toLowerCase().includes('whatsapp')) {
        trackClick('whatsapp_click', 'WhatsApp Inquiry', { href, label: text });
      } else if (href.startsWith('tel:') || text.toLowerCase().includes('call')) {
        trackClick('call_click', 'Phone Call', { href, label: text });
      } else if (text.toLowerCase().includes('register interest')) {
        trackClick('cta_click', 'Register Interest', { label: text });
      } else if (text.toLowerCase().includes('valuation')) {
        trackClick('cta_click', 'Valuation Request', { label: text });
      } else if (text.toLowerCase().includes('map')) {
        trackClick('map_view_click', 'Map Button', { label: text });
      }
    }

    document.addEventListener('click', handleDocumentClick, { passive: true });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
}

