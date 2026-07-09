import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, PageHero, SectionHead, AccentCard } from "@/components/ui";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Granny's Daycare Center in Shell Obili, Yaoundé — moments of learning, play and growth captured in our warm, safe and loving environment.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const { gallery } = await getContent();

  return (
    <>
      <PageHero crumb="Gallery" title={gallery.title}>{gallery.intro}</PageHero>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Our spaces" title={<>A Warm, Nurturing <span className="text-brand">Environment</span></>} />
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.spaces.map((s) => (
              <FadeInItem key={s.title}><AccentCard title={s.title} text={s.text} /></FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Photo gallery" title={<>Moments of <span className="text-brand">Learning</span>, Play &amp; Growth</>}>
            Snapshots from a typical day at Granny&apos;s Daycare Center in Shell Obili, Yaoundé.
          </SectionHead>
          <FadeInStagger gap={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.photos.map((p) => (
              <FadeInItem key={p.src + p.cap}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-soft shadow-card">
                  <Image src={p.src} alt={p.cap} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-8 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {p.cap}
                  </figcaption>
                </figure>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="What you'll see" title={<>Every Corner Made for <span className="text-brand">Little Ones</span></>}>
            A tour of Granny&apos;s reveals thoughtful spaces designed around comfort, safety and joyful learning.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.whatYoullSee.map((s) => (
              <FadeInItem key={s.title}><AccentCard title={s.title} text={s.text} /></FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <FadeIn className="mx-auto max-w-xl text-center">
            <span className="eyebrow mb-3">Stay connected</span>
            <h2 className="text-3xl font-extrabold">Follow Our <span className="text-brand">Daily Adventures</span></h2>
            <p className="mt-3 text-ink-soft">
              We share the sweetest moments, learning tips and centre news on social media. Come say hello!
            </p>
            <div className="mt-5 flex justify-center gap-3">
              {["Facebook", "Instagram", "WhatsApp", "X"].map((s) => (
                <a key={s} href="#" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-card transition hover:-translate-y-1 hover:bg-brand hover:text-white">
                  {s}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBanner
        title="Want to See It in Person?"
        text="Pictures tell part of the story — a visit tells the rest. Come feel the warmth of Granny's Daycare Center for yourself."
        cta="Book a Tour"
      />
    </>
  );
}
