import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gold-gradient py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-white font-bold uppercase tracking-widest mb-6">
          Ready to sell your property?
        </h2>
        <p className="text-white/90 font-sans text-lg mb-10 max-w-2xl mx-auto">
          Partner with our expert agents to list your home on the market and secure the best possible return on your investment.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-ink text-white hover:bg-ink-soft px-10 py-4 uppercase tracking-widest text-sm font-bold transition-colors border border-transparent shadow-xl"
        >
          Contact an Agent
        </Link>
      </div>
    </section>
  );
}
