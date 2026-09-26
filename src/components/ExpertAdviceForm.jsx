import React from 'react';

export default function ExpertAdviceForm() {
  return (
    <section id="expert-advice" className="relative w-full py-16 lg:py-24 flex items-center">
      {/* Full Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/urban_loft_1790348368465.jpg')" }}
      ></div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-ink/80 md:bg-ink/70"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
        
        {/* Left Column - Text */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center text-cream-light pr-0 lg:pr-12">
          <p className="font-sans text-base md:text-lg font-medium tracking-wide mb-3 text-gold-400">
            Expert Brokerage Services For Buyers, Sellers, And Investors.
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            LEADING REAL ESTATE BROKERAGE YOU CAN TRUST
          </h2>
          
          <ul className="space-y-4">
            {[
              "Navigating Real Estate with Professional Brokerage Solutions",
              "Maximize Your Property Potential with Our Trusted Brokerage",
              "Bringing You the Best Brokerage Experience in Real Estate",
              "Your Go-To Brokerage for Seamless Property Transactions"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-base md:text-lg font-sans text-cream-dark">
                <svg className="w-5 h-5 text-gold-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center max-w-lg mx-auto lg:mx-0">
          <div className="bg-ink/40 backdrop-blur-md p-6 md:p-8 border border-white/10 shadow-2xl rounded-sm">
            <h3 className="font-serif text-2xl md:text-3xl text-cream-light mb-6 leading-tight">
              Looking For Expert Advice For Your Property? <br />
              <span className="text-gold-400 italic text-xl md:text-2xl">Leave Your Message Here.</span>
            </h3>
            
            <form className="space-y-5 font-sans">
              <div className="flex flex-col gap-5">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-3 py-2.5 bg-white/5 border-b border-white/20 focus:border-gold-400 focus:outline-none transition-colors text-cream-light placeholder-cream-light/50 text-sm md:text-base"
                  required
                />
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    defaultValue="UAE +971"
                    className="w-1/3 px-3 py-2.5 bg-white/5 border-b border-white/20 text-cream-light/70 focus:outline-none text-sm md:text-base"
                    readOnly
                  />
                  <input 
                    type="tel" 
                    placeholder="56 458 564" 
                    className="w-2/3 px-3 py-2.5 bg-white/5 border-b border-white/20 focus:border-gold-400 focus:outline-none transition-colors text-cream-light placeholder-cream-light/50 text-sm md:text-base"
                    required
                  />
                </div>
              </div>
              
              <textarea 
                placeholder="Enter your message here..." 
                rows="3"
                className="w-full px-3 py-2.5 bg-white/5 border-b border-white/20 focus:border-gold-400 focus:outline-none transition-colors text-cream-light placeholder-cream-light/50 resize-none mt-2 text-sm md:text-base"
                required
              ></textarea>
              
              <label className="flex items-start gap-3 cursor-pointer group mt-4">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 border border-white/30 rounded-sm appearance-none checked:bg-gold-500 checked:border-gold-500 focus:outline-none transition-colors cursor-pointer bg-white/5"
                    required
                  />
                  <svg className="w-3 h-3 text-ink absolute pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-cream-light/70 text-xs md:text-sm leading-relaxed">
                  I consent to the processing of personal data in accordance with the privacy policy.
                </span>
              </label>
              
              <button 
                type="submit" 
                className="w-full mt-6 bg-gold-gradient text-ink font-bold uppercase tracking-widest py-3 px-6 rounded-sm hover:brightness-110 transition-all text-sm shadow-xl"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
