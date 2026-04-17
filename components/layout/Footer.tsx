"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-white/5 bg-[#030303]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 relative">
                <Image
                  src="/kobra-logo-new.png"
                  alt="Kobra Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                KOBRA<span className="text-[#00E676]">.</span>
              </span>
            </Link>
            <p className="text-[#444] text-sm max-w-xs leading-relaxed">
              Automatización de IA para negocios que quieren crecer sin
              contratar más personal.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base">🇪🇸</span>
              <span className="text-[#333] text-xs">España · kobra.automation.ia@gmail.com</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs text-[#333] font-semibold uppercase tracking-widest mb-2">
              Empresa
            </p>
            {[
              { label: "Inicio", href: "/" },
              { label: t.nav.services, href: "/servicios" },
              { label: t.nav.contact, href: "/contacto" },
              { label: t.nav.demo, href: "/#demo" },
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
            className="flex flex-col gap-3"
          >
            <p className="text-xs text-[#333] font-semibold uppercase tracking-widest mb-2">
              Contacto
            </p>
            <a
              href="mailto:kobra.automation.ia@gmail.com"
              className="flex items-center gap-2 text-sm text-[#555] hover:text-[#00E676] transition-colors group"
            >
              <Mail size={13} />
              hola@kobra.ai
              <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#555] hover:text-[#00E676] transition-colors group"
            >
              <Linkedin size={13} />
              LinkedIn
              <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34XXXXXXXXX"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#555] hover:text-[#25D366] transition-colors group"
            >
              <span className="text-sm">💬</span>
              WhatsApp
              <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#333] text-xs">
            © {new Date().getFullYear()} Kobra AI. Todos los derechos reservados.
          </p>
          <p className="text-[#222] text-xs">
            Diseñado para convertir. Construido para escalar.
          </p>
        </div>
      </div>
    </footer>
  );
}
