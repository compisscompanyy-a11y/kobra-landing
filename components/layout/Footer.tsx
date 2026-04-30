"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

const WA_NUMBER = "34640802262";
const WA_MSG = "Hola%2C%20me%20interesa%20una%20demo%20de%20Kobra%20AI";

export default function Footer() {
  const { t } = useLang();
  const fo = t.footer;

  return (
    <footer className="border-t border-white/5 bg-[#030303]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 flex flex-col gap-4"
          >
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 relative">
                <Image
                  src="/kobra-k-logo.png"
                  alt="Kobra AI — Automatización con inteligencia artificial"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                KOBRA<span className="text-[#00E676]">.</span>
              </span>
            </Link>
            <p className="text-[#444] text-sm max-w-xs leading-relaxed">
              {fo.description}
            </p>

            {/* Address */}
            <div className="flex items-start gap-2 mt-1">
              <MapPin size={13} className="text-[#333] mt-0.5 flex-shrink-0" />
              <span className="text-[#444] text-xs leading-relaxed">
                {fo.address}
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/kobra-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kobra AI en LinkedIn"
                className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-[#555] hover:text-[#00E676] hover:border-[#00E676]/30 transition-all duration-200"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kobra AI en WhatsApp"
                className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-[#555] hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-200"
              >
                {/* WhatsApp icon */}
                <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2C8.268 2 2 8.268 2 16c0 2.43.636 4.71 1.748 6.687L2 30l7.516-1.722A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.112 19.864c-.336-.168-1.984-.978-2.29-1.09-.308-.112-.532-.168-.756.168-.224.336-.868 1.09-1.064 1.316-.196.224-.392.252-.728.084-.336-.168-1.42-.522-2.704-1.664-.998-.89-1.674-1.988-1.87-2.324-.196-.336-.02-.518.148-.686.152-.15.336-.392.504-.588.168-.196.224-.336.336-.56.112-.224.056-.42-.028-.588-.084-.168-.756-1.82-1.036-2.492-.272-.652-.55-.564-.756-.574h-.644c-.224 0-.588.084-.896.42-.308.336-1.176 1.148-1.176 2.8s1.204 3.248 1.372 3.472c.168.224 2.372 3.62 5.748 5.076.804.348 1.43.556 1.92.712.806.256 1.54.22 2.12.134.646-.096 1.984-.812 2.264-1.596.28-.784.28-1.456.196-1.596-.084-.14-.308-.224-.644-.392z" />
                </svg>
              </a>
              <a
                href="mailto:kobra.automation.ia@gmail.com"
                aria-label="Email Kobra AI"
                className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-[#555] hover:text-[#00E676] hover:border-[#00E676]/30 transition-all duration-200"
              >
                <Mail size={14} />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 flex flex-col gap-3"
          >
            <p className="text-xs text-[#444] font-semibold uppercase tracking-widest mb-2">
              {fo.companyHeading}
            </p>
            {[
              { label: fo.links.home, href: "/" },
              { label: fo.links.services, href: "/servicios" },
              { label: fo.links.demo, href: "/demo" },
              { label: fo.links.contact, href: "/contacto" },
              { label: fo.links.faq, href: "/#faq" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#555] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-3"
          >
            <p className="text-xs text-[#444] font-semibold uppercase tracking-widest mb-2">
              Servicios
            </p>
            {[
              { label: "Chatbot para empresas", href: "/servicios" },
              { label: "Chatbot WhatsApp", href: "/servicios" },
              { label: "Agente de voz IA", href: "/servicios" },
              { label: "Automatización procesos", href: "/servicios" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#555] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 flex flex-col gap-3"
          >
            <p className="text-xs text-[#444] font-semibold uppercase tracking-widest mb-2">
              Contacto
            </p>
            <a
              href="mailto:kobra.automation.ia@gmail.com"
              className="flex items-center gap-2 text-sm text-[#555] hover:text-[#00E676] transition-colors group"
            >
              <Mail size={13} />
              kobra.automation.ia@gmail.com
              <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#555] hover:text-[#25D366] transition-colors group"
            >
              <Phone size={13} />
              +34 640 802 262
              <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://calendly.com/kobra-automation-ia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#555] hover:text-[#00E676] transition-colors group"
            >
              <ArrowUpRight size={13} />
              Agendar demo gratis
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#444] text-xs">
            © {new Date().getFullYear()} Kobra AI · Madrid, España · Todos los derechos reservados.
          </p>
          <p className="text-[#333] text-xs">
            Diseñado para convertir. Construido para escalar.
          </p>
        </div>
      </div>
    </footer>
  );
}
