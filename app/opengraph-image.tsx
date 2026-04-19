import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kobra AI — Automatización con Inteligencia Artificial para empresas en Madrid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#030303",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Green glow center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Left content */}
        <div
          style={{
            flex: 1,
            padding: "64px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "rgba(0,230,118,0.12)",
                border: "1.5px solid rgba(0,230,118,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 900,
                color: "#00E676",
              }}
            >
              K
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "white", letterSpacing: -1 }}>
                KOBRA
              </span>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#00E676" }}>.</span>
              <span style={{ fontSize: 24, fontWeight: 400, color: "#555", marginLeft: 4 }}>
                AI
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 66, fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: -2 }}>
              Automatización
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
              <span style={{ fontSize: 66, fontWeight: 800, color: "#00E676", lineHeight: 1.05, letterSpacing: -2 }}>
                con IA
              </span>
              <span style={{ fontSize: 44, fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: -1 }}>
                para empresas
              </span>
            </div>
            <div style={{ fontSize: 22, color: "#777", marginTop: 12, lineHeight: 1.5 }}>
              Chatbot · Agente de Voz · WhatsApp · Madrid, España
            </div>
          </div>

          {/* Bottom badges */}
          <div style={{ display: "flex", gap: 12 }}>
            {["Setup en 1 semana", "Sin contratos", "Resultados desde día 1"].map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 100,
                  background: "rgba(0,230,118,0.08)",
                  border: "1px solid rgba(0,230,118,0.2)",
                  color: "#00E676",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E676" }} />
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - service cards */}
        <div
          style={{
            width: 380,
            padding: "60px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {[
            { emoji: "💬", title: "Chatbot para empresas", sub: "Respuestas automáticas 24/7", color: "#00E676" },
            { emoji: "📞", title: "Agente de voz IA", sub: "Llamadas con voz natural", color: "#00E676" },
            { emoji: "🟢", title: "WhatsApp Business", sub: "API oficial · Sin bloqueos", color: "#25D366" },
            { emoji: "⚡", title: "Automatización total", sub: "Procesos sin intervención", color: "#00E676" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 14,
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {item.emoji}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "white" }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#555" }}>{item.sub}</div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: item.color,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
