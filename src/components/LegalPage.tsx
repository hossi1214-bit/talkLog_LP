import Link from "next/link";
import type { Locale } from "@/components/Header";

const legalCopy = {
  ja: { draft: "暫定版", lead: "このページはサービス公開前の仮文書です。正式版は公開前に専門家の確認を経て差し替える予定です。", back: "← トップページへ戻る" },
  en: { draft: "Draft", lead: "This document is a provisional version for the beta period and may be updated before the official release.", back: "← Back to home" },
  es: { draft: "Borrador", lead: "Este documento es una versión provisional para el periodo beta y puede actualizarse antes del lanzamiento oficial.", back: "← Volver al inicio" },
} as const;

export function LegalPage({ title, children, locale = "ja" }: { title: string; children: React.ReactNode; locale?: Locale }) {
  const labels = legalCopy[locale];
  const home = locale === "ja" ? "/" : `/${locale}`;
  return <main className="legal-page" lang={locale}><div className="container legal-wrap"><Link href={home} className="logo"><span className="logo-mark">t</span>talk<span>Log</span></Link><div className="draft-label">{labels.draft}</div><h1>{title}</h1><p className="legal-lead">{labels.lead}</p>{children}<Link href={home} className="back-link">{labels.back}</Link></div></main>;
}
