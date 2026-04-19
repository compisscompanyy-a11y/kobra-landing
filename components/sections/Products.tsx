"use client";

import { motion } from "framer-motion";
import { Globe, MessageSquare, Smartphone, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const ICONS = [Globe, MessageSquare, Smartphone, Phone];

export default function Products() {
  const { t } = useLang();
  const p = t.products;

  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[#00E676]/70 mb-4">
            {p.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {p.headline}
          </h2>
          <p className="text-[#888] max-w-xl mx-auto text-base leading-relaxed">
            {p.sub}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {p.items.map((product, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={product.tag}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="group card-hover relative rounded-2xl border border-white/5 bg-[#0d0d0d] p-8 flex flex-col gap-6 overflow-hidden"
              >
                {/* BG glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-radial from-[rgba(0,230,118,0.03)] to-transparent" />

                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center">
                      <Icon size={20} className="text-[#00E676]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#00E676]">
                      {product.tag}
                    </span>
                  </div>
                  {/* Price badge */}
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{product.price}</p>
                    <p className="text-[#444] text-xs">{product.maintenance}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-xl leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-[#777] text-sm leading-relaxed">{product.desc}</p>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#666]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contacto"
                  className="mt-auto flex items-center gap-1.5 text-sm text-[#555] group-hover:text-[#00E676] transition-colors font-medium"
                >
                  Pedir presupuesto
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-[#333] mt-10"
        >
          Precios orientativos · Presupuesto personalizado sin compromiso ·{" "}
          <Link href="/contacto" className="text-[#555] hover:text-[#00E676] transition-colors">
            Consulta tu caso →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
