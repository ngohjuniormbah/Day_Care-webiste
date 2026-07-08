"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

// -- tiny field helpers ------------------------------------------------------
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
    </label>
  );
}
const inputCls =
  "w-full rounded-xl border-[1.5px] border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15";

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      {desc && <p className="mb-4 mt-0.5 text-sm text-slate-500">{desc}</p>}
      <div className={desc ? "" : "mt-4"}>{children}</div>
    </section>
  );
}

const TINTS = ["tint-purple", "tint-green", "tint-yellow", "tint-coral", "tint-sky"];

export default function ContentEditor() {
  const [c, setC] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setC)
      .catch(() => setStatus({ kind: "err", msg: "Could not load content." }));
  }, []);

  function update(mut: (draft: SiteContent) => void) {
    setC((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      mut(next);
      return next;
    });
  }

  async function save() {
    if (!c) return;
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({
          kind: "ok",
          msg: data.persisted ? "Saved! Your live site is updated." : "Saved in memory (host is read-only — use Export to keep a copy).",
        });
      } else {
        setStatus({ kind: "err", msg: data.error || "Save failed." });
      }
    } catch {
      setStatus({ kind: "err", msg: "Network error while saving." });
    } finally {
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function reset() {
    if (!confirm("Reset all content to the original defaults? This cannot be undone.")) return;
    setBusy(true);
    await fetch("/api/admin/content", { method: "DELETE" });
    const fresh = await fetch("/api/admin/content").then((r) => r.json());
    setC(fresh);
    setBusy(false);
    setStatus({ kind: "ok", msg: "Content reset to defaults." });
  }

  function exportJson() {
    if (!c) return;
    const blob = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "granny-daycare-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!c) return <p className="text-slate-500">Loading editor…</p>;

  return (
    <div className="pb-28">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800">Site Content</h1>
        <p className="text-slate-500">Edit any text below and click Save — your live website updates instantly.</p>
      </div>

      {status && (
        <div className={`mb-5 rounded-xl px-4 py-3 text-sm ${status.kind === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {status.msg}
        </div>
      )}

      <div className="space-y-5">
        {/* BANNER */}
        <Card title="Announcement Banner" desc="A highlighted strip shown at the very top of every page.">
          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={c.banner.enabled} onChange={(e) => update((d) => (d.banner.enabled = e.target.checked))} />
            Show banner
          </label>
          <Field label="Banner text">
            <input className={inputCls} value={c.banner.text} onChange={(e) => update((d) => (d.banner.text = e.target.value))} />
          </Field>
        </Card>

        {/* SITE INFO */}
        <Card title="Contact & Business Details" desc="Used in the header, footer, contact page and search listings.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Business name"><input className={inputCls} value={c.site.name} onChange={(e) => update((d) => (d.site.name = e.target.value))} /></Field>
            <Field label="Tagline"><input className={inputCls} value={c.site.tagline} onChange={(e) => update((d) => (d.site.tagline = e.target.value))} /></Field>
            <Field label="Address"><input className={inputCls} value={c.site.address} onChange={(e) => update((d) => (d.site.address = e.target.value))} /></Field>
            <Field label="Email"><input className={inputCls} value={c.site.email} onChange={(e) => update((d) => (d.site.email = e.target.value))} /></Field>
            <Field label="Opening hours"><input className={inputCls} value={c.site.hours} onChange={(e) => update((d) => (d.site.hours = e.target.value))} /></Field>
          </div>
          <div className="mt-4">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Phone numbers</span>
            {c.site.phones.map((p, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input className={inputCls} value={p} onChange={(e) => update((d) => (d.site.phones[i] = e.target.value))} />
                <button onClick={() => update((d) => d.site.phones.splice(i, 1))} className="rounded-lg border border-slate-200 px-3 text-sm text-red-500 hover:bg-red-50">✕</button>
              </div>
            ))}
            <button onClick={() => update((d) => d.site.phones.push(""))} className="text-sm font-semibold text-brand">+ Add phone</button>
          </div>
          <div className="mt-4 grid gap-4">
            <Field label="Google Maps embed URL"><input className={inputCls} value={c.site.mapEmbed} onChange={(e) => update((d) => (d.site.mapEmbed = e.target.value))} /></Field>
            <Field label="Google Maps link URL"><input className={inputCls} value={c.site.mapLink} onChange={(e) => update((d) => (d.site.mapLink = e.target.value))} /></Field>
          </div>
        </Card>

        {/* HERO */}
        <Card title="Home Hero" desc="The big headline area at the top of the home page.">
          <div className="grid gap-4">
            <Field label="Badge / eyebrow"><input className={inputCls} value={c.hero.badge} onChange={(e) => update((d) => (d.hero.badge = e.target.value))} /></Field>
            <Field label="Headline"><input className={inputCls} value={c.hero.title} onChange={(e) => update((d) => (d.hero.title = e.target.value))} /></Field>
            <Field label="Headline accent (shown in purple)"><input className={inputCls} value={c.hero.titleAccent} onChange={(e) => update((d) => (d.hero.titleAccent = e.target.value))} /></Field>
            <Field label="Intro paragraph"><textarea rows={3} className={inputCls} value={c.hero.lead} onChange={(e) => update((d) => (d.hero.lead = e.target.value))} /></Field>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {c.hero.stats.map((s, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-3">
                <Field label={`Stat ${i + 1} number`}><input className={inputCls} value={s.n} onChange={(e) => update((d) => (d.hero.stats[i].n = e.target.value))} /></Field>
                <div className="mt-2">
                  <Field label="Label"><input className={inputCls} value={s.l} onChange={(e) => update((d) => (d.hero.stats[i].l = e.target.value))} /></Field>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* PLANS */}
        <Card title="Pricing Plans" desc="The Full / Half / Weekly care cards.">
          <div className="space-y-4">
            {c.plans.map((p, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <strong className="text-sm text-slate-700">Plan {i + 1}</strong>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500">
                    <input type="checkbox" checked={p.featured} onChange={(e) => update((d) => (d.plans[i].featured = e.target.checked))} /> Featured
                  </label>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Icon (emoji)"><input className={inputCls} value={p.ic} onChange={(e) => update((d) => (d.plans[i].ic = e.target.value))} /></Field>
                  <Field label="Name"><input className={inputCls} value={p.name} onChange={(e) => update((d) => (d.plans[i].name = e.target.value))} /></Field>
                  <Field label="Colour">
                    <select className={inputCls} value={p.tint} onChange={(e) => update((d) => (d.plans[i].tint = e.target.value))}>
                      {TINTS.map((t) => <option key={t} value={t}>{t.replace("tint-", "")}</option>)}
                    </select>
                  </Field>
                  <Field label="Price"><input className={inputCls} value={p.price} onChange={(e) => update((d) => (d.plans[i].price = e.target.value))} /></Field>
                  <Field label="Unit"><input className={inputCls} value={p.unit} onChange={(e) => update((d) => (d.plans[i].unit = e.target.value))} /></Field>
                  <Field label="Hours / Days"><input className={inputCls} value={p.hours} onChange={(e) => update((d) => (d.plans[i].hours = e.target.value))} /></Field>
                  <Field label="Ages"><input className={inputCls} value={p.ages} onChange={(e) => update((d) => (d.plans[i].ages = e.target.value))} /></Field>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* PROGRAMS */}
        <Card title="Programs" desc="The age-group programmes shown on the Program page.">
          <div className="space-y-4">
            {c.programs.map((p, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <strong className="text-sm text-slate-700">{p.name || `Program ${i + 1}`}</strong>
                  <button onClick={() => update((d) => d.programs.splice(i, 1))} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name"><input className={inputCls} value={p.name} onChange={(e) => update((d) => (d.programs[i].name = e.target.value))} /></Field>
                  <Field label="Age range"><input className={inputCls} value={p.age_range} onChange={(e) => update((d) => (d.programs[i].age_range = e.target.value))} /></Field>
                  <Field label="Schedule"><input className={inputCls} value={p.schedule} onChange={(e) => update((d) => (d.programs[i].schedule = e.target.value))} /></Field>
                  <Field label="Price"><input className={inputCls} value={p.price} onChange={(e) => update((d) => (d.programs[i].price = e.target.value))} /></Field>
                </div>
                <div className="mt-3">
                  <Field label="Description"><textarea rows={2} className={inputCls} value={p.description} onChange={(e) => update((d) => (d.programs[i].description = e.target.value))} /></Field>
                </div>
                <div className="mt-3">
                  <Field label="Features (one per line)">
                    <textarea rows={3} className={inputCls} value={p.features.join("\n")} onChange={(e) => update((d) => (d.programs[i].features = e.target.value.split("\n").filter(Boolean)))} />
                  </Field>
                </div>
              </div>
            ))}
            <button
              onClick={() => update((d) => d.programs.push({ slug: `program-${Date.now()}`, name: "New Program", age_range: "", schedule: "", price: "", icon: "toddler", description: "", features: [] }))}
              className="text-sm font-semibold text-brand"
            >
              + Add program
            </button>
          </div>
        </Card>

        {/* TESTIMONIALS */}
        <Card title="Testimonials" desc="Parent reviews shown on the home page.">
          <div className="space-y-4">
            {c.testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <strong className="text-sm text-slate-700">Review {i + 1}</strong>
                  <button onClick={() => update((d) => d.testimonials.splice(i, 1))} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Initial"><input className={inputCls} value={t.av} onChange={(e) => update((d) => (d.testimonials[i].av = e.target.value))} /></Field>
                  <Field label="Name"><input className={inputCls} value={t.n} onChange={(e) => update((d) => (d.testimonials[i].n = e.target.value))} /></Field>
                  <Field label="Role / location"><input className={inputCls} value={t.r} onChange={(e) => update((d) => (d.testimonials[i].r = e.target.value))} /></Field>
                </div>
                <div className="mt-3">
                  <Field label="Quote"><textarea rows={2} className={inputCls} value={t.t} onChange={(e) => update((d) => (d.testimonials[i].t = e.target.value))} /></Field>
                </div>
              </div>
            ))}
            <button onClick={() => update((d) => d.testimonials.push({ av: "", n: "", r: "", t: "" }))} className="text-sm font-semibold text-brand">+ Add testimonial</button>
          </div>
        </Card>

        {/* FAQ */}
        <Card title="Frequently Asked Questions" desc="Shown on the home and contact pages.">
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <strong className="text-sm text-slate-700">Q{i + 1}</strong>
                  <button onClick={() => update((d) => d.faqs.splice(i, 1))} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
                <Field label="Question"><input className={inputCls} value={f.q} onChange={(e) => update((d) => (d.faqs[i].q = e.target.value))} /></Field>
                <div className="mt-3">
                  <Field label="Answer"><textarea rows={2} className={inputCls} value={f.a} onChange={(e) => update((d) => (d.faqs[i].a = e.target.value))} /></Field>
                </div>
              </div>
            ))}
            <button onClick={() => update((d) => d.faqs.push({ q: "", a: "" }))} className="text-sm font-semibold text-brand">+ Add question</button>
          </div>
        </Card>
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:pl-72">
          <div className="flex gap-2">
            <button onClick={exportJson} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Export</button>
            <button onClick={reset} disabled={busy} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50">Reset</button>
          </div>
          <button onClick={save} disabled={busy} className="rounded-full bg-brand px-8 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-dark disabled:opacity-60">
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
