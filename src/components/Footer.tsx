import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/components/Header";

const footerCopy = {
  ja: ["プライバシーポリシー", "利用規約", "お問い合わせ"],
  en: ["Privacy Policy", "Terms of Service", "Contact"],
  es: ["Política de privacidad", "Términos de servicio", "Contacto"],
} as const;

export function Footer({ locale = "ja" }: { locale?: Locale }) {
  const prefix = locale === "ja" ? "" : `/${locale}`;
  const labels = footerCopy[locale];
  return <footer className="footer"><div className="container footer-inner">
    <div><div className="logo logo-light"><span className="logo-mark">t</span>talk<span>Log</span></div></div>
    <nav aria-label="Footer"><Link href={`${prefix}/privacy`}>{labels[0]}</Link><Link href={`${prefix}/terms`}>{labels[1]}</Link><Link href={`${prefix}/contact`}>{labels[2]}</Link><a href={siteConfig.links.x} rel="noreferrer">X</a><a href={siteConfig.links.instagram} rel="noreferrer">Instagram</a></nav>
    <small>© {new Date().getFullYear()} talkLog</small>
  </div></footer>;
}
