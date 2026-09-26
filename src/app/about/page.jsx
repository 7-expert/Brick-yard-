import Image from "next/image";
import AgentCard from "@/components/AgentCard";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us | Brickyard Real Estate",
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Marcus Sterling",
      title: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+1 (555) 019-1111",
      email: "marcus@brickyardre.com"
    },
    {
      name: "Eleanor Sterling",
      title: "Senior Luxury Agent",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+1 (555) 019-2831",
      email: "eleanor@brickyardre.com"
    },
    {
      name: "Sofia Rodriguez",
      title: "Leasing Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+1 (555) 019-3392",
      email: "sofia@brickyardre.com"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-cream py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-gradient opacity-5 rounded-bl-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-ink font-bold uppercase tracking-widest mb-6">
              Our Legacy
            </h1>
            <div className="w-24 h-px bg-gold-500 mb-6"></div>
            <p className="font-sans text-ink-soft text-lg leading-relaxed">
              Brickyard Real Estate was founded on a simple principle: to provide an unparalleled level of service and expertise in the luxury real estate market. We don't just sell properties; we curate lifestyles and secure legacies.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Office" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gold-900/10 mix-blend-multiply"></div>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-ink font-bold uppercase tracking-widest mb-6">
              A Standard of Excellence
            </h2>
            <div className="space-y-6 font-sans text-ink-soft leading-relaxed">
              <p>
                For over two decades, Brickyard Real Estate has been the premier choice for discerning clients seeking extraordinary properties. Our portfolio represents the finest estates, penthouses, and commercial spaces across the globe.
              </p>
              <p>
                Our team is composed of industry veterans who possess deep market knowledge and an uncompromising commitment to discretion and integrity. When you partner with Brickyard, you gain access to an exclusive network and a wealth of resources designed to achieve your real estate goals.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-cream-dark mt-8">
                <div>
                  <div className="font-serif text-4xl font-bold text-gold-600 mb-2">25+</div>
                  <div className="font-sans text-xs uppercase tracking-widest text-ink-soft">Years of Experience</div>
                </div>
                <div>
                  <div className="font-serif text-4xl font-bold text-gold-600 mb-2">$5B+</div>
                  <div className="font-sans text-xs uppercase tracking-widest text-ink-soft">Total Sales Volume</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-cream-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold uppercase tracking-widest mb-6">
              Leadership
            </h2>
            <div className="w-24 h-px bg-gold-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, idx) => (
              <AgentCard key={idx} agent={leader} />
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
