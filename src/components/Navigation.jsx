"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({ hours: "12", minutes: "00" });
  const [timeZone, setTimeZone] = useState("LOCAL");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Buy", href: "/listings?type=sale" },
    { label: "Rent", href: "/listings?type=rent" },
    { label: "Sell", href: "/contact" },
    { label: "Our Agents", href: "/about" },
    { label: "Vision & Values", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0")
      });
      try {
        // Try to get short timezone name like "EST", "GMT", "PDT"
        const tzString = now.toLocaleTimeString('en-US', { timeZoneName: 'short' });
        const parts = tzString.split(' ');
        if (parts.length > 2) {
          setTimeZone(parts[parts.length - 1]);
        }
      } catch (e) {}
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-50 font-sans text-ink"
      >
        {/* Top Left: Time Indicator */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center -mr-1 z-10 bg-white/70 backdrop-blur-md shadow-sm">{time.hours}</span>
            <span className="mx-1">:</span>
            <span className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center -ml-1 z-0 bg-white/70 backdrop-blur-md shadow-sm">{time.minutes}</span>
          </div>
          <span className="ml-2 tracking-widest text-ink/80 font-bold">{timeZone}</span>
        </div>

        {/* Top Center: Logo Block (only visible if menu closed) */}
        {!isOpen && (
          <div className="hidden md:flex bg-white/90 backdrop-blur-md text-ink rounded flex items-center overflow-hidden border border-ink/10 shadow-md">
            <Link href="/" className="px-6 py-2 border-r border-ink/10 flex items-center justify-center gap-3">
              <Image src="/logo1_crop.png" alt="Brickyard Logo" width={48} height={48} className="object-contain" />
              <span className="font-serif text-lg tracking-widest uppercase font-bold">Brickyard</span>
            </Link>
            <button 
              onClick={() => setIsOpen(true)}
              className="px-5 py-4 hover:bg-ink/5 transition-colors group"
            >
              <div className="space-y-1.5 w-6">
                <div className="h-0.5 bg-ink w-full group-hover:scale-x-110 transition-transform origin-left"></div>
                <div className="h-0.5 bg-ink w-3/4 group-hover:w-full transition-all duration-300"></div>
              </div>
            </button>
          </div>
        )}

        {/* Top Right: Let's Talk */}
        <Link href="#expert-advice" className="flex items-center gap-3 cursor-pointer group">
          <span className="font-sans font-bold text-lg border-b-2 border-ink/30 pb-0.5 group-hover:border-ink transition-colors">Let's talk</span>
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-ink/10 shadow-sm text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </motion.div>

      {/* Full Screen Menu Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-8 bg-black/60 backdrop-blur-md p-4 overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FCFAF5] w-full max-w-4xl rounded-sm shadow-2xl flex flex-col mb-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-ink/10 p-6">
                <div className="flex items-center gap-3">
                  <Image src="/logo1_crop.png" alt="Brickyard Logo" width={60} height={60} className="object-contain" />
                  <span className="font-serif text-2xl tracking-widest uppercase font-bold text-ink">Brickyard</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-white transition-all duration-300 rounded-full group"
                >
                  <X className="w-5 h-5 text-ink group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Modal Body - Links */}
              <div className="p-8 md:p-12 bg-white">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      key={idx}
                    >
                      <Link 
                        href={link.href} 
                        onClick={() => setIsOpen(false)}
                        className="font-sans text-3xl md:text-5xl text-ink hover:text-gold-500 transition-all duration-300 flex items-center group w-fit font-bold tracking-tight"
                      >
                        <span className="opacity-0 -ml-8 w-8 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-gold-500">
                          <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Modal Footer - Lately at Brickyard */}
              <div className="border-t border-ink/10 p-8 md:p-12 bg-[#FCFAF5]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                  <span className="font-sans text-sm text-ink font-bold tracking-[0.2em] uppercase">Lately at Brickyard</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link href="/listings/1" className="block relative h-48 rounded-sm bg-gold-600 overflow-hidden group shadow-md">
                    <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&w=600&q=80" alt="Penthouse" fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <h4 className="text-white font-sans text-xl font-bold mb-1">Featured Penthouse</h4>
                      <span className="text-gold-400 text-sm font-medium">Downtown, NY</span>
                    </div>
                  </Link>

                  <div className="relative h-48 rounded-sm bg-white overflow-hidden border border-ink/10 p-6 flex flex-col justify-between group cursor-pointer hover:border-gold-400 transition-colors shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-full border border-gold-400 flex items-center justify-center font-serif text-xl font-bold text-gold-600 bg-gold-50">
                        26
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400"></div>
                    </div>
                    <span className="font-sans text-ink font-bold text-lg tracking-tight group-hover:text-gold-600 transition-colors">Active Luxury Developments</span>
                  </div>

                  <Link href="/about" className="block relative h-48 rounded-sm bg-ink overflow-hidden group shadow-md">
                    <Image src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&w=600&q=80" alt="Office" fill className="object-cover opacity-40 grayscale group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <h4 className="text-white font-sans text-xl font-bold mb-1">Inside Brickyard</h4>
                      <span className="text-white/70 text-sm font-medium">Market Insights Q3</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
