"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Calendar } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import CalendlyButton from "@/components/ui/CalendlyButton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_BOT_MESSAGE =
  "¡Hola! Soy Kai, el asistente virtual de Kobra AI 👋 Soy un ejemplo del chatbot que podemos integrar en tu negocio — igual de rápido, igual de inteligente, pero personalizado para tu sector. ¿En qué puedo ayudarte hoy?";

export default function InteractiveDemo() {
  const { t, lang } = useLang();
  const d = t.demo;

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: INITIAL_BOT_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Scroll only the chat container — never the page
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // requestAnimationFrame ensures DOM has painted before we scroll
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;
    const userText = text.trim();
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un error. Por favor escríbenos directamente por WhatsApp 😊",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[#555] mb-4">
            {d.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {d.headline}
          </h2>
          <p className="text-[#888] max-w-lg mx-auto text-base leading-relaxed">
            {d.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-2xl border border-white/8 bg-[#0a0a0a] overflow-hidden shadow-2xl">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0d0d0d]">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 flex items-center justify-center">
                  <Bot size={17} className="text-[#00E676]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00E676] border-2 border-[#0d0d0d]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Kai · Kobra AI</p>
                <p className="text-xs text-[#555]">Asistente de demostración</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-[#00E676] bg-[#00E676]/8 px-2.5 py-1 rounded-full border border-[#00E676]/15">
                <Sparkles size={11} />
                IA activa
              </div>
            </div>

            {/* Messages — scroll only this div */}
            <div
              ref={scrollContainerRef}
              className="h-80 overflow-y-auto p-5 flex flex-col gap-4"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28 }}
                    className={`flex items-end gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "assistant"
                          ? "bg-[#00E676]/10 border border-[#00E676]/20"
                          : "bg-[#1a1a1a] border border-white/8"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Bot size={13} className="text-[#00E676]" />
                      ) : (
                        <User size={13} className="text-[#888]" />
                      )}
                    </div>
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "assistant"
                          ? "bg-[#141414] border border-white/5 text-[#DDD] rounded-bl-sm"
                          : "bg-[#00E676] text-[#030303] font-medium rounded-br-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center">
                      <Bot size={13} className="text-[#00E676]" />
                    </div>
                    <div className="bg-[#141414] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full bg-[#555]"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.65, repeat: Infinity, delay: dot * 0.14 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies */}
            <div className="px-5 pb-3 flex gap-2 flex-wrap">
              {d.quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isTyping}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/8 text-[#777] hover:border-[#00E676]/30 hover:text-[#00E676] transition-all duration-200 disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-t border-white/5 bg-[#0d0d0d]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={d.placeholder}
                className="flex-1 bg-[#141414] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-[#00E676] flex items-center justify-center hover:bg-[#69f0ae] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={15} className="text-[#030303]" />
              </button>
            </div>
          </div>

          {/* Below chat CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
            <p className="text-[#444] text-xs">{d.disclaimer}</p>
            <CalendlyButton className="flex items-center gap-1.5 text-xs font-semibold text-[#00E676] hover:underline cursor-pointer">
              <Calendar size={12} />
              {d.demoBtn}
            </CalendlyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
