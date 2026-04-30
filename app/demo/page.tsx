import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import CTA from "@/components/sections/CTA";
import PageHeader from "@/components/layout/PageHeader";

const InteractiveDemo = dynamic(() => import("@/components/sections/InteractiveDemo"), {
  loading: () => (
    <div className="py-24 px-6 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#00E676]/30 border-t-[#00E676] animate-spin" />
    </div>
  ),
  ssr: false,
});

export const metadata: Metadata = {
  title: "Demo en Vivo — Prueba el Chatbot IA para Empresas",
  description:
    "Prueba ahora el chatbot para empresas de Kobra AI. Comprueba en vivo cómo la automatización con IA y el agente inteligente responden en tu negocio. Demo gratuita.",
  keywords: [
    "demo chatbot IA",
    "prueba chatbot empresas",
    "demo automatización con IA",
    "chatbot WhatsApp demo gratis",
  ],
  alternates: {
    canonical: "https://www.kobra-automation.com/demo",
  },
  openGraph: {
    title: "Demo en Vivo del Chatbot IA para Empresas — Kobra AI",
    description:
      "Prueba en vivo el chatbot inteligente de Kobra AI. Automatización con IA para tu empresa en Madrid.",
    url: "https://www.kobra-automation.com/demo",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Demo Kobra AI" }],
  },
};

export default function DemoPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <Navbar />

      <PageHeader page="demo" />

      <InteractiveDemo />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
