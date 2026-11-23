import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getBookings } from '@/lib/serverStore';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionEmail = cookieStore.get('brickyard_admin_session')?.value;

  const supabase = await createClient();

  let user = null;

  // 1. Check fallback site owner cookie session
  if (sessionEmail) {
    user = {
      id: 'site-admin',
      email: 'Administrator', // Clean generic display - never exposes personal or official gmail
    };
  } else {
    // 2. Otherwise check Supabase Auth session
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        // Verify user is in `admins` table
        const { data: adminRecord } = await supabase
          .from('admins')
          .select('id')
          .eq('id', authUser.id)
          .maybeSingle();

        if (adminRecord) {
          user = authUser;
        }
      }
    } catch (e) {
      // Supabase not reachable or placeholder
    }
  }

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch initial bookings from Supabase + serverStore
  let initialBookings = [];
  try {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (data && data.length > 0) {
      initialBookings = data;
    }
  } catch (e) {
    initialBookings = [];
  }

  const localBookings = getBookings();
  localBookings.forEach((lb) => {
    if (!initialBookings.some((b) => b.id === lb.id || (b.phone === lb.phone && b.created_at === lb.created_at))) {
      initialBookings.push(lb);
    }
  });

  initialBookings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <AdminDashboardClient
      user={user}
      initialBookings={initialBookings}
    />
  );
}
