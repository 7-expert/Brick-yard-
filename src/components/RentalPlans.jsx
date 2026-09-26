'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const plans = [
  {
    id: '01',
    title: 'Long-Term Rental Plan',
    features: [
      'Typically 12 Months agreement',
      'Stable Tenancy',
      'Consistent Income',
      'Reduced Turnover Costs'
    ],
    revenue: '98,000 AED',
    image: '/suburban_home_1790348356763.jpg'
  },
  {
    id: '02',
    title: 'Short-Term Rental Plan',
    features: [
      'Some Weeks or few Months',
      'Travelers or Business Professionals Tenants',
      'Higher Rental Rates maximize your income',
      'High Seasonal Demand'
    ],
    revenue: '130,000 AED',
    image: '/luxury_penthouse_1790348346204.jpg'
  }
];

export default function RentalPlans() {
  const [activePlan, setActivePlan] = useState(0);

  return (
    <section className="bg-[#FCFAF5] py-20 lg:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Image and Details */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] rounded-tl-[2rem] rounded-tr-[2rem] lg:rounded-tr-none lg:rounded-bl-[2rem] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${plans[activePlan].image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              {/* Overlay Details */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 flex flex-col md:flex-row justify-between items-end gap-8">
                
                {/* Left Side: Features & Book Now */}
                <div className="flex flex-col gap-6 w-full md:w-auto">
                  <ul className="space-y-3">
                    {plans[activePlan].features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white drop-shadow-md">
                        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5 drop-shadow-md" />
                        <span className="font-sans text-sm md:text-base opacity-95">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="bg-gold-500 hover:bg-gold-600 text-white font-sans font-medium px-8 py-3 rounded-sm transition-colors w-max shadow-lg">
                    Book Now
                  </button>
                </div>
                
                {/* Right Side: Revenue */}
                <div className="w-full md:w-auto text-left md:text-right flex flex-col">
                  <p className="font-sans text-white/80 text-sm uppercase tracking-wider mb-1 drop-shadow-md">Your Net Rental Revenue</p>
                  <p className="font-serif text-3xl md:text-4xl text-gold-400 font-bold drop-shadow-md">
                    {plans[activePlan].revenue}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: List of Plans */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-12">
            <span className="font-sans font-bold text-gold-600 text-sm tracking-[0.2em] uppercase mb-4 block">
              CHOOSE YOUR PLAN
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink font-bold leading-tight">
              Maximize Your Property Value
            </h2>
          </div>

          <div className="flex flex-col">
            {plans.map((plan, index) => {
              const isActive = activePlan === index;
              return (
                <div 
                  key={plan.id}
                  onClick={() => setActivePlan(index)}
                  className={`group flex items-center justify-between py-8 border-b cursor-pointer transition-all duration-300 ${isActive ? 'border-gold-400' : 'border-ink/10 hover:border-ink/30'}`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`font-sans font-bold text-sm ${isActive ? 'text-gold-500' : 'text-ink-soft'}`}>
                      {plan.id}
                    </span>
                    <div className="relative">
                      {isActive && (
                        <motion.div 
                          layoutId="activeDot"
                          className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-500"
                        />
                      )}
                      <h3 className={`font-serif text-2xl md:text-3xl font-bold transition-colors duration-300 ${isActive ? 'text-gold-600' : 'text-ink'}`}>
                        {plan.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-gold-500 text-white' : 'bg-gold-100 text-gold-600 group-hover:bg-gold-200'}`}>
                    <ArrowRight className="w-5 h-5 transform -rotate-45" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
