import Link from "next/link";
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="legal-page"><div className="container legal-wrap"><Link href="/" className="logo"><span className="logo-mark">t</span>talk<span>Log</span></Link><div className="draft-label">暫定版</div><h1>{title}</h1><p className="legal-lead">このページはサービス公開前の仮文書です。正式版は公開前に専門家の確認を経て差し替える予定です。</p>{children}<Link href="/" className="back-link">← トップページへ戻る</Link></div></main>;
}

