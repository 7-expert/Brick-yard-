"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { brandNames as allLogos } from '../data/brandLogos';

// Split into 3 columns
const col1 = [allLogos[0], allLogos[3], allLogos[6], allLogos[9]];
const col2 = [allLogos[1], allLogos[4], allLogos[7], allLogos[10]];
const col3 = [allLogos[2], allLogos[5], allLogos[8], allLogos[0]]; // Added first name again to balance column length

const LogoBox = ({ name, idx }) => {
  const heightClass = idx % 3 === 0 ? "h-48" : idx % 2 === 0 ? "h-64" : "h-40";
  return (
    <div className={`bg-[#EBE2D5]/70 flex flex-shrink-0 items-center justify-center p-4 md:p-6 rounded-sm w-full overflow-hidden ${heightClass} hover:bg-[#EBE2D5] transition-colors duration-500`}>
      <span className="font-sans font-bold text-xl md:text-2xl lg:text-3xl text-ink uppercase tracking-tight text-center mix-blend-multiply opacity-70 transition-opacity hover:opacity-100 break-words w-full">
        {name}
      </span>
    </div>
  );
};

const LogoColumn = ({ logos, direction }) => {
  const duplicatedLogos = [...logos, ...logos, ...logos]; // Triple to ensure smooth infinite loop on large screens
  
  return (
    <div className="w-full flex-1 relative h-full">
      <motion.div 
        className="flex flex-col gap-4 lg:gap-6 w-full h-fit absolute top-0 left-0"
        animate={{ y: direction === 'up' ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {duplicatedLogos.map((name, i) => (
          <LogoBox key={i} name={name} idx={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default function ClientLogos() {
  return (
    <section className="bg-cream-light py-24 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-16 md:gap-12 min-h-screen overflow-hidden">
      {/* Left Text Sticky */}
      <div className="w-full md:w-5/12 z-10 relative">
        <div className="sticky top-32">
          <h2 className="font-sans font-bold text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight text-ink mb-8 leading-[0.95]">
            We Work With
          </h2>
          <p className="font-sans font-medium text-lg md:text-xl text-ink/80 leading-relaxed max-w-md">
            Many of our projects come from clients who choose to work with us time and again. Others are introduced through the professional relationships we've built over time. From household brands to the most trusted names in property, our partnerships are designed to continue beyond handover.
          </p>
        </div>
      </div>

      {/* Right Grid Marquee */}
      <div 
        className="w-full md:w-7/12 flex gap-4 lg:gap-6 h-[70vh] md:h-[80vh] relative overflow-hidden"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
      >
        <LogoColumn logos={col1} direction="down" />
        <LogoColumn logos={col2} direction="up" />
        <div className="hidden md:block w-full flex-1">
          <LogoColumn logos={col3} direction="down" />
        </div>
      </div>
    </section>
  );
}
