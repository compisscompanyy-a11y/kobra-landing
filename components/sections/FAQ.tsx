"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Qué es un chatbot para empresas y cómo puede ayudar a mi negocio?",
    answer:
      "Un chatbot para empresas es un asistente virtual con inteligencia artificial que responde a tus clientes automáticamente, 24 horas al día, 7 días a la semana. Puede gestionar consultas frecuentes, capturar leads, agendar citas y guiar a tus clientes durante el proceso de compra — sin que tú tengas que intervenir. El resultado: más ventas, menos trabajo manual y clientes mejor atendidos.",
  },
  {
    question: "¿Cuánto tiempo tarda en estar funcionando el chatbot o el agente de voz?",
    answer:
      "Nuestro proceso está optimizado para que en menos de 1 semana tengas tu solución activa. El primer día hacemos una auditoría gratuita de tu negocio. Del día 2 al 5 configuramos e integramos todo. A partir de la segunda semana tu IA está trabajando para ti. No necesitas conocimientos técnicos ni implicar a tu equipo IT.",
  },
  {
    question: "¿El chatbot de WhatsApp es oficial? ¿Puede penalizarme WhatsApp?",
    answer:
      "Sí, trabajamos exclusivamente con la API oficial de WhatsApp Business. Esto garantiza que tu número no corre ningún riesgo de bloqueo. La integración cumple al 100% con las políticas de Meta. Además, al ser una solución oficial, tus clientes ven un perfil de empresa verificado, lo que aumenta la confianza.",
  },
  {
    question: "¿El agente de voz suena artificial o se nota que es una IA?",
    answer:
      "Los agentes de voz de Kobra AI utilizan tecnología de síntesis de voz de última generación (ElevenLabs y OpenAI Voice). La voz es completamente natural, con entonación, pausas y ritmo humano. En pruebas reales con clientes de clínicas y restaurantes, más del 70% de los usuarios no distinguen entre el agente de IA y una persona real en las primeras interacciones.",
  },
  {
    question: "¿Funciona para mi sector? Solo tengo un negocio local pequeño.",
    answer:
      "Perfectamente. De hecho, los negocios locales son los que más se benefician porque suelen tener un volumen de consultas alto pero poco personal para gestionarlo. Hemos automatizado restaurantes, clínicas dentales, inmobiliarias, peluquerías, academias y talleres. Si recibes llamadas, mensajes o consultas — podemos automatizarlo.",
  },
  {
    question: "¿Qué pasa si el chatbot no sabe responder algo?",
    answer:
      "El sistema está entrenado para derivar de forma inteligente al humano cuando no tiene seguridad en la respuesta o cuando el cliente lo solicita expresamente. Nunca dejará a un cliente sin atención. Además, durante las primeras semanas monitorizamos todas las conversaciones para ajustar y mejorar continuamente las respuestas.",
  },
  {
    question: "¿Cuánto cuesta y hay contrato de permanencia?",
    answer:
      "Los precios arrancan desde 800€ de configuración inicial más un mantenimiento mensual desde 200€. No hay contratos de permanencia — puedes cancelar con 30 días de aviso. Ofrecemos una auditoría gratuita sin compromiso donde calculamos exactamente el ROI que puedes esperar antes de que decidas nada.",
  },
  {
    question: "¿Puedo integrar el chatbot con mi CRM, Google Calendar o sistema de reservas?",
    answer:
      "Sí. Integramos con la mayoría de herramientas del mercado: Google Calendar, Calendly, HubSpot, Zoho CRM, sistemas de TPV para restaurantes, software de gestión de clínicas y más. Si usas una herramienta específica, consúltanos y lo valoramos sin coste.",
  },
];

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Todo lo que necesitas saber sobre{" "}
            <span className="text-gradient-green">automatización con IA</span>
          </h2>
          <p className="text-[#888] text-base leading-relaxed max-w-xl mx-auto">
            Resolvemos las dudas más habituales de empresas que están considerando implementar un chatbot o agente de voz.
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
            ¿Tienes alguna pregunta que no está aquí?
          </p>
          <a
            href="https://wa.me/34640802262?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20Kobra%20AI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-[#BBB] text-sm font-medium hover:border-[#00E676]/30 hover:text-[#00E676] transition-all duration-200"
          >
            Pregúntanos por WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
