import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getPublicLocale, publicLocales } from "@/i18n/locale";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return publicLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const locale = getPublicLocale((await params).locale); return { title: locale === "en" ? "Terms of Service | talkLog" : "Términos de servicio | talkLog", alternates: { canonical: `/${locale}/terms`, languages: { ja: "/terms", en: "/en/terms", es: "/es/terms" } } }; }

export default async function Terms({ params }: Props) {
  const locale = getPublicLocale((await params).locale);
  if (locale === "en") return <LegalPage locale="en" title="Terms of Service"><h2>1. About the service</h2><p>talkLog is a service in development that supports language learning. Features may change without notice.</p><h2>2. AI suggestions</h2><p>AI feedback is provided as a learning aid and does not guarantee accuracy or completeness.</p><h2>3. Prohibited conduct</h2><p>Users must not violate laws, disrupt the service, or infringe the rights of others.</p><h2>4. Changes to these terms</h2><p>We may update these terms and will provide notice by an appropriate method.</p></LegalPage>;
  return <LegalPage locale="es" title="Términos de servicio"><h2>1. Sobre el servicio</h2><p>talkLog es un servicio en desarrollo que apoya el aprendizaje de idiomas. Las funciones pueden cambiar sin previo aviso.</p><h2>2. Sugerencias de IA</h2><p>Las correcciones de IA son una ayuda para el aprendizaje y no garantizan exactitud ni integridad.</p><h2>3. Conductas prohibidas</h2><p>No se permite infringir la ley, obstaculizar el servicio ni vulnerar derechos de terceros.</p><h2>4. Cambios en estos términos</h2><p>Podemos actualizar estos términos y lo comunicaremos por un medio adecuado.</p></LegalPage>;
}
