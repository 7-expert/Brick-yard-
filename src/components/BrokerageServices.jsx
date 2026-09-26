'use client';
import React, { useState } from 'react';
import { BadgeDollarSign, Key, Home, Briefcase, Building2, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    icon: <BadgeDollarSign className="w-6 h-6 text-gold-500" strokeWidth={1.5} />,
    title: "Property Buying and Selling",
    description: "Our brokerage provides end-to-end support for clients looking to buy or sell properties. From finding the perfect home or investment property to negotiating favorable terms, we ensure a smooth and successful process."
  },
  {
    icon: <Key className="w-6 h-6 text-gold-500" strokeWidth={1.5} />,
    title: "Brokerage Services",
    description: "At Brickyard Real Estate Brokerage, we provide expert services for buyers, sellers, investors, and renters. Specializing in residential, commercial, and investment properties, our team offers personalized solutions to ensure smooth and successful transactions."
  },
  {
    icon: <Home className="w-6 h-6 text-gold-500" strokeWidth={1.5} />,
    title: "Rental Services",
    description: "For landlords and tenants alike, our rental services simplify the leasing process. We assist landlords by listing properties, screening tenants, and drafting lease agreements. For tenants, we provide access to a curated selection of rental properties that fit your needs."
  },
  {
    icon: <Briefcase className="w-6 h-6 text-gold-500" strokeWidth={1.5} />,
    title: "Real Estate Investment Consulting",
    description: "Our brokerage offers strategic consulting services to help clients make smart, profitable real estate investments. We conduct market analysis, ROI evaluations, and risk assessments, equipping investors with the insights needed to make informed decisions."
  },
  {
    icon: <Building2 className="w-6 h-6 text-gold-500" strokeWidth={1.5} />,
    title: "Property Management",
    description: "Brickyard offers comprehensive property management services for landlords and investors. We handle everything from tenant screening and rent collection to maintenance and legal compliance, ensuring that properties are well-maintained and generate steady income."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-gold-500" strokeWidth={1.5} />,
    title: "Luxury Property Management",
    description: "For owners of luxury properties, our bespoke property management services provide an unparalleled level of attention and care. From high-end tenant selection to exquisite property maintenance, we understand the unique needs of luxury real estate."
  }
];

export default function BrokerageServices() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="bg-cream-light py-20 lg:py-28 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="mb-16">
          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="font-sans font-bold text-gold-600 text-sm tracking-[0.2em] uppercase">
              WHAT WE OFFER
            </span>
            <div className="w-16 h-px bg-gold-400"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ filter: 'blur(15px)', opacity: 0, y: 15 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink font-bold mb-6"
          >
            Our Brokerage Services
          </motion.h2>
          
          <motion.p 
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-sans text-ink-soft text-lg max-w-2xl leading-relaxed"
          >
            From buying and selling to investment and property management, we provide end-to-end real estate solutions tailored to your goals.
          </motion.p>
        </div>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              key={index} 
              className="bg-[#FCFAF5] border border-gold-200/60 p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-gold-400 flex items-center justify-center mb-5 bg-white">
                {service.icon}
              </div>
              
              <h3 className="font-serif text-xl text-ink font-bold mb-3 leading-snug">
                {service.title}
              </h3>
              
              <p className="font-sans text-ink-soft mb-6 leading-relaxed flex-grow line-clamp-2">
                {service.description}
              </p>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedService(service);
                }}
                className="inline-flex items-center gap-2 font-sans font-medium text-gold-600 hover:text-gold-700 transition-colors mt-auto w-max"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#FCFAF5] p-8 md:p-12 max-w-2xl w-full rounded-sm border border-gold-200/60 shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-ink-soft hover:text-ink transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 rounded-full border border-gold-400 flex items-center justify-center mb-6 bg-white">
                {selectedService.icon}
              </div>
              
              <h3 className="font-serif text-3xl md:text-4xl text-ink font-bold mb-6 leading-tight">
                {selectedService.title}
              </h3>
              
              <p className="font-sans text-ink-soft text-lg leading-relaxed">
                {selectedService.description}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
