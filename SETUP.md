# Brickyard – Supabase & Vercel Setup Guide

Follow these simple steps to connect Supabase to your live site and admin panel.

---

## Step 1: Run the Database Schema in Supabase

1. Open your Supabase project dashboard at [supabase.com/dashboard](https://supabase.com/dashboard).
2. In the left navigation menu, click **SQL Editor** (icon `>_`).
3. Click **+ New Query**.
4. Open [`supabase/schema.sql`](./supabase/schema.sql), copy the entire file contents, and paste it into the editor.
5. Click **Run** (green button).
   - This creates:
     - `public.bookings` (stores customer inquiries and leads)
     - `public.admins` (stores authorized admin accounts)
     - `public.analytics_events` (stores real-time visitor impressions, clicks, and device stats)
     - Row Level Security (RLS) policies allowing public visitors to submit forms while keeping admin data protected.

---

## Step 2: Get Your Supabase API Keys

1. In the left navigation menu, click **Project Settings** (gear icon at bottom left).
2. Click **API** under Configuration.
3. Find and copy:
   - **Project URL** (e.g. `https://your-project-id.supabase.co`)
   - **anon / public key** (long token starting with `eyJ...`)

---

## Step 3: Add Variables to Vercel (Production)

1. Go to your project on [vercel.com](https://vercel.com).
2. Click **Settings** -> **Environment Variables**.
3. Add these two variables:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`  
     **Value:** `<Paste your Supabase Project URL>`
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
     **Value:** `<Paste your Supabase anon public key>`
4. Check **Production**, **Preview**, and **Development**, then click **Save**.
5. **Crucial:** Go to the **Deployments** tab on Vercel, click the three dots (`...`) on the latest deployment, and click **Redeploy** so Vercel builds with your new environment variables.

---

## Step 4: Create Your Admin Account in Supabase

1. In your Supabase dashboard, go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create user**.
3. Enter your email and password, ensure **Auto Confirm User?** is checked, and click **Create user**.
4. Copy the created user's **User UID** (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).
5. Go back to **SQL Editor**, open a new query, and run:
   ```sql
   INSERT INTO public.admins (id, email)
   VALUES ('<PASTE_USER_UID_HERE>', '<PASTE_EMAIL_HERE>');
   ```
6. You can now log into `/admin/login` using this email and password!
