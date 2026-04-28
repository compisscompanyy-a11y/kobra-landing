import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";

const SITE_URL = "https://www.kobra-automation.com";

export const metadata: Metadata = {
  title: "Agente de Voz con Inteligencia Artificial para Empresas | Kobra AI",
  description:
    "Agente de voz con IA para empresas. Atiende llamadas telefónicas automáticamente con voz natural 24/7. Kobra AI, empresa especializada en agentes de voz IA en Madrid y España.",
  keywords: [
    "agente de voz inteligencia artificial",
    "agente voz IA empresa",
    "recepcionista virtual IA",
    "atención telefónica automática",
    "agente de voz para empresas",
    "IA telefónica empresas",
  ],
  alternates: { canonical: `${SITE_URL}/agente-voz-ia` },
  openGraph: {
    title: "Agente de Voz con Inteligencia Artificial | Kobra AI",
    description:
      "Atiende llamadas automáticamente con un agente de voz IA. Voz natural, disponible 24/7. Kobra AI, Madrid.",
    url: `${SITE_URL}/agente-voz-ia`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Agente de Voz IA — Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Agente de Voz IA", item: `${SITE_URL}/agente-voz-ia` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agente de Voz con Inteligencia Artificial",
  description:
    "Agente telefónico con voz natural para atender llamadas automáticamente 24/7. Para empresas en Madrid y toda España.",
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
      name: "¿El agente de voz IA suena artificial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Utilizamos tecnología de síntesis de voz de última generación (ElevenLabs y OpenAI Voice) que genera voz completamente natural, con entonación, pausas y ritmo humano. En pruebas reales, más del 70% de los usuarios no distinguen al agente IA de una persona real.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tipo de llamadas puede gestionar el agente de voz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puede atender llamadas entrantes para dar información, tomar reservas, filtrar urgencias, gestionar reclamaciones básicas y derivar al humano cuando sea necesario. También puede hacer llamadas salientes para confirmaciones y recordatorios de citas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es legal usar un agente de voz IA para atender clientes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, con la normativa correcta. El agente debe identificarse como IA si el cliente lo pregunta directamente, y el sistema debe cumplir con el RGPD. Nosotros nos encargamos de configurarlo cumpliendo toda la legislación española y europea vigente.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto ahorra un agente de voz frente a una recepcionista?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Una recepcionista en Madrid cuesta entre 18.000€ y 24.000€ al año en costes totales. Nuestro agente de voz cuesta desde 200€/mes (2.400€/año) y trabaja 24/7 sin vacaciones ni bajas. El ROI medio de nuestros clientes es de más del 300% en el primer año.",
      },
    },
  ],
};

export default function AgenteVozIAPage() {
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
            <span className="text-[#888]">Agente de Voz IA</span>
          </nav>
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            Inteligencia Artificial · Voz Natural
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Agente de Voz con{" "}
            <span className="text-gradient-green">Inteligencia Artificial</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Tu empresa nunca más pierde una llamada. Nuestro agente de voz IA atiende llamadas entrantes con voz 100% natural, toma reservas, responde dudas y filtra urgencias — las 24 horas, los 7 días.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all"
          >
            Escuchar demo de voz →
          </Link>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">¿Para qué negocios funciona mejor?</h2>
          <p className="text-[#888] text-center mb-12 max-w-2xl mx-auto">
            El agente de voz IA es especialmente potente en negocios donde las llamadas son frecuentes y repetitivas:
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🦷", sector: "Clínicas y dentistas", desc: "Atiende llamadas para citas, confirmaciones y recordatorios sin saturar a la recepcionista." },
              { icon: "🍽️", sector: "Restaurantes", desc: "Gestiona reservas de mesa por teléfono en hora punta sin que nadie descuelgue." },
              { icon: "🔧", sector: "Servicios urgentes", desc: "Fontaneros, electricistas y reformas: filtra urgencias y toma datos al instante." },
              { icon: "🏠", sector: "Inmobiliarias", desc: "Atiende consultas sobre inmuebles y programa visitas automáticamente." },
              { icon: "💼", sector: "Despachos y consultoras", desc: "Primera atención profesional sin depender de que haya alguien disponible." },
              { icon: "🎓", sector: "Academias", desc: "Informa sobre cursos, precios y horarios y recoge solicitudes de matrícula." },
            ].map((item) => (
              <div key={item.sector} className="p-5 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#00E676]/20 transition-all">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-2">{item.sector}</h3>
                <p className="text-[#666] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#060606]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Voz natural, no robot</h2>
          <p className="text-[#888] leading-relaxed mb-5">
            Hay una gran diferencia entre un IVR (esas grabaciones de "pulse 1 para...") y un agente de voz con IA conversacional. Nuestro agente mantiene conversaciones reales: entiende lo que dice el cliente, hace preguntas de seguimiento y adapta sus respuestas al contexto.
          </p>
          <p className="text-[#888] leading-relaxed mb-5">
            La tecnología detrás combina reconocimiento de voz en tiempo real, modelos de lenguaje de última generación y síntesis de voz hiperrealista. El resultado es una experiencia que sorprende a los clientes.
          </p>
          <p className="text-[#888] leading-relaxed">
            Y si en algún momento el cliente necesita hablar con una persona, el agente deriva la llamada de forma natural, igual que lo haría cualquier recepcionista.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Preguntas frecuentes sobre agentes de voz IA</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Prueba nuestro agente de voz</h2>
          <p className="text-[#888] mb-8">Pide una demo y te llamamos para que escuches en vivo cómo suena. Sin compromiso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all">
              Pedir demo de voz
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
