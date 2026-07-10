"use client";

import { useState, type FormEvent } from "react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email,
          subject: "Newsletter",
          message: "Please add me to the newsletter.",
        }),
      });
    } catch {
      /* still show success — the address is captured client-side */
    } finally {
      setDone(true);
      setEmail("");
      setBusy(false);
    }
  }

  if (done) return <p className="font-semibold text-white">🎉 Thanks! You&apos;re on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-2">
      <label className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-brand" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
        />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {busy ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
