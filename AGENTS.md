<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's dirYou are working in an existing Next.js (App Router) project called "brickyard". The frontend is already finished. Your job is to add a Supabase backend and an admin panel at /admin. Do NOT redesign or break any existing public pages.

## Goal
Anyone can submit the rental/booking form on the public site. Each submission is saved in Supabase. The site owner logs in at /admin and sees every booking with its details, and can manage them.

## Step 0 – Inspect first
- Find the existing rental/booking form component(s) and list every field they collect (name, phone, email, product/item, dates, quantity, address, message, etc.).
- Build the database schema from those REAL fields, not guesses. Tell me the fields you found before coding.

## Step 1 – Supabase setup
- Install @supabase/supabase-js and @supabase/ssr.
- Create lib/supabase/client.js (browser), lib/supabase/server.js (server components / route handlers using cookies), and middleware support for session refresh.
- Use env vars in .env.local (and add placeholders to .env.example):
  NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
  Never expose the service role key to the client.

## Step 2 – Database (give me a single SQL file: supabase/schema.sql)
Table `bookings`:
- id uuid primary key default gen_random_uuid()
- created_at timestamptz default now()
- one column per form field found in Step 0
- status text default 'pending' check in ('pending','confirmed','completed','cancelled')
- admin_notes text

Table `admins` (id uuid references auth.users, email) to mark who is an admin.

Row Level Security (enable on both tables):
- Anonymous + authenticated users: INSERT only on bookings (no select/update/delete).
- Only users listed in `admins`: SELECT, UPDATE, DELETE on bookings.
- Add a helper SQL function is_admin() and use it in the policies.
Include the SQL to create my first admin after I sign up.

## Step 3 – Connect the public form
- On submit, validate with zod (required fields, phone/email format, date logic), then insert into `bookings` via a Server Action or /api/bookings route.
- Add basic spam protection (honeypot field + simple rate limit).
- Show success and error messages in the existing UI style.

## Step 4 – Admin panel
- /admin/login: email + password using Supabase Auth.
- /admin (protected): redirect to /admin/login if not logged in OR not in `admins` table. Enforce this in middleware AND server-side in the page.
- Dashboard: table of all bookings (newest first) with name, contact, item, dates, status, created time.
- Features: search, filter by status and date range, pagination, click a row to open a detail view/drawer with ALL fields.
- Actions: change status, edit admin notes, delete (with confirm), export to CSV.
- Counts at the top: total, pending, confirmed, completed, cancelled.
- Optional: realtime updates using Supabase Realtime so new bookings appear without refresh.
- Logout button.
- Responsive, clean UI that matches the existing site's styling (reuse its CSS approach, don't add a new UI framework unless I approve).

## Step 5 – Security checklist
- /admin must never be reachable without a valid admin session.
- No service role key in client code.
- Add noindex meta for /admin routes.
- Sanitize all displayed user input.

## Deliverables
1. All code changes, with file paths.
2. supabase/schema.sql ready to paste into the Supabase SQL editor.
3. A short SETUP.md: creating the Supabase project, adding env vars locally and on Vercel, running the SQL, creating the first admin user.
4. A short test list: submit a booking as a visitor, confirm it appears in /admin, confirm a non-admin cannot read bookings.

Work step by step, run `npm run build` at the end, and fix any errors.ectory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
