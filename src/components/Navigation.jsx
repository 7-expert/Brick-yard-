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
    { label: 'Discover', href: '/' },
    { label: 'Buy', href: '/listings?purpose=sale' },
    { label: 'Rent', href: '/listings?purpose=rent' },
    { label: 'New projects', href: '/projects' },
    { label: 'Area guide', href: '/areas' },
  ];

  return (
    <>
      {/* TOP HEADER (Matching Reference Image: Official Brickyard Real Estate Logo, Active Underline, List Property & S Avatar) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo matching screenshot */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/logo1_crop.png"
                alt="Brickyard Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-slate-900 uppercase font-sans leading-none">
                Brickyard
              </span>
              <span className="text-[10px] tracking-widest text-slate-500 uppercase font-medium mt-0.5">
                Real Estate
              </span>
            </div>
            <span className="hidden sm:inline-block w-[1px] h-6 bg-slate-200 ml-2"></span>
          </Link>

          {/* Center: Desktop Nav Links with active indicator matching screenshot */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1.5 transition-colors ${
                    isActive
                      ? 'text-slate-900 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#0A5C4F]'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Saved listings & Mobile Menu) */}
          <div className="flex items-center gap-3">
            {/* Saved Count Heart with Animated Badge */}
            <Link
              href="/saved"
              aria-label="Saved listings"
              className="tap-target relative p-2 rounded-full hover:bg-slate-100/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer group"
              title="Saved properties"
            >
              <Heart className="w-5 h-5 text-slate-700 group-hover:text-red-500 transition-colors" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden tap-target p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
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
          </div>
        )}
      </header>

      {/* MOBILE FIXED BOTTOM APP BAR (Feed, Search, Projects, Saved, Contact) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-4 py-2 flex items-center justify-around shadow-lg">
        
        {/* Tab 1: Feed */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            pathname === '/' ? 'text-[#0A5C4F] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px]">Feed</span>
        </Link>

        {/* Tab 2: Search */}
        <Link
          href="/listings"
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            pathname.startsWith('/listings') ? 'text-[#0A5C4F] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Search className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px]">Search</span>
        </Link>

        {/* Tab 3: Projects */}
        <Link
          href="/projects"
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            pathname === '/projects' ? 'text-[#0A5C4F] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Building2 className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px]">Projects</span>
        </Link>

        {/* Tab 4: Saved */}
        <Link
          href="/saved"
          className={`flex flex-col items-center gap-0.5 relative transition-colors ${
            pathname === '/saved' ? 'text-[#0A5C4F] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <Heart className="w-5 h-5 stroke-[2.2]" />
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
          <span className="text-[10px]">Saved</span>
        </Link>

        {/* Tab 5: Contact */}
        <Link
          href="/contact"
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            pathname === '/contact' ? 'text-[#0A5C4F] font-bold' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <MessageSquare className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px]">Contact</span>
        </Link>

      </div>
    </>
  );
}
