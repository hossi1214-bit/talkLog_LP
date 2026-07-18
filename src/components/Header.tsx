"use client";

import Link from "next/link";
import { useState } from "react";

const links = [["特徴", "#features"], ["使い方", "#how"], ["開発状況", "#roadmap"], ["よくある質問", "#faq"]];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="logo" aria-label="talkLog トップ"><span className="logo-mark">t</span>talk<span>Log</span></Link>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav"><span /><span /><span /><span className="sr-only">メニュー</span></button>
    <nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="メインナビゲーション">
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="button button-small" href="#beta" onClick={() => setOpen(false)}>β版に参加する</a>
    </nav>
  </div></header>;
}

