'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setError('Access denied. Only registered admins can access the admin dashboard.');
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || 'Invalid email or password');
      setLoading(false);
      return;
    }

    // Check if user is in admins table
    const { data: adminRecord, error: adminErr } = await supabase
      .from('admins')
      .select('id')
      .eq('id', data.user.id)
      .maybeSingle();

    if (adminErr || !adminRecord) {
      await supabase.auth.signOut();
      setError('Access denied. This account is not listed in the admins database table.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="bg-ink-soft/80 backdrop-blur-md py-8 px-6 shadow-2xl border border-white/10 rounded-lg sm:px-10">
      {error && (
        <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-cream-light/70 mb-2">
            Admin Email
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cream-light/40">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded text-sm text-cream-light placeholder-cream-light/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
              placeholder="admin@brickyard.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-sans uppercase tracking-wider text-cream-light/70 mb-2">
            Password
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cream-light/40">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded text-sm text-cream-light placeholder-cream-light/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-gradient text-ink font-bold uppercase tracking-widest py-3.5 px-4 rounded hover:brightness-110 transition-all text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            'Authenticating...'
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#191917] flex flex-col justify-center py-12 px-6 lg:px-8 font-sans text-cream-light">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 border border-gold-400/40 mb-4 shadow-xl p-2">
          <Image src="/logo2.1.png" alt="Brickyard" width={64} height={64} className="object-contain" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-light">
          Brickyard Admin
        </h2>
        <p className="mt-2 text-sm text-gold-400 font-sans tracking-wide">
          Sign in to manage bookings and inquiries
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={<div className="text-center py-8 text-cream-light/60">Loading login form...</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
