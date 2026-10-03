import ContactInfoCard from "@/components/ContactInfoCard";
import ContactForm from "./ContactForm";

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
          <ContactForm />
        </div>

      </div>
    </div>
  );
}
