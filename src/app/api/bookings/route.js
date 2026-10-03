import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

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
  website: z.string().optional(), // Honeypot field
});

// Simple memory store for basic IP rate limiting (5 requests per minute)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

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
      // Silently accept honeypot submissions to fool bots
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

    const supabase = await createClient();

    const { data: inserted, error } = await supabase
      .from('bookings')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          email: data.email || null,
          phone: data.phone,
          country_code: data.country_code || null,
          inquiry_type: data.inquiry_type || 'General Inquiry',
          message: data.message,
          property_title: data.property_title || null,
          plan_title: data.plan_title || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insertion error:', error);
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
        return NextResponse.json({
          success: true,
          message: 'Inquiry received (demo mode - configure Supabase URL to store permanently)',
        });
      }
      return NextResponse.json(
        { error: 'Failed to submit booking. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully.',
      booking: inserted,
    });
  } catch (err) {
    console.error('API /api/bookings error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
