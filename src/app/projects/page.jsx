'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Calendar, CreditCard, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { DUBAI_PROJECTS } from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LeadForm from '@/components/ui/LeadForm';

export default function ProjectsPage() {
  const [selectedDeveloper, setSelectedDeveloper] = useState('All');
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const developers = ['All', 'Emaar Properties', 'Nakheel', 'Sobha Realty', 'Binghatti Developers'];

  const filteredProjects = selectedDeveloper === 'All'
    ? DUBAI_PROJECTS
    : DUBAI_PROJECTS.filter((p) => p.developer.toLowerCase().includes(selectedDeveloper.toLowerCase()));

  const handleOpenLead = (proj) => {
    setActiveProject(proj);
    setLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0A5C4F] text-white py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'New Projects', href: '/projects' },
            ]}
          />
          <div className="mt-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Dubai Off-Plan Developments</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              New Projects in Dubai
            </h1>
            <p className="text-sm text-emerald-100">
              Explore off-plan residences and luxury master communities directly with licensed developer sales channels.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        
        {/* Developer Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-6">
          {developers.map((dev) => (
            <button
              key={dev}
              onClick={() => setSelectedDeveloper(dev)}
              className={`tap-target px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                selectedDeveloper === dev
                  ? 'bg-[#0A5C4F] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {dev}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[4/3] bg-slate-200 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-bold uppercase shadow-xs">
                  {project.badge}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#0A5C4F] uppercase tracking-wider block mb-1">
                    {project.developer}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0A5C4F] transition-colors leading-snug">
                    {project.name}
                  </h2>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{project.location}, Dubai</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Spec box */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-2 mb-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-500 text-[11px]">Starting from</span>
                      <span className="text-[#0A5C4F] font-bold text-sm">
                        {formatAED(project.startingPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Handover Date</span>
                      <span className="font-semibold text-slate-800">{project.handoverDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Payment Plan</span>
                      <span className="font-semibold text-slate-800">{project.paymentPlan}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenLead(project)}
                    className="tap-target flex-1 py-2.5 px-3 rounded-lg bg-[#E6F2F0] hover:bg-[#D5EBE8] text-[#0A5C4F] font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#0A5C4F]" />
                    <span>Register Interest</span>
                  </button>

                  <a
                    href="https://wa.me/971501182342"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target px-3 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center"
                    aria-label="Direct WhatsApp"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lead Form Modal */}
      {leadModalOpen && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
            <div className="mb-4">
              <span className="text-xs font-bold text-[#0A5C4F] uppercase tracking-wider">
                Direct Developer Registration
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {activeProject.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeProject.developer} • {activeProject.location}
              </p>
            </div>
            <LeadForm
              purpose="project_brochure"
              itemOrProjectName={activeProject.name}
              agentName="Brickyard Off-Plan Desk"
              onSuccess={() => {
                setTimeout(() => setLeadModalOpen(false), 2000);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

