import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import "./globals.css";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto", display: "swap" });
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const title = "talkLog｜独り言が外国語学習になるAI添削アプリ";
const description = "外国語で30秒話すだけ。talkLogは、音声日記とAI添削で毎日の独り言を語学学習に変えるアプリです。英語・スペイン語・韓国語・中国語などに対応予定。現在β版準備中。";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url), title, description,
  keywords: ["外国語学習","英語学習","スペイン語学習","韓国語学習","中国語学習","独り言英語","AI添削","音声日記","外国語日記","語学アプリ","発音練習"],
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", locale: "ja_JP", siteName: "talkLog", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "talkLog｜独り言が外国語学習になるAI添削アプリ" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  icons: { icon: "/images/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja" className={noto.variable}><body>{children}</body>{gaId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${gaId}');`}</Script></>}</html>;
}
