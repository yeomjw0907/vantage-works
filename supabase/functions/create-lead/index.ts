// Supabase Edge Function (Deno)
// Contact 폼 제출 -> leads 저장 + 관리자 알림(이메일/문자) 발송

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type CreateLeadInput = {
  inquiry_type: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  details: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders,
    },
  });
}

async function sendEmail({
  apiKey,
  fromEmail,
  toEmail,
  subject,
  text,
}: {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  text: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend failed: ${res.status} ${errText}`);
  }
}

async function sendSms({
  accountSid,
  authToken,
  fromPhoneNumber,
  toPhoneNumber,
  body,
}: {
  accountSid: string;
  authToken: string;
  fromPhoneNumber: string;
  toPhoneNumber: string;
  body: string;
}) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const form = new URLSearchParams({
    From: fromPhoneNumber,
    To: toPhoneNumber,
    Body: body,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Twilio failed: ${res.status} ${errText}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Missing Supabase env vars" }, 500);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL");

  const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const twilioFromPhoneNumber = Deno.env.get("TWILIO_FROM_PHONE_NUMBER");

  const payload = (await req.json().catch(() => null)) as Partial<CreateLeadInput> | null;
  if (!payload) {
    return jsonResponse({ error: "Invalid JSON payload" }, 400);
  }

  const input = payload as CreateLeadInput;
  const requiredFields: (keyof CreateLeadInput)[] = [
    "inquiry_type",
    "company",
    "contact_name",
    "email",
    "phone",
    "details",
  ];

  for (const f of requiredFields) {
    if (!input[f] || typeof input[f] !== "string") {
      return jsonResponse({ error: `Missing field: ${String(f)}` }, 400);
    }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: siteSettings, error: settingsError } = await supabase
    .from("site_settings")
    .select("admin_email, admin_phone")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (settingsError) {
    // 알림이 꼭 필요한 건 아니지만, 에러는 로깅하고 진행합니다.
    console.error("site_settings fetch error:", settingsError);
  }

  const adminEmail = siteSettings?.admin_email ?? "";
  const adminPhone = siteSettings?.admin_phone ?? "";

  const createdAt = new Date().toISOString();
  const summary = `새 문의 접수: ${input.inquiry_type} / ${input.company} / ${input.contact_name} (접수일시: ${createdAt})`;

  // 1) leads 저장
  const { error: leadsError } = await supabase.from("leads").insert({
    inquiry_type: input.inquiry_type,
    company: input.company,
    contact_name: input.contact_name,
    email: input.email,
    phone: input.phone,
    details: input.details,
  });

  if (leadsError) {
    console.error("leads insert error:", leadsError);
    return jsonResponse({ error: "Failed to store lead" }, 500);
  }

  // 2) 이메일/문자 알림 (설정값이 없으면 생략)
  try {
    if (adminEmail && resendApiKey && resendFromEmail) {
      const subject = `새 문의 접수: ${input.inquiry_type}`;
      await sendEmail({
        apiKey: resendApiKey,
        fromEmail: resendFromEmail,
        toEmail: adminEmail,
        subject,
        text: summary,
      });
    }
  } catch (e) {
    console.error("Email notify error:", e);
  }

  try {
    if (adminPhone && twilioAccountSid && twilioAuthToken && twilioFromPhoneNumber) {
      const smsBody = `${summary}`;
      await sendSms({
        accountSid: twilioAccountSid,
        authToken: twilioAuthToken,
        fromPhoneNumber: twilioFromPhoneNumber,
        toPhoneNumber: adminPhone,
        body: smsBody,
      });
    }
  } catch (e) {
    console.error("SMS notify error:", e);
  }

  return jsonResponse({ ok: true });
});

