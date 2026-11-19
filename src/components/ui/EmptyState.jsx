import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({
  title = "No properties match your search",
  description = "Try expanding your price range, clearing some filters, or searching in a nearby community.",
  onReset,
}) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center my-6">
      <div className="w-14 h-14 rounded-full bg-[#E6F2F0] text-[#0A5C4F] flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="tap-target inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A5C4F] text-white text-xs font-semibold hover:bg-[#08493F] transition-colors cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset all filters</span>
        </button>
      )}
    </div>
  );
}
