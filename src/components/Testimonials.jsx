import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Home Buyer",
      text: "Brickyard Real Estate made finding our dream penthouse an absolute breeze. Their attention to detail and market knowledge is unmatched."
    },
    {
      name: "Sarah Jenkins",
      role: "Property Seller",
      text: "We sold our estate above asking price within a week. The marketing and professionalism shown by our agent was phenomenal."
    },
    {
      name: "David & Emma Wright",
      role: "Investors",
      text: "As out-of-state investors, we needed a team we could trust blindly. Brickyard has been our reliable partner for three years."
    }
  ];

  return (
    <section className="py-24 bg-cream-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold uppercase tracking-widest mb-6">
            Client Experiences
          </h2>
          <div className="w-24 h-px bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-xl shadow-sm border border-cream-dark relative">
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gold-200 opacity-50" />
              <p className="font-sans text-ink-soft italic leading-relaxed mb-8 relative z-10">
                &quot;{item.text}&quot;
              </p>
              <div>
                <h4 className="font-serif font-bold text-ink uppercase tracking-wider text-sm">{item.name}</h4>
                <span className="font-sans text-gold-600 text-xs tracking-widest uppercase">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
