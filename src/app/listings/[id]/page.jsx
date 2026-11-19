import { notFound } from "next/navigation";
import { DUBAI_PROPERTIES } from "@/data/dubaiProperties";
import { properties } from "@/data/properties";
import ListingDetailClient from "./ListingDetailClient";
import { formatAED } from "@/lib/tokens";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const propId = resolvedParams.id;
  
  // Look up in DUBAI_PROPERTIES
  let prop = DUBAI_PROPERTIES.find((p) => p.id === propId || p.slug === propId);
  
  // Fallback to legacy properties
  if (!prop) {
    const legacy = properties.find((p) => p.id === propId);
    if (legacy) {
      prop = {
        title: legacy.title,
        priceAED: 1850000,
        location: legacy.location,
        description: legacy.description,
      };
    }
  }

  if (!prop) {
    return { title: "Property Not Found | Brickyard Real Estate" };
  }

  return {
    title: `${prop.title} | Brickyard Properties Dubai`,
    description: prop.description?.slice(0, 155) || `View details for ${prop.title} in ${prop.location}, Dubai.`,
    openGraph: {
      title: `${prop.title} - AED ${prop.priceAED?.toLocaleString() || prop.price}`,
      description: prop.description?.slice(0, 155),
    },
  };
}

export default async function PropertyDetailPage({ params }) {
  const resolvedParams = await params;
  const propId = resolvedParams.id;

  // 1. Look up in DUBAI_PROPERTIES
  let property = DUBAI_PROPERTIES.find((p) => p.id === propId || p.slug === propId);

  // 2. Fallback to legacy properties if user navigates to an old URL
  if (!property) {
    const legacy = properties.find((p) => p.id === propId);
    if (legacy) {
      // Map legacy property to Bayut-standard structure
      property = {
        id: legacy.id,
        slug: legacy.id,
        title: legacy.title,
        purpose: legacy.type === "sale" ? "sale" : "rent",
        type: "Apartment",
        priceAED: 2450000,
        rentFrequency: "yearly",
        location: legacy.location || "Downtown Dubai",
        address: `${legacy.location || 'Downtown Dubai'}, Dubai, UAE`,
        beds: legacy.beds || 2,
        baths: legacy.baths || 2,
        sqft: legacy.sqft || 1450,
        isVerified: true,
        isPremium: true,
        images: [
          legacy.image,
          "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        ],
        floorPlanImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        description: legacy.description || "A luxury contemporary residence in Dubai offering premium finishes and landmark skyline views.",
        amenities: ["Balcony", "Built-in Wardrobes", "Central A/C", "Covered Parking", "Shared Gym", "Concierge Service"],
        nearbyPOIs: [
          { name: "Dubai Mall", distance: "4 mins walk", type: "mall" },
          { name: "Burj Khalifa Metro", distance: "6 mins walk", type: "metro" },
          { name: "Downtown Park", distance: "2 mins walk", type: "park" },
        ],
        agent: {
          id: "agent-1",
          name: "Tariq Al-Mansoor",
          title: "Senior Luxury Director",
          agency: "Brickyard Prime Real Estate LLC",
          licence: "RERA #39821",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
          phone: "+971 50 118 2342",
          whatsapp: "971501182342",
          email: "tariq@brickyard.ae",
          languages: ["English", "Arabic"],
          responseTime: "Under 5 mins",
          verified: true,
        },
      };
    }
  }

  if (!property) {
    notFound();
  }

  // Schema.org RealEstateListing JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://brickyard.ae/listings/${property.slug || property.id}`,
    "offers": {
      "@type": "Offer",
      "price": property.priceAED,
      "priceCurrency": "AED",
      "availability": "https://schema.org/InStock",
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location,
      "addressRegion": "Dubai",
      "addressCountry": "AE",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetailClient property={property} />
    </>
  );
}
