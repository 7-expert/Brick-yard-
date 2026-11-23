import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Set fallback admin session cookie for site owner
    const cookieStore = await cookies();
    cookieStore.set('brickyard_admin_session', email.trim().toLowerCase(), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true, email: email.trim().toLowerCase() });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

