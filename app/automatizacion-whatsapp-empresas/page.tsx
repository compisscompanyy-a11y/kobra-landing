import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";

const SITE_URL = "https://www.kobra-automation.com";

export const metadata: Metadata = {
  title: "Automatización de WhatsApp para Empresas | Chatbot WhatsApp | Kobra AI",
  description:
    "Chatbot WhatsApp para empresas con API oficial de Meta. Atiende clientes automáticamente en WhatsApp Business 24/7. Kobra AI — empresa especializada en automatización WhatsApp en España.",
  keywords: [
    "chatbot WhatsApp empresas",
    "automatización WhatsApp empresa",
    "chatbot WhatsApp Business",
    "bot WhatsApp empresas España",
    "WhatsApp Business automatización",
    "chatbot WhatsApp Madrid",
  ],
  alternates: { canonical: `${SITE_URL}/automatizacion-whatsapp-empresas` },
  openGraph: {
    title: "Chatbot WhatsApp para Empresas | Kobra AI",
    description:
      "Automatiza WhatsApp Business con IA. Atiende clientes 24/7, gestiona reservas y vende automáticamente. API oficial de Meta.",
    url: `${SITE_URL}/automatizacion-whatsapp-empresas`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Chatbot WhatsApp Empresas — Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Chatbot WhatsApp Empresas", item: `${SITE_URL}/automatizacion-whatsapp-empresas` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automatización de WhatsApp para Empresas",
  description:
    "Chatbot oficial de WhatsApp Business para gestionar reservas, consultas y ventas automáticamente. API oficial de Meta, sin riesgo de bloqueo.",
  provider: {
    "@type": "LocalBusiness",
    name: "Kobra AI",
    url: SITE_URL,
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
  },
  areaServed: [{ "@type": "City", name: "Madrid" }, { "@type": "Country", name: "España" }],
  offers: { "@type": "Offer", priceRange: "€€", priceCurrency: "EUR" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿El chatbot de WhatsApp usa la API oficial? ¿Puedo ser bloqueado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, trabajamos exclusivamente con la API oficial de WhatsApp Business de Meta. Esto garantiza que tu número no corre ningún riesgo de bloqueo. La integración cumple al 100% con las políticas de Meta y tus clientes ven un perfil verificado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué puede hacer el chatbot de WhatsApp para mi empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puede responder preguntas frecuentes, tomar reservas y citas, enviar catálogos de productos, cualificar leads, recoger datos de contacto, confirmar pedidos y escalar conversaciones complejas a un agente humano cuando sea necesario.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo usar el chatbot de WhatsApp con mi número actual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, podemos migrar tu número de WhatsApp actual a la API oficial de Business. El proceso tarda 1-2 días hábiles y mantiene todo tu historial de contactos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el chatbot de WhatsApp para empresas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El setup del chatbot de WhatsApp incluye configuración e integración desde 800€. El mantenimiento mensual es desde 200€ e incluye soporte, actualizaciones y monitorización de conversaciones.",
      },
    },
  ],
};

export default function AutomatizacionWhatsAppPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <section className="pt-36 pb-16 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-xs text-[#555] mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-[#00E676] transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-[#888]">Chatbot WhatsApp Empresas</span>
          </nav>
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            WhatsApp Business · API Oficial Meta
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Automatización de WhatsApp{" "}
            <span className="text-gradient-green">para Empresas</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Convierte tu WhatsApp Business en un canal de ventas y atención automático. Responde, cualifica y convierte clientes potenciales las 24 horas del día — sin que tu equipo toque el teléfono.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all"
          >
            Ver demo de WhatsApp →
          </Link>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Por qué WhatsApp es el canal más rentable</h2>
          <p className="text-[#888] text-center mb-12 max-w-2xl mx-auto">
            WhatsApp tiene una tasa de apertura del 98% frente al 20% del email. Tus clientes ya están ahí. La pregunta es si tu empresa responde a tiempo.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "⚡", title: "Respuesta inmediata", desc: "El chatbot responde en segundos, no en horas. El 78% de los clientes elige la empresa que responde primero." },
              { icon: "🛡️", title: "API oficial de Meta", desc: "Sin riesgo de bloqueo. Perfil verificado. Cumplimiento RGPD. Todo legal y seguro." },
              { icon: "🔗", title: "Integrado con tu negocio", desc: "Conectamos el chatbot con tu CRM, calendario, sistema de reservas o cualquier herramienta que uses." },
              { icon: "📊", title: "Métricas y análisis", desc: "Dashboard con conversaciones, tasa de resolución, leads generados y tiempo de respuesta." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#00E676]/20 transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#060606]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Cómo funciona el chatbot de WhatsApp</h2>
          <div className="space-y-6">
            {[
              { step: "01", title: "El cliente escribe en WhatsApp", desc: "Da igual si es a las 3 de la tarde o a las 11 de la noche. El chatbot está siempre activo." },
              { step: "02", title: "La IA entiende y responde", desc: "Nuestro sistema analiza el mensaje, lo clasifica y responde de forma natural usando el conocimiento de tu negocio." },
              { step: "03", title: "Gestión automática", desc: "Toma reservas, envía información, recoge datos. Si necesita un humano, escala la conversación a tu equipo." },
              { step: "04", title: "Tú solo ves los resultados", desc: "Panel de control con todas las conversaciones, leads generados y métricas clave. Sin gestionar chats." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center text-[#00E676] text-xs font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]">
                <h3 className="text-white font-medium mb-3">{faq.name}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Automatiza tu WhatsApp esta semana</h2>
          <p className="text-[#888] mb-8">Demo gratuita. Te enviamos un mensaje de ejemplo desde nuestro chatbot para que lo pruebes tú mismo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all">
              Ver demo de WhatsApp
            </Link>
            <Link href="/automatizaciones-madrid" className="px-7 py-3.5 rounded-xl border border-white/10 text-[#BBB] text-sm font-medium hover:border-white/25 hover:text-white transition-all">
              Ver todas las automatizaciones
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
