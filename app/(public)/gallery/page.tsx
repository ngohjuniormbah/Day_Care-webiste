import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, Colorful } from "@/components/ui";
import { GalleryMemories } from "@/components/GalleryMemories";
import { ReadyCta } from "@/components/ReadyCta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Granny's Daycare Center in Shell Nsimeyong, Yaoundé — moments of learning, play and growth captured in our warm, safe and loving environment.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        title={<Colorful text="Granny's Daycare Center Gallery" map={{ "Granny's": "text-accent-lime", Center: "text-brand", Gallery: "text-brand" }} />}
      >
        Explore our beautiful moments, fun learning activities, playtime, celebrations, and daily experiences in a loving environment.
      </PageHero>

      <section className="section bg-peach/40">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow mb-4">📷 Our Memories</span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Granny&apos;s Daycare Center Gallery</h2>
            <p className="mt-3 text-ink-soft">
              Explore our beautiful moments, fun learning activities, playtime, celebrations, and daily experiences in a loving environment.
            </p>
          </div>
          <FadeIn><GalleryMemories /></FadeIn>
        </div>
      </section>

      <ReadyCta />
    </>
  );
}
