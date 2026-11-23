'use client';

/**
 * Brickyard Real Estate Analytics Utility
 * Tracks:
 * 1. Impressions (Page views, property views)
 * 2. Clicks (WhatsApp, Call, Property cards, CTA buttons)
 * 3. True Leads (Form submissions, bookings)
 */

export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

export async function trackEvent(eventType, eventName, metadata = {}) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    eventType, // 'impression' | 'click' | 'lead'
    eventName, // e.g. 'page_view', 'whatsapp_click', 'call_click', 'property_card_click', 'booking_submitted'
    pagePath: window.location.pathname + window.location.search,
    device: getDeviceType(),
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    ...metadata,
  };

  // 1. Store locally for instant UI reflection & offline resilience
  try {
    const existing = JSON.parse(localStorage.getItem('brickyard_analytics_events') || '[]');
    const updated = [eventPayload, ...existing].slice(0, 100); // keep last 100
    localStorage.setItem('brickyard_analytics_events', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('brickyard_analytics_updated', { detail: eventPayload }));
  } catch (e) {}

  // 2. Dispatch to backend API
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(eventPayload)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {}
}

export function trackImpression(pagePath, title, metadata = {}) {
  trackEvent('impression', 'page_view', {
    pagePath,
    pageTitle: title || (typeof document !== 'undefined' ? document.title : ''),
    ...metadata,
  });
}

export function trackClick(actionName, targetName, metadata = {}) {
  trackEvent('click', actionName, {
    target: targetName,
    ...metadata,
  });
}

export function trackLeadSubmission(leadDetails = {}) {
  trackEvent('lead', 'booking_submitted', leadDetails);
}

