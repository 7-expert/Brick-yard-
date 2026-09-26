import Image from "next/image";
import { Phone, Mail, QrCode } from "lucide-react";

export default function AgentCard({ agent }) {
  return (
    <div className="bg-cream p-8 border border-gold-200 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-gradient opacity-10 rounded-bl-full"></div>
      
      <div className="flex flex-col items-center text-center mb-6 relative z-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
          <Image src={agent.image} alt={agent.name} width={96} height={96} className="object-cover w-full h-full" />
        </div>
        <h3 className="font-serif font-bold text-xl uppercase tracking-widest text-ink">{agent.name}</h3>
        <p className="font-sans text-xs tracking-widest uppercase text-gold-700 mt-1">{agent.title}</p>
      </div>

      <div className="w-full h-px bg-gold-500/30 mb-6"></div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
            <Phone className="w-4 h-4" />
          </div>
          <a href={`tel:${agent.phone}`} className="font-sans text-sm text-ink-soft hover:text-gold-600 transition-colors">
            {agent.phone}
          </a>
        </div>
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
            <Mail className="w-4 h-4" />
          </div>
          <a href={`mailto:${agent.email}`} className="font-sans text-sm text-ink-soft hover:text-gold-600 transition-colors">
            {agent.email}
          </a>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-cream-dark pt-6 mt-2">
        <div className="flex flex-col">
          <span className="font-serif font-bold uppercase text-ink tracking-widest text-sm">Brickyard</span>
          <span className="font-sans text-[8px] uppercase tracking-widest text-ink-soft">Real Estate</span>
        </div>
        <div className="w-12 h-12 bg-white p-1 rounded-md shadow-sm border border-cream-dark flex items-center justify-center text-gold-500">
          <QrCode className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
