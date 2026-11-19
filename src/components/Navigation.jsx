"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, PlusCircle, Building2, PhoneCall } from "lucide-react";

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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Buy", href: "/listings?purpose=sale" },
    { label: "Rent", href: "/listings?purpose=rent" },
    { label: "Commercial", href: "/listings?purpose=commercial" },
    { label: "New Projects", href: "/projects" },
    { label: "Find Agent", href: "/agents" },
    { label: "Area Guides", href: "/areas" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar on Desktop */}
      <div className="hidden lg:flex items-center justify-between px-6 lg:px-12 py-1.5 bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#0A5C4F] font-semibold">
            <span>🇦🇪</span> Dubai, United Arab Emirates
          </span>
          <span className="text-slate-300">|</span>
          <span>RERA Licensed Agency</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700">Currency: AED (Dirhams)</span>
          <span className="text-slate-300">|</span>
          <a href="tel:+971501182342" className="hover:text-[#0A5C4F] font-medium flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-[#0A5C4F]" />
            <span>+971 50 118 2342</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/logo1_crop.png"
            alt="Brickyard Logo"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#0A5C4F] transition-colors leading-none">
              Brickyard
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#0A5C4F] mt-0.5">
              Properties Dubai
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="py-1 hover:text-[#0A5C4F] transition-colors relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0A5C4F] group-hover:w-full transition-all duration-200" />
            </Link>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Saved Listings / Favourites Button */}
          <Link
            href="/saved"
            aria-label="Saved listings"
            className="tap-target relative p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
          >
            <Heart className="w-5 h-5 text-slate-700" />
            {savedCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FF6B35] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </Link>

          {/* List Your Property CTA (Warm Amber Accent #FF6B35) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex tap-target items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85522] text-white text-xs font-bold tracking-wide shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Property</span>
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="tap-target lg:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3 pb-6 border-b border-slate-100 text-sm font-semibold text-slate-800">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 px-3 rounded-lg hover:bg-[#E6F2F0] hover:text-[#0A5C4F] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/saved"
              className="py-2 px-3 rounded-lg hover:bg-[#E6F2F0] hover:text-[#0A5C4F] flex items-center justify-between"
            >
              <span>Saved Listings</span>
              {savedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">
                  {savedCount}
                </span>
              )}
            </Link>
            <Link
              href="/about"
              className="py-2 px-3 rounded-lg hover:bg-[#E6F2F0] hover:text-[#0A5C4F]"
            >
              About Brickyard
            </Link>
            <Link
              href="/contact"
              className="py-2 px-3 rounded-lg hover:bg-[#E6F2F0] hover:text-[#0A5C4F]"
            >
              Contact Us
            </Link>
          </nav>

          <div className="pt-5 space-y-3">
            <Link
              href="/contact"
              className="w-full py-3 rounded-lg bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Property in Dubai</span>
            </Link>

            <div className="text-center text-xs text-slate-500 pt-2">
              <span>Customer Support: </span>
              <a href="tel:+971501182342" className="font-semibold text-[#0A5C4F]">
                +971 50 118 2342
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
