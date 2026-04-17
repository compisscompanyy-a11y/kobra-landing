"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34XXXXXXXXX";
const WA_MSG = "Hola%2C%20me%20interesa%20una%20demo%20gratuita%20de%20Kobra%20AI";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="relative bg-[#111] border border-white/10 rounded-2xl p-4 max-w-[220px] shadow-2xl"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-[#444] hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X size={12} />
            </button>
            <p className="text-white text-xs font-semibold mb-1">
              ¡Hola! 👋
            </p>
            <p className="text-[#888] text-xs leading-relaxed">
              ¿Tienes dudas? Escríbenos y te respondemos en minutos.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs font-semibold text-[#25D366] hover:underline"
            >
              Escribir ahora →
            </a>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-5 w-4 h-4 bg-[#111] border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:bg-[#22c55e] transition-colors"
        aria-label="Contactar por WhatsApp"
      >
        {/* WhatsApp icon SVG */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.43.636 4.71 1.748 6.687L2 30l7.516-1.722A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.2a11.17 11.17 0 0 1-5.696-1.56l-.408-.242-4.462 1.022 1.048-4.344-.266-.432A11.143 11.143 0 0 1 4.8 16C4.8 9.808 9.808 4.8 16 4.8S27.2 9.808 27.2 16 22.192 27.2 16 27.2zm6.112-8.336c-.336-.168-1.984-.978-2.29-1.09-.308-.112-.532-.168-.756.168-.224.336-.868 1.09-1.064 1.316-.196.224-.392.252-.728.084-.336-.168-1.42-.522-2.704-1.664-.998-.89-1.674-1.988-1.87-2.324-.196-.336-.02-.518.148-.686.152-.15.336-.392.504-.588.168-.196.224-.336.336-.56.112-.224.056-.42-.028-.588-.084-.168-.756-1.82-1.036-2.492-.272-.652-.55-.564-.756-.574h-.644c-.224 0-.588.084-.896.42-.308.336-1.176 1.148-1.176 2.8s1.204 3.248 1.372 3.472c.168.224 2.372 3.62 5.748 5.076.804.348 1.43.556 1.92.712.806.256 1.54.22 2.12.134.646-.096 1.984-.812 2.264-1.596.28-.784.28-1.456.196-1.596-.084-.14-.308-.224-.644-.392z" />
        </svg>

        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-25" />
      </motion.a>
    </div>
  );
}
