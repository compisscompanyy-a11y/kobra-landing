"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLang();
  const f = t.faq;
  const faqs = f.items;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 px-6">
      {/* FAQPage Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[#00E676]/70 mb-4">
            {f.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {f.headline}{" "}
            <span className="text-gradient-green">{f.headlineHighlight}</span>
          </h2>
          <p className="text-[#888] text-base leading-relaxed max-w-xl mx-auto">
            {f.sub}
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? "border-[#00E676]/30 bg-[#0d0d0d]"
                  : "border-white/5 bg-[#0a0a0a] hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span
                  className={`text-sm md:text-base font-medium leading-snug transition-colors ${
                    openIndex === i ? "text-white" : "text-[#BBB]"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    openIndex === i
                      ? "border-[#00E676]/40 bg-[#00E676]/10 text-[#00E676]"
                      : "border-white/10 text-[#555]"
                  }`}
                >
                  {openIndex === i ? (
                    <Minus size={13} />
                  ) : (
                    <Plus size={13} />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px w-full bg-white/5 mb-5" />
                      <p className="text-[#888] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[#555] text-sm mb-4">
            {f.bottomNote}
          </p>
          <a
            href={`https://wa.me/34640802262?text=${f.bottomCtaWaText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-[#BBB] text-sm font-medium hover:border-[#00E676]/30 hover:text-[#00E676] transition-all duration-200"
          >
            {f.bottomCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
