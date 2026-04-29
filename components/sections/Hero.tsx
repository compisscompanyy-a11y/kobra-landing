"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const nodes = [
  { cx: 12, cy: 22, r: 2.5, delay: 0 },
  { cx: 38, cy: 15, r: 2, delay: 0.4 },
  { cx: 63, cy: 28, r: 3, delay: 0.8 },
  { cx: 84, cy: 18, r: 2, delay: 0.2 },
  { cx: 22, cy: 52, r: 2, delay: 1.2 },
  { cx: 50, cy: 62, r: 3.5, delay: 0.6 },
  { cx: 74, cy: 55, r: 2, delay: 1 },
  { cx: 90, cy: 47, r: 2.5, delay: 0.3 },
  { cx: 8, cy: 73, r: 2, delay: 0.7 },
  { cx: 33, cy: 78, r: 2.5, delay: 1.4 },
  { cx: 58, cy: 83, r: 2, delay: 0.5 },
  { cx: 80, cy: 75, r: 3, delay: 0.9 },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [1, 4], [4, 5],
  [5, 6], [6, 7], [2, 6], [4, 9], [5, 10],
  [10, 11], [8, 9], [9, 10], [3, 7],
];

const trust = ["Setup en 1 semana", "Soporte en español", "Resultados desde el día 1"];

function NeuralBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#00E676" strokeWidth="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.25] }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx} cy={node.cy} r={node.r}
          fill="#00E676"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0.75, 0.35] }}
          transition={{
            duration: 3 + node.delay,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center dot-grid overflow-hidden pt-16">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(0,230,118,0.04)] via-transparent to-transparent pointer-events-none" />

      {/* Neural net visual (bottom half) */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] opacity-80">
        <NeuralBackground />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E676]/20 bg-[#00E676]/5 text-[#00E676] text-xs font-medium tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse-slow" />
          Agencia de Automatización con IA en Madrid
        </motion.div>

        {/* H1 — único, con keyword principal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none flex flex-col gap-1">
            <span className="text-white">Automatización</span>
            <span className="text-gradient-green">con IA</span>
            <span className="text-white">en Madrid</span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-lg md:text-xl text-[#BBB] max-w-2xl leading-relaxed font-light"
        >
          Chatbots inteligentes, agentes de voz y automatización de procesos para empresas en España. Trabajan 24/7 para que tú te concentres en crecer.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/contacto"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all duration-200 glow-green-sm hover:glow-green"
          >
            Pedir Demo Gratis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/demo"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-[#BBB] text-sm font-medium hover:border-white/25 hover:text-white transition-all duration-200"
          >
            <Play size={14} className="text-[#00E676]" />
            Ver Demo en Vivo
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-[#444]"
        >
          {trust.map((item, i) => (
            <span key={item} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[#222] mr-2.5 hidden sm:inline">·</span>}
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
