"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Luxury Sales",
    location: "Global Markets",
    type: "Penthouse & Estates",
    quote: "Brickyard's discrete approach to high-net-worth property acquisition resulted in the seamless purchase of our skyline penthouse. Their portfolio is unmatched.",
    author: "Elena Rostova",
    authorTitle: "Private Buyer",
    image: "/luxury_penthouse_1790348346204.jpg"
  },
  {
    id: 2,
    title: "Residential Buying",
    location: "Suburban & City",
    type: "Family Homes",
    quote: "Navigating a competitive market felt effortless with Brickyard. They found our perfect family home and handled negotiations with incredible precision and care.",
    author: "The Miller Family",
    authorTitle: "Homeowners",
    image: "/suburban_home_1790348356763.jpg"
  },
  {
    id: 3,
    title: "Urban Rentals",
    location: "Downtown Core",
    type: "Lofts & Apartments",
    quote: "Finding a premium rental in the city center was daunting until we partnered with Brickyard. Their access to off-market lofts secured us the perfect space.",
    author: "James Holden",
    authorTitle: "Executive Tenant",
    image: "/urban_loft_1790348368465.jpg"
  },
  {
    id: 4,
    title: "Commercial Leasing",
    location: "Financial District",
    type: "Retail & Office",
    quote: "Brickyard secured a flagship retail space for our brand that perfectly aligned with our expansion strategy. Their commercial insight is truly exceptional.",
    author: "Sarah Jenkins",
    authorTitle: "VP Expansion, Aura Retail",
    image: "/commercial_space_1790348379162.jpg"
  },
  {
    id: 5,
    title: "Exclusive Portfolios",
    location: "Coastal & Waterfront",
    type: "Investment Properties",
    quote: "Managing a global portfolio requires absolute trust. Brickyard consistently delivers high-yield waterfront properties that exceed our investment criteria.",
    author: "Marcus Thorne",
    authorTitle: "Director, Nexus Capital",
    image: "/waterfront_villa_1790348391865.jpg"
  }
];

const ProjectLayer = ({ project, index, progress }) => {
  const start = (index - 1) * 0.25;
  const end = index * 0.25;
  
  const clipPercent = useTransform(progress, [start, end], [100, 0]);
  const clipPath = useTransform(clipPercent, (val) => `inset(${Math.max(0, val)}% 0px 0px)`);
  
  // Blur effect tied to the reveal wipe
  const blurAmount = useTransform(clipPercent, [100, 0], ["blur(12px)", "blur(0px)"]);
  
  const yParallax = useTransform(progress, [start, end], ["15%", "0%"]);
  
  return (
    <motion.div 
      className="absolute inset-0 h-full w-full overflow-hidden bg-black"
      style={{ zIndex: index, clipPath: index === 0 ? 'inset(0% 0px 0px)' : clipPath }}
    >
      <motion.div 
        className="absolute inset-x-0"
        style={{ top: '-20%', height: '140%', y: index === 0 ? "0%" : yParallax }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transform-gpu will-change-transform"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent pointer-events-none opacity-95 transform-gpu" />
      </motion.div>

      {/* Text perfectly pinned and clipped by the parent's wipe */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-50 text-cream-light flex flex-col pointer-events-auto">
        <div className="w-full h-px bg-white/20 mb-8 md:mb-12 transform-gpu"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 w-full">
          <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2">
            <div className="flex items-center gap-2 font-sans font-medium">
              <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                0{index + 1}
              </span>
              <span className="text-white/60">/</span>
              <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                05
              </span>
            </div>

            <div>
              <motion.h2 
                className="font-sans font-bold text-6xl md:text-[7rem] tracking-tight leading-[0.9] mb-4"
                style={{ filter: index === 0 ? 'blur(0px)' : blurAmount }}
              >
                {project.title}
              </motion.h2>
              <div className="font-sans text-lg md:text-xl text-white/80 leading-snug">
                <p>{project.location}</p>
                <p>{project.type}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 max-w-3xl flex flex-col gap-4">
            <div className="font-serif text-6xl text-white/80 leading-none h-8 -ml-2">“</div>
            <p className="font-sans text-lg md:text-xl lg:text-2xl leading-relaxed text-white/95 font-medium">
              {project.quote}
            </p>
            <div className="mt-4 md:mt-6">
              <p className="font-sans font-bold text-white mb-1">{project.author}</p>
              <p className="font-serif text-white/70 italic text-lg">{project.authorTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Images & Texts all in one clipped layer */}
        {projects.map((project, index) => (
          <ProjectLayer key={`layer-${project.id}`} project={project} index={index} progress={scrollYProgress} />
        ))}
        
        {/* Global View Project Hover Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-500 z-[100] cursor-pointer group">
          <div className="text-white font-sans font-medium text-lg md:text-xl border-b border-white pb-1 flex items-center gap-2 shadow-sm">
            View project <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
