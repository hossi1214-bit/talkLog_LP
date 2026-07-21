import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BetaForm } from "@/components/BetaForm";
import { Faq } from "@/components/Faq";
import { extraFeatures, features, painPoints, roadmap, scenes, steps, faqs } from "@/data/content";

const comparisons = [
  ["話す練習", "◎", "◎", "—", "△", "—"], ["AI添削", "◎", "○", "—", "△", "—"],
  ["音声保存", "◎", "△", "—", "—", "—"], ["日記記録", "◎", "—", "◎", "—", "—"],
  ["複数言語", "○", "△", "○", "◎", "○"], ["毎日続けやすい", "◎", "△", "○", "○", "○"],
  ["自分の発言を振り返る", "◎", "△", "—", "—", "—"],
];

export default function Home() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const appSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "talkLog", applicationCategory: "EducationalApplication", operatingSystem: "iOS, Android", description: "毎日の独り言を外国語学習に変える、音声日記とAI添削のアプリ（β版準備中）", offers: { "@type": "Offer", price: "0", priceCurrency: "JPY", availability: "https://schema.org/PreOrder" } };
  return <>
    <Header />
    <main>
      <section className="hero"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="container hero-grid">
        <div className="hero-copy"><div className="eyebrow"><span>β</span> β版テスター募集中</div><h1>独り言が、<br /><strong>外国語学習</strong>になる。</h1><p className="hero-lead">30秒話すだけ。<br />AIがあなたの外国語を自然な表現に添削します。</p><p className="hero-note">英語・スペイン語・韓国語・中国語など、複数言語に対応予定</p><div className="hero-actions"><a className="button" href="#beta">β版に参加する <span>→</span></a><a className="button button-secondary" href="#beta">リリース通知を受け取る</a></div><p className="tiny">登録無料 ・ いつでも解除できます</p></div>
        <div className="hero-visual"><div className="speech-bubble">今日も30秒だけ<br />話してみよう！</div><Image className="official-log-kun" src="/images/log-kun-speaking.png" width={300} height={200} alt="マイクに向かって楽しそうに話すログくん" priority /><div className="phone"><div className="phone-top" /><div className="phone-content"><div className="app-head"><b>Today&apos;s log</b><span>EN</span></div><p className="date">MAY 24, 2026</p><div className="wave" aria-label="録音中の音声波形">{[1,2,3,4,5,6,7,8,9,10,11,12].map(x => <i key={x} />)}</div><div className="record-dot">■</div><p className="recording">Recording · 00:24</p><div className="correction"><small>YOU SAID</small><p>I <del>go</del> to the park yesterday.</p><small>MORE NATURAL ✨</small><p>I <mark>went</mark> to the park yesterday.</p></div></div></div></div>
      </div><div className="trust-strip"><span>🎙️ 音声日記</span><span>✨ AI添削</span><span>🌍 多言語対応予定</span><span>🔒 安心のデータ管理</span></div></section>

      <section className="section problems"><div className="container"><SectionHead tag="YOUR CHALLENGES" title="こんな悩みはありませんか？" subtitle="語学学習を続ける中で、誰もが感じる小さな壁。" /><div className="problem-grid">{painPoints.map((x, i) => <article className="problem-card" key={x}><span>{["💭","❓","📝","⏰","📊","📅"][i]}</span><p>{x}</p></article>)}</div><div className="solution"><Image className="scene-mascot" src="/images/log-kun-study.png" width={120} height={120} alt="机で外国語日記を書くログくん" /><div><small>その悩み、talkLogがお手伝いします。</small><p>毎日の独り言が、<strong>そのまま外国語の練習</strong>になります。</p></div></div></div></section>

      <section className="section how" id="how"><div className="container"><SectionHead tag="HOW IT WORKS" title="話す、気づく、身につく。" subtitle="たった4つのステップで、毎日の独り言が学びに変わります。" /><div className="steps">{steps.map(([title, text], i) => <article className="step" key={title}><div className="step-num">0{i+1}</div><div className="step-icon">{["🎙️","✨","↔️","📔"][i]}</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section" id="features"><div className="container"><SectionHead tag="FEATURES" title="続けたくなる、学びの仕組み。" subtitle="話すことから振り返りまで、ひとつのアプリで。" /><div className="feature-grid">{features.map(([icon,title,text]) => <article className="feature-card" key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="extra"><b>その他の機能</b>{extraFeatures.map(x => <span key={x}>✓ {x}</span>)}</div></div></section>

      <section className="section comparison"><div className="container"><SectionHead tag="WHY TALKLOG" title="自分の言葉だから、身につく。" subtitle="それぞれの学習方法の良さを活かしながら、毎日のアウトプットをもっと手軽に。" /><div className="table-wrap"><table><thead><tr><th>比較項目</th>{["talkLog","オンライン英会話","日記アプリ","翻訳アプリ","単語アプリ"].map(x => <th key={x} className={x === "talkLog" ? "highlight" : ""}>{x}</th>)}</tr></thead><tbody>{comparisons.map(row => <tr key={row[0]}>{row.map((x,i) => <td key={i} className={i === 1 ? "highlight" : ""}>{x}</td>)}</tr>)}</tbody></table></div><p className="table-note">◎ とても適している　○ 適している　△ 一部対応　— 主目的ではない</p></div></section>

      <section className="section scenes"><div className="container"><SectionHead tag="USE CASES" title="いつものすき間時間が、学びの時間に。" /><div className="scene-grid">{scenes.map(([title,text,icon]) => <article key={title}><span>{icon}</span><div><small>{title}</small><h3>{text}</h3></div></article>)}</div></div></section>

      <section className="section languages"><div className="container language-grid"><div><div className="section-tag">LANGUAGES</div><h2>学びたい言語を、<br /><strong>ひとつのアプリで。</strong></h2><p>talkLogは、英語だけに限定しません。スペイン語、韓国語、中国語など、さまざまな言語学習に対応予定です。</p><p>言語ごとに、日記・録音・単語帳を分けて管理できます。</p><small>※対応言語は開発状況により変更される可能性があります。</small></div><div className="language-cards">{[["🇬🇧","English","英語"],["🇪🇸","Español","スペイン語"],["🇰🇷","한국어","韓国語"],["🇨🇳","中文","中国語"],["＋","More","順次追加予定"]].map(x => <div key={x[1]}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div>)}</div></div></section>

      <section className="section mascot"><div className="container mascot-card"><Image className="mascot-feature-image" src="/images/log-kun-ai.png" width={320} height={320} alt="AIの添削結果を確認して喜ぶログくん" /><div><div className="section-tag">MEET LOG-KUN</div><h2>毎日の学習を、<br />ログくんがそっと応援。</h2><p>ログくんは、talkLogのマスコットキャラクターです。</p><blockquote>「長時間勉強しよう」ではなく、<br /><strong>「今日も30秒だけ話してみよう」</strong></blockquote><p>毎日の小さな一歩を、あなたのそばで応援します。</p></div></div></section>

      <section className="section roadmap" id="roadmap"><div className="container"><SectionHead tag="ROADMAP" title="現在、β版を準備しています。" subtitle="一歩ずつ、丁寧に。安心して使えるアプリを目指して開発中です。" /><div className="timeline">{roadmap.map((item, i) => <article key={item.label} className={`road-item status-${item.status}`}><span>{i+1}</span><div><small>{item.status}</small><h3>{item.label}</h3></div></article>)}</div></div></section>

      <section className="section beta" id="beta"><div className="container beta-grid"><div className="beta-copy"><div className="section-tag light">BETA TESTERS</div><h2>talkLogを、<br />一緒に育ててください。</h2><p>実際に使って、率直な感想を届けてくださるβテスターを募集しています。</p><p className="beta-platform-badge"><b>iOS版限定</b> 現在、Androidには対応していません</p><ul><li>iPhoneをお持ちの方</li><li>語学レベルは問いません</li><li>学習言語は問いません</li><li>外国語を話す練習をしたい方ならどなたでも</li></ul><div className="beta-mascot"><Image src="/images/log-kun-speaking.png" width={130} height={90} alt="話す練習を応援するログくん" /><span>あなたの声が、<br />より良いアプリにつながります。</span></div></div><BetaForm /></div></section>

      <section className="section faq" id="faq"><div className="container faq-grid"><div><div className="section-tag">FAQ</div><h2>よくある質問</h2><p>気になることにお答えします。</p><Image className="faq-mascot" src="/images/log-kun-ai.png" width={180} height={180} alt="タブレットで答えを確認するログくん" /></div><Faq /></div></section>

      <section className="final-cta"><div className="container"><Image className="cta-mascot" src="/images/log-kun-cheer.png" width={220} height={220} alt="旗を持って手を振り応援するログくん" /><div><small>START YOUR JOURNEY</small><h2>今日の独り言を、<br /><strong>明日の語学力に。</strong></h2><p>毎日30秒から始める、新しい外国語学習。</p><div className="hero-actions"><a className="button" href="#beta">β版に参加する →</a><a className="button button-white" href="#beta">リリース通知を受け取る</a></div></div></div></section>
    </main><Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema).replace(/</g, "\\u003c") }} />
  </>;
}

function SectionHead({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return <div className="section-head"><div className="section-tag">{tag}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}
