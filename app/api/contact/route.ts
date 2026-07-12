import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/store";
import { emailSubmission } from "@/lib/mailer";

export const runtime = "nodejs";

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let b: Record<string, unknown> = {};
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const missing = ["name", "email", "message"].filter((f) => !clean(b[f]));
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }
  if (!isEmail(clean(b.email))) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const data = {
    name: clean(b.name),
    email: clean(b.email),
    subject: clean(b.subject) || null,
    message: clean(b.message),
  };
  const id = await saveSubmission("contact", data);
  await emailSubmission(`New contact message from ${data.name}`, data);

  return NextResponse.json(
    {
      ok: true,
      id,
      message: "Thanks for reaching out! A member of our team will reply soon.",
    },
    { status: 201 }
  );
}
