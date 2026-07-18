import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return <footer className="footer"><div className="container footer-inner">
    <div><div className="logo logo-light"><span className="logo-mark">t</span>talk<span>Log</span></div><p>運営：{siteConfig.operator}</p></div>
    <nav aria-label="フッターナビゲーション"><Link href="/privacy">プライバシーポリシー</Link><Link href="/terms">利用規約</Link><Link href="/contact">お問い合わせ</Link><a href={siteConfig.links.x} rel="noreferrer">X</a><a href={siteConfig.links.instagram} rel="noreferrer">Instagram</a></nav>
    <small>© {new Date().getFullYear()} talkLog</small>
  </div></footer>;
}

