"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const testimonials = [
  {
    quote:
      "Teníamos una recepcionista a tiempo completo solo para coger citas. Con el agente de voz de Kobra, el 80% de las llamadas se gestionan solas. Ha sido el mejor ROI que hemos visto en años.",
    name: "Dra. Laura Serrano",
    role: "Directora Médica",
    company: "Clínica DentalPro Madrid",
    sector: "Clínica dental",
    metric: "−80% llamadas manuales",
    initial: "L",
    color: "#00E676",
  },
  {
    quote:
      "Ahora mismo el chatbot de WhatsApp gestiona reservas, responde dudas sobre la carta y avisa cuando la terraza está llena. Lo que antes requería 2 personas, lo hace solo.",
    name: "Miguel Ángel Torres",
    role: "Propietario",
    company: "Restaurante La Brasserie",
    sector: "Restauración",
    metric: "+35% reservas en 3 meses",
    initial: "M",
    color: "#00E676",
  },
  {
    quote:
      "Los leads que llegan ahora ya vienen filtrados: saben el precio, el barrio y el tipo de piso que buscan. Nuestros agentes solo hablan con gente que ya tiene intención de comprar.",
    name: "Carlos Vega",
    role: "Director Comercial",
    company: "Inmobiliaria GrupHogar",
    sector: "Inmobiliaria",
    metric: "3x productividad del equipo",
    initial: "C",
    color: "#00E676",
  },
  {
    quote:
      "Antes perdíamos ventas porque el soporte tardaba horas. Ahora el chatbot responde en segundos, recomienda tallas y resuelve devoluciones. El abandono de carrito bajó un 22%.",
    name: "Sofía Martínez",
    role: "CEO",
    company: "Moda Única Online",
    sector: "Ecommerce",
    metric: "−22% abandono de carrito",
    initial: "S",
    color: "#00E676",
  },
  {
    quote:
      "Implementamos el chatbot web en nuestra academia de idiomas y en el primer mes conseguimos 40 nuevos alumnos que hubieran quedado sin respuesta fuera del horario de oficina.",
    name: "Javier Ruiz",
    role: "Director",
    company: "Academia LinguaPlus",
    sector: "Educación",
    metric: "+40 alumnos el primer mes",
    initial: "J",
    color: "#00E676",
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
          <p className="text-xs font-medium uppercase tracking-widest text-[#00E676]/70 mb-4">
            {tr.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            {tr.headline}
          </h2>
          {/* Stars + rating */}
          <div className="flex items-center justify-center gap-1.5">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-[#00E676] text-xl">{s}</span>
            ))}
            <span className="text-white font-semibold text-sm ml-2">5.0</span>
            <span className="text-[#444] text-sm">/ 5 · Basado en clientes reales</span>
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="break-inside-avoid card-hover rounded-2xl border border-white/5 bg-[#0d0d0d] p-7 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-[#00E676] text-sm">{s}</span>
                ))}
              </div>

              {/* Metric pill */}
              <div className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E676]/8 border border-[#00E676]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                <span className="text-[#00E676] text-xs font-semibold">{item.metric}</span>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote size={18} className="text-[#00E676]/15 absolute -top-1 -left-1" />
                <p className="text-[#BBB] text-sm leading-relaxed pl-4">{item.quote}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center text-[#00E676] text-xs font-bold flex-shrink-0">
                  {item.initial}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.name}</p>
                  <p className="text-[#555] text-xs">{item.role} · {item.company}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[#333] text-xs px-2 py-1 rounded-full border border-white/5">
                    {item.sector}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
