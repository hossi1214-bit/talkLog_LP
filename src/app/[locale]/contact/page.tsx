import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getPublicLocale, publicLocales } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return publicLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const locale = getPublicLocale((await params).locale); return { title: locale === "en" ? "Contact | talkLog" : "Contacto | talkLog", alternates: { canonical: `/${locale}/contact`, languages: { ja: "/contact", en: "/en/contact", es: "/es/contact" } } }; }

export default async function Contact({ params }: Props) {
  const locale = getPublicLocale((await params).locale);
  if (locale === "en") return <LegalPage locale="en" title="Contact"><h2>Contact us</h2><p>For questions or feedback about talkLog, email <a href="mailto:support@talklog.app">support@talklog.app</a>.</p><p>To join the beta, please use the registration form on the home page.</p></LegalPage>;
  return <LegalPage locale="es" title="Contacto"><h2>Contáctanos</h2><p>Para preguntas o comentarios sobre talkLog, escribe a <a href="mailto:support@talklog.app">support@talklog.app</a>.</p><p>Para participar en la beta, utiliza el formulario de registro de la página principal.</p></LegalPage>;
}
