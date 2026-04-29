"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const PRODUCTS_ES = [
  "Página web profesional",
  "Chatbot para página web",
  "Chatbot de WhatsApp",
  "Agente de voz telefónico",
  "No sé, quiero asesoramiento",
];

const PRODUCTS_EN = [
  "Professional website",
  "Web chatbot",
  "WhatsApp chatbot",
  "Phone voice agent",
  "Not sure, I need advice",
];

export default function ContactForm() {
  const { t, lang } = useLang();
  const f = t.contact.form;
  const products = lang === "es" ? PRODUCTS_ES : PRODUCTS_EN;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Build mailto link as fallback (replace with Formspree/Resend endpoint when ready)
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nServicio: ${formData.product}\n\n${formData.message}`
    );
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "kobra.automation.ia@gmail.com";

    // Simulate sending (replace with real fetch to your endpoint)
    await new Promise((r) => setTimeout(r, 1000));

    window.location.href = `mailto:${email}?subject=Consulta desde kobra.ai — ${formData.product}&body=${body}`;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 p-12 rounded-2xl border border-[#00E676]/20 bg-[#0d0d0d] text-center min-h-[400px]"
      >
        <div className="w-16 h-16 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-[#00E676]" />
        </div>
        <div>
          <p className="text-white font-semibold text-lg mb-2">{f.success}</p>
          <p className="text-[#666] text-sm">
            {lang === "es"
              ? "Revisa tu cliente de correo para confirmar el envío."
              : "Check your email client to confirm the message was sent."}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-8 rounded-2xl border border-white/5 bg-[#0d0d0d]"
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#555] font-medium">{f.name} *</label>
        <input
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder={lang === "es" ? "Ej. María García · Clínica Dental Sol" : "Eg. John Smith · Dental Clinic"}
          className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#555] font-medium">{f.email} *</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="nombre@empresa.com"
            className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#555] font-medium">{f.phone}</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+34 612 345 678"
            className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
          />
        </div>
      </div>

      {/* Product selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#555] font-medium">{f.product} *</label>
        <select
          name="product"
          required
          value={formData.product}
          onChange={handleChange}
          className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E676]/30 transition-colors appearance-none"
        >
          <option value="" disabled className="text-[#333]">
            {lang === "es" ? "Selecciona un servicio..." : "Select a service..."}
          </option>
          {products.map((p) => (
            <option key={p} value={p} className="bg-[#111]">
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#555] font-medium">{f.message}</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={
            lang === "es"
              ? "Cuéntanos sobre tu negocio y qué quieres automatizar..."
              : "Tell us about your business and what you want to automate..."
          }
          className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={15} />
        {status === "sending" ? f.submitting : f.submit}
      </button>

      <p className="text-[#333] text-xs text-center">
        {lang === "es"
          ? "También puedes escribirnos directamente por WhatsApp para respuesta inmediata."
          : "You can also message us directly on WhatsApp for an instant response."}
      </p>
    </form>
  );
}
