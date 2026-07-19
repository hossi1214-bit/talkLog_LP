import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { BetaRegistrationEmail } from "@/emails/BetaRegistrationEmail";

const allowedLanguages = new Set(["英語", "スペイン語", "韓国語", "中国語", "その他"]);
const allowedDevices = new Set(["iPhone"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Registration = {
  name: string;
  email: string;
  languages: string[];
  device: string;
  comment: string | null;
  privacy_consent: true;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Bots often fill this visually hidden field. Return success without storing it.
    if (readString(formData, "website")) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const registration = validateRegistration(formData);
    if (!registration.ok) {
      return Response.json({ ok: false, code: "validation_error", message: registration.message }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !secretKey) {
      return Response.json({ ok: false, code: "not_configured" }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });

    const { data: inserted, error } = await supabase
      .from("beta_registrations")
      .insert(registration.data)
      .select("id")
      .single<{ id: string }>();

    if (error?.code === "23505") {
      return Response.json({ ok: false, code: "duplicate_email" }, { status: 409 });
    }

    if (error) {
      return Response.json({ ok: false, code: "database_error" }, { status: 500 });
    }

    const [confirmationSent, adminNotificationSent] = inserted
      ? await Promise.all([
          sendRegistrationConfirmation(inserted.id, registration.data.name, registration.data.email),
          sendAdminRegistrationNotification(inserted.id, registration.data),
        ])
      : [false, false];

    return Response.json({ ok: true, confirmationSent, adminNotificationSent }, { status: 201 });
  } catch {
    return Response.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }
}

function validateRegistration(formData: FormData):
  | { ok: true; data: Registration }
  | { ok: false; message: string } {
  const name = readString(formData, "name");
  const email = readString(formData, "email").toLowerCase();
  const device = readString(formData, "device");
  const comment = readString(formData, "comment");
  const consent = formData.get("consent") === "on";
  const languages = formData.getAll("languages").filter((value): value is string => typeof value === "string");

  if (!name || name.length > 100) return { ok: false, message: "名前を確認してください。" };
  if (!emailPattern.test(email) || email.length > 254) return { ok: false, message: "メールアドレスを確認してください。" };
  if (languages.length === 0 || languages.some((language) => !allowedLanguages.has(language))) return { ok: false, message: "学習言語を確認してください。" };
  if (!allowedDevices.has(device)) return { ok: false, message: "使用端末を確認してください。" };
  if (comment.length > 2000) return { ok: false, message: "コメントは2000文字以内で入力してください。" };
  if (!consent) return { ok: false, message: "個人情報の取り扱いへの同意が必要です。" };

  return { ok: true, data: { name, email, languages, device, comment: comment || null, privacy_consent: true } };
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function sendRegistrationConfirmation(registrationId: string, name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return false;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      {
        from,
        to: [email],
        subject: "talkLog β版へのご登録ありがとうございます",
        react: BetaRegistrationEmail({ name }),
      },
      { idempotencyKey: `beta-registration/${registrationId}` },
    );
    if (error) {
      console.error("Resend confirmation failed", {
        name: error.name,
        message: error.message,
      });
    }
    return !error;
  } catch (error) {
    console.error(
      "Resend confirmation threw",
      error instanceof Error ? { name: error.name, message: error.message } : { message: "Unknown error" },
    );
    return false;
  }
}

async function sendAdminRegistrationNotification(registrationId: string, registration: Registration) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const adminEmail = process.env.BETA_ADMIN_EMAIL;
  if (!apiKey || !from || !adminEmail) return false;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      {
        from,
        to: [adminEmail],
        replyTo: registration.email,
        subject: `【talkLog】β版に新規登録がありました（${registration.name}さん）`,
        text: [
          "talkLog β版に新規登録がありました。",
          "",
          `名前: ${registration.name}`,
          `メールアドレス: ${registration.email}`,
          `学習言語: ${registration.languages.join(", ")}`,
          `使用端末: ${registration.device}`,
          `コメント: ${registration.comment ?? "なし"}`,
          `登録ID: ${registrationId}`,
        ].join("\n"),
      },
      { idempotencyKey: `beta-registration-admin/${registrationId}` },
    );
    if (error) {
      console.error("Resend admin notification failed", {
        name: error.name,
        message: error.message,
      });
    }
    return !error;
  } catch (error) {
    console.error(
      "Resend admin notification threw",
      error instanceof Error ? { name: error.name, message: error.message } : { message: "Unknown error" },
    );
    return false;
  }
}
