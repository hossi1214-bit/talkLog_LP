import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalizedBetaForm } from "@/components/LocalizedBetaForm";
import { Faq } from "@/components/Faq";
import { localizedContent, type PublicLocale } from "@/data/localized-content";

export function LocalizedHome({ locale }: { locale: PublicLocale }) {
  const t = localizedContent[locale];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const appSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "talkLog", applicationCategory: "EducationalApplication", operatingSystem: "iOS", description: t.meta.description, offers: { "@type": "Offer", price: "0", priceCurrency: "JPY", availability: "https://schema.org/PreOrder" } };
  return <div lang={locale}>
    <Header locale={locale} />
    <main>
      <section className="hero"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="container hero-grid">
        <div className="hero-copy"><div className="eyebrow"><span>β</span> {t.hero.badge}</div><h1>{t.hero.title}<br /><strong>{t.hero.strong}</strong></h1><p className="hero-lead">{withBreaks(t.hero.lead)}</p><p className="hero-note">{t.hero.note}</p><div className="hero-actions"><a className="button" href="#beta">{t.hero.primary}</a><a className="button button-secondary" href="#beta">{t.hero.secondary}</a></div><p className="tiny">{t.hero.tiny}</p></div>
        <div className="hero-visual"><div className="speech-bubble">{withBreaks(t.hero.bubble)}</div><Image className="official-log-kun" src="/images/log-kun-speaking.png" width={300} height={200} alt="Log-kun speaking into a microphone" priority /><div className="phone"><div className="phone-top" /><div className="phone-content"><div className="app-head"><b>Today&apos;s log</b><span>EN</span></div><p className="date">MAY 24, 2026</p><div className="wave" aria-label="Audio waveform">{[1,2,3,4,5,6,7,8,9,10,11,12].map(x => <i key={x} />)}</div><div className="record-dot">●</div><p className="recording">Recording · 00:24</p><div className="correction"><small>YOU SAID</small><p>I <del>go</del> to the park yesterday.</p><small>MORE NATURAL ✨</small><p>I <mark>went</mark> to the park yesterday.</p></div></div></div></div>
      </div><div className="trust-strip">{t.trust.map(item => <span key={item}>{item}</span>)}</div></section>

      <section className="section problems"><div className="container"><SectionHead tag="YOUR CHALLENGES" title={t.challenges.title} subtitle={t.challenges.subtitle} /><div className="problem-grid">{t.challenges.items.map((item, i) => <article className="problem-card" key={item}><span>{["🤔","💬","📝","⏰","📊","🏃"][i]}</span><p>{item}</p></article>)}</div><div className="solution"><Image className="scene-mascot" src="/images/log-kun-study.png" width={120} height={120} alt="Log-kun studying" /><div><small>{t.challenges.solution}</small><p>{t.challenges.solutionText}</p></div></div></div></section>

      <section className="section how" id="how"><div className="container"><SectionHead tag="HOW IT WORKS" title={t.how.title} subtitle={t.how.subtitle} /><div className="steps">{t.how.steps.map(([title, text], i) => <article className="step" key={title}><div className="step-num">0{i+1}</div><div className="step-icon">{["🎙️","✨","↔️","💾"][i]}</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section" id="features"><div className="container"><SectionHead tag="FEATURES" title={t.features.title} subtitle={t.features.subtitle} /><div className="feature-grid">{t.features.items.map(([icon,title,text]) => <article className="feature-card" key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="extra"><b>{t.features.extraTitle}</b>{t.features.extras.map(item => <span key={item}>✓ {item}</span>)}</div></div></section>

      <section className="section comparison"><div className="container"><SectionHead tag="WHY TALKLOG" title={t.comparison.title} subtitle={t.comparison.subtitle} /><div className="table-wrap"><table><thead><tr>{t.comparison.headers.map((header, i) => <th key={header} className={i === 1 ? "highlight" : ""}>{header}</th>)}</tr></thead><tbody>{t.comparison.rows.map(row => <tr key={row[0]}>{row.map((cell,i) => <td key={i} className={i === 1 ? "highlight" : ""}>{cell}</td>)}</tr>)}</tbody></table></div><p className="table-note">{t.comparison.note}</p></div></section>

      <section className="section scenes"><div className="container"><SectionHead tag="USE CASES" title={t.scenes.title} /><div className="scene-grid">{t.scenes.items.map(([title,text,icon]) => <article key={title}><span>{icon}</span><div><small>{title}</small><h3>{text}</h3></div></article>)}</div></div></section>

      <section className="section languages"><div className="container language-grid"><div><div className="section-tag">LANGUAGES</div><h2>{t.languages.title}<br /><strong>{t.languages.strong}</strong></h2><p>{t.languages.p1}</p><p>{t.languages.p2}</p><small>{t.languages.note}</small></div><div className="language-cards">{t.languages.cards.map(([icon,name,label]) => <div key={name}><span>{icon}</span><b>{name}</b><small>{label}</small></div>)}</div></div></section>

      <section className="section mascot"><div className="container mascot-card"><Image className="mascot-feature-image" src="/images/log-kun-ai.png" width={320} height={320} alt="Log-kun celebrating AI feedback" /><div><div className="section-tag">MEET LOG-KUN</div><h2>{t.mascot.title}<br /><strong>{t.mascot.strong}</strong></h2><p>{t.mascot.p1}</p><blockquote>{withBreaks(t.mascot.quote)}</blockquote><p>{t.mascot.p2}</p></div></div></section>

      <section className="section roadmap" id="roadmap"><div className="container"><SectionHead tag="ROADMAP" title={t.roadmap.title} subtitle={t.roadmap.subtitle} /><div className="timeline">{t.roadmap.items.map(([label,status], i) => <article key={label} className="road-item"><span>{i+1}</span><div><small>{status}</small><h3>{label}</h3></div></article>)}</div></div></section>

      <section className="section beta" id="beta"><div className="container beta-grid"><div className="beta-copy"><div className="section-tag light">BETA TESTERS</div><h2>{t.beta.title}<br /><strong>{t.beta.strong}</strong></h2><p>{t.beta.intro}</p><p className="beta-platform-badge"><b>{t.beta.platform}</b> {t.beta.platformText}</p><ul>{t.beta.bullets.map(item => <li key={item}>{item}</li>)}</ul><div className="beta-mascot"><Image src="/images/log-kun-speaking.png" width={130} height={90} alt="Log-kun encouraging speaking practice" /><span>{t.beta.mascot}</span></div></div><LocalizedBetaForm locale={locale} /></div></section>

      <section className="section faq" id="faq"><div className="container faq-grid"><div><div className="section-tag">FAQ</div><h2>{t.faqHead.title}</h2><p>{t.faqHead.text}</p><Image className="faq-mascot" src="/images/log-kun-ai.png" width={180} height={180} alt="Log-kun answering questions" /></div><Faq items={t.faqs} /></div></section>

      <section className="final-cta"><div className="container"><Image className="cta-mascot" src="/images/log-kun-cheer.png" width={220} height={220} alt="Log-kun cheering" /><div><small>START YOUR JOURNEY</small><h2>{t.final.title}<br /><strong>{t.final.strong}</strong></h2><p>{t.final.text}</p><div className="hero-actions"><a className="button" href="#beta">{t.final.primary}</a><a className="button button-white" href="#beta">{t.final.secondary}</a></div></div></div></section>
    </main>
    <Footer locale={locale} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema).replace(/</g, "\\u003c") }} />
  </div>;
}

function SectionHead({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return <div className="section-head"><div className="section-tag">{tag}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}

function withBreaks(text: string) {
  return text.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>);
}
