import React from 'react';
import Link from 'next/link';
import { Compass, TrendingUp, MapPin, ChevronRight, School, Bus } from 'lucide-react';
import { DUBAI_AREA_GUIDES } from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Dubai Community & Area Guides | Brickyard Real Estate',
  description: 'Explore comprehensive guides for Downtown Dubai, Dubai Marina, Palm Jumeirah, and Business Bay including rental yields, price trends, and schools.',
};

export default function AreasOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#0A5C4F] text-white py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Area Guides', href: '/areas' },
            ]}
          />
          <div className="mt-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20">
              <Compass className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Location Intelligence & Market Insights</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Dubai Community & Area Guides
            </h1>
            <p className="text-sm text-emerald-100">
              Discover average prices, rental ROI, lifestyle amenities, and transportation links across Dubai’s most desirable neighborhoods.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DUBAI_AREA_GUIDES.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={area.heroImage}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 block mb-1">
                    Average Rental Yield: {area.roi}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                    {area.name}
                  </h2>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                  {area.overview}
                </p>

                {/* Market metrics */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Avg 1BHK Rent</span>
                    <span className="font-bold text-[#0A5C4F]">{formatAED(area.avgRent1Bed)}/yr</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Avg 2BHK Rent</span>
                    <span className="font-bold text-slate-800">{formatAED(area.avgRent2Bed)}/yr</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Avg SqFt Price</span>
                    <span className="font-bold text-[#FF6B35]">AED {area.avgSalePriceSqft}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#0A5C4F] pt-2 border-t border-slate-100">
                  <span>Explore lifestyle, schools & properties</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
