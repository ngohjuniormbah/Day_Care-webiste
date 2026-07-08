import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Granny's Daycare Center in Shell Obili, Yaoundé — our story, mission, values and the caring team who help children learn, play and grow.",
  alternates: { canonical: "/about" },
};

const mv = [
  { ic: "🎯", tint: "tint-purple", h: "Our Mission", p: "To provide a safe, loving and stimulating environment where every child feels valued, secure and inspired to explore, learn and grow at their own pace." },
  { ic: "👁️", tint: "tint-green", h: "Our Vision", p: "To be Yaoundé's most trusted daycare — nurturing confident, kind and curious children who are ready for a bright future." },
  { ic: "🤝", tint: "tint-yellow", h: "Our Promise", p: "Warm, professional care you can count on, clear communication with parents, and a joyful space your child will love coming back to." },
];

const values = [
  { ic: "❤️", tint: "tint-coral", h: "Love & Warmth", p: "Every child is treated with genuine affection and patience." },
  { ic: "🛡️", tint: "tint-purple", h: "Safety First", p: "A secure, clean and closely supervised environment at all times." },
  { ic: "🌱", tint: "tint-green", h: "Growth", p: "Play-based learning that grows social, emotional and cognitive skills." },
  { ic: "🤗", tint: "tint-sky", h: "Respect", p: "We honour each child's pace, personality and unique needs." },
];

const facility = [
  { ic: "🛏️", tint: "tint-purple", h: "Sleeping & Rest", p: "A calm, dedicated space with comfortable bedding for naps and quiet time." },
  { ic: "🍽️", tint: "tint-green", h: "Dining Area", p: "Clean dining space where nutritious meals and snacks are served daily." },
  { ic: "🧸", tint: "tint-yellow", h: "Indoor Play", p: "Safe, age-appropriate toys, books and learning corners for every stage." },
  { ic: "🌳", tint: "tint-sky", h: "Enclosed Veranda & Yard", p: "A secure grass yard and veranda for fresh-air play and outdoor discovery." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title={<>Caring for Little Hearts &amp; <span className="text-brand">Curious Minds</span></>}>
        Get to know the people, values and warm environment behind Granny&apos;s Daycare Center in Yaoundé.
      </PageHero>

      {/* STORY */}
      <section className="section bg-cream">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <FadeIn direction="right">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl2 bg-brand-soft shadow-soft">
              <Image src="/images/about-story.jpg" alt="Children and caregivers enjoying a day at Granny's Daycare Center" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <span className="eyebrow mb-3">Our story</span>
            <h2 className="text-3xl font-extrabold">A Home Away From Home in Shell Obili</h2>
            <p className="mt-3 text-ink-soft">
              Granny&apos;s Daycare Center is located in a secure, gated apartment in Shell Obili, Yaoundé, complete with a
              toilet, kitchen, office, and a spacious hall with an enclosed veranda and grass yard. The hall includes
              sleeping, storage, dining, indoor play and study areas for children&apos;s comfort daily.
            </p>
            <p className="mt-3 text-ink-soft">
              What began as one grandmother&apos;s love for children has grown into a trusted center where families across
              Yaoundé feel confident leaving their little ones. Every corner is designed to feel warm, safe and full of joy.
            </p>
            <ul className="my-5 space-y-2">
              {["Secure, gated premises with dedicated indoor & outdoor spaces", "Small groups with caring, attentive supervision", "Nutritious meals and a cozy rest area"].map((x) => (
                <li key={x} className="relative pl-8 text-ink-soft before:absolute before:left-0 before:top-0.5 before:grid before:h-5 before:w-5 before:place-items-center before:rounded-full before:bg-brand-soft before:text-xs before:font-bold before:text-brand before:content-['✓']">
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn">Visit Us</Link>
          </FadeIn>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <FadeInStagger className="grid gap-6 md:grid-cols-3">
            {mv.map((m) => (
              <FadeInItem key={m.h}>
                <div className="card card-hover h-full">
                  <span className={`icon-chip ${m.tint} mb-4 h-14 w-14`}>{m.ic}</span>
                  <h3 className="text-lg font-bold">{m.h}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{m.p}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="What we stand for" title={<>Our Core <span className="text-brand">Values</span></>}>
            The principles that guide how we care for your child every single day.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <FadeInItem key={v.h}>
                <div className="card h-full text-center">
                  <span className={`icon-chip ${v.tint} mx-auto mb-4 h-14 w-14`}>{v.ic}</span>
                  <h3 className="text-lg font-bold">{v.h}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{v.p}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* FACILITY */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our facility" title={<>Detailed Description of <span className="text-brand">Granny&apos;s Daycare Center</span></>}>
            Join thousands of families who are discovering the sense of learning from free play — anything is possible.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2">
            {facility.map((f) => (
              <FadeInItem key={f.h}>
                <div className="card card-hover flex h-full items-start gap-4">
                  <span className={`icon-chip ${f.tint} h-12 w-12 flex-none`}>{f.ic}</span>
                  <div>
                    <h3 className="font-bold">{f.h}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{f.p}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CtaBanner
        title="Come See It for Yourself"
        text="We'd love to show you around and answer your questions. Book a friendly tour of our center in Shell Obili, Yaoundé."
      />
    </>
  );
}
