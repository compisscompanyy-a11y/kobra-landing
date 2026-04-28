import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileCTABar from "@/components/ui/MobileCTABar";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog-posts";

const SITE_URL = "https://www.kobra-automation.com";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Kobra AI`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Kobra AI"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Kobra AI",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Kobra AI",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    inLanguage: "es",
  };

  const relatedPosts = getAllBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="relative min-h-screen bg-[#030303] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Navbar />

      <article className="pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-[#555] mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-[#00E676] transition-colors">Inicio</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#00E676] transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-[#888]">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20">
              {post.category}
            </span>
            <span className="text-xs text-[#444]">
              {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="text-xs text-[#444]">· {post.readTime} de lectura</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-[#888] text-lg leading-relaxed mb-10 border-b border-white/5 pb-10">
            {post.description}
          </p>

          {/* Content */}
          <div
            className="prose-kobra"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-14 p-8 rounded-2xl border border-[#00E676]/20 bg-[#00E676]/5 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              ¿Quieres automatizar tu empresa?
            </h2>
            <p className="text-[#888] text-sm mb-6">
              Auditoría gratuita. Te decimos exactamente qué automatizar y cuánto te ahorrará.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-all"
            >
              Pedir auditoría gratuita →
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-8">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-5 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#00E676]/20 transition-all"
                >
                  <p className="text-xs text-[#555] mb-2">{related.category} · {related.readTime}</p>
                  <h3 className="text-white text-sm font-medium leading-snug group-hover:text-[#00E676] transition-colors">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FloatingWhatsApp />
      <MobileCTABar />
    </main>
  );
}
