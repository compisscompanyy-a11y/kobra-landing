"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Don't run on touch devices or if reduced motion is preferred
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    // Hide native cursor at the HTML level so it can't leak through
    document.documentElement.style.cursor = "none";
    setActive(true);

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let rafId: number;
    let hovering = false;
    let clicking = false;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${clicking ? 0.5 : 1})`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${hovering ? 1.5 : clicking ? 0.75 : 1})`;

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }

    function onLeave() {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    }

    function onEnter() {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }

    function onDown() {
      clicking = true;
      ring.style.borderColor = "#00E676";
      ring.style.boxShadow = "0 0 18px 4px rgba(0,230,118,0.45)";
    }

    function onUp() {
      clicking = false;
      ring.style.borderColor = "";
      ring.style.boxShadow = "";
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [role=button], input, textarea, select, label, [tabindex='0']");
      if (hovering) {
        dot.style.transform += " scale(0)";
        ring.style.borderColor = "#00E676";
      } else {
        ring.style.borderColor = "";
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!active && typeof window !== "undefined") return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#00E676",
          boxShadow: "0 0 10px 3px rgba(0,230,118,0.7)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "transform 0.08s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(0,230,118,0.45)",
          boxShadow: "0 0 8px 1px rgba(0,230,118,0.15)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition: "transform 0.0s linear, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
