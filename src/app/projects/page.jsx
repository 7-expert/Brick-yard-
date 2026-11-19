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
    <div className="min-h-screen bg-white text-slate-900 pb-24 md:pb-20">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Feed', href: '/' },
              { label: 'New Projects', href: '/projects' },
            ]}
          />
          <div className="mt-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-2 border border-white/20">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dubai Off-Plan Developments</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              New Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore pre-construction releases from premier UAE developers with flexible payment schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Developer Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-4">
          {developers.map((dev) => (
            <button
              key={dev}
              onClick={() => setSelectedDeveloper(dev)}
              className={`tap-target px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                selectedDeveloper === dev
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dev}
            </button>
          ))}
        </div>

        {/* Projects Grid with App-like aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between group"
            >
              {/* Thumbnail with rounded-3xl */}
              <div className="relative w-full aspect-[4/3] rounded-3xl bg-slate-100 overflow-hidden shadow-xs group-hover:shadow-md transition-all">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-semibold">
                  {project.badge}
                </span>
              </div>

              {/* Body */}
              <div className="mt-3 px-1 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{project.developer}</span>
                    <span className="text-indigo-600 font-semibold">{project.handoverDate}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5 leading-snug">
                    {project.name}
                  </h2>
                  <span className="text-lg font-bold text-slate-900 block mt-0.5">
                    From {formatAED(project.startingPrice)}
                  </span>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{project.location}, Dubai</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenLead(project)}
                    className="tap-target flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 text-indigo-300" />
                    <span>Register Interest</span>
                  </button>

                  <a
                    href="https://wa.me/971501182342"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center"
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
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
            <div className="mb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
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
