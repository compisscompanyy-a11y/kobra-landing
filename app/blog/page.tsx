import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import { getAllBlogPosts } from "@/lib/blog-posts";

const SITE_URL = "https://www.kobra-automation.com";

export const metadata: Metadata = {
  title: "Blog de Automatización con IA para Empresas | Kobra AI",
  description:
    "Artículos, guías y casos de uso sobre automatización con inteligencia artificial para empresas en España. Aprende a automatizar tu negocio con chatbots, agentes de voz e IA.",
  keywords: [
    "blog automatización IA",
    "automatización empresas España",
    "chatbot empresas guías",
    "IA para negocios artículos",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog de Automatización con IA para Empresas | Kobra AI",
    description:
      "Guías y casos de uso sobre automatización con IA para empresas en España. Kobra AI.",
    url: `${SITE_URL}/blog`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Blog Kobra AI" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
  ],
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog de Automatización con IA | Kobra AI",
  description: "Artículos sobre automatización con inteligencia artificial para empresas en España",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "Kobra AI",
    url: SITE_URL,
  },
};

const categoryColors: Record<string, string> = {
  "Casos de uso": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Guías": "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20",
  "Comparativas": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Sectores": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <Navbar />

      <section className="pt-36 pb-16 px-6 dot-grid">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-xs text-[#555] mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-[#00E676] transition-colors">Inicio</Link>
            <span>›</span>
            <span className="text-[#888]">Blog</span>
          </nav>
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#00E676] mb-4">
            Recursos
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Blog: Automatización con IA{" "}
            <span className="text-gradient-green">para Empresas</span>
          </h1>
          <p className="text-[#888] text-lg leading-relaxed max-w-2xl mx-auto">
            Guías prácticas, casos de uso reales y comparativas para que sepas exactamente cómo la inteligencia artificial puede transformar tu negocio.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#00E676]/20 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? "bg-white/5 text-[#888] border-white/10"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[#444]">{post.readTime} de lectura</span>
                </div>
                <h2 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-[#00E676] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#666] text-sm leading-relaxed flex-1 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xs text-[#444]">
                    {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="text-xs text-[#00E676] font-medium group-hover:underline">
                    Leer artículo →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Quieres automatizar tu empresa?</h2>
          <p className="text-[#888] mb-8 text-sm">Auditoría gratuita. Te decimos exactamente qué automatizar y cuánto te ahorrará.</p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all"
          >
            Pedir auditoría gratuita →
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
