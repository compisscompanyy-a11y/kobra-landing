"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;
    const dot = dotRef.current as HTMLDivElement;
    const ring = ringRef.current as HTMLDivElement;

    // Desactivar en táctil o si el usuario prefiere movimiento reducido
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    // Inyectar estilo directamente en el <head> para eliminar el cursor nativo
    // en TODOS los elementos sin depender del media query en CSS
    const styleTag = document.createElement("style");
    styleTag.id = "kobra-cursor-hide";
    const transparentCursor =
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><rect width='32' height='32' fill='transparent'/></svg>\") 16 16, none";
    styleTag.textContent = `
      *, *::before, *::after,
      *:hover, *:active, *:focus,
      a, a:hover, a:active, a:focus,
      button, button:hover, button:active, button:focus,
      input, input:hover, input:active, input:focus,
      textarea, textarea:hover, textarea:active, textarea:focus,
      select, select:hover, select:active, select:focus,
      label, [role="button"], [tabindex] {
        cursor: ${transparentCursor} !important;
      }
    `;
    document.head.appendChild(styleTag);

    let mouseX = -300;
    let mouseY = -300;
    let ringX = -300;
    let ringY = -300;
    let hovering = false;
    let clicking = false;
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      ringX = lerp(ringX, mouseX, 0.11);
      ringY = lerp(ringY, mouseY, 0.11);

      const dotScale = clicking ? 0.4 : hovering ? 0 : 1;
      const ringScale = hovering ? 1.55 : clicking ? 0.7 : 1;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%) scale(${dotScale})`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%) scale(${ringScale})`;

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
    }

    function onUp() {
      clicking = false;
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement;
      hovering = !!t.closest(
        "a, button, [role=button], input, textarea, select, label, [tabindex='0']"
      );
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      document.getElementById("kobra-cursor-hide")?.remove();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Siempre renderiza los divs (mismo HTML en server y client — sin hydration mismatch)
  // Empiezan ocultos (opacity:0) y se activan desde useEffect
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "#00E676",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(0,230,118,0.3)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
