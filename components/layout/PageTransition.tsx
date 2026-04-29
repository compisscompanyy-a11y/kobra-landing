"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Tech-style page transition:
 *  - Green scan line sweeps top→bottom across the viewport.
 *  - Faint green grid + scanline trail follows behind it.
 *  - Outgoing/incoming page content cross-fades with a subtle blur+lift.
 *
 * The same sweep can be triggered manually (e.g. clicking the logo while
 * already on the home page) by dispatching `window.dispatchEvent(new Event("kobra:sweep"))`.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sweepKey, setSweepKey] = useState(0);
  const firstRender = useRef(true);

  // Trigger sweep on route change (skip first mount).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSweepKey((k) => k + 1);
  }, [pathname]);

  // Allow manual trigger from anywhere (logo click on home, etc.).
  useEffect(() => {
    const trigger = () => setSweepKey((k) => k + 1);
    window.addEventListener("kobra:sweep", trigger);
    return () => window.removeEventListener("kobra:sweep", trigger);
  }, []);

  return (
    <>
      {/* Sweep overlay — re-mounts every trigger via key, then animates and unmounts itself */}
      <AnimatePresence>
        {sweepKey > 0 && (
          <SweepOverlay key={sweepKey} onDone={() => { /* keep last; new key replaces it */ }} />
        )}
      </AnimatePresence>

      {/* Page content cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(4px)", y: -4 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function SweepOverlay({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      onDone();
    }, 750);
    return () => clearTimeout(t);
  }, [onDone]);

  if (done) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle full-screen green tint flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.06, 0] }}
        transition={{ duration: 0.65, ease: "easeInOut", times: [0, 0.4, 1] }}
        className="absolute inset-0 bg-[#00E676]"
      />

      {/* Faint vertical grid lines that flicker once */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0] }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,230,118,0.35) 0 1px, transparent 1px 80px)",
        }}
      />

      {/* Trailing scan glow (wider, softer) */}
      <motion.div
        initial={{ y: "-30vh" }}
        animate={{ y: "110vh" }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#00E676]/15 to-transparent"
      />

      {/* Sharp scan line on top */}
      <motion.div
        initial={{ y: "-2px" }}
        animate={{ y: "100vh" }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-x-0 h-[2px] bg-[#00E676]"
        style={{ boxShadow: "0 0 24px 4px rgba(0,230,118,0.7)" }}
      />
    </motion.div>
  );
}
