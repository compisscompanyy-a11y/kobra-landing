import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import ContactForm from "@/components/ui/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import ContactSidebar from "@/components/sections/ContactSidebar";

export const metadata: Metadata = {
  title: "Contacto — Pide tu Demo de Chatbot IA o Agente de Voz",
  description:
    "Contacta con Kobra AI en Madrid para pedir tu demo gratuita de chatbot para empresas, automatización con IA o agente de voz. Respondemos en menos de 24 horas.",
  keywords: [
    "contacto chatbot empresas",
    "demo automatización IA",
    "presupuesto chatbot WhatsApp",
    "empresa automatización Madrid contacto",
  ],
  alternates: {
    canonical: "https://www.kobra-automation.com/contacto",
  },
  openGraph: {
    title: "Contacta con Kobra AI — Demo Gratuita de Automatización con IA",
    description:
      "Pide tu demo gratuita de chatbot para empresas, agente de voz IA o automatización de procesos. Empresa en Madrid.",
    url: "https://www.kobra-automation.com/contacto",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contacto Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.kobra-automation.com" },
    { "@type": "ListItem", position: 2, name: "Contacto", item: "https://www.kobra-automation.com/contacto" },
  ],
};

export default function ContactoPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <section className="pt-36 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <PageHeader page="contacto" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar info */}
            <ContactSidebar />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
