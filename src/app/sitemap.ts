import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacy", "/terms", "/contact"];
  return ["", "/en", "/es"].flatMap(prefix => pages.map((path, i) => ({
    url: `${siteConfig.url}${prefix}${path}`,
    changeFrequency: (i ? "yearly" : "monthly") as "yearly" | "monthly",
    priority: i ? 0.4 : 1,
    alternates: { languages: { ja: `${siteConfig.url}${path}`, en: `${siteConfig.url}/en${path}`, es: `${siteConfig.url}/es${path}` } },
  })));
}
