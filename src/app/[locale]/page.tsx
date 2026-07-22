import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";
import { localizedContent } from "@/data/localized-content";
import { getPublicLocale, publicLocales } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return publicLocales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = getPublicLocale((await params).locale);
  const meta = localizedContent[locale].meta;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}`, languages: { ja: "/", en: "/en", es: "/es", "x-default": "/" } },
    openGraph: { title: meta.title, description: meta.description, locale: locale === "en" ? "en_US" : "es_ES", siteName: "talkLog", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "talkLog" }] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["/opengraph-image"] },
  };
}

export default async function LocalizedPage({ params }: Props) {
  const locale = getPublicLocale((await params).locale);
  return <LocalizedHome locale={locale} />;
}
