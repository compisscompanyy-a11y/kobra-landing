import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Products from "@/components/sections/Products";
import Sectors from "@/components/sections/Sectors";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Servicios — Kobra AI",
  description:
    "Páginas web, chatbots para web y WhatsApp, y agentes de voz telefónicos. Soluciones de IA para cualquier negocio.",
};

export default function ServiciosPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
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
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
