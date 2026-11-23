'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2, Info, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoNotice, setInfoNotice] = useState('');

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setError('Access denied. Only registered admins can access the admin dashboard.');
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfoNotice('');

    const trimmedEmail = email.trim().toLowerCase();
    const isOwnerEmail = trimmedEmail === 'brickyardofficial@gmail.com';

    let supabaseAuthSuccess = false;

    // Check if Supabase client is configured
    try {
      const supabase = createClient();
      const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const isPlaceholder = !rawUrl || rawUrl.includes('placeholder');

      if (!isPlaceholder) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (!authError && data?.user) {
          // Check if in admins table
          const { data: adminRecord } = await supabase
            .from('admins')
            .select('id')
            .eq('id', data.user.id)
            .maybeSingle();

          if (adminRecord) {
            supabaseAuthSuccess = true;
          }
        }
      }
    } catch (err) {
      // Supabase connection or network failure, will fall through to site owner check
    }

    // If Supabase auth succeeded, or if this is the site owner
    if (supabaseAuthSuccess || isOwnerEmail || password) {
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password }),
        });

        const json = await res.json();
        if (json.success) {
          router.push('/admin');
          router.refresh();
          return;
        } else {
          setError(json.error || 'Authentication failed');
          setLoading(false);
          return;
        }
      } catch (apiErr) {
        setError('Server communication error. Please try again.');
        setLoading(false);
        return;
      }
    }

    setError('Invalid admin credentials. Please verify your email and password.');
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl border border-slate-800 rounded-2xl sm:px-10">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-200 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
          <div className="flex-1 text-left leading-relaxed">
            <p className="font-semibold text-red-300">Sign in notice</p>
            <p className="text-xs text-red-300/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {infoNotice && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-emerald-200 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
          <span className="text-xs">{infoNotice}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-left">
            Admin Email
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="brickyardofficial@gmail.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-left">
            Password
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0A5C4F] hover:bg-[#08493F] active:scale-[0.99] text-white font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
        >
          {loading ? (
            'Verifying & Signing In...'
          ) : (
            <>
              Sign In to Admin <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Helper details for Site Owner & Setup */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 text-left">
        <div className="flex items-start gap-2.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">Site Owner Access:</span>
            <span className="block mt-0.5 text-slate-400">
              Authorized admin account <span className="text-emerald-400 font-mono">brickyardofficial@gmail.com</span> is granted instant access to the dashboard.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 mb-5 shadow-2xl p-2.5">
          <Image src="/logo2.1.png" alt="Brickyard" width={56} height={56} className="object-contain" priority />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white drop-shadow-sm">
          Brickyard Admin
        </h1>
        <p className="mt-2 text-sm text-emerald-400 font-medium tracking-wide">
          Manage bookings, TrueLeads, and website analytics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense fallback={<div className="text-center py-8 text-slate-400">Loading admin security portal...</div>}>
          <AdminLoginForm />
        </Suspense>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Brickyard Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
