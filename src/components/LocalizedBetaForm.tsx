"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/components/Header";

type State = "idle" | "sending" | "success" | "error" | "duplicate";

const languageOptions = [
  { value: "英語", en: "English", es: "Inglés" },
  { value: "スペイン語", en: "Spanish", es: "Español" },
  { value: "韓国語", en: "Korean", es: "Coreano" },
  { value: "中国語", en: "Chinese", es: "Chino" },
  { value: "その他", en: "Other", es: "Otro" },
] as const;

const copy = {
  en: {
    success: "Thank you for registering!", successText: "We’ll contact you as soon as the beta is ready.", again: "Register another person",
    platformTitle: "The current beta is for iOS only", platformText: "Android is not supported yet.", name: "Name or nickname", email: "Email address",
    required: "Required", languages: "Languages you’re learning", multiple: "Select all that apply", languageError: "Select at least one language.",
    comment: "Comments", optional: "Optional", commentPlaceholder: "What you want to learn, features you expect, etc.", consentBefore: "I agree to the ", consentLink: "handling of personal information",
    duplicate: "This email address is already registered.", error: "We couldn’t submit your registration. Please try again later.", sending: "Submitting…", submit: "Join the beta →", note: "Registration is free. We will only use your information for beta-related communication.",
  },
  es: {
    success: "¡Gracias por registrarte!", successText: "Te avisaremos en cuanto la versión beta esté lista.", again: "Registrar a otra persona",
    platformTitle: "La beta actual es solo para iOS", platformText: "Android todavía no es compatible.", name: "Nombre o apodo", email: "Correo electrónico",
    required: "Obligatorio", languages: "Idiomas que estudias", multiple: "Puedes elegir varios", languageError: "Selecciona al menos un idioma.",
    comment: "Comentarios", optional: "Opcional", commentPlaceholder: "Qué quieres aprender, funciones que esperas, etc.", consentBefore: "Acepto el ", consentLink: "tratamiento de datos personales",
    duplicate: "Este correo electrónico ya está registrado.", error: "No pudimos enviar el registro. Inténtalo de nuevo más tarde.", sending: "Enviando…", submit: "Únete a la beta →", note: "El registro es gratuito. Solo usaremos tus datos para comunicaciones relacionadas con la beta.",
  },
} as const;

export function LocalizedBetaForm({ locale }: { locale: Exclude<Locale, "ja"> }) {
  const labels = copy[locale];
  const [state, setState] = useState<State>("idle");
  const [languageError, setLanguageError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const form = event.currentTarget;
      if (!form.checkValidity()) { form.reportValidity(); setState("idle"); return; }
      const formData = new FormData(form);
      if (formData.getAll("languages").length === 0) { setLanguageError(true); setState("idle"); return; }
      setLanguageError(false);
      const response = await fetch("/api/beta-registration", { method: "POST", body: formData });
      const result = (await response.json()) as { code?: string };
      if (response.status === 409 && result.code === "duplicate_email") { setState("duplicate"); return; }
      if (!response.ok) throw new Error("Submission failed");
      const analyticsWindow = window as typeof window & { gtag?: (command: "event", eventName: string, parameters?: Record<string, string>) => void };
      analyticsWindow.gtag?.("event", "sign_up", { method: "beta_registration", language: locale });
      setState("success");
      form.reset();
    } catch { setState("error"); }
  }

  if (state === "success") return <div className="success" role="status"><b>{labels.success}</b><p>{labels.successText}</p><button className="text-button" onClick={() => setState("idle")}>{labels.again}</button></div>;

  return <form className="beta-form" onSubmit={submit}>
    <div className="beta-platform-notice" role="note"><b>{labels.platformTitle}</b><span>{labels.platformText}</span></div>
    <div className="field"><label htmlFor={`name-${locale}`}>{labels.name} <em>{labels.required}</em></label><input id={`name-${locale}`} name="name" required maxLength={100} autoComplete="name" placeholder={locale === "en" ? "Log Taro" : "Log Taro"} /></div>
    <div className="field"><label htmlFor={`email-${locale}`}>{labels.email} <em>{labels.required}</em></label><input id={`email-${locale}`} name="email" type="email" required maxLength={254} autoComplete="email" placeholder="hello@example.com" /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor={`website-${locale}`}>Website</label><input id={`website-${locale}`} name="website" tabIndex={-1} autoComplete="off" /></div>
    <fieldset aria-describedby={languageError ? `language-error-${locale}` : undefined}><legend>{labels.languages} <em>{labels.multiple}</em></legend><div className="choice-grid">{languageOptions.map(option => <label key={option.value}><input type="checkbox" name="languages" value={option.value} onChange={() => setLanguageError(false)} /> {option[locale]}</label>)}</div>{languageError && <p id={`language-error-${locale}`} className="form-error" role="alert">{labels.languageError}</p>}</fieldset>
    <input type="hidden" name="device" value="iPhone" />
    <div className="field"><label htmlFor={`comment-${locale}`}>{labels.comment} <span>{labels.optional}</span></label><textarea id={`comment-${locale}`} name="comment" rows={3} maxLength={2000} placeholder={labels.commentPlaceholder} /></div>
    <label className="consent"><input type="checkbox" name="consent" required /> <span>{labels.consentBefore}<a href={`/${locale}/privacy`} target="_blank">{labels.consentLink}</a> <em>{labels.required}</em></span></label>
    {state === "duplicate" && <p className="form-error" role="alert">{labels.duplicate}</p>}
    {state === "error" && <p className="form-error" role="alert">{labels.error}</p>}
    <button className="button form-submit" disabled={state === "sending"}>{state === "sending" ? labels.sending : labels.submit}</button>
    <p className="form-note">{labels.note}</p>
  </form>;
}
