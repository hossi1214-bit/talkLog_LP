"use client";

import Link from "next/link";
import { useState } from "react";

export type Locale = "ja" | "en" | "es";

const copy = {
  ja: { links: [["特徴", "#features"], ["使い方", "#how"], ["開発状況", "#roadmap"], ["よくある質問", "#faq"]], cta: "β版に参加する", menu: "メニュー" },
  en: { links: [["Features", "#features"], ["How it works", "#how"], ["Roadmap", "#roadmap"], ["FAQ", "#faq"]], cta: "Join the beta", menu: "Menu" },
  es: { links: [["Funciones", "#features"], ["Cómo funciona", "#how"], ["Hoja de ruta", "#roadmap"], ["Preguntas", "#faq"]], cta: "Únete a la beta", menu: "Menú" },
} as const;

export function Header({ locale = "ja" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const labels = copy[locale];
  const home = locale === "ja" ? "/" : `/${locale}`;
  return <header className="site-header"><div className="container header-inner">
    <Link href={home} className="logo" aria-label="talkLog"><span className="logo-mark">t</span>talk<span>Log</span></Link>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav"><span /><span /><span /><span className="sr-only">{labels.menu}</span></button>
    <nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="メインナビゲーション">
      {labels.links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <div className="language-switcher" aria-label="Language"><Link href="/" hrefLang="ja" aria-current={locale === "ja" ? "page" : undefined}>JA</Link><Link href="/en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link><Link href="/es" hrefLang="es" aria-current={locale === "es" ? "page" : undefined}>ES</Link></div>
      <a className="button button-small" href="#beta" onClick={() => setOpen(false)}>{labels.cta}</a>
    </nav>
  </div></header>;
}
