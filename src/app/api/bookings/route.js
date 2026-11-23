import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { saveBooking, getBookings, updateBooking, deleteBooking, saveAnalyticsEvent } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

const bookingSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  full_name: z.string().optional(),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  phone: z.string().min(5, 'Please enter a valid phone number'),
  country_code: z.string().optional(),
  inquiry_type: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  property_title: z.string().optional(),
  plan_title: z.string().optional(),
  property_id: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

// Simple memory store for basic IP rate limiting (10 requests per minute)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  const userRecord = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - userRecord.startTime > windowMs) {
    userRecord.count = 1;
    userRecord.startTime = now;
    rateLimitMap.set(ip, userRecord);
    return false;
  }

  userRecord.count += 1;
  rateLimitMap.set(ip, userRecord);

  return userRecord.count > maxRequests;
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check for spam bots
    if (body.website && body.website.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
    }

    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Invalid input data';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = validationResult.data;

    // Derive names bidirectionally
    let firstName = data.first_name?.trim() || null;
    let lastName = data.last_name?.trim() || null;
    let fullName = data.full_name?.trim() || null;

    if (fullName && (!firstName || !lastName)) {
      const parts = fullName.split(/\s+/);
      if (!firstName) firstName = parts[0] || null;
      if (!lastName) lastName = parts.slice(1).join(' ') || null;
    }
    if (!fullName && (firstName || lastName)) {
      fullName = `${firstName || ''} ${lastName || ''}`.trim();
    }

    const bookingPayload = {
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      email: data.email || null,
      phone: data.phone,
      country_code: data.country_code || '+971',
      inquiry_type: data.inquiry_type || 'Property Inquiry',
      message: data.message,
      property_title: data.property_title || null,
      plan_title: data.plan_title || null,
      property_id: data.property_id || null,
      status: 'pending',
      admin_notes: '',
    };

    // 1. Guaranteed storage in resilient server store
    const localRecord = saveBooking(bookingPayload);

    // 2. Also record lead analytics event
    saveAnalyticsEvent({
      eventType: 'lead',
      eventName: 'booking_submitted',
      propertyTitle: data.property_title || null,
      propertyId: data.property_id || null,
      metadata: {
        leadName: fullName,
        phone: data.phone,
        inquiryType: data.inquiry_type || 'Property Inquiry',
      },
    });

    // 3. Attempt insertion into Supabase if configured
    try {
      const supabase = await createClient();
      await supabase.from('bookings').insert([bookingPayload]);
    } catch (supabaseErr) {
      // Supabase unconfigured or down, local storage already succeeded
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully.',
      booking: localRecord,
    });
  } catch (err) {
    console.error('API /api/bookings error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    let supabaseBookings = [];
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) supabaseBookings = data;
    } catch (e) {}

    const localBookings = getBookings();
    const merged = [...supabaseBookings];

    localBookings.forEach((lb) => {
      if (!merged.some((b) => b.id === lb.id || (b.phone === lb.phone && b.created_at === lb.created_at))) {
        merged.push(lb);
      }
    });

    merged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return NextResponse.json({ success: true, bookings: merged });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status, admin_notes } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;

    // 1. Update in local store
    updateBooking(id, updates);

    // 2. Update in Supabase if available
    try {
      const supabase = await createClient();
      await supabase.from('bookings').update(updates).eq('id', id);
    } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
    }

    // 1. Delete from local store
    deleteBooking(id);

    // 2. Delete from Supabase if available
    try {
      const supabase = await createClient();
      await supabase.from('bookings').delete().eq('id', id);
    } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
