"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
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
        body: JSON.stringify({ name: "Newsletter subscriber", email, subject: "Newsletter", message: "Please add me to the newsletter." }),
      });
      setDone(true);
      setEmail("");
    } catch {
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  if (done) return <p className="font-semibold text-white">🎉 Thanks! You&apos;re on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full rounded-full border-0 px-5 py-3 text-ink outline-none focus:ring-4 focus:ring-white/30"
      />
      <button type="submit" disabled={busy} className="btn btn-light shrink-0 disabled:opacity-60">
        {busy ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
