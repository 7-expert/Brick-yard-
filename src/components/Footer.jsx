import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#191917] text-[#f2ebe1] w-full flex flex-col font-sans relative z-10 overflow-hidden">
      
      {/* Top Main Section */}
      <div className="flex w-full">
        
        {/* Column 1: Brand & Ruler */}
        <div className="w-24 md:w-32 lg:w-40 flex-shrink-0 border-r border-[#f2ebe1]/20 relative flex flex-col items-center min-h-[75vh]">
          
          {/* Ruler Ticks */}
          <div className="absolute right-0 top-0 h-full flex flex-col justify-between py-12 items-end z-0">
            {[...Array(60)].map((_, i) => (
              <div key={i} className={`border-b border-[#f2ebe1]/30 ${i % 5 === 0 ? 'w-3 border-b-[1.5px]' : 'w-1.5'}`}></div>
            ))}
          </div>
          
          {/* Top Logo */}
          <div className="mt-8 lg:mt-12 z-10 bg-[#191917] p-4">
            <img 
              src="/logo2.1.png" 
              alt="Brickyard Logo" 
              className="w-24 md:w-32 object-contain opacity-90 hover:opacity-100 transition-opacity" 
            />
          </div>

          {/* Vertical Brand */}
          <div 
            className="mt-auto mb-12 text-[#f2ebe1] font-bold text-6xl md:text-7xl lg:text-[7rem] tracking-tighter leading-none select-none z-10"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Brickyard
          </div>
        </div>

        {/* Columns 2, 3, 4 Wrapper */}
        <div className="flex-grow flex flex-col lg:flex-row py-16 px-12 lg:px-24 relative gap-12 lg:gap-0">
          
          {/* Column 2: Scroll Image */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center relative group">
             {/* Small connecting horizontal line */}
             <div className="hidden lg:block absolute -left-24 top-[30%] w-24 border-t border-[#f2ebe1]/30"></div>
             
             <div className="w-48 h-32 bg-black mb-6 rounded-sm overflow-hidden z-10 relative">
               <img src="/commercial_space_1790348379162.jpg" className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500" alt="Desk" />
             </div>
             <h3 className="font-sans font-medium text-lg mb-1 tracking-tight">You've scrolled 1m</h3>
             <p className="text-[13px] opacity-80 max-w-[220px] leading-snug">
               That's the height of a bespoke <span className="underline cursor-pointer hover:text-white transition-colors">penthouse kitchen island</span>.
             </p>
          </div>

          {/* Column 3: Contact */}
          <div className="w-full lg:w-[25%] flex flex-col gap-10 justify-start pt-2">
            <div>
              <h4 className="text-[15px] font-serif mb-2 opacity-90">Find us</h4>
              <address className="not-italic text-[14px] font-sans tracking-tight leading-relaxed opacity-80">
                20th floor, Grosvenor Tower,<br />
                Business Bay, Dubai,<br />
                United Arab Emirates
              </address>
            </div>
            <div>
              <h4 className="text-[15px] font-serif mb-2 opacity-90">Email</h4>
              <a href="mailto:info@brickyard-ae-667726.hostingersite.com" className="text-[14px] font-sans tracking-tight opacity-80 hover:opacity-100 transition-opacity">
                info@brickyard-ae-667726.hostingersite.com
              </a>
            </div>
            <div>
              <h4 className="text-[15px] font-serif mb-2 opacity-90">Phone</h4>
              <div className="flex flex-col gap-[2px] text-[14px] font-sans tracking-tight opacity-80">
                <a href="tel:+971501182342" className="hover:opacity-100 transition-opacity">+971501182342</a>
                <a href="tel:+97143373565" className="hover:opacity-100 transition-opacity">+97143373565</a>
              </div>
            </div>
            <div>
              <h4 className="text-[15px] font-serif mb-2 opacity-90">Follow us</h4>
              <div className="flex flex-col gap-[2px] text-[14px] font-sans tracking-tight opacity-80">
                <a href="https://www.linkedin.com/in/brickyard-real-estate-4180b0321/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                <a href="https://www.instagram.com/brickyardrealestatellc/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Instagram</a>
                <a href="https://www.tiktok.com/@brickyardrealestate?" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">TikTok</a>
                <a href="https://www.facebook.com/people/Brickyard-Real-Estate-LLC/61562999425109/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Facebook</a>
              </div>
            </div>
          </div>

          {/* Column 4: Explore */}
          <div className="w-full lg:w-[40%] flex flex-col justify-start pt-2">
            <h4 className="text-[15px] font-serif mb-4 opacity-90">Explore</h4>
            <nav className="flex flex-col gap-0 z-10">
              {[
                { label: 'Buy', href: '#expert-advice' },
                { label: 'Rent', href: '#expert-advice' },
                { label: 'Sell', href: '#expert-advice' }
              ].map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="text-[2.75rem] md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold font-sans tracking-tighter leading-[1.05] hover:opacity-70 transition-opacity w-fit"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="flex w-full border-t border-[#f2ebe1]/20">
        
        {/* Empty left column matcher */}
        <div className="hidden lg:block w-24 md:w-32 lg:w-40 flex-shrink-0 border-r border-[#f2ebe1]/20"></div>
        
        {/* Legal Links */}
        <div className="flex-grow p-8 lg:px-24 lg:py-12 flex flex-col gap-1 text-[13px] opacity-70 font-sans tracking-tight">
          <p>&copy; {new Date().getFullYear()} Brickyard Real Estate. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}
