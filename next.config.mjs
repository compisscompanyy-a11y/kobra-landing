/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Evita que la web se cargue dentro de un iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Evita que el navegador adivine el tipo de archivo (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controla qué información de referrer se envía
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Activa protección XSS en navegadores antiguos
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Prefetch DNS solo de origen propio
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Deshabilita APIs del navegador que no usamos
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Fuerza HTTPS (solo activo en producción)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy — permite Calendly y fuentes de Google
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://api.anthropic.com https://calendly.com https://*.supabase.co",
      "frame-src https://calendly.com",
    ].join("; "),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Evita que Next.js exponga la versión del servidor
  poweredByHeader: false,
};

export default nextConfig;
