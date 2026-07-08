import { NextResponse } from "next/server";
import db from "@/lib/db";

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

  const required = ["parent_name", "email", "phone", "child_name", "child_age", "program"];
  const missing = required.filter((f) => !clean(b[f]));
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

  const info = db
    .prepare(
      `INSERT INTO enrollments (parent_name, email, phone, child_name, child_age, program, start_date, message)
       VALUES (@parent_name, @email, @phone, @child_name, @child_age, @program, @start_date, @message)`
    )
    .run({
      parent_name: clean(b.parent_name),
      email: clean(b.email),
      phone: clean(b.phone),
      child_name: clean(b.child_name),
      child_age: clean(b.child_age),
      program: clean(b.program),
      start_date: clean(b.start_date) || null,
      message: clean(b.message) || null,
    });

  return NextResponse.json(
    {
      ok: true,
      id: info.lastInsertRowid,
      message: `Thank you, ${clean(b.parent_name)}! We received your enrollment request for ${clean(
        b.child_name
      )} and will be in touch within one business day.`,
    },
    { status: 201 }
  );
}
