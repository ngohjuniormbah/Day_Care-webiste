"use client";

import { useState, type FormEvent } from "react";

export function HomeContactForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setDone(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: "Home enquiry",
      message: `Child age: ${fd.get("childAge") || "—"}\n\n${fd.get("message") || ""}`,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        e.currentTarget.reset();
        setDone("ok");
      } else setDone("err");
    } catch {
      setDone("err");
    } finally {
      setBusy(false);
    }
  }

  const field = "w-full rounded-xl border border-brand-soft bg-brand-tint/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15 placeholder:text-ink-muted";

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
      <h3 className="text-2xl font-bold text-ink">Get in Touch</h3>
      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" required placeholder="Your Name" className={field} />
          <input name="childAge" placeholder="Child Age" className={field} />
        </div>
        <input name="email" type="email" required placeholder="Email Address" className={field} />
        <textarea name="message" rows={5} placeholder="Write Message..." className={field} />
      </div>
      <button type="submit" disabled={busy} className="btn mt-5 w-full disabled:opacity-60">
        {busy ? "Sending…" : "Contact Now"}
      </button>
      {done === "ok" && <p className="mt-3 rounded-xl bg-[#e2f6ec] px-4 py-3 text-sm text-[#2f8c63]">Thank you! We&apos;ll be in touch shortly.</p>}
      {done === "err" && <p className="mt-3 rounded-xl bg-[#ffe6e1] px-4 py-3 text-sm text-[#d85a49]">Something went wrong. Please try again.</p>}
    </form>
  );
}
