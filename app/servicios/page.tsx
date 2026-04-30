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

      {/* Page header */}
      <section className="pt-36 pb-16 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            Servicios
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Cuatro herramientas.
            <br />
            <span className="text-gradient-green">Un solo objetivo.</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-xl mx-auto">
            Más clientes, menos trabajo manual. Elige lo que necesitas o
            combínalos para una automatización completa.
          </p>
        </div>
      </section>

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
