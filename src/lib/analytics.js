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

  const currentPath = window.location.pathname;
  const targetPath = metadata.pagePath || currentPath;

  // Never track admin panel activity
  if (currentPath.startsWith('/admin') || targetPath.startsWith('/admin')) {
    return;
  }

  const eventPayload = {
    eventType,
    eventName,
    pagePath: currentPath + window.location.search,
    device: getDeviceType(),
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    ...metadata,
  };

  // 1. Dispatch directly to backend API (reliable across private windows & ad-blockers)
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload),
      keepalive: true,
    }).catch(() => {});
  } catch (e) {}

  // 2. Also keep in client-side cache for instant local reflection
  try {
    const existing = JSON.parse(localStorage.getItem('brickyard_analytics_events') || '[]');
    const updated = [eventPayload, ...existing].slice(0, 100);
    localStorage.setItem('brickyard_analytics_events', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('brickyard_analytics_updated', { detail: eventPayload }));
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
