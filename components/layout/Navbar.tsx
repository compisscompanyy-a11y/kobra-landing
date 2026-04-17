"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
      aria-label="Toggle language"
    >
      <span className={lang === "es" ? "text-white" : "text-[#444]"}>ES</span>
      <span className="text-[#333]">/</span>
      <span className={lang === "en" ? "text-white" : "text-[#444]"}>EN</span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleInicio(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // 4 main pages — clean, no duplicates
  const pages = [
    { label: "Inicio",        href: "/",          onClick: handleInicio },
    { label: t.nav.services,  href: "/servicios",  onClick: undefined },
    { label: "Demo",          href: "/demo",       onClick: undefined },
    { label: t.nav.contact,   href: "/contacto",   onClick: undefined },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleInicio}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/kobra-logo-new.png"
              alt="Kobra Logo"
              fill
              className="object-contain group-hover:opacity-80 transition-opacity"
              priority
            />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            KOBRA<span className="text-[#00E676]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              onClick={page.onClick}
              className={`text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                pathname === page.href
                  ? "text-white bg-white/5"
                  : "text-[#666] hover:text-white"
              }`}
            >
              {page.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <LanguageToggle />
          <Link
            href="/contacto"
            className="text-sm px-4 py-2 rounded-lg bg-[#00E676] text-[#030303] font-semibold hover:bg-[#69f0ae] transition-colors duration-200"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            className="text-[#888] hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={(e) => {
                    page.onClick?.(e);
                    setMobileOpen(false);
                  }}
                  className={`text-sm py-2.5 border-b border-white/5 last:border-0 transition-colors ${
                    pathname === page.href ? "text-white" : "text-[#777] hover:text-white"
                  }`}
                >
                  {page.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                className="mt-3 text-sm px-4 py-3 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
