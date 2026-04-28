import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";

const SITE_URL = "https://www.kobra-automation.com";

export const metadata: Metadata = {
  title: "Automatizaciones con IA en Madrid | Kobra AI",
  description:
    "Empresa de automatizaciones en Madrid. Automatizamos procesos de empresas madrileñas con inteligencia artificial: chatbot, agente de voz y flujos automáticos. Resultados en 1 semana.",
  keywords: [
    "automatizaciones madrid",
    "automatización con IA Madrid",
    "empresa automatización Madrid",
    "automatizar procesos Madrid",
    "automatización empresarial Madrid",
    "IA para empresas Madrid",
  ],
  alternates: { canonical: `${SITE_URL}/automatizaciones-madrid` },
  openGraph: {
    title: "Automatizaciones con IA en Madrid | Kobra AI",
    description:
      "Automatizamos empresas en Madrid con inteligencia artificial. Chatbot, agente de voz y flujos automáticos. Setup en 1 semana.",
    url: `${SITE_URL}/automatizaciones-madrid`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Automatizaciones Madrid — Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Automatizaciones Madrid", item: `${SITE_URL}/automatizaciones-madrid` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automatizaciones con IA en Madrid",
  description:
    "Servicio de automatización de procesos empresariales con inteligencia artificial para empresas en Madrid y toda España.",
  provider: {
    "@type": "LocalBusiness",
    name: "Kobra AI",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressRegion: "Comunidad de Madrid",
      addressCountry: "ES",
    },
  },
  areaServed: [
    { "@type": "City", name: "Madrid" },
    { "@type": "Country", name: "España" },
  ],
  offers: {
    "@type": "Offer",
    priceRange: "€€",
    priceCurrency: "EUR",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué tipo de procesos podéis automatizar en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Automatizamos cualquier proceso repetitivo: atención al cliente, gestión de citas y reservas, seguimiento de leads, facturación, respuestas por WhatsApp y llamadas telefónicas. Si tu equipo hace la misma tarea más de 10 veces al día, lo automatizamos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tarda en implantarse la automatización?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestro proceso estándar en Madrid tarda 5 días laborables. El primer día auditamos tu negocio, del 2 al 4 configuramos e integramos la IA, y el día 5 ya está funcionando. Sin IT, sin complejidad técnica.",
      },
    },
    {
      "@type": "Question",
      name: "¿Trabajáis solo en Madrid o también en otras ciudades?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestra sede está en Madrid pero trabajamos con empresas de toda España de forma remota. El 100% del proceso de implantación se hace online, por lo que la ubicación no es una barrera.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta automatizar mi empresa en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los proyectos de automatización arrancan desde 800€ de setup más una cuota mensual desde 200€. Antes de comprometerte hacemos una auditoría gratuita donde calculamos el ROI exacto para tu negocio.",
      },
    },
  ],
};

export default function AutomatizacionesMadridPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-xs text-[#555] mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-[#00E676] transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-[#888]">Automatizaciones Madrid</span>
          </nav>
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            Madrid · España
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Automatizaciones con IA{" "}
            <span className="text-gradient-green">en Madrid</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Somos la empresa de automatización con inteligencia artificial de referencia en Madrid. Ayudamos a pymes y negocios locales a trabajar menos horas haciendo más — sin contratar más personal.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all duration-200"
          >
            Pedir auditoría gratuita →
          </Link>
        </div>
      </section>

      {/* Qué automatizamos */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            ¿Qué automatizamos en tu empresa?
          </h2>
          <p className="text-[#888] text-center mb-12 max-w-2xl mx-auto">
            Cualquier proceso que consuma tiempo de tu equipo puede ser automatizado con IA. Estas son las soluciones más demandadas por empresas en Madrid:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "💬",
                title: "Atención al cliente 24/7",
                desc: "Chatbot para web y WhatsApp que responde dudas, gestiona consultas y cualifica leads sin que nadie intervenga.",
              },
              {
                icon: "📞",
                title: "Agente de voz para llamadas",
                desc: "IA telefónica con voz natural que atiende llamadas entrantes, toma reservas y filtra oportunidades comerciales.",
              },
              {
                icon: "📅",
                title: "Gestión automática de citas",
                desc: "Integración con Google Calendar y Calendly para que tus clientes reserven solos, con confirmaciones automáticas.",
              },
              {
                icon: "⚡",
                title: "Flujos de trabajo automatizados",
                desc: "Automatización de procesos internos: seguimiento de leads en CRM, notificaciones, facturación y reportes.",
              },
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

      {/* Por qué Madrid */}
      <section className="py-20 px-6 bg-[#060606]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Por qué las empresas madrileñas eligen Kobra AI
          </h2>
          <div className="space-y-5 text-[#888] text-base leading-relaxed">
            <p>
              Madrid concentra más del 30% de las pymes españolas. La competencia es alta y el coste de personal también. Las empresas que crecen en Madrid son las que automatizan primero: reducen costes operativos, responden más rápido que la competencia y escalan sin contratar.
            </p>
            <p>
              En Kobra AI llevamos desde 2024 ayudando a restaurantes, clínicas, inmobiliarias, academias y negocios de servicios en Madrid a implementar automatizaciones con IA en menos de una semana. Sin código, sin IT, sin complicaciones.
            </p>
            <p>
              Nuestro modelo es simple: auditamos tu negocio gratis, te mostramos exactamente qué procesos automatizar y cuánto te ahorrará, y si tiene sentido, lo ponemos en marcha en 5 días.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { num: "+50", label: "Empresas automatizadas" },
              { num: "5 días", label: "Tiempo de setup" },
              { num: "24/7", label: "Disponibilidad IA" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl border border-white/5 bg-[#0d0d0d]">
                <div className="text-2xl font-bold text-[#00E676] mb-1">{stat.num}</div>
                <div className="text-xs text-[#555]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Preguntas frecuentes sobre automatizaciones en Madrid
          </h2>
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para automatizar tu empresa en Madrid?
          </h2>
          <p className="text-[#888] mb-8">
            Auditoría gratuita. Sin compromiso. Te decimos exactamente qué automatizar y cuánto te ahorrará.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all"
            >
              Pedir auditoría gratuita
            </Link>
            <Link
              href="/servicios"
              className="px-7 py-3.5 rounded-xl border border-white/10 text-[#BBB] text-sm font-medium hover:border-white/25 hover:text-white transition-all"
            >
              Ver servicios
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
