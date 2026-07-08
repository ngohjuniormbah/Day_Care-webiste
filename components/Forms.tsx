"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Note = { kind: "ok" | "err"; text: string } | null;

function Feedback({ note }: { note: Note }) {
  return (
    <AnimatePresence>
      {note && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="status"
          aria-live="polite"
          className={`mt-3 rounded-xl px-4 py-3 text-sm ${
            note.kind === "ok" ? "bg-[#e2f6ec] text-[#2f8c63]" : "bg-[#ffe6e1] text-[#d85a49]"
          }`}
        >
          {note.text}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

async function submit(endpoint: string, form: HTMLFormElement): Promise<Note> {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      form.reset();
      return { kind: "ok", text: data.message };
    }
    return { kind: "err", text: data.error || "Something went wrong. Please try again." };
  } catch {
    return { kind: "err", text: "Network error. Please check your connection and try again." };
  }
}

export function ContactForm() {
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    setNote(await submit("/api/contact", e.currentTarget));
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card shadow-soft">
      <h3 className="mb-4 text-xl font-bold">Send Us a Message</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">Your Name *</label>
          <input id="c-name" name="name" type="text" required autoComplete="name" className="field-input" />
        </div>
        <div>
          <label htmlFor="c-email" className="field-label">Email Address *</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className="field-input" />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-subject" className="field-label">Subject</label>
        <input id="c-subject" name="subject" type="text" className="field-input" />
      </div>
      <div className="mt-4">
        <label htmlFor="c-message" className="field-label">Your Message *</label>
        <textarea id="c-message" name="message" required rows={5} className="field-input resize-y" />
      </div>
      <button type="submit" disabled={busy} className="btn mt-5 w-full disabled:opacity-60">
        {busy ? "Sending…" : "Send Message"}
      </button>
      <Feedback note={note} />
    </form>
  );
}

export function EnrollForm() {
  const [note, setNote] = useState<Note>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    setNote(await submit("/api/enroll", e.currentTarget));
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card shadow-soft">
      <h3 className="mb-4 text-xl font-bold">Enrollment Request</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="e-parent" className="field-label">Parent / Guardian Name *</label>
          <input id="e-parent" name="parent_name" type="text" required className="field-input" />
        </div>
        <div>
          <label htmlFor="e-email" className="field-label">Email *</label>
          <input id="e-email" name="email" type="email" required className="field-input" />
        </div>
        <div>
          <label htmlFor="e-phone" className="field-label">Phone *</label>
          <input id="e-phone" name="phone" type="tel" required className="field-input" />
        </div>
        <div>
          <label htmlFor="e-child" className="field-label">Child&apos;s Name *</label>
          <input id="e-child" name="child_name" type="text" required className="field-input" />
        </div>
        <div>
          <label htmlFor="e-age" className="field-label">Child&apos;s Age *</label>
          <input id="e-age" name="child_age" type="text" placeholder="e.g. 3 years" required className="field-input" />
        </div>
        <div>
          <label htmlFor="e-program" className="field-label">Program *</label>
          <select id="e-program" name="program" required className="field-input">
            <option value="">Choose a plan…</option>
            <option>Full Day</option>
            <option>Half Day</option>
            <option>Weekly</option>
            <option>Infant Care</option>
            <option>Toddler Program</option>
            <option>Preschool</option>
          </select>
        </div>
        <div>
          <label htmlFor="e-start" className="field-label">Preferred Start Date</label>
          <input id="e-start" name="start_date" type="date" className="field-input" />
        </div>
        <div>
          <label htmlFor="e-msg" className="field-label">Notes</label>
          <input id="e-msg" name="message" type="text" placeholder="Anything we should know?" className="field-input" />
        </div>
      </div>
      <button type="submit" disabled={busy} className="btn mt-5 w-full disabled:opacity-60">
        {busy ? "Submitting…" : "Submit Enrollment"}
      </button>
      <Feedback note={note} />
    </form>
  );
}
