'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setError('Access denied. Only authorized administrators can access this portal.');
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedEmail = email.trim().toLowerCase();

    let supabaseAuthSuccess = false;

    // Check if live Supabase client is configured
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
      // Supabase network failure or placeholder mode
    }

    // Authenticate through secure admin session API
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
        setError(json.error || 'Authentication failed. Please verify credentials.');
        setLoading(false);
        return;
      }
    } catch (apiErr) {
      setError('Server error during authentication. Please try again.');
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div suppressHydrationWarning className="bg-slate-900/95 backdrop-blur-xl py-9 px-7 shadow-2xl rounded-3xl sm:px-10 text-center">
        <p className="text-xs text-slate-400">Loading secure portal...</p>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="bg-slate-900/95 backdrop-blur-xl py-9 px-7 shadow-2xl rounded-3xl sm:px-10">
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 flex items-start gap-3 text-red-200 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
          <div className="flex-1 text-left">
            <p className="font-semibold text-red-300">Sign in error</p>
            <p className="text-xs text-red-300/80 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-left">
            Administrator Email
          </label>
          <div className="relative rounded-2xl shadow-inner">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              placeholder="admin@brickyard.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 text-left">
            Password
          </label>
          <div className="relative rounded-2xl shadow-inner">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-800/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0A5C4F] hover:bg-[#08493F] active:scale-[0.99] text-white font-bold uppercase tracking-wider py-4 px-4 rounded-2xl transition-all text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-3"
        >
          {loading ? (
            'Verifying Credentials...'
          ) : (
            <>
              Sign In to Admin Portal <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Encrypted Administrator Access</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-6 lg:px-8 font-sans text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting without solid lines */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 shadow-2xl mb-5 p-2.5">
          <Image src="/logo2.1.png" alt="Brickyard" width={56} height={56} className="object-contain" priority />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-white drop-shadow-sm">
          Brickyard Admin
        </h1>
        <p className="mt-2 text-sm text-emerald-400 font-medium tracking-wide">
          Manage live bookings, true leads, and real-time analytics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Suspense fallback={<div className="text-center py-8 text-slate-400">Loading secure portal...</div>}>
          <AdminLoginForm />
        </Suspense>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Brickyard Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
