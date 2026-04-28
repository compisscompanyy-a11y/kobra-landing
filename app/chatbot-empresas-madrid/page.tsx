import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";

const SITE_URL = "https://www.kobra-automation.com";

export const metadata: Metadata = {
  title: "Chatbot para Empresas en Madrid | Kobra AI",
  description:
    "Chatbot inteligente para empresas en Madrid. Atiende clientes 24/7 por web y WhatsApp con IA. Setup en 1 semana. Más de 50 empresas madrileñas confían en Kobra AI.",
  keywords: [
    "chatbot para empresas Madrid",
    "chatbot empresas Madrid",
    "chatbot inteligente Madrid",
    "chatbot IA Madrid",
    "asistente virtual empresas Madrid",
    "chatbot para pymes Madrid",
  ],
  alternates: { canonical: `${SITE_URL}/chatbot-empresas-madrid` },
  openGraph: {
    title: "Chatbot para Empresas en Madrid | Kobra AI",
    description:
      "Chatbot IA para empresas en Madrid. Atiende clientes 24/7 por web y WhatsApp. Setup en 1 semana.",
    url: `${SITE_URL}/chatbot-empresas-madrid`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Chatbot para Empresas Madrid — Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Chatbot para Empresas Madrid", item: `${SITE_URL}/chatbot-empresas-madrid` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Chatbot para Empresas en Madrid",
  description:
    "Chatbot inteligente con IA para atender clientes 24/7 en web y WhatsApp. Especialistas en empresas de Madrid y toda España.",
  provider: {
    "@type": "LocalBusiness",
    name: "Kobra AI",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
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
      name: "¿Qué hace exactamente un chatbot para empresas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un chatbot empresarial atiende las consultas de tus clientes de forma automática las 24 horas: responde preguntas frecuentes, recoge datos de contacto, agenda citas, gestiona reservas y cualifica leads. Todo sin intervención humana.",
      },
    },
    {
      "@type": "Question",
      name: "¿Funciona el chatbot en WhatsApp y en la web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Implementamos el chatbot tanto en tu web como en WhatsApp Business (API oficial). El mismo chatbot puede operar en los dos canales simultáneamente, con el mismo entrenamiento y configuración.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tarda en estar listo el chatbot para mi empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El setup completo tarda 5 días laborables. Incluye configuración, entrenamiento con los datos de tu negocio, integración en web/WhatsApp y período de ajuste. No necesitas conocimientos técnicos.",
      },
    },
    {
      "@type": "Question",
      name: "¿El chatbot puede conectarse a mi CRM o sistema de reservas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, integramos con Google Calendar, Calendly, HubSpot, Zoho CRM, sistemas de TPV para restaurantes y muchas más herramientas. Si usas una herramienta específica, consúltanos sin compromiso.",
      },
    },
  ],
};

export default function ChatbotEmpresasMadridPage() {
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
            <span className="text-[#888]">Chatbot para Empresas Madrid</span>
          </nav>
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            Madrid · España
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Chatbot para Empresas{" "}
            <span className="text-gradient-green">en Madrid</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Instala un asistente virtual con IA en tu empresa madrileña. Atiende consultas, gestiona citas y cualifica leads las 24 horas del día — sin que tú ni tu equipo tengáis que intervenir.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all"
          >
            Ver demo gratuita →
          </Link>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            ¿Qué puede hacer el chatbot por tu empresa?
          </h2>
          <p className="text-[#888] text-center mb-12 max-w-2xl mx-auto">
            Más de 50 empresas en Madrid ya usan nuestro chatbot. Esto es lo que automatizan cada día:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🕐", title: "Atención 24/7 sin personal", desc: "Tu chatbot responde a las 3 de la madrugada cuando tu equipo está durmiendo. Nunca pierdes un cliente potencial." },
              { icon: "📋", title: "Cualificación de leads automática", desc: "Pregunta, filtra y clasifica a los interesados antes de que lleguen a tu equipo comercial." },
              { icon: "📅", title: "Reservas y citas sin fricción", desc: "Los clientes reservan directamente desde el chat, sin llamadas ni emails de ida y vuelta." },
              { icon: "💬", title: "Respuestas a preguntas frecuentes", desc: "Precio, horarios, ubicación, disponibilidad... el chatbot lo responde al instante." },
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
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Chatbot para cada tipo de negocio en Madrid
          </h2>
          <p className="text-[#888] leading-relaxed mb-6">
            Hemos implementado chatbots para restaurantes, clínicas dentales, inmobiliarias, peluquerías, academias y empresas de servicios en Madrid. Cada chatbot se entrena específicamente para tu negocio y tu sector.
          </p>
          <p className="text-[#888] leading-relaxed mb-6">
            A diferencia de los chatbots genéricos, nuestro sistema aprende de tu web, tus preguntas frecuentes y tu forma de trabajar. El resultado es una IA que suena como parte de tu equipo, no como un robot.
          </p>
          <p className="text-[#888] leading-relaxed">
            El proceso es sencillo: una reunión inicial de 30 minutos, 5 días de configuración y ya tienes tu chatbot trabajando. Sin contratos largos, sin permanencia.
          </p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Instala tu chatbot esta semana</h2>
          <p className="text-[#888] mb-8">Demo gratuita. Te mostramos cómo quedaría exactamente en tu negocio. Sin compromiso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all">
              Pedir demo gratuita
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
