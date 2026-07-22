import { notFound } from "next/navigation";
import type { PublicLocale } from "@/data/localized-content";

export const publicLocales = ["en", "es"] as const;

export function getPublicLocale(value: string): PublicLocale {
  if (value === "en" || value === "es") return value;
  notFound();
}
