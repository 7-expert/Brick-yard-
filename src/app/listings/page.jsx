import PropertyGrid from "@/components/PropertyGrid";

export const metadata = {
  title: "Property Listings | Brickyard Real Estate",
};

export default function ListingsPage() {
  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-ink font-bold uppercase tracking-widest mb-4">
            Exclusive Listings
          </h1>
          <p className="font-sans text-ink-soft max-w-2xl text-lg">
            Browse our curated collection of luxury estates, modern penthouses, and prime commercial real estate.
          </p>
        </div>
        
        <PropertyGrid />
      </div>
    </div>
  );
}
