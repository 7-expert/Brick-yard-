import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Compass, TrendingUp, MapPin, School, Bus, Building2, ChevronRight } from 'lucide-react';
import { DUBAI_AREA_GUIDES, DUBAI_PROPERTIES } from '@/data/dubaiProperties';
import { formatAED } from '@/lib/tokens';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ListingCard from '@/components/ui/ListingCard';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const guide = DUBAI_AREA_GUIDES.find((g) => g.slug === resolvedParams.slug);
  if (!guide) return { title: 'Area Guide Not Found' };
  return {
    title: `${guide.name} Area Guide & Property Insights | Brickyard`,
    description: guide.overview.slice(0, 160),
  };
}

export default async function AreaGuideDetailPage({ params }) {
  const resolvedParams = await params;
  const guide = DUBAI_AREA_GUIDES.find((g) => g.slug === resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  // Find live listings in this neighborhood
  const liveListings = DUBAI_PROPERTIES.filter(
    (p) => p.location.toLowerCase().includes(guide.name.toLowerCase()) ||
           guide.name.toLowerCase().includes(p.location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Hero Banner with Community Image */}
      <section className="relative w-full h-[320px] sm:h-[420px] overflow-hidden bg-slate-900 text-white flex items-end">
        <img
          src={guide.heroImage}
          alt={guide.name}
          className="absolute inset-0 w-full h-full object-cover brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 w-full">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Area Guides', href: '/areas' },
              { label: guide.name, href: `/areas/${guide.slug}` },
            ]}
          />
          <div className="mt-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/80 text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block">
              Average ROI: {guide.roi}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {guide.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Editorial & Highlights */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-3">About {guide.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {guide.overview}
            </p>
          </div>

          {/* Highlights & Lifestyle */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Key Highlights & Lifestyle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-[#0A5C4F] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Listings in this Area */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Live Properties in {guide.name} ({liveListings.length})
              </h2>
              <Link
                href={`/listings?location=${encodeURIComponent(guide.name)}`}
                className="text-xs font-bold text-[#0A5C4F] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {liveListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {liveListings.map((prop) => (
                  <ListingCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                No active listings currently available in {guide.name}.
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar: Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Community Snapshot
            </h3>

            <div>
              <span className="text-xs text-slate-500 block">Average 1-Bed Annual Rent</span>
              <span className="text-lg font-bold text-[#0A5C4F]">{formatAED(guide.avgRent1Bed)}</span>
            </div>

            <div>
              <span className="text-xs text-slate-500 block">Average 2-Bed Annual Rent</span>
              <span className="text-lg font-bold text-slate-800">{formatAED(guide.avgRent2Bed)}</span>
            </div>

            <div>
              <span className="text-xs text-slate-500 block">Average Capital Price per Sq.Ft</span>
              <span className="text-lg font-bold text-[#FF6B35]">AED {guide.avgSalePriceSqft}</span>
            </div>

            <div>
              <span className="text-xs text-slate-500 block">Estimated Rental Yield (ROI)</span>
              <span className="text-lg font-bold text-emerald-600">{guide.roi}</span>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href={`/listings?location=${encodeURIComponent(guide.name)}`}
                className="tap-target w-full py-3 rounded-lg bg-[#0A5C4F] hover:bg-[#08493F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
              >
                <span>Search {guide.name} Properties</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

