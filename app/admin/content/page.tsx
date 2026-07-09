"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { SiteContent } from "@/lib/content";
import { Text, Toggle, StringList, Repeater } from "@/components/admin/fields";

const PAGES = ["Global", "Home", "About", "Gallery", "Program", "Contact"] as const;
type Page = (typeof PAGES)[number];
type Section = { id: string; label: string; title: string; desc?: string; body: ReactNode };

export default function ContentEditor() {
  const [c, setC] = useState<SiteContent | null>(null);
  const [page, setPage] = useState<Page>("Global");
  const [sectionId, setSectionId] = useState<string>("");
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
      setStatus(
        res.ok && data.ok
          ? { kind: "ok", msg: data.persisted ? "Saved! Your live site is updated." : "Saved in memory (host is read-only — use Export to keep a copy)." }
          : { kind: "err", msg: data.error || "Save failed." }
      );
    } catch {
      setStatus({ kind: "err", msg: "Network error while saving." });
    } finally {
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function reset() {
    if (!confirm("Reset ALL content to the original defaults? This cannot be undone.")) return;
    setBusy(true);
    await fetch("/api/admin/content", { method: "DELETE" });
    setC(await fetch("/api/admin/content").then((r) => r.json()));
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

  // --- section editors, grouped by page ------------------------------------
  const card = (title: string, text: string, set: (v: { title: string; text: string }) => void) => (
    <div className="grid gap-3">
      <Text label="Title" value={title} onChange={(v) => set({ title: v, text })} />
      <Text label="Text" area rows={2} value={text} onChange={(v) => set({ title, text: v })} />
    </div>
  );

  const sections: Record<Page, Section[]> = {
    Global: [
      {
        id: "banner", label: "Announcement banner", title: "Announcement Banner",
        desc: "A highlighted strip shown at the top of every page.",
        body: (
          <>
            <div className="mb-3"><Toggle label="Show banner" value={c.banner.enabled} onChange={(v) => update((d) => (d.banner.enabled = v))} /></div>
            <Text label="Banner text" value={c.banner.text} onChange={(v) => update((d) => (d.banner.text = v))} />
          </>
        ),
      },
      {
        id: "contact", label: "Contact details", title: "Contact & Business Details",
        desc: "Used in the header, footer, contact page and search listings.",
        body: (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Text label="Business name" value={c.site.name} onChange={(v) => update((d) => (d.site.name = v))} />
              <Text label="Tagline" value={c.site.tagline} onChange={(v) => update((d) => (d.site.tagline = v))} />
              <Text label="Address" value={c.site.address} onChange={(v) => update((d) => (d.site.address = v))} />
              <Text label="Email" value={c.site.email} onChange={(v) => update((d) => (d.site.email = v))} />
              <Text label="Opening hours" value={c.site.hours} onChange={(v) => update((d) => (d.site.hours = v))} />
            </div>
            <div className="mt-4"><StringList label="Phone numbers" items={c.site.phones} onChange={(n) => update((d) => (d.site.phones = n))} addLabel="+ Add phone" /></div>
          </>
        ),
      },
      {
        id: "map", label: "Google Map", title: "Google Map",
        desc: "The embedded map and link on the contact page.",
        body: (
          <div className="grid gap-4">
            <Text label="Google Maps embed URL" value={c.site.mapEmbed} onChange={(v) => update((d) => (d.site.mapEmbed = v))} />
            <Text label="Google Maps link URL" value={c.site.mapLink} onChange={(v) => update((d) => (d.site.mapLink = v))} />
          </div>
        ),
      },
      {
        id: "faqs", label: "FAQs", title: "Frequently Asked Questions",
        desc: "Shown on the Home, Program and Contact pages.",
        body: (
          <Repeater items={c.faqs} onChange={(n) => update((d) => (d.faqs = n))} newItem={() => ({ q: "", a: "" })} itemLabel={(it) => it.q || "New question"} addLabel="+ Add question"
            render={(it, set) => (<div className="grid gap-3"><Text label="Question" value={it.q} onChange={(v) => set({ ...it, q: v })} /><Text label="Answer" area value={it.a} onChange={(v) => set({ ...it, a: v })} /></div>)} />
        ),
      },
    ],
    Home: [
      {
        id: "hero", label: "Hero", title: "Hero", desc: "The big headline area at the top of the home page.",
        body: (
          <>
            <div className="grid gap-4">
              <Text label="Badge / eyebrow" value={c.home.hero.badge} onChange={(v) => update((d) => (d.home.hero.badge = v))} />
              <Text label="Headline" value={c.home.hero.title} onChange={(v) => update((d) => (d.home.hero.title = v))} />
              <Text label="Headline accent (purple)" value={c.home.hero.titleAccent} onChange={(v) => update((d) => (d.home.hero.titleAccent = v))} />
              <Text label="Intro paragraph" area value={c.home.hero.lead} onChange={(v) => update((d) => (d.home.hero.lead = v))} />
            </div>
            <div className="mt-4">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Stats</span>
              <Repeater items={c.home.hero.stats} onChange={(n) => update((d) => (d.home.hero.stats = n))} newItem={() => ({ n: "", l: "" })} itemLabel={(it) => it.l || "Stat"} addLabel="+ Add stat"
                render={(it, set) => (<div className="grid gap-3 sm:grid-cols-2"><Text label="Number" value={it.n} onChange={(v) => set({ ...it, n: v })} /><Text label="Label" value={it.l} onChange={(v) => set({ ...it, l: v })} /></div>)} />
            </div>
          </>
        ),
      },
      {
        id: "approach", label: "Approach cards", title: "Learning Approach Cards", desc: "The six cards under “Our Unique Learning Approach”.",
        body: <Repeater items={c.home.approach} onChange={(n) => update((d) => (d.home.approach = n))} newItem={() => ({ title: "New card", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add card" render={(it, set) => card(it.title, it.text, set)} />,
      },
      {
        id: "plans", label: "Pricing plans", title: "Pricing Plans", desc: "The Full / Half / Weekly care cards.",
        body: (
          <Repeater items={c.home.plans} onChange={(n) => update((d) => (d.home.plans = n))} newItem={() => ({ name: "New plan", price: "0", unit: "FCFA / month", hours: "", ages: "", featured: false })} itemLabel={(it) => it.name} addLabel="+ Add plan"
            render={(it, set) => (
              <div className="grid gap-3 sm:grid-cols-2">
                <Text label="Name" value={it.name} onChange={(v) => set({ ...it, name: v })} />
                <div className="flex items-end"><Toggle label="Featured (highlighted)" value={it.featured} onChange={(v) => set({ ...it, featured: v })} /></div>
                <Text label="Price" value={it.price} onChange={(v) => set({ ...it, price: v })} />
                <Text label="Unit" value={it.unit} onChange={(v) => set({ ...it, unit: v })} />
                <Text label="Hours / Days" value={it.hours} onChange={(v) => set({ ...it, hours: v })} />
                <Text label="Ages" value={it.ages} onChange={(v) => set({ ...it, ages: v })} />
              </div>
            )} />
        ),
      },
      {
        id: "schedule", label: "Daily schedule", title: "Daily Schedule", desc: "The “A Typical Day” time slots.",
        body: (
          <Repeater items={c.home.schedule} onChange={(n) => update((d) => (d.home.schedule = n))} newItem={() => ({ time: "", title: "", text: "" })} itemLabel={(it) => it.title || it.time} addLabel="+ Add time slot"
            render={(it, set) => (<div className="grid gap-3"><div className="grid gap-3 sm:grid-cols-2"><Text label="Time" value={it.time} onChange={(v) => set({ ...it, time: v })} /><Text label="Title" value={it.title} onChange={(v) => set({ ...it, title: v })} /></div><Text label="Description" area rows={2} value={it.text} onChange={(v) => set({ ...it, text: v })} /></div>)} />
        ),
      },
      {
        id: "why", label: "Why choose us", title: "Why Parents Choose Us",
        body: (
          <div className="grid gap-3">
            <Text label="Heading" value={c.home.why.title} onChange={(v) => update((d) => (d.home.why.title = v))} />
            <Text label="Intro" area value={c.home.why.text} onChange={(v) => update((d) => (d.home.why.text = v))} />
            <StringList label="Bullet points" items={c.home.why.bullets} onChange={(n) => update((d) => (d.home.why.bullets = n))} addLabel="+ Add bullet" />
          </div>
        ),
      },
      { id: "safety", label: "Health & safety", title: "Health & Safety Cards", body: <Repeater items={c.home.safety} onChange={(n) => update((d) => (d.home.safety = n))} newItem={() => ({ title: "New card", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add card" render={(it, set) => card(it.title, it.text, set)} /> },
      {
        id: "team", label: "Team members", title: "Team Members",
        body: <Repeater items={c.home.team} onChange={(n) => update((d) => (d.home.team = n))} newItem={() => ({ name: "New member", role: "" })} itemLabel={(it) => it.name} addLabel="+ Add member"
          render={(it, set) => (<div className="grid gap-3 sm:grid-cols-2"><Text label="Name" value={it.name} onChange={(v) => set({ ...it, name: v })} /><Text label="Role" value={it.role} onChange={(v) => set({ ...it, role: v })} /></div>)} />,
      },
      {
        id: "testimonials", label: "Testimonials", title: "Testimonials",
        body: <Repeater items={c.home.testimonials} onChange={(n) => update((d) => (d.home.testimonials = n))} newItem={() => ({ av: "", n: "", r: "", t: "" })} itemLabel={(it) => it.n || "Review"} addLabel="+ Add testimonial"
          render={(it, set) => (<div className="grid gap-3"><div className="grid gap-3 sm:grid-cols-3"><Text label="Initial" value={it.av} onChange={(v) => set({ ...it, av: v })} /><Text label="Name" value={it.n} onChange={(v) => set({ ...it, n: v })} /><Text label="Role / location" value={it.r} onChange={(v) => set({ ...it, r: v })} /></div><Text label="Quote" area rows={2} value={it.t} onChange={(v) => set({ ...it, t: v })} /></div>)} />,
      },
      {
        id: "journal", label: "Journal posts", title: "Journal Posts",
        body: <Repeater items={c.home.journal} onChange={(n) => update((d) => (d.home.journal = n))} newItem={() => ({ img: "/images/gallery/g1.jpg", meta: "", title: "", text: "" })} itemLabel={(it) => it.title || "Post"} addLabel="+ Add post"
          render={(it, set) => (<div className="grid gap-3"><div className="grid gap-3 sm:grid-cols-2"><Text label="Image path" value={it.img} onChange={(v) => set({ ...it, img: v })} /><Text label="Meta (e.g. Play · Mar 2026)" value={it.meta} onChange={(v) => set({ ...it, meta: v })} /></div><Text label="Title" value={it.title} onChange={(v) => set({ ...it, title: v })} /><Text label="Text" area rows={2} value={it.text} onChange={(v) => set({ ...it, text: v })} /></div>)} />,
      },
    ],
    About: [
      { id: "intro", label: "Page intro", title: "Page Intro", body: (<div className="grid gap-3"><Text label="Page title" value={c.about.title} onChange={(v) => update((d) => (d.about.title = v))} /><Text label="Intro" area value={c.about.intro} onChange={(v) => update((d) => (d.about.intro = v))} /></div>) },
      { id: "story", label: "Our story", title: "Our Story", body: (<div className="grid gap-3"><Text label="Heading" value={c.about.storyTitle} onChange={(v) => update((d) => (d.about.storyTitle = v))} /><StringList label="Paragraphs" items={c.about.storyParagraphs} onChange={(n) => update((d) => (d.about.storyParagraphs = n))} addLabel="+ Add paragraph" /><StringList label="Bullet highlights" items={c.about.storyBullets} onChange={(n) => update((d) => (d.about.storyBullets = n))} addLabel="+ Add bullet" /></div>) },
      { id: "mv", label: "Mission / vision", title: "Mission / Vision / Promise", body: <Repeater items={c.about.mv} onChange={(n) => update((d) => (d.about.mv = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add card" render={(it, set) => card(it.title, it.text, set)} /> },
      { id: "values", label: "Core values", title: "Core Values", body: <Repeater items={c.about.values} onChange={(n) => update((d) => (d.about.values = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add value" render={(it, set) => card(it.title, it.text, set)} /> },
      { id: "facility", label: "Facility features", title: "Facility Features", body: <Repeater items={c.about.facility} onChange={(n) => update((d) => (d.about.facility = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add feature" render={(it, set) => card(it.title, it.text, set)} /> },
      { id: "journey", label: "Our journey", title: "Our Journey (timeline)", body: <Repeater items={c.about.journey} onChange={(n) => update((d) => (d.about.journey = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add step" render={(it, set) => card(it.title, it.text, set)} /> },
      { id: "partnership", label: "Parent partnership", title: "Parent Partnership", body: (<div className="grid gap-3"><Text label="Heading" value={c.about.partnership.title} onChange={(v) => update((d) => (d.about.partnership.title = v))} /><Text label="Intro" area value={c.about.partnership.text} onChange={(v) => update((d) => (d.about.partnership.text = v))} /><StringList label="Bullets" items={c.about.partnership.bullets} onChange={(n) => update((d) => (d.about.partnership.bullets = n))} addLabel="+ Add bullet" /></div>) },
    ],
    Gallery: [
      { id: "intro", label: "Page intro", title: "Page Intro", body: (<div className="grid gap-3"><Text label="Page title" value={c.gallery.title} onChange={(v) => update((d) => (d.gallery.title = v))} /><Text label="Intro" area value={c.gallery.intro} onChange={(v) => update((d) => (d.gallery.intro = v))} /></div>) },
      { id: "photos", label: "Photos", title: "Photos", desc: "Upload files to public/images/gallery/ then reference them here.", body: <Repeater items={c.gallery.photos} onChange={(n) => update((d) => (d.gallery.photos = n))} newItem={() => ({ src: "/images/gallery/g1.jpg", cap: "" })} itemLabel={(it) => it.cap || it.src} addLabel="+ Add photo" render={(it, set) => (<div className="grid gap-3 sm:grid-cols-2"><Text label="Image path" value={it.src} onChange={(v) => set({ ...it, src: v })} /><Text label="Caption" value={it.cap} onChange={(v) => set({ ...it, cap: v })} /></div>)} /> },
      { id: "spaces", label: "Our spaces", title: "Our Spaces", body: <Repeater items={c.gallery.spaces} onChange={(n) => update((d) => (d.gallery.spaces = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add card" render={(it, set) => card(it.title, it.text, set)} /> },
      { id: "wys", label: "What you'll see", title: "What You'll See", body: <Repeater items={c.gallery.whatYoullSee} onChange={(n) => update((d) => (d.gallery.whatYoullSee = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add card" render={(it, set) => card(it.title, it.text, set)} /> },
    ],
    Program: [
      { id: "intro", label: "Page intro", title: "Page Intro", body: (<div className="grid gap-3"><Text label="Page title" value={c.program.title} onChange={(v) => update((d) => (d.program.title = v))} /><Text label="Intro" area value={c.program.intro} onChange={(v) => update((d) => (d.program.intro = v))} /></div>) },
      {
        id: "programs", label: "Programmes", title: "Programmes",
        body: <Repeater items={c.program.programs} onChange={(n) => update((d) => (d.program.programs = n))} newItem={() => ({ slug: `program-${Date.now()}`, name: "New Program", age_range: "", schedule: "", price: "", icon: "toddler", description: "", features: [] })} itemLabel={(it) => it.name} addLabel="+ Add programme"
          render={(it, set) => (<div className="grid gap-3"><div className="grid gap-3 sm:grid-cols-2"><Text label="Name" value={it.name} onChange={(v) => set({ ...it, name: v })} /><Text label="Age range" value={it.age_range} onChange={(v) => set({ ...it, age_range: v })} /><Text label="Schedule" value={it.schedule} onChange={(v) => set({ ...it, schedule: v })} /><Text label="Price" value={it.price} onChange={(v) => set({ ...it, price: v })} /></div><Text label="Description" area rows={2} value={it.description} onChange={(v) => set({ ...it, description: v })} /><StringList label="Features" items={it.features} onChange={(f) => set({ ...it, features: f })} addLabel="+ Add feature" /></div>)} />,
      },
      { id: "curriculum", label: "Curriculum", title: "Curriculum Pillars", body: <Repeater items={c.program.curriculum} onChange={(n) => update((d) => (d.program.curriculum = n))} newItem={() => ({ title: "", text: "" })} itemLabel={(it) => it.title} addLabel="+ Add pillar" render={(it, set) => card(it.title, it.text, set)} /> },
      { id: "included", label: "What's included", title: "What's Included", body: <StringList items={c.program.included} onChange={(n) => update((d) => (d.program.included = n))} addLabel="+ Add item" /> },
    ],
    Contact: [
      { id: "intro", label: "Page intro", title: "Page Intro", body: (<div className="grid gap-3"><Text label="Page title" value={c.contact.title} onChange={(v) => update((d) => (d.contact.title = v))} /><Text label="Intro" area value={c.contact.intro} onChange={(v) => update((d) => (d.contact.intro = v))} /></div>) },
      { id: "hours", label: "Opening hours", title: "Opening Hours Table", body: <Repeater items={c.contact.hours} onChange={(n) => update((d) => (d.contact.hours = n))} newItem={() => ({ day: "", time: "" })} itemLabel={(it) => it.day} addLabel="+ Add row" render={(it, set) => (<div className="grid gap-3 sm:grid-cols-2"><Text label="Day(s)" value={it.day} onChange={(v) => set({ ...it, day: v })} /><Text label="Time" value={it.time} onChange={(v) => set({ ...it, time: v })} /></div>)} /> },
      { id: "findus", label: "How to find us", title: "How to Find Us", body: <StringList items={c.contact.findUs} onChange={(n) => update((d) => (d.contact.findUs = n))} addLabel="+ Add step" /> },
    ],
  };

  const list = sections[page];
  const active = list.find((s) => s.id === sectionId) ?? list[0];

  function selectPage(p: Page) {
    setPage(p);
    setSectionId(sections[p][0].id);
  }

  return (
    <div className="pb-28">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-800">Site Content</h1>
        <p className="text-slate-500">Pick a page, choose a section, edit or add content, then Save.</p>
      </div>

      {status && (
        <div className={`mb-4 rounded-xl px-4 py-3 text-sm ${status.kind === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{status.msg}</div>
      )}

      {/* Page tabs */}
      <div className="mb-5 flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5">
        {PAGES.map((p) => (
          <button key={p} onClick={() => selectPage(p)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${page === p ? "bg-brand text-white shadow" : "text-slate-500 hover:bg-slate-100"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* Section list */}
        <div>
          {/* Mobile: dropdown */}
          <select value={active.id} onChange={(e) => setSectionId(e.target.value)} className="mb-4 w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-3 py-2.5 text-sm md:hidden">
            {list.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          {/* Desktop: vertical list */}
          <div className="sticky top-4 hidden rounded-2xl border border-slate-200 bg-white p-2 md:block">
            {list.map((s) => (
              <button key={s.id} onClick={() => setSectionId(s.id)}
                className={`block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition ${active.id === s.id ? "bg-brand-soft text-brand-dark" : "text-slate-600 hover:bg-slate-100"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active section editor */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-800">{active.title}</h2>
          {active.desc && <p className="mb-4 mt-0.5 text-sm text-slate-500">{active.desc}</p>}
          <div className={active.desc ? "" : "mt-4"}>{active.body}</div>
        </section>
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
