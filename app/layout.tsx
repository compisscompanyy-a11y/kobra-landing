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

export const metadata: Metadata = {
  title: "Kobra AI — Automatización con Inteligencia Artificial",
  description:
    "Chatbots inteligentes, agentes de voz y páginas web profesionales para negocios que quieren crecer sin contratar más personal.",
  keywords:
    "IA, inteligencia artificial, chatbot, agente de voz, automatización, WhatsApp, reservas, España",
  openGraph: {
    title: "Kobra AI — Automatización con Inteligencia Artificial",
    description:
      "Chatbots, agentes de voz y páginas web con IA. Trabajan 24/7 por ti.",
    type: "website",
    locale: "es_ES",
  },
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
