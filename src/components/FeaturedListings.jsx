import PropertyCard from "./PropertyCard";
import { properties } from "@/data/properties";
import Link from "next/link";

export default function FeaturedListings() {
  const featured = properties.slice(0, 3); // Get top 3

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold uppercase tracking-widest mb-6">
            Featured Properties
          </h2>
          <div className="w-24 h-px bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/listings"
            className="inline-block border-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white px-8 py-3 uppercase tracking-widest text-sm font-bold transition-colors"
          >
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
