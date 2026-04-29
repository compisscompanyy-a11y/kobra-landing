"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 500, mass: 0.3 });
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    // Only show on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    }

    function onLeave() {
      setIsVisible(false);
    }

    function onEnter() {
      setIsVisible(true);
    }

    function onDown() {
      setIsClicking(true);
    }

    function onUp() {
      setIsClicking(false);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [role=button], input, textarea, select, label, [tabindex]") !== null;
      setIsHovering(isInteractive);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (prefersReduced) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.6 : isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 rounded-full border border-[#00E676]/50 mix-blend-screen"
        aria-hidden="true"
      />

      {/* Core dot */}
      <motion.div
        ref={cursorRef}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          backgroundColor: isHovering ? "#00E676" : "#00E676",
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-[#00E676] shadow-[0_0_8px_2px_rgba(0,230,118,0.6)]"
        aria-hidden="true"
      />
    </>
  );
}
