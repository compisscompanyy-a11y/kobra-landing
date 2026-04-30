"use client";

import { useLang } from "@/context/LanguageContext";

type PageKey = "servicios" | "demo" | "contacto";

export default function PageHeader({ page }: { page: PageKey }) {
  const { t } = useLang();
  const p = t.pages[page];

  if (page === "servicios") {
    const sp = t.pages.servicios;
    return (
      <section className="pt-36 pb-16 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            {sp.label}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {sp.headline1}
            <br />
            <span className="text-gradient-green">{sp.headline2}</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-xl mx-auto">
            {sp.sub}
          </p>
        </div>
      </section>
    );
  }

  if (page === "demo") {
    const dp = t.pages.demo;
    return (
      <section className="pt-36 pb-4 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            {dp.label}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            {dp.headline}{" "}
            <span className="text-gradient-green">{dp.headlineHighlight}</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-xl mx-auto">
            {dp.sub}
          </p>
        </div>
      </section>
    );
  }

  // contacto
  const cp = t.pages.contacto;
  return (
    <div className="text-center mb-16">
      <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
        {cp.label}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
        {cp.headline}
      </h1>
      <p className="text-[#888] text-lg max-w-lg mx-auto leading-relaxed">
        {cp.sub}
      </p>
    </div>
  );
}
