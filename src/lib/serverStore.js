import fs from 'fs';
import path from 'path';
import os from 'os';

// Use OS temp directory for resilient disk persistence across serverless & local restarts
const BOOKINGS_FILE = path.join(os.tmpdir(), 'brickyard_live_bookings.json');
const ANALYTICS_FILE = path.join(os.tmpdir(), 'brickyard_live_analytics.json');

// Initialize in-memory store on globalThis so all route invocations share state
if (!globalThis.__brickyard_store) {
  globalThis.__brickyard_store = {
    bookings: [],
    analytics: [],
  };

  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const content = fs.readFileSync(BOOKINGS_FILE, 'utf8');
      globalThis.__brickyard_store.bookings = JSON.parse(content);
    }
  } catch (e) {
    globalThis.__brickyard_store.bookings = [];
  }

  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const content = fs.readFileSync(ANALYTICS_FILE, 'utf8');
      globalThis.__brickyard_store.analytics = JSON.parse(content);
    }
  } catch (e) {
    globalThis.__brickyard_store.analytics = [];
  }
}

function persistBookings() {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(globalThis.__brickyard_store.bookings || []), 'utf8');
  } catch (e) {}
}

function persistAnalytics() {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(globalThis.__brickyard_store.analytics || []), 'utf8');
  } catch (e) {}
}

export function saveBooking(booking) {
  try {
    const item = {
      id: booking.id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: booking.created_at || new Date().toISOString(),
      first_name: booking.first_name || null,
      last_name: booking.last_name || null,
      full_name: booking.full_name || `${booking.first_name || ''} ${booking.last_name || ''}`.trim() || 'Visitor Inquiry',
      email: booking.email || null,
      phone: booking.phone || '',
      country_code: booking.country_code || '+971',
      inquiry_type: booking.inquiry_type || 'General Inquiry',
      property_title: booking.property_title || null,
      plan_title: booking.plan_title || null,
      property_id: booking.property_id || null,
      message: booking.message || '',
      status: booking.status || 'pending',
      admin_notes: booking.admin_notes || '',
    };

    if (!globalThis.__brickyard_store.bookings) {
      globalThis.__brickyard_store.bookings = [];
    }

    // Avoid duplicate insertions
    const exists = globalThis.__brickyard_store.bookings.some(
      (b) => b.id === item.id || (b.phone === item.phone && b.created_at === item.created_at)
    );

    if (!exists) {
      globalThis.__brickyard_store.bookings.unshift(item);
      if (globalThis.__brickyard_store.bookings.length > 500) {
        globalThis.__brickyard_store.bookings = globalThis.__brickyard_store.bookings.slice(0, 500);
      }
      persistBookings();
    }

    return item;
  } catch (err) {
    return null;
  }
}

export function getBookings() {
  return globalThis.__brickyard_store?.bookings || [];
}

export function updateBooking(id, updates) {
  try {
    if (!globalThis.__brickyard_store?.bookings) return null;
    const b = globalThis.__brickyard_store.bookings.find((item) => item.id === id);
    if (b) {
      Object.assign(b, updates);
      persistBookings();
      return b;
    }
  } catch (e) {}
  return null;
}

export function deleteBooking(id) {
  try {
    if (!globalThis.__brickyard_store?.bookings) return false;
    globalThis.__brickyard_store.bookings = globalThis.__brickyard_store.bookings.filter((item) => item.id !== id);
    persistBookings();
    return true;
  } catch (e) {
    return false;
  }
}

export function saveAnalyticsEvent(event) {
  try {
    const item = {
      id: event.id || `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      event_type: event.eventType || event.event_type || 'impression',
      event_name: event.eventName || event.event_name || 'page_view',
      page_path: event.pagePath || event.page_path || '/',
      device: event.device || 'desktop',
      property_id: event.propertyId || event.property_id || null,
      property_title: event.propertyTitle || event.property_title || null,
      created_at: event.timestamp || event.created_at || new Date().toISOString(),
      metadata: event.metadata || event,
    };

    if (!globalThis.__brickyard_store.analytics) {
      globalThis.__brickyard_store.analytics = [];
    }

    globalThis.__brickyard_store.analytics.unshift(item);
    if (globalThis.__brickyard_store.analytics.length > 2000) {
      globalThis.__brickyard_store.analytics = globalThis.__brickyard_store.analytics.slice(0, 2000);
    }
    persistAnalytics();

    return item;
  } catch (err) {
    return null;
  }
}

export function getAnalyticsEvents() {
  return globalThis.__brickyard_store?.analytics || [];
}

