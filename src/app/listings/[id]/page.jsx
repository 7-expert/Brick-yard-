import { notFound } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import AgentCard from "@/components/AgentCard";
import { MapPin, BedDouble, Bath, Square, Calendar, Check, MessageSquare } from "lucide-react";

export async function generateMetadata({ params }) {
  // Fix Next.js 15 params promise
  const resolvedParams = await params;
  const property = properties.find((p) => p.id === resolvedParams.id);
  if (!property) return { title: "Property Not Found" };
  return { title: `${property.title} | Brickyard Real Estate` };
}

export default async function PropertyDetail({ params }) {
  // Fix Next.js 15 params promise
  const resolvedParams = await params;
  const property = properties.find((p) => p.id === resolvedParams.id);
  
  if (!property) {
    notFound();
  }

  // Simulate multiple images for the gallery
  const galleryImages = [
    property.image,
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold-gradient text-white text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
                For {property.type === "sale" ? "Sale" : "Rent"}
              </span>
              <div className="flex items-center gap-1.5 text-ink-soft text-sm">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>{property.location}</span>
              </div>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-ink font-bold mb-2">{property.title}</h1>
          </div>
          <div className="text-right">
            <div className="font-serif text-4xl text-gold-600 font-bold">{property.price}</div>
          </div>
        </div>

        <PropertyGallery images={galleryImages} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Key Stats */}
            <div className="flex flex-wrap gap-8 py-6 border-y border-cream-dark mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-ink">{property.beds}</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-soft font-sans">Bedrooms</div>
                </div>
              </div>
              <div className="w-px h-12 bg-cream-dark hidden sm:block"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-ink">{property.baths}</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-soft font-sans">Bathrooms</div>
                </div>
              </div>
              <div className="w-px h-12 bg-cream-dark hidden sm:block"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm">
                  <Square className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-ink">{property.sqft}</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-soft font-sans">Square Feet</div>
                </div>
              </div>
              <div className="w-px h-12 bg-cream-dark hidden sm:block"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-ink">{property.yearBuilt}</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-soft font-sans">Year Built</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-ink mb-6">Property Overview</h2>
              <p className="font-sans text-ink-soft leading-relaxed text-lg">
                {property.description}
              </p>
              <p className="font-sans text-ink-soft leading-relaxed text-lg mt-4">
                This stunning property exemplifies the meticulous craftsmanship and timeless elegance that Brickyard Real Estate is known for presenting. Contact our dedicated agent to arrange a private viewing of this exceptional offering.
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-ink mb-6">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-50 flex items-center justify-center text-gold-600">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans text-ink-soft text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-ink mb-6">Location</h2>
              <div className="w-full h-80 bg-cream rounded-xl border border-cream-dark flex flex-col items-center justify-center">
                <MapPin className="w-10 h-10 text-gold-400 mb-4" />
                <span className="font-sans text-ink-soft">Map visualization for {property.location}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <AgentCard agent={property.agent} />
              
              <div className="mt-6 space-y-4">
                <button className="w-full bg-ink text-white py-4 uppercase tracking-widest text-sm font-bold rounded shadow-lg hover:bg-ink-soft transition-colors flex justify-center items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Request Details
                </button>
                <button className="w-full bg-white text-ink border-2 border-ink py-4 uppercase tracking-widest text-sm font-bold rounded hover:bg-cream transition-colors">
                  Schedule Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
