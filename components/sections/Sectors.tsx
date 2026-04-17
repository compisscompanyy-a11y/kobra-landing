"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Sectors() {
  const { t } = useLang();
  const s = t.sectors;

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[#555] mb-4">
            {s.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {s.headline}
          </h2>
          <p className="text-[#888] max-w-xl mx-auto text-base leading-relaxed">
            {s.sub}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {s.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group card-hover rounded-2xl border border-white/5 bg-[#0d0d0d] p-7 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-radial from-[rgba(0,230,118,0.025)] to-transparent" />

              {/* Icon + Name */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-white font-semibold text-base">{item.name}</h3>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#00E676]/20 to-transparent" />

              {/* Description */}
              <p className="text-[#777] text-sm leading-relaxed">{item.desc}</p>

              {/* CTA link */}
              <a
                href="/contacto"
                className="mt-auto text-xs text-[#444] group-hover:text-[#00E676] transition-colors font-medium"
              >
                Ver cómo funciona →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
