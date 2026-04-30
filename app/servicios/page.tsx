import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import Products from "@/components/sections/Products";
import Sectors from "@/components/sections/Sectors";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Servicios de Automatización con IA — Chatbot WhatsApp y Agente de Voz",
  description:
    "Chatbot para empresas, chatbot WhatsApp, agente de voz con inteligencia artificial y automatización de procesos en España. Empresa de automatización Madrid. Setup en 1 semana.",
  keywords: [
    "chatbot para empresas",
    "chatbot WhatsApp empresas",
    "agente de voz inteligencia artificial",
    "automatización con IA",
    "automatización de procesos España",
    "empresa automatización Madrid",
  ],
  alternates: {
    canonical: "https://www.kobra-automation.com/servicios",
  },
  openGraph: {
    title: "Servicios de Automatización con IA — Kobra AI Madrid",
    description:
      "Chatbot para empresas, chatbot WhatsApp, agente de voz IA y automatización de procesos. Empresa en Madrid.",
    url: "https://www.kobra-automation.com/servicios",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Servicios Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.kobra-automation.com" },
    { "@type": "ListItem", position: 2, name: "Servicios", item: "https://www.kobra-automation.com/servicios" },
  ],
};

export default function ServiciosPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <PageHeader page="servicios" />

      <Products />
      <Sectors />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
