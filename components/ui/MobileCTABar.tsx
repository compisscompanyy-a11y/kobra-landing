"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import CalendlyButton from "@/components/ui/CalendlyButton";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34640802262";
const WA_MSG = "Hola%2C%20me%20interesa%20una%20demo%20gratuita%20de%20Kobra%20AI";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after user scrolls past the hero (approx 400px)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-stretch gap-0 border-t border-white/8 bg-[#030303]/95 backdrop-blur-xl px-4 py-3 gap-3">
            <CalendlyButton className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00E676] text-[#030303] font-bold text-sm glow-green-sm active:scale-95 transition-transform">
              <Calendar size={16} />
              Pedir Demo
            </CalendlyButton>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
