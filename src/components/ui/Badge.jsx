import React from 'react';
import { CheckCircle2, Sparkles, TrendingDown, Clock, Building } from 'lucide-react';

export default function Badge({ variant = 'default', children, className = '' }) {
  const styles = {
    verified: 'bg-[#E6F2F0] text-[#0A5C4F] border border-[#B3D6D0]',
    premium: 'bg-[#FFF1EC] text-[#FF6B35] border border-[#FFD5C5]',
    reduced: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    new: 'bg-blue-50 text-blue-700 border border-blue-200',
    offplan: 'bg-amber-50 text-amber-800 border border-amber-200',
    commercial: 'bg-slate-100 text-slate-800 border border-slate-200',
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const icons = {
    verified: <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />,
    premium: <Sparkles className="w-3 h-3 stroke-[2.5]" />,
    reduced: <TrendingDown className="w-3 h-3 stroke-[2.5]" />,
    new: <Clock className="w-3 h-3 stroke-[2.5]" />,
    offplan: <Building className="w-3 h-3 stroke-[2.5]" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
        styles[variant] || styles.default
      } ${className}`}
    >
      {icons[variant]}
      <span>{children}</span>
    </span>
  );
}

