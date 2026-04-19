import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://kobra.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kobra AI — Chatbot para Empresas y Automatización con IA en Madrid",
    template: "%s | Kobra AI",
  },
  description:
    "Kobra AI ofrece chatbot para empresas, automatización con IA, agente de voz inteligencia artificial y chatbot WhatsApp empresas. Empresa de automatización en Madrid, España.",
  keywords: [
    "chatbot para empresas",
    "automatización con IA",
    "empresa automatización Madrid",
    "chatbot WhatsApp empresas",
    "agente de voz inteligencia artificial",
    "automatización de procesos España",
    "inteligencia artificial negocios",
    "chatbot inteligente España",
    "automatización empresarial Madrid",
    "agente virtual WhatsApp",
    "IA para empresas",
    "chatbot 24/7",
  ],
  authors: [{ name: "Kobra AI", url: SITE_URL }],
  creator: "Kobra AI",
  publisher: "Kobra AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Kobra AI — Chatbot para Empresas y Automatización con IA en Madrid",
    description:
      "Chatbot para empresas, agente de voz con IA y automatización de procesos. Empresa en Madrid que automatiza negocios con inteligencia artificial. Setup en 1 semana.",
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Kobra AI",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kobra AI — Automatización con Inteligencia Artificial para empresas en Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobra AI — Chatbot para Empresas y Automatización con IA",
    description:
      "Chatbot WhatsApp, agente de voz IA y automatización de procesos para empresas en España. Empresa en Madrid.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: "Kobra AI",
  legalName: "Kobra AI",
  description:
    "Empresa de automatización con inteligencia artificial en Madrid. Especialistas en chatbot para empresas, chatbot WhatsApp, agentes de voz y automatización de procesos en España.",
  url: SITE_URL,
  telephone: "+34640802262",
  email: "hola@kobra.ai",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressRegion: "Comunidad de Madrid",
    postalCode: "28001",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4168,
    longitude: -3.7038,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/kobra-ai",
    "https://wa.me/34640802262",
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Transferencia bancaria, tarjeta",
  areaServed: [
    { "@type": "Country", name: "España" },
    { "@type": "City", name: "Madrid" },
  ],
  knowsAbout: [
    "Chatbot para empresas",
    "Automatización con inteligencia artificial",
    "Agente de voz IA",
    "Chatbot WhatsApp",
    "Automatización de procesos",
    "Machine Learning",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de automatización con IA para empresas",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Chatbot para empresas",
          description:
            "Chatbot inteligente para web y WhatsApp que atiende clientes 24/7 con inteligencia artificial",
          provider: { "@type": "Organization", name: "Kobra AI" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agente de voz con inteligencia artificial",
          description:
            "Agente telefónico con voz natural para atender llamadas automáticamente 24/7",
          provider: { "@type": "Organization", name: "Kobra AI" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Chatbot WhatsApp para empresas",
          description:
            "Chatbot oficial de WhatsApp Business para gestionar reservas, consultas y ventas automáticamente",
          provider: { "@type": "Organization", name: "Kobra AI" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatización de procesos con IA",
          description:
            "Automatización completa de procesos empresariales con inteligencia artificial en España",
          provider: { "@type": "Organization", name: "Kobra AI" },
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "23",
    bestRating: "5",
    worstRating: "1",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Kobra AI",
  description:
    "Chatbot para empresas, agente de voz IA y automatización de procesos en Madrid, España.",
  publisher: { "@id": `${SITE_URL}/#business` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["es", "en"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {/* Calendly popup widget styles */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        {/* LocalBusiness Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* WebSite Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-[#030303] text-white`}>
        <LanguageProvider>{children}</LanguageProvider>

        {/* Calendly popup widget script — loads after page is interactive */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
