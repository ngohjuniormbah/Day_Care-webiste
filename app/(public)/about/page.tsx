import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, PageHero, SectionHead, AccentCard } from "@/components/ui";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Granny's Daycare Center in Shell Obili, Yaoundé — our story, mission, values and the caring team who help children learn, play and grow.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const { about } = await getContent();

  return (
    <>
      <PageHero crumb="About" title={about.title}>{about.intro}</PageHero>

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
            <h2 className="text-3xl font-extrabold">{about.storyTitle}</h2>
            {about.storyParagraphs.map((p) => (
              <p key={p} className="mt-3 text-ink-soft">{p}</p>
            ))}
            <ul className="my-5 space-y-2">
              {about.storyBullets.map((x) => (
                <li key={x} className="relative pl-7 text-ink-soft before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-brand before:content-['']">{x}</li>
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
            {about.mv.map((m) => (
              <FadeInItem key={m.title}><AccentCard title={m.title} text={m.text} /></FadeInItem>
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
            {about.values.map((v) => (
              <FadeInItem key={v.title}><AccentCard title={v.title} text={v.text} center /></FadeInItem>
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
            {about.facility.map((f) => (
              <FadeInItem key={f.title}><AccentCard title={f.title} text={f.text} /></FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Our journey" title={<>Growing With <span className="text-brand">Our Community</span></>}>
            From a single grandmother&apos;s love for children to a trusted name in Yaoundé childcare.
          </SectionHead>
          <FadeInStagger className="mx-auto max-w-3xl space-y-4">
            {about.journey.map((s, i) => (
              <FadeInItem key={s.title}>
                <div className="card flex items-start gap-4">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-soft">{s.text}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* PARENT PARTNERSHIP */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <FadeIn direction="right">
            <span className="eyebrow mb-3">Working together</span>
            <h2 className="text-3xl font-extrabold">{about.partnership.title}</h2>
            <p className="mt-3 text-ink-soft">{about.partnership.text}</p>
            <ul className="my-5 space-y-3">
              {about.partnership.bullets.map((x) => (
                <li key={x} className="relative pl-7 text-ink-soft before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-brand before:content-['']">{x}</li>
              ))}
            </ul>
            <Link href="/contact" className="btn">Talk to Us</Link>
          </FadeIn>
          <FadeIn direction="left">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl2 bg-brand-soft shadow-soft">
              <Image src="/images/classroom.jpg" alt="A caring learning environment at Granny's Daycare Center" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBanner
        title="Come See It for Yourself"
        text="We'd love to show you around and answer your questions. Book a friendly tour of our center in Shell Obili, Yaoundé."
      />
    </>
  );
}
