"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, MessageCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import CalendlyButton from "@/components/ui/CalendlyButton";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34XXXXXXXXX";

export default function CTA() {
  const { t, lang } = useLang();
  const c = t.cta;
  const [selectedProduct, setSelectedProduct] = useState("");

  const waMsg = encodeURIComponent(
    selectedProduct
      ? `Hola, me interesa una demo de Kobra AI para: ${selectedProduct}`
      : "Hola, me interesa una demo gratuita de Kobra AI"
  );

  return (
    <section id="cta" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00E676] opacity-[0.03] blur-[130px]" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E676]/20 bg-[#00E676]/5 text-[#00E676] text-xs font-medium tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse-slow" />
          {c.badge}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
        >
          {c.headline}{" "}
          <span className="text-gradient-green">{c.headlineGreen}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-[#888] text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {c.sub}
        </motion.p>

        {/* Benefits */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10"
        >
          {c.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-[#777]">
              <CheckCircle2 size={14} className="text-[#00E676] flex-shrink-0" />
              {b}
            </li>
          ))}
        </motion.ul>

        {/* Product selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mb-8"
        >
          <p className="text-xs text-[#555] mb-3 uppercase tracking-widest font-medium">
            {c.selectProduct}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {c.products.map((product) => (
              <button
                key={product}
                onClick={() =>
                  setSelectedProduct(selectedProduct === product ? "" : product)
                }
                className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedProduct === product
                    ? "border-[#00E676] bg-[#00E676]/10 text-[#00E676]"
                    : "border-white/8 text-[#666] hover:border-white/20 hover:text-[#BBB]"
                }`}
              >
                {product}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#22c55e] transition-all duration-200 shadow-lg shadow-[#25D366]/15 hover:scale-[1.02]"
          >
            <MessageCircle size={18} />
            {c.btnWhatsApp}
          </a>
          <CalendlyButton className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-base hover:bg-[#69f0ae] transition-all duration-200 glow-green hover:scale-[1.02]">
            <Calendar size={18} />
            {c.btnCalendly}
          </CalendlyButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-[#333] text-xs mt-8"
        >
          {c.subNote}
        </motion.p>
      </div>
    </section>
  );
}
