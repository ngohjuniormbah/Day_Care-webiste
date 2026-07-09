import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, PageHero, SectionHead, AccentCard } from "@/components/ui";
import { ProgramList } from "@/components/ProgramList";
import { Faq } from "@/components/Faq";
import { getContent } from "@/lib/content-store";

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

export default async function ProgramPage() {
  const { program, home, faqs } = await getContent();

  return (
    <>
      <PageHero crumb="Program" title={program.title}>{program.intro}</PageHero>

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
          <ProgramList initial={program.programs} />
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our curriculum" title={<>How Your Child <span className="text-brand">Learns & Grows</span></>}>
            Every programme is built around four pillars that nurture the whole child — mind, heart and body.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.curriculum.map((c) => (
              <FadeInItem key={c.title}><AccentCard title={c.title} text={c.text} center /></FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CARE PLANS */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Flexible plans" title={<>Care Plans for <span className="text-brand">Every Family</span></>}>
            Hourly, daily and monthly options designed around your schedule.
          </SectionHead>
          <FadeInStagger className="grid gap-8 md:grid-cols-3">
            {home.plans.map((pl) => (
              <FadeInItem key={pl.name}>
                <div className={`card card-hover relative h-full text-center ${pl.featured ? "ring-2 ring-brand" : ""}`}>
                  {pl.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Most popular</span>
                  )}
                  <h3 className="text-2xl font-bold">{pl.name}</h3>
                  <div className="my-2 text-3xl font-bold text-brand">
                    {pl.price}<span className="ml-1 text-sm font-medium text-ink-muted">{pl.unit}</span>
                  </div>
                  <div className="my-5 flex justify-around border-y border-brand-soft py-4">
                    <div><div className="text-xs text-ink-muted">Hours / Days</div><strong>{pl.hours}</strong></div>
                    <div><div className="text-xs text-ink-muted">Ages</div><strong>{pl.ages}</strong></div>
                  </div>
                  <Link href="/contact" className="btn w-full">Book Now</Link>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="All plans include" title={<>What&apos;s <span className="text-brand">Included</span></>}>
            Every plan comes packed with everything your child needs for a happy, healthy day.
          </SectionHead>
          <FadeInStagger className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {program.included.map((x) => (
              <FadeInItem key={x}>
                <div className="card flex items-center gap-3 py-4">
                  <span className="h-2.5 w-2.5 flex-none rounded-full bg-brand" />
                  <span className="text-sm font-medium text-ink">{x}</span>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Questions" title={<>Programme <span className="text-brand">FAQs</span></>}>
            Answers to the things parents ask us most about our programmes and plans.
          </SectionHead>
          <FadeIn><Faq items={faqs} /></FadeIn>
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
