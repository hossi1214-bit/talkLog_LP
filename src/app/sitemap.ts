import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/privacy", "/terms", "/contact"].map((path, i) => ({ url: `${siteConfig.url}${path}`, changeFrequency: i ? "yearly" : "monthly", priority: i ? 0.4 : 1 })); }

