'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrickyardAIModal({ isOpen, onClose, onOpenBooking }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your Brickyard AI Luxury Advisor. Ask me anything about current property yields, architectural listings, neighborhoods, or valuation trends.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "What are the top appreciating luxury neighborhoods?",
    "Compare Tribeca Lofts vs Miami Beach Waterfront",
    "How do luxury rental yields perform in Downtown Manhattan?",
  ];

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: prompt }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let reply = "Based on recent transaction data from the Brickyard luxury index, prime assets in Manhattan and Miami have shown consistent 6-8% annual appreciation with strong tenant retention. Our advisors can prepare an off-market prospectus tailored to your specific timeline.";
      
      const lower = prompt.toLowerCase();
      if (lower.includes('compare') || lower.includes('miami') || lower.includes('tribeca')) {
        reply = "Tribeca offers unmatched heritage character, high ceilings, and long-term capital preservation ($2,100+/sqft). In contrast, Miami Beach offers higher gross rental yields (5.8% - 7.2%) and favorable tax positioning. Both are outstanding cornerstone assets.";
      } else if (lower.includes('yield') || lower.includes('rental')) {
        reply = "Currently, waterfront condos in Miami Beach and boutique multifamily lofts in Tribeca yield between 4.9% to 6.8% net. Corporate and executive tenants favor full-service buildings with 24/7 concierge and private elevators.";
      } else if (lower.includes('neighborhood') || lower.includes('appreciating')) {
        reply = "The top-performing submarkets this quarter are Downtown Waterfront, Beverly Hills Canyons, and Greenwich Enclaves, driven by tight inventory and sustained cash-buyer demand.";
      }

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
      setLoading(false);
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink/75 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white max-w-xl w-full rounded-2xl p-6 sm:p-7 shadow-2xl z-10 border border-gold-300 font-sans text-ink flex flex-col h-[580px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-ink/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gold-500 text-ink flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-5 h-5 text-ink" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-ink flex items-center gap-2">
                  Brickyard AI Concierge
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                    BETA
                  </span>
                </h3>
                <p className="text-xs text-ink-soft">Real-time real estate insights & comps</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-cream-dark/60 hover:bg-cream-dark text-ink flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-sm ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-ink text-gold-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    BY
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-ink text-gold-200 rounded-tr-none'
                      : 'bg-cream-light border border-ink/10 text-ink rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 text-sm justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-ink text-gold-200 flex items-center justify-center shrink-0 text-xs font-bold animate-pulse">
                  BY
                </div>
                <div className="bg-cream-light border border-ink/10 text-ink-soft px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-ping"></span>
                  Analyzing market index...
                </div>
              </div>
            )}
          </div>

          {/* Sample Prompts */}
          <div className="py-2 flex gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(p)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-cream-dark/60 hover:bg-gold-100 hover:border-gold-400 border border-ink/10 text-ink-soft hover:text-ink transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="pt-2 border-t border-ink/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about properties, pricing, or investment..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-cream-light/60 border border-ink/15 focus:border-gold-500 rounded-xl text-xs sm:text-sm outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 bg-ink hover:bg-gold-500 text-gold-200 hover:text-ink font-bold rounded-xl transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

