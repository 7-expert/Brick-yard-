import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import ExpertAdviceForm from "@/components/ExpertAdviceForm";
import BrokerageServices from "@/components/BrokerageServices";
import RentalPlans from "@/components/RentalPlans";
import ClientLogos from "@/components/ClientLogos";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <section className="bg-cream-light py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight mb-2 md:mb-4">
          FX's Interior Design Practice of the Year
        </h2>
        <p className="font-sans text-3xl md:text-4xl lg:text-[2.75rem] text-ink leading-tight max-w-4xl mx-auto">
          A million sq ft delivered each year across six specialist teams.
        </p>
      </section>

      <ProjectShowcase />
      <ClientLogos />
      <ExpertAdviceForm />
      <BrokerageServices />
      <RentalPlans />
    </div>
  );
}
