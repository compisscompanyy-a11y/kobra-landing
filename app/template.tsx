"use client";

import { motion } from "framer-motion";

/**
 * Next.js App Router template — re-renders on every navigation, so this enter
 * animation runs each time the user moves between pages. Pairs with the
 * <PageTransition /> sweep overlay mounted in the root layout.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
