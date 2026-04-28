import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog-posts";

const SITE_URL = "https://www.kobra-automation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/automatizaciones-madrid`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chatbot-empresas-madrid`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/agente-voz-ia`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/automatizacion-whatsapp-empresas`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demo`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
