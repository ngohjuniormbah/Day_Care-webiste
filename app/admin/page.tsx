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

  const cards = [
    { href: "/admin/content", title: "Edit Site Content", desc: "Update every page — banner, hero, pricing, programs, gallery, team, FAQs and more.", cta: "Open editor →" },
    { href: "/admin/submissions", title: "Submissions", desc: subs === null ? "Loading…" : `${subs} message${subs === 1 ? "" : "s"} from the contact and enrollment forms.`, cta: "View inbox →" },
    { href: "/", title: "View Live Site", desc: "Open your public website in a new tab to see your changes live.", cta: "Open site ↗", blank: true },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
      <p className="mt-1 text-slate-500">Manage everything on your Granny&apos;s Daycare website from here.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            target={c.blank ? "_blank" : undefined}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="mb-4 block h-1 w-10 rounded-full bg-brand" />
            <h3 className="font-bold text-slate-800">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand group-hover:underline">{c.cta}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>How it works:</strong> Go to <em>Site Content</em>, pick a page tab (Home, About, Gallery, Program,
        Contact), choose a section on the left, edit or add items, then click <strong>Save changes</strong>. Your live
        website updates right away.
      </div>
    </div>
  );
}
