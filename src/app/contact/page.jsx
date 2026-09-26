import ContactInfoCard from "@/components/ContactInfoCard";

export const metadata = {
  title: "Contact Us | Brickyard Real Estate",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-ink font-bold uppercase tracking-widest mb-6">
            Get in Touch
          </h1>
          <div className="w-24 h-px bg-gold-500 mx-auto mb-6"></div>
          <p className="font-sans text-ink-soft text-lg max-w-2xl mx-auto">
            Whether you are looking to acquire a new property or list your current estate, our team of experts is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info (Business Card Style) */}
          <div className="lg:h-[700px]">
            <ContactInfoCard />
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-cream-light p-10 rounded-xl border border-cream-dark shadow-sm">
            <h2 className="font-serif text-2xl font-bold uppercase tracking-widest text-ink mb-8">Send a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Inquiry Type</label>
                <select className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 appearance-none">
                  <option>Buying a Property</option>
                  <option>Selling a Property</option>
                  <option>Renting</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans text-ink-soft uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-white border border-cream-dark rounded px-4 py-3 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-gold-gradient text-white py-4 uppercase tracking-widest text-sm font-bold rounded shadow-lg hover:opacity-90 transition-opacity"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
