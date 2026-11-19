'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  Menu,
  X,
  Search,
  MessageSquare,
  User,
  Home,
  Building2,
  Compass,
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const updateSavedCount = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('brickyard_saved_listings') || '[]');
      setSavedCount(saved.length);
    } catch (e) {}
  };

  useEffect(() => {
    updateSavedCount();
    window.addEventListener('brickyard_saved_updated', updateSavedCount);
    return () => window.removeEventListener('brickyard_saved_updated', updateSavedCount);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Feed', href: '/' },
    { label: 'Houses', href: '/listings?type=Villa' },
    { label: 'Apartments', href: '/listings?type=Apartment' },
    { label: 'New Projects', href: '/projects' },
    { label: 'Agents', href: '/agents' },
    { label: 'Area Guides', href: '/areas' },
  ];

  return (
    <>
      {/* TOP HEADER (Matching Reference: Logo Left, Feed Center, Hamburger Right) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Left: Brand Icon */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo1_crop.png"
              alt="Brickyard Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="hidden sm:inline font-bold text-lg tracking-tight text-slate-900">
              Brickyard
            </span>
          </Link>

          {/* Center Title (Feed) */}
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Feed
            </h1>
          </div>

          {/* Right: Actions & Hamburger */}
          <div className="flex items-center gap-2">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600 mr-4">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`hover:text-slate-900 transition-colors ${
                    pathname === item.href ? 'text-slate-900 font-bold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/saved"
              aria-label="Saved listings"
              className="tap-target relative p-2 rounded-full hover:bg-slate-100 text-slate-700 hidden sm:flex items-center justify-center cursor-pointer"
            >
              <Heart className="w-5 h-5 text-slate-700" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Hamburger Button (Exact Reference) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="tap-target p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Full Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-6 shadow-xl animate-fadeIn">
            <nav className="flex flex-col space-y-3 pb-6 border-b border-slate-100 text-sm font-semibold text-slate-800">
              <Link href="/" className="py-2 px-3 rounded-xl hover:bg-slate-50">
                Feed
              </Link>
              <Link href="/listings?type=Villa" className="py-2 px-3 rounded-xl hover:bg-slate-50">
                Houses & Villas
              </Link>
              <Link href="/listings?type=Apartment" className="py-2 px-3 rounded-xl hover:bg-slate-50">
                Apartments
              </Link>
              <Link href="/projects" className="py-2 px-3 rounded-xl hover:bg-slate-50">
                New Projects
              </Link>
              <Link href="/agents" className="py-2 px-3 rounded-xl hover:bg-slate-50">
                Find Agents
              </Link>
              <Link href="/areas" className="py-2 px-3 rounded-xl hover:bg-slate-50">
                Area Guides
              </Link>
              <Link href="/saved" className="py-2 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between">
                <span>Saved Listings</span>
                {savedCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                    {savedCount}
                  </span>
                )}
              </Link>
              <Link href="/admin/login" className="py-2 px-3 rounded-xl hover:bg-slate-50 text-slate-500">
                Admin Portal
              </Link>
            </nav>

            <div className="pt-4">
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center shadow-sm text-center"
              >
                List Your Property
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE FIXED BOTTOM APP BAR (Exact Reference: Feed, Search, Saved, Chat, Profile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-6 py-2 flex items-center justify-between shadow-lg">
        
        {/* Tab 1: Feed (Active) */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 ${
            pathname === '/' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Feed</span>
        </Link>

        {/* Tab 2: Search */}
        <Link
          href="/listings"
          className={`flex flex-col items-center gap-0.5 ${
            pathname.startsWith('/listings') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Search</span>
        </Link>

        {/* Tab 3: Saved */}
        <Link
          href="/saved"
          className={`flex flex-col items-center gap-0.5 relative ${
            pathname === '/saved' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Heart className="w-5 h-5" />
          {savedCount > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
          <span className="text-[10px]">Saved</span>
        </Link>

        {/* Tab 4: Messages / Enquire */}
        <Link
          href="/contact"
          className={`flex flex-col items-center gap-0.5 ${
            pathname === '/contact' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Contact</span>
        </Link>

        {/* Tab 5: Admin / Profile */}
        <Link
          href="/admin"
          className={`flex flex-col items-center gap-0.5 ${
            pathname.startsWith('/admin') ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </Link>

      </div>
    </>
  );
}
