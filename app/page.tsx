import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Sectors from "@/components/sections/Sectors";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Sectors />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
