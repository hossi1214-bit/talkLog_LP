"use client";
import { faqs } from "@/data/content";

export function Faq() {
  return <div className="faq-list">{faqs.map(([q, a], i) => <details key={q} className="faq-item"><summary><span>Q{i + 1}</span>{q}<i aria-hidden>＋</i></summary><div className="faq-answer"><span>A</span><p>{a}</p></div></details>)}</div>;
}

