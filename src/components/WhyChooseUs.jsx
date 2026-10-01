import { ShieldCheck, Star, Clock, ThumbsUp } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Trusted Agents",
      description: "Our agents are certified professionals with years of experience in the luxury market."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Verified Listings",
      description: "Every property is thoroughly inspected and verified to meet our highest standards."
    },
    {
      icon: <ThumbsUp className="w-6 h-6" />,
      title: "Best Deals",
      description: "We negotiate the most favorable terms for our clients, maximizing your investment."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Our concierge team is available around the clock to assist you with any inquiries."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-ink font-bold uppercase tracking-widest mb-6">
            Why Choose us
          </h2>
          <div className="w-24 h-px bg-gold-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-16 h-16 mx-auto bg-cream rounded-full flex items-center justify-center mb-6 shadow-sm border border-gold-200 group-hover:bg-gold-gradient group-hover:text-white transition-all duration-300 text-gold-600">
                {feature.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-ink mb-4">{feature.title}</h3>
              <p className="font-sans text-ink-soft/80 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
