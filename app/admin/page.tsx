"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [subs, setSubs] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setSubs(Array.isArray(d) ? d.length : 0))
      .catch(() => setSubs(0));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Welcome back 👋</h1>
      <p className="mt-1 text-slate-500">Manage everything on your Granny&apos;s Daycare website from here.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/content" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-2xl">✏️</div>
          <h3 className="font-bold text-slate-800">Edit Site Content</h3>
          <p className="mt-1 text-sm text-slate-500">Update the banner, hero, pricing, programs, testimonials, contact details and FAQs.</p>
          <span className="mt-3 inline-block text-sm font-semibold text-brand group-hover:underline">Open editor →</span>
        </Link>

        <Link href="/admin/submissions" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-2xl">📩</div>
          <h3 className="font-bold text-slate-800">Submissions</h3>
          <p className="mt-1 text-sm text-slate-500">
            {subs === null ? "Loading…" : `${subs} message${subs === 1 ? "" : "s"} received`} from the contact and enrollment forms.
          </p>
          <span className="mt-3 inline-block text-sm font-semibold text-brand group-hover:underline">View inbox →</span>
        </Link>

        <Link href="/" target="_blank" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-2xl">🌐</div>
          <h3 className="font-bold text-slate-800">View Live Site</h3>
          <p className="mt-1 text-sm text-slate-500">Open your public website in a new tab to see your changes live.</p>
          <span className="mt-3 inline-block text-sm font-semibold text-brand group-hover:underline">Open site ↗</span>
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Tip:</strong> Changes you save apply to the live site immediately. On serverless hosting (Vercel),
        saved content lives in memory and may reset on a cold start — use <em>Export</em> in the editor to keep a
        durable copy, or run the site on a persistent Node host for permanent storage.
      </div>
    </div>
  );
}
