import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Sectors from "@/components/sections/Sectors";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Automatización con IA para Empresas en Madrid | Kobra AI",
  description:
    "Empresa de automatizaciones en Madrid. Chatbot para empresas, chatbot WhatsApp, agente de voz inteligencia artificial y automatización de procesos en España. Setup en 1 semana.",
  alternates: {
    canonical: "https://www.kobra-automation.com",
  },
  openGraph: {
    title: "Kobra AI — Automatización con IA para Empresas en Madrid",
    description:
      "Empresa de automatización con IA en Madrid. Chatbot WhatsApp, agente de voz IA y automatización de procesos para negocios en España.",
    url: "https://www.kobra-automation.com",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Kobra AI — Automatización con IA en Madrid" }],
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <Sectors />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
