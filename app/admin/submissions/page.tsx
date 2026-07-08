"use client";

import { useEffect, useState } from "react";
import type { Submission } from "@/lib/store";

export default function SubmissionsPage() {
  const [subs, setSubs] = useState<Submission[] | null>(null);
  const [filter, setFilter] = useState<"all" | "contact" | "enrollment">("all");

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((r) => (r.ok ? r.json() : []))
      .then(setSubs)
      .catch(() => setSubs([]));
  }, []);

  const shown = (subs || []).filter((s) => filter === "all" || s.type === filter);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Submissions</h1>
          <p className="text-slate-500">Messages from your contact and enrollment forms.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-slate-200 bg-white p-1 text-sm">
          {(["all", "contact", "enrollment"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 capitalize transition ${filter === f ? "bg-brand text-white" : "text-slate-500 hover:bg-slate-100"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {subs === null ? (
        <p className="text-slate-500">Loading…</p>
      ) : shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No submissions yet. New messages from the website will appear here.
          <p className="mt-2 text-xs text-slate-400">Note: on serverless hosting these are kept in memory and may reset on a cold start.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map((s, i) => (
            <article key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.type === "enrollment" ? "bg-brand-soft text-brand-dark" : "bg-green-100 text-green-700"}`}>
                  {s.type}
                </span>
                <time className="text-xs text-slate-400">{new Date(s.at).toLocaleString()}</time>
              </div>
              <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                {Object.entries(s.data).map(([k, v]) =>
                  v ? (
                    <div key={k} className="flex gap-2">
                      <dt className="font-semibold capitalize text-slate-500">{k.replace(/_/g, " ")}:</dt>
                      <dd className="text-slate-800">{String(v)}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
