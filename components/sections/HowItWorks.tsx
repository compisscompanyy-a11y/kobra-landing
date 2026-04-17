"use client";

import { motion } from "framer-motion";
import { Search, Wrench, Rocket } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const ICONS = [Search, Wrench, Rocket];

export default function HowItWorks() {
  const { t } = useLang();
  const h = t.howItWorks;

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[#555] mb-4">
            {h.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{h.headline}</h2>
        </motion.div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-[#00E676]/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {h.steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.14 }}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-[#0d0d0d] border border-[#00E676]/20 flex items-center justify-center">
                      <Icon size={28} className="text-[#00E676]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00E676] flex items-center justify-center">
                      <span className="text-[#030303] text-[10px] font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-[200px]">
                    <h3 className="text-white font-semibold text-xl">{step.title}</h3>
                    <span className="text-xs text-[#00E676] font-medium">{step.subtitle}</span>
                    <p className="text-[#666] text-sm leading-relaxed mt-1">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 mx-auto max-w-xl rounded-2xl border border-white/5 bg-[#0d0d0d] p-6 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center flex-shrink-0">
            <Rocket size={18} className="text-[#00E676]" />
          </div>
          <p className="text-[#666] text-sm leading-relaxed">{h.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
