import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, PageHero, SectionHead } from "@/components/ui";
import { ProgramList } from "@/components/ProgramList";
import { programSeed, type Program } from "@/lib/programs";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Granny's Daycare Center programs in Yaoundé — infant care, toddler, preschool and kindergarten programmes with flexible full-day, half-day and weekly plans.",
  alternates: { canonical: "/program" },
};

const tags = [
  { t: "Infant · 0–12 months", c: "from-[#ff9a6b] to-[#ff7a6b]" },
  { t: "Toddler · 1–2 years", c: "from-brand to-brand-dark" },
  { t: "Preschool · 3–4 years", c: "from-[#4fbf8b] to-[#2f8c63]" },
  { t: "Pre-K · 4–5 years", c: "from-[#6fb7e8] to-[#2b7cb8]" },
  { t: "After School · 6+ years", c: "from-[#ffce4a] to-[#e0a800] !text-ink" },
];

const plans = [
  { ic: "🌤️", tint: "tint-yellow", name: "Full Day", price: "30,000", unit: "FCFA / month", a: ["07:00–18:00", "1–5 yrs"], f: ["Meals & snacks included", "Nap & rest time", "Full learning programme", "Daily progress updates"], featured: false },
  { ic: "☀️", tint: "tint-purple", name: "Half Day", price: "18,000", unit: "FCFA / month", a: ["08:00–13:00", "2–4 yrs"], f: ["Morning snack included", "Play-based learning", "Creative activities", "Flexible mornings"], featured: true },
  { ic: "📅", tint: "tint-green", name: "Weekly", price: "9,000", unit: "FCFA / week", a: ["Mon–Fri", "1–5 yrs"], f: ["Flexible weekly booking", "Meals & snacks included", "Perfect for busy weeks", "Pay as you go"], featured: false },
];

function getPrograms(): Program[] {
  try {
    const rows = db.prepare("SELECT * FROM programs ORDER BY id").all() as any[];
    return rows.map((p) => ({ ...p, features: JSON.parse(p.features || "[]") }));
  } catch {
    return programSeed;
  }
}

export default function ProgramPage() {
  const programs = getPrograms();

  return (
    <>
      <PageHero crumb="Program" title={<>Our Amazing <span className="text-brand">Programs</span></>}>
        Our caring approach and thoughtfully designed programmes set us apart, with small age steps that ensure precious
        attention for every child.
      </PageHero>

      {/* AGE TAGS */}
      <section className="bg-cream pt-12">
        <div className="container-x">
          <FadeIn className="flex flex-wrap justify-center gap-2.5">
            {tags.map((t) => (
              <span key={t.t} className={`rounded-full bg-gradient-to-r ${t.c} px-4 py-2 text-sm font-semibold text-white`}>
                {t.t}
              </span>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section bg-cream pt-10">
        <div className="container-x">
          <ProgramList initial={programs} />
        </div>
      </section>

      {/* CARE PLANS */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Flexible plans" title={<>Care Plans for <span className="text-brand">Every Family</span></>}>
            Hourly, daily and monthly options designed around your schedule.
          </SectionHead>
          <FadeInStagger className="grid gap-8 md:grid-cols-3">
            {plans.map((pl) => (
              <FadeInItem key={pl.name}>
                <div className={`card card-hover relative h-full text-center ${pl.featured ? "ring-2 ring-brand" : ""}`}>
                  {pl.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <div className={`icon-chip ${pl.tint} mx-auto mb-3 h-16 w-16 rounded-full text-2xl`}>{pl.ic}</div>
                  <h3 className="text-2xl font-bold">{pl.name}</h3>
                  <div className="my-1 text-3xl font-bold text-brand">
                    {pl.price}
                    <span className="ml-1 text-sm font-medium text-ink-muted">{pl.unit}</span>
                  </div>
                  <div className="my-5 flex justify-around border-y border-brand-soft py-4">
                    <div><div className="text-xs text-ink-muted">Hours / Days</div><strong>{pl.a[0]}</strong></div>
                    <div><div className="text-xs text-ink-muted">Ages</div><strong>{pl.a[1]}</strong></div>
                  </div>
                  <ul className="mb-6 space-y-2 text-left text-sm text-ink-soft">
                    {pl.f.map((f) => (
                      <li key={f} className="relative pl-6 before:absolute before:left-0 before:font-bold before:text-accent-green before:content-['✓']">{f}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn w-full">Book Now</Link>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CtaBanner
        title="Find the Right Program for Your Child"
        text="Not sure which plan fits best? Reach out and our team will help you choose the perfect programme for your little one."
        cta="Get in Touch"
      />
    </>
  );
}
