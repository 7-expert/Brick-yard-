import { Phone, Mail, MapPin, Clock, QrCode } from "lucide-react";

export default function ContactInfoCard() {
  return (
    <div className="bg-cream p-10 border border-gold-200 rounded-xl shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold-gradient opacity-10 rounded-bl-full"></div>
      
      <div className="mb-10 relative z-10">
        <h3 className="font-serif font-bold text-3xl uppercase tracking-widest text-ink mb-2">Brickyard</h3>
        <p className="font-sans text-xs tracking-widest uppercase text-gold-700">Real Estate</p>
      </div>

      <div className="w-full h-px bg-gold-500/30 mb-10"></div>

      <div className="space-y-8 flex-grow">
        <div className="flex items-start gap-5 group">
          <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <h4 className="font-sans text-xs uppercase tracking-widest text-ink font-bold mb-1">Headquarters</h4>
            <p className="font-sans text-sm text-ink-soft leading-relaxed">
              123 Elite Avenue, Suite 400<br/>
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5 group">
          <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <h4 className="font-sans text-xs uppercase tracking-widest text-ink font-bold mb-1">Phone</h4>
            <p className="font-sans text-sm text-ink-soft">
              +1 (555) 123-4567<br/>
              +1 (555) 987-6543 (Fax)
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5 group">
          <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <h4 className="font-sans text-xs uppercase tracking-widest text-ink font-bold mb-1">Email</h4>
            <p className="font-sans text-sm text-ink-soft">
              inquiries@brickyardre.com<br/>
              careers@brickyardre.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-5 group">
          <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-white shadow-sm shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <h4 className="font-sans text-xs uppercase tracking-widest text-ink font-bold mb-1">Office Hours</h4>
            <p className="font-sans text-sm text-ink-soft">
              Monday - Friday: 9am - 6pm<br/>
              Saturday - Sunday: By Appointment
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <div className="w-16 h-16 bg-white p-1 rounded-md shadow-sm border border-cream-dark flex items-center justify-center text-gold-500">
          <QrCode className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
