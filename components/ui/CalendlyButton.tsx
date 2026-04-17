"use client";

import { ReactNode } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/kobra-automation-ia";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface Props {
  children: ReactNode;
  className?: string;
}

export default function CalendlyButton({ children, className = "" }: Props) {
  function openCalendly(e: React.MouseEvent) {
    e.preventDefault();
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Fallback: open in new tab if script not loaded yet
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <button type="button" onClick={openCalendly} className={className}>
      {children}
    </button>
  );
}
