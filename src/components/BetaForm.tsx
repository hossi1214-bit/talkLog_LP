"use client";

import { FormEvent, useState } from "react";

type State = "idle" | "sending" | "success" | "error" | "duplicate";
const languages = ["英語", "スペイン語", "韓国語", "中国語", "その他"];

function trackBetaRegistration() {
  const analyticsWindow = window as typeof window & {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, string>) => void;
  };
  analyticsWindow.gtag?.("event", "sign_up", { method: "beta_registration" });
}

export function BetaForm() {
  const [state, setState] = useState<State>("idle");
  const [languageError, setLanguageError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        form.reportValidity();
        setState("idle");
        return;
      }

      const formData = new FormData(form);
      if (formData.getAll("languages").length === 0) {
        setLanguageError(true);
        setState("idle");
        return;
      }

      setLanguageError(false);
      const response = await fetch("/api/beta-registration", { method: "POST", body: formData });
      const result = (await response.json()) as { code?: string };

      if (response.status === 409 && result.code === "duplicate_email") {
        setState("duplicate");
        return;
      }
      if (!response.ok) throw new Error("Submission failed");

      trackBetaRegistration();
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return <div className="success" role="status"><b>ご登録ありがとうございます。</b><p>β版の準備が整い次第、ご案内します。</p><button className="text-button" onClick={() => setState("idle")}>続けて登録する</button></div>;
  }

  return <form className="beta-form" onSubmit={submit}>
    <div className="beta-platform-notice" role="note"><b>現在のβ版はiOS版のみです</b><span>Android端末には対応していません。</span></div>
    <div className="field"><label htmlFor="name">名前またはニックネーム <em>必須</em></label><input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="ログ太郎" /></div>
    <div className="field"><label htmlFor="email">メールアドレス <em>必須</em></label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="hello@example.com" /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">ウェブサイト</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <fieldset aria-describedby={languageError ? "language-error" : undefined}><legend>学習している言語 <em>必須・複数選択可</em></legend><div className="choice-grid">{languages.map((language) => <label key={language}><input type="checkbox" name="languages" value={language} onChange={() => setLanguageError(false)} /> {language}</label>)}</div>{languageError && <p id="language-error" className="form-error" role="alert">学習している言語を1つ以上選択してください。</p>}</fieldset>
    <input type="hidden" name="device" value="iPhone" />
    <div className="field"><label htmlFor="comment">その他コメント <span>任意</span></label><textarea id="comment" name="comment" rows={3} maxLength={2000} placeholder="学びたいことや期待する機能など" /></div>
    <label className="consent"><input type="checkbox" name="consent" required /> <span><a href="/privacy" target="_blank">個人情報の取り扱い</a>に同意する <em>必須</em></span></label>
    {state === "duplicate" && <p className="form-error" role="alert">このメールアドレスはすでに登録されています。</p>}
    {state === "error" && <p className="form-error" role="alert">送信できませんでした。時間をおいて、もう一度お試しください。</p>}
    <button className="button form-submit" disabled={state === "sending"}>{state === "sending" ? "送信しています…" : "β版に参加する →"}</button>
    <p className="form-note">登録は無料です。準備状況のご案内以外には使用しません。</p>
  </form>;
}
