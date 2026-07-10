import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

// "Ready to Give Your Child the Best Start" call-to-action from the mockup.
export function ReadyCta() {
  return (
    <section className="section bg-peach/40">
      <div className="container-x grid items-stretch gap-6 md:grid-cols-3">
        <FadeIn direction="right" className="hidden md:block">
          <div className="relative h-full min-h-[16rem] overflow-hidden rounded-[2rem] bg-brand-soft shadow-card">
            <Image src="/images/cta-left.jpg" alt="A happy child playing at Granny's Daycare Center" fill sizes="30vw" className="object-cover" />
          </div>
        </FadeIn>
        <FadeIn>
          <div className="flex h-full flex-col items-center justify-center rounded-[2rem] bg-brand-tint px-6 py-12 text-center">
            <div className="flex -space-x-2">
              {["#ff7a6b", "#f47b2a", "#7c5cff", "#4fbf8b", "#6fb7e8"].map((c) => (
                <span key={c} className="h-9 w-9 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              We have 50+ satisfied parents who trust us with the care, safety, and development of their children.
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight">Ready to Give<br />Your Child the<br />Best Start</h2>
            <Link href="/contact" className="btn btn-lg mt-7">Schedule a Tour</Link>
          </div>
        </FadeIn>
        <FadeIn direction="left" className="hidden md:block">
          <div className="relative h-full min-h-[16rem] overflow-hidden rounded-[2rem] bg-brand-soft shadow-card">
            <Image src="/images/cta-right.jpg" alt="A child painting at Granny's Daycare Center" fill sizes="30vw" className="object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
