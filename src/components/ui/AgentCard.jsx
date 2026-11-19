import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Phone, MessageSquare, Star, Clock, Globe } from 'lucide-react';

export default function AgentCard({ agent, className = '' }) {
  if (!agent) return null;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm ${className}`}>
      {/* Top Row: Avatar + Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="font-semibold text-base text-slate-900 tracking-tight truncate">
              {agent.name}
            </h4>
            {agent.verified && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E6F2F0] text-[#0A5C4F] text-[10px] font-bold tracking-wider uppercase border border-[#B3D6D0]">
                <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                <span>TruBroker™</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-0.5 truncate">{agent.title}</p>
          <p className="text-[11px] text-[#0A5C4F] font-medium truncate">{agent.agency}</p>
        </div>
      </div>

      {/* Meta Stats Row */}
      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-[#0A5C4F] shrink-0" />
          <span className="truncate">{agent.responseTime}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
          <span>{agent.rating} ({agent.reviewsCount} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 col-span-2">
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">Speaks: {agent.languages?.join(', ')}</span>
        </div>
      </div>

      {/* Action Buttons: Direct Call & WhatsApp */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${agent.phone?.replace(/\s+/g, '')}`}
          className="tap-target px-3 py-2 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#0A5C4F]" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${agent.whatsapp}?text=Hi%20${encodeURIComponent(agent.name)},%20I%20am%20interested%20in%20your%20listings%20on%20Brickyard.`}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target px-3 py-2 rounded-lg bg-[#0A5C4F] hover:bg-[#08493F] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

