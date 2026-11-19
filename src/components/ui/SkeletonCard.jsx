import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col animate-shimmer">
      {/* 4:3 aspect ratio image placeholder */}
      <div className="w-full aspect-[4/3] bg-slate-200" />
      
      {/* Card Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-6 w-1/2 bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-100 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        
        {/* Spec row */}
        <div className="pt-2 border-t border-slate-100 flex gap-4">
          <div className="h-4 w-12 bg-slate-100 rounded" />
          <div className="h-4 w-12 bg-slate-100 rounded" />
          <div className="h-4 w-16 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

