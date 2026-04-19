import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import ContactForm from "@/components/ui/ContactForm";

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
    canonical: "https://kobra.ai/contacto",
  },
  openGraph: {
    title: "Contacta con Kobra AI — Demo Gratuita de Automatización con IA",
    description:
      "Pide tu demo gratuita de chatbot para empresas, agente de voz IA o automatización de procesos. Empresa en Madrid.",
    url: "https://kobra.ai/contacto",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contacto Kobra AI" }],
  },
};

export default function ContactoPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <Navbar />

      <section className="pt-36 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
              Contacto
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Hablemos de tu proyecto
            </h1>
            <p className="text-[#888] text-lg max-w-lg mx-auto leading-relaxed">
              Cuéntanos qué necesitas y te respondemos en menos de 24 horas con
              una propuesta a medida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* WhatsApp card */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34640802262"}?text=Hola%2C%20me%20interesa%20una%20demo%20de%20Kobra%20AI`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0 text-xl">
                  💬
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    Respuesta inmediata
                  </p>
                  <p className="text-[#666] text-xs leading-relaxed">
                    Escríbenos por WhatsApp y te respondemos en minutos.
                    Disponibles de lunes a viernes.
                  </p>
                  <span className="inline-block mt-3 text-xs text-[#25D366] font-medium group-hover:underline">
                    Abrir WhatsApp →
                  </span>
                </div>
              </a>

              {/* Calendly card */}
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center flex-shrink-0 text-xl">
                  📅
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    Demo por videollamada
                  </p>
                  <p className="text-[#666] text-xs leading-relaxed">
                    30 minutos. Te mostramos exactamente cómo quedaría en tu
                    negocio. Sin compromiso.
                  </p>
                  <span className="inline-block mt-3 text-xs text-[#00E676] font-medium group-hover:underline">
                    Agendar gratis →
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hola@kobra.ai"
                className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center flex-shrink-0 text-xl">
                  ✉️
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    Email
                  </p>
                  <p className="text-[#666] text-xs leading-relaxed">
                    hola@kobra.ai
                    <br />
                    Respondemos en menos de 24 h laborables.
                  </p>
                </div>
              </a>

              {/* Spain badge */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/5 bg-[#0d0d0d]">
                <span className="text-lg">🇪🇸</span>
                <p className="text-[#555] text-xs">
                  Empresa española · Soporte en español e inglés
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
