'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Search, Phone, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';
import { BRICKYARD_AGENTS } from '@/data/dubaiProperties';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AgentCard from '@/components/ui/AgentCard';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const languages = ['All', 'English', 'Arabic', 'Russian', 'French', 'Urdu'];

  const filteredAgents = BRICKYARD_AGENTS.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang =
      selectedLanguage === 'All' || agent.languages.includes(selectedLanguage);
    return matchesSearch && matchesLang;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0A5C4F] text-white py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Find an Agent', href: '/agents' },
            ]}
          />
          <div className="mt-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
              <Award className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Brickyard Certified Specialists</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Find a Trusted Dubai Agent
            </h1>
            <p className="text-sm text-emerald-100">
              Work with licensed real estate professionals awarded for verified listings, quick response times, and exceptional market knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agent name or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:border-[#0A5C4F] outline-none"
            />
          </div>

          {/* Language Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
            <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Language:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`tap-target px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-[#0A5C4F] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">No agents found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('All');
              }}
              className="mt-3 text-xs font-semibold text-[#0A5C4F] underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

