"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const testimonials = [
  {
    quote:
      "Nos costaba muchísimo responder a todos los leads a tiempo. Desde que implementamos el sistema de IA, no se nos escapa ni una sola oportunidad. Es como tener un equipo extra trabajando 24/7.",
    name: "Martín Ruiz",
    role: "Fundador",
    company: "Startup Tech",
    initial: "M",
  },
  {
    quote:
      "Lo que más me sorprendió es lo natural que suena el agente de voz. Los pacientes ni se dan cuenta de que no es una persona. Nos ha reducido el trabajo de recepción a la mitad.",
    name: "Dra. Laura Serrano",
    role: "Manager",
    company: "Clínica Privada",
    initial: "L",
  },
  {
    quote:
      "Antes teníamos muchas ventas perdidas por dudas en el checkout. Ahora el chatbot responde al instante y guía al cliente hasta comprar. Se nota directamente en ingresos.",
    name: "Diego Morales",
    role: "Fundador",
    company: "Ecommerce",
    initial: "D",
  },
  {
    quote:
      "Ahora los leads llegan filtrados y con información útil. Ya no perdemos tiempo con gente que no encaja. Es un cambio brutal en productividad.",
    name: "Carlos Vega",
    role: "Agente Senior",
    company: "Inmobiliaria",
    initial: "C",
  },
  {
    quote:
      "No pensaba que la automatización con IA fuera tan accesible. En pocas semanas teníamos todo funcionando y ya notamos más reservas sin esfuerzo.",
    name: "Ana Pérez",
    role: "Dueña",
    company: "Negocio local",
    initial: "A",
  },
];

export default function Testimonials() {
  const { t } = useLang();
  const tr = t.testimonials;

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[#555] mb-4">
            {tr.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {tr.headline}
          </h2>
          <div className="flex items-center justify-center gap-1">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-[#00E676] text-xl">{s}</span>
            ))}
            <span className="text-[#444] text-sm ml-2">5.0</span>
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="break-inside-avoid card-hover rounded-2xl border border-white/5 bg-[#0d0d0d] p-7 flex flex-col gap-5"
            >
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-[#00E676] text-sm">{s}</span>
                ))}
              </div>

              <div className="relative">
                <Quote size={18} className="text-[#00E676]/15 absolute -top-1 -left-1" />
                <p className="text-[#BBB] text-sm leading-relaxed pl-4">{t.quote}</p>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center text-[#00E676] text-xs font-bold flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-[#444] text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
