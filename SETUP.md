# Brickyard Supabase & Admin Panel Setup Guide

This guide details how to set up Supabase, deploy the database schema, create your first admin user, and verify security.

---

## 1. Supabase Project Setup

1. Go to [Supabase Dashboard](https://database.new) and create a new project.
2. Once created, navigate to **Project Settings > API**.
3. Copy the following credentials:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon / public Key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

---

## 2. Environment Variables Setup

### Local Setup
In your project root directory, update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
```

### Vercel / Production Deployment
In your Vercel Project Settings (Environment Variables):
- Add `NEXT_PUBLIC_SUPABASE_URL`
- Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> ⚠️ **Security Note:** Never expose the `SUPABASE_SERVICE_ROLE_KEY` to client-side code.

---

## 3. Run Database Schema SQL

1. Open your Supabase Dashboard and go to the **SQL Editor**.
2. Click **New query**.
3. Paste the complete contents of `supabase/schema.sql`.
4. Click **Run**.

This creates:
- `public.bookings` table (with status constraint & honeypot support)
- `public.admins` table
- `is_admin()` SQL security helper function
- Row Level Security (RLS) policies
- Realtime publication on `bookings`

---

## 4. Create Your First Admin User

1. In Supabase Dashboard, go to **Authentication > Users**.
2. Click **Add User > Create User** (or sign up via email/password).
3. Copy the **User UID** generated for your user.
4. Go to **SQL Editor** and run:

```sql
INSERT INTO public.admins (id, email)
VALUES ('<PASTE_USER_UUID_HERE>', 'admin@brickyard.com');
```

You can now log in at `/admin/login` using those credentials!

---

## 5. Verification & Test Checklist

### Test 1: Submit Booking as Visitor
- Open the public website home page or `/contact`.
- Fill out the contact / expert advice form or click "Book Now" on a rental plan.
- Submit the form. You should receive a success notification.

### Test 2: Verify in Admin Panel
- Navigate to `/admin/login`.
- Log in with your admin credentials.
- Verify the new submission appears instantly in the table.
- Test changing status, editing admin notes, filtering, searching, and CSV export.

### Test 3: Security Verification (Non-Admin Access Denied)
- Open an incognito / private browser window.
- Try accessing `/admin` directly without logging in. You must be redirected to `/admin/login`.
- Log in with a normal Supabase user NOT listed in the `admins` table. Access must be denied with an unauthorized message.
- Verify client bundle does NOT contain `service_role` key.
