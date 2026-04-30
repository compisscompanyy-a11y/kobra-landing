"use client";

import { useLang } from "@/context/LanguageContext";

export default function ContactSidebar() {
  const { t } = useLang();
  const c = t.pages.contacto;

  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      {/* WhatsApp card */}
      <a
        href="https://wa.me/34640802262?text=Hola%2C%20me%20interesa%20una%20demo%20de%20Kobra%20AI"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/30 transition-all duration-300"
      >
        <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0 text-xl">
          💬
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-1">
            {c.whatsappTitle}
          </p>
          <p className="text-[#666] text-xs leading-relaxed">
            {c.whatsappDesc}
          </p>
          <span className="inline-block mt-3 text-xs text-[#25D366] font-medium group-hover:underline">
            {c.whatsappCta}
          </span>
        </div>
      </a>

      {/* Calendly card */}
      <a
        href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com"}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/30 transition-all duration-300"
      >
        <div className="w-11 h-11 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center flex-shrink-0 text-xl">
          📅
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-1">
            {c.calendlyTitle}
          </p>
          <p className="text-[#666] text-xs leading-relaxed">
            {c.calendlyDesc}
          </p>
          <span className="inline-block mt-3 text-xs text-[#00E676] font-medium group-hover:underline">
            {c.calendlyCta}
          </span>
        </div>
      </a>

      {/* Email */}
      <a
        href="mailto:kobra.automation.ia@gmail.com"
        className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/30 transition-all duration-300"
      >
        <div className="w-11 h-11 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center flex-shrink-0 text-xl">
          ✉️
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-1">
            {c.emailTitle}
          </p>
          <p className="text-[#666] text-xs leading-relaxed">
            kobra.automation.ia@gmail.com
            <br />
            {c.emailDesc}
          </p>
        </div>
      </a>

      {/* Spain badge */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/5 bg-[#0d0d0d]">
        <span className="text-lg">🇪🇸</span>
        <p className="text-[#555] text-xs">{c.badge}</p>
      </div>
    </div>
  );
}
