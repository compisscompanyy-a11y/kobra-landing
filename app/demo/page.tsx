import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import InteractiveDemo from "@/components/sections/InteractiveDemo";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Demo en Vivo — Kobra AI",
  description:
    "Prueba ahora mismo el chatbot de Kobra AI. Escribe lo que quieras y comprueba cómo respondería en tu negocio.",
};

export default function DemoPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <Navbar />

      {/* Page header */}
      <section className="pt-36 pb-4 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            Demo interactiva
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Habla con Kai, nuestro{" "}
            <span className="text-gradient-green">asistente IA</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-xl mx-auto">
            Así experimenta tu cliente un chatbot de Kobra. Pregúntale lo que
            quieras — precios, servicios, cómo funciona...
          </p>
        </div>
      </section>

      <InteractiveDemo />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
