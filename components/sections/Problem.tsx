"use client";

import { motion } from "framer-motion";
import { MessageCircleOff, Timer, TrendingDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const ICONS = [MessageCircleOff, Timer, TrendingDown];
const COLORS = [
  { bg: "rgba(239,68,68,0.12)", icon: "#f87171" },
  { bg: "rgba(251,146,60,0.12)", icon: "#fb923c" },
  { bg: "rgba(239,68,68,0.10)", icon: "#f87171" },
];

export default function Problem() {
  const { t } = useLang();
  const p = t.problem;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium uppercase tracking-widest text-[#00E676]/70 mb-6"
        >
          {p.label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center text-3xl md:text-4xl font-bold text-white mb-16 leading-snug"
        >
          {p.headline}{" "}
          <br className="hidden md:block" />
          <span className="text-[#555] font-normal">{p.headlineSub}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {p.items.map((item, i) => {
            const Icon = ICONS[i];
            const color = COLORS[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover rounded-2xl border border-white/5 bg-[#0d0d0d] p-8 flex flex-col gap-5"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color.bg }}
                >
                  <Icon size={20} style={{ color: color.icon }} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-base">{item.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center text-[#444] text-sm mt-14"
        >
          {p.note}
          <span className="text-[#00E676]">{p.noteCta}</span>
        </motion.p>
      </div>
    </section>
  );
}
