import { site } from "./site";

// Forwards form submissions to the daycare inbox so they arrive as real emails.
//
// Two delivery paths, tried in order:
// 1. Resend (https://resend.com) — used when a RESEND_API_KEY env var is set.
// 2. FormSubmit (https://formsubmit.co) — zero-config fallback that relays the
//    message to `site.email`. The very first submission triggers a one-time
//    activation email to that inbox; click "Activate" once and every
//    submission after that is delivered normally.
//
// Delivery is best-effort: the submission is already saved before this runs,
// so a mail failure must never fail the visitor's request.
export async function emailSubmission(
  subject: string,
  fields: Record<string, unknown>
): Promise<void> {
  const to = process.env.CONTACT_EMAIL || site.email;
  const entries = Object.entries(fields).filter(
    ([, v]) => v !== null && v !== undefined && v !== ""
  );

  try {
    const key = process.env.RESEND_API_KEY;
    if (key) {
      const text = entries.map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`).join("\n");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || "Granny's Daycare Website <onboarding@resend.dev>",
          to,
          reply_to: typeof fields.email === "string" ? fields.email : undefined,
          subject,
          text,
        }),
      });
      return;
    }

    await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        ...Object.fromEntries(entries),
      }),
    });
  } catch (err) {
    console.error("[mailer] failed to forward submission:", err);
  }
}
