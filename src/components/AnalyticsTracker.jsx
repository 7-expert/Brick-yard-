'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackImpression, trackClick } from '@/lib/analytics';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';

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

      let extraMeta = {};
      if (pathname.startsWith('/listings/')) {
        const idOrSlug = pathname.replace('/listings/', '').split('/')[0]?.split('?')[0];
        const matched = DUBAI_PROPERTIES.find(
          (p) => p.id === idOrSlug || p.slug === idOrSlug
        );
        if (matched) {
          extraMeta = {
            propertyId: matched.id,
            propertyTitle: matched.title,
          };
        }
      }

      trackImpression(fullPath, document.title, extraMeta);
    }
  }, [pathname, searchParams]);

  // 2. Automatically capture WhatsApp, Phone Call and External clicks
  useEffect(() => {
    function handleDocumentClick(e) {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.innerText?.trim() || target.getAttribute('aria-label') || '';

      // Determine if click is on a property page
      let propertyMeta = {};
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/listings/')) {
        const idOrSlug = window.location.pathname.replace('/listings/', '').split('/')[0]?.split('?')[0];
        const matched = DUBAI_PROPERTIES.find(
          (p) => p.id === idOrSlug || p.slug === idOrSlug
        );
        if (matched) {
          propertyMeta = {
            propertyId: matched.id,
            propertyTitle: matched.title,
          };
        }
      }

      if (href.startsWith('https://wa.me') || href.includes('whatsapp') || text.toLowerCase().includes('whatsapp')) {
        trackClick('whatsapp_click', 'WhatsApp Inquiry', { href, label: text, ...propertyMeta });
      } else if (href.startsWith('tel:') || text.toLowerCase().includes('call')) {
        trackClick('call_click', 'Phone Call', { href, label: text, ...propertyMeta });
      } else if (text.toLowerCase().includes('register interest')) {
        trackClick('cta_click', 'Register Interest', { label: text, ...propertyMeta });
      } else if (text.toLowerCase().includes('valuation')) {
        trackClick('cta_click', 'Valuation Request', { label: text });
      } else if (text.toLowerCase().includes('map')) {
        trackClick('map_view_click', 'Map Button', { label: text, ...propertyMeta });
      }
    }

    document.addEventListener('click', handleDocumentClick, { passive: true });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
}

