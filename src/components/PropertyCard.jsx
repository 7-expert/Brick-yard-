import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square, Heart } from "lucide-react";

export default function PropertyCard({ property }) {
  return (
    <Link href={`/listings/${property.id}`} className="block group">
      <div className="bg-white rounded-t-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-cream-dark/50 group-hover:border-gold-200">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gold-gradient text-white text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
              For {property.type === "sale" ? "Sale" : "Rent"}
            </span>
          </div>
          <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-ink-soft hover:text-gold-500 transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-2xl font-serif font-bold text-ink mb-2 group-hover:text-gold-700 transition-colors">
            {property.price}
          </div>
          <h3 className="text-lg font-sans text-ink-soft font-medium mb-2 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-ink-soft/70 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-t border-b border-cream-dark">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white">
                <BedDouble className="w-4 h-4" />
              </div>
              <span className="text-sm text-ink-soft font-medium">{property.beds}</span>
            </div>
            <div className="w-px h-6 bg-cream-dark"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white">
                <Bath className="w-4 h-4" />
              </div>
              <span className="text-sm text-ink-soft font-medium">{property.baths}</span>
            </div>
            <div className="w-px h-6 bg-cream-dark"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white">
                <Square className="w-4 h-4" />
              </div>
              <span className="text-sm text-ink-soft font-medium">{property.sqft} sqft</span>
            </div>
          </div>
          
          <div className="pt-4 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-200">
              <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover" />
            </div>
            <div>
              <div className="text-sm font-sans font-medium text-ink">{property.agent.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-soft/70">{property.agent.title}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
