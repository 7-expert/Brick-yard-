-- Create bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text,
  last_name text,
  full_name text,
  email text,
  phone text,
  country_code text,
  inquiry_type text,
  message text,
  property_title text,
  plan_title text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  admin_notes text
);

-- Create admins table
create table if not exists public.admins (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  created_at timestamptz default now()
);

-- Helper function to check if authenticated user is in admins table
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where id = auth.uid()
  );
$$;

-- Enable RLS on bookings
alter table public.bookings enable row level security;

-- Enable RLS on admins
alter table public.admins enable row level security;

-- Policies for bookings
drop policy if exists "Allow public inserts on bookings" on public.bookings;
create policy "Allow public inserts on bookings"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow admins to select bookings" on public.bookings;
create policy "Allow admins to select bookings"
  on public.bookings
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Allow admins to update bookings" on public.bookings;
create policy "Allow admins to update bookings"
  on public.bookings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Allow admins to delete bookings" on public.bookings;
create policy "Allow admins to delete bookings"
  on public.bookings
  for delete
  to authenticated
  using (public.is_admin());

-- Policies for admins table
drop policy if exists "Allow admins to view admins" on public.admins;
create policy "Allow admins to view admins"
  on public.admins
  for select
  to authenticated
  using (public.is_admin());

-- Enable Realtime updates for bookings table
alter publication supabase_realtime add table public.bookings;

-- INSTRUCTIONS TO ADD YOUR FIRST ADMIN USER:
-- 1. Sign up an admin user in Supabase Auth (or via /admin/login sign up / SQL insert).
-- 2. Execute the following SQL in Supabase SQL Editor replacing with your user's UUID and Email:
-- INSERT INTO public.admins (id, email) VALUES ('<USER_UUID_FROM_AUTH_USERS>', 'admin@brickyard.com');
