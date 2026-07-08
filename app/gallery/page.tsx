import type { Metadata } from "next";
import Image from "next/image";
import { FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Granny's Daycare Center in Shell Obili, Yaoundé — moments of learning, play and growth captured in our warm, safe and loving environment.",
  alternates: { canonical: "/gallery" },
};

const spaces = [
  { ic: "🏡", tint: "tint-purple", h: "Secure & Playful", p: "A safe, gated home full of colour, comfort and joyful learning corners." },
  { ic: "🧩", tint: "tint-green", h: "Essential Care", p: "Everyday routines that build independence, comfort and confidence." },
  { ic: "🌳", tint: "tint-yellow", h: "Enclosed Veranda", p: "A protected outdoor space for fresh air, movement and discovery." },
  { ic: "🎨", tint: "tint-sky", h: "Learning & Play Hall", p: "A spacious hall for creative activities, group play and story time." },
];

const photos = [
  { src: "/images/gallery/g1.jpg", cap: "Outdoor play in the grass yard" },
  { src: "/images/gallery/g2.jpg", cap: "Story time together" },
  { src: "/images/gallery/g3.jpg", cap: "Arts & crafts" },
  { src: "/images/gallery/g4.jpg", cap: "Learning through play" },
  { src: "/images/gallery/g5.jpg", cap: "Group activities" },
  { src: "/images/gallery/g6.jpg", cap: "Music & movement" },
  { src: "/images/gallery/g7.jpg", cap: "Snack & nutrition time" },
  { src: "/images/gallery/g8.jpg", cap: "Rest & cozy corner" },
  { src: "/images/gallery/g9.jpg", cap: "Nature exploration" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero crumb="Gallery" title={<>Granny&apos;s Daycare Center <span className="text-brand">Gallery</span></>}>
        A safe, warm and thoughtfully designed environment where every child is nurtured, cared for and guided through
        joyful learning experiences. Take a peek into our happy days.
      </PageHero>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Our spaces" title={<>A Warm, Nurturing <span className="text-brand">Environment</span></>} />
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {spaces.map((s) => (
              <FadeInItem key={s.h}>
                <div className="card card-hover h-full">
                  <span className={`icon-chip ${s.tint} mb-4 h-14 w-14`}>{s.ic}</span>
                  <h3 className="text-lg font-bold">{s.h}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{s.p}</p>
                </div>
              </FadeInItem>
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
            {photos.map((p) => (
              <FadeInItem key={p.src}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-soft shadow-card">
                  <Image src={p.src} alt={p.cap} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-8 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {p.cap}
                  </figcaption>
                </figure>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Real photos coming soon — drop your images into <code className="rounded bg-brand-soft px-1.5 py-0.5">public/images/gallery/</code> to replace these illustrations.
          </p>
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
