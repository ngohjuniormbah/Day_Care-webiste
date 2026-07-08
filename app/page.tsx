import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, SectionHead } from "@/components/ui";

const trust = [
  { ic: "🏡", tint: "tint-purple", h: "Safe Environment", p: "Secure, gated premises with a caring, watchful team." },
  { ic: "🧑‍🏫", tint: "tint-green", h: "Qualified Staff", p: "Warm educators trained in early-childhood care." },
  { ic: "🍎", tint: "tint-yellow", h: "Healthy Meals", p: "Nutritious, freshly prepared snacks and meals." },
  { ic: "🕑", tint: "tint-coral", h: "Flexible Hours", p: "Open all year with hourly, daily & weekly options." },
];

const approach = [
  { ic: "🎨", tint: "tint-purple", h: "Playful Learning", p: "Fun, curiosity-led play that builds early literacy, numeracy and imagination." },
  { ic: "🌳", tint: "tint-green", h: "Outdoor Learning", p: "Fresh air, movement and nature-based exploration every single day." },
  { ic: "🧩", tint: "tint-yellow", h: "Creative Discovery", p: "Hands-on arts, music and sensory activities that spark creativity." },
  { ic: "❤️", tint: "tint-coral", h: "Enriching Activities", p: "A rich programme built for social, emotional and physical growth." },
  { ic: "📚", tint: "tint-sky", h: "Modern Resources", p: "Age-appropriate books, toys and tools that grow with your child." },
  { ic: "🤸", tint: "tint-purple", h: "Active Playtime", p: "Guided movement and play that supports healthy development." },
];

const plans = [
  { ic: "🌤️", tint: "tint-yellow", name: "Full Day", price: "30,000", unit: "FCFA / month", a: ["07:00–18:00", "1–5 yrs"], f: ["Meals & snacks included", "Nap & rest time", "Full learning programme"], featured: false },
  { ic: "☀️", tint: "tint-purple", name: "Half Day", price: "18,000", unit: "FCFA / month", a: ["08:00–13:00", "2–4 yrs"], f: ["Morning snack included", "Play-based learning", "Creative activities"], featured: true },
  { ic: "📅", tint: "tint-green", name: "Weekly", price: "9,000", unit: "FCFA / week", a: ["Mon–Fri", "1–5 yrs"], f: ["Flexible weekly booking", "Meals & snacks included", "Perfect for busy weeks"], featured: false },
];

const testimonials = [
  { av: "A", n: "Aïcha N.", r: "Parent, Obili", t: "Granny's Daycare feels like a second home for my daughter. The staff are warm, attentive and truly caring. I never worry when she's here." },
  { av: "P", n: "Paul M.", r: "Parent, Yaoundé", t: "The learning programme is wonderful. My son has grown so confident and comes home excited to share what he learned each day." },
  { av: "S", n: "Sandrine K.", r: "Parent, Efoulan", t: "Clean, safe and full of love. The flexible hours are perfect for our family. I recommend Granny's to every parent I know." },
];

const journal = [
  { img: "/images/gallery/g4.svg", meta: "Development · Mar 2026", h: "Developing independence through simple self-care routines", p: "Small daily habits build confidence and self-reliance in young children." },
  { img: "/images/gallery/g5.svg", meta: "Play · Mar 2026", h: "Building confidence in young children through guided play", p: "How structured play helps children take healthy social and emotional risks." },
  { img: "/images/gallery/g6.svg", meta: "Values · Mar 2026", h: "Encouraging kindness and sharing through group experiences", p: "Everyday moments that nurture empathy and cooperation in early years." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn once direction="right">
            <span className="eyebrow mb-4">🌟 Trusted childcare in Yaoundé</span>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              A Safe &amp; <span className="text-brand">Loving</span> Place for Your Child to{" "}
              <span className="text-brand">Learn</span>, Play &amp; Grow
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">
              At Granny&apos;s Daycare Center we provide a warm, secure and nurturing environment where your little ones
              grow with confidence — every day is a blend of fun and learning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link href="/contact" className="btn btn-lg">Get in Touch</Link>
              <Link href="/program" className="btn btn-ghost btn-lg">Explore Programs</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-8">
              {[["150+", "Happy children"], ["12+", "Caring educators"], ["8+", "Years of care"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold text-ink">{n}</div>
                  <div className="text-sm text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn once direction="left" className="relative">
            <div className="absolute inset-0 m-auto w-[92%] rounded-full bg-gradient-to-br from-brand-soft to-transparent blur-2xl" />
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[40%_40%_46%_46%/46%] bg-brand-soft shadow-soft">
              <Image src="/images/hero.svg" alt="A caregiver reading with happy children at Granny's Daycare Center" fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
            </div>
            <div className="absolute left-0 top-[8%] flex animate-floaty items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-card">
              <span className="icon-chip tint-green h-9 w-9">🌳</span>
              <span>Outdoor Learning<span className="block text-xs font-normal text-ink-muted">Fresh air &amp; play</span></span>
            </div>
            <div className="absolute -right-2 bottom-[14%] flex animate-floaty items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-card [animation-delay:1.4s]">
              <span className="icon-chip tint-yellow h-9 w-9">🛡️</span>
              <span>Full Childcare<span className="block text-xs font-normal text-ink-muted">Open all year round</span></span>
            </div>
          </FadeIn>
        </div>

        {/* TRUST BAR */}
        <div className="container-x mt-12">
          <FadeInStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <FadeInItem key={t.h}>
                <div className="card flex items-start gap-4">
                  <span className={`icon-chip ${t.tint} h-11 w-11 text-xl`}>{t.ic}</span>
                  <div>
                    <h4 className="font-bold">{t.h}</h4>
                    <p className="mt-1 text-sm text-ink-soft">{t.p}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our approach" title={<>Our Unique <span className="text-brand">Learning Approach</span> for Young Minds</>}>
            A caring approach and thoughtfully designed programmes set us apart, with small age steps that ensure precious attention for every child.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {approach.map((a) => (
              <FadeInItem key={a.h}>
                <div className="card card-hover h-full">
                  <span className={`icon-chip ${a.tint} mb-4 h-14 w-14`}>{a.ic}</span>
                  <h3 className="text-lg font-bold">{a.h}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{a.p}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CARE PLANS */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Flexible care" title={<>Easy Drop-Off &amp; Pick-Up for <span className="text-brand">Every Family</span></>}>
            Our plans are carefully structured to support children of every learning ability, based on their developmental stage.
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

      {/* PROGRAMS PREVIEW */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Programmes" title={<>Our Amazing <span className="text-brand">Programs</span></>}>
            Our caring approach and thoughtfully designed programmes set us apart, with small age steps that ensure precious attention for every child.
          </SectionHead>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <FadeIn direction="right">
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl2 bg-brand-soft shadow-soft">
                <Image src="/images/classroom.svg" alt="Toddlers exploring during a play-based learning session" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold text-brand-dark">⏱ 2 Classes daily</span>
              <h3 className="text-2xl font-bold">Learning Through Play</h3>
              <p className="mt-2 text-ink-soft">
                Our infant &amp; toddler programme is designed to provide loving care, comfort and a safe, warm space for
                the little ones — right from the start. Through gentle play, sensory activities and a climate of respect,
                we help children safely explore their world while soaking in trust, comfort and confidence.
              </p>
              <ul className="my-4 grid grid-cols-2 gap-y-2 text-sm text-ink-soft">
                {["Fun Free Days", "Creative learning", "Part-Time Care", "Age-based groups", "Overnight Naps", "Creative play"].map((x) => (
                  <li key={x} className="relative pl-6 before:absolute before:left-0 before:text-accent-yellow before:content-['★']">{x}</li>
                ))}
              </ul>
              <Link href="/program" className="btn">Explore Programs</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Loved by families" title={<>What <span className="text-brand">Parents</span> Say</>} />
          <FadeInStagger className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <FadeInItem key={t.n}>
                <div className="card h-full">
                  <div className="mb-2 text-accent-yellow">★★★★★</div>
                  <p className="italic text-ink-soft">&ldquo;{t.t}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft font-bold text-brand">{t.av}</span>
                    <div>
                      <strong className="block text-sm">{t.n}</strong>
                      <span className="text-xs text-ink-muted">{t.r}</span>
                    </div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our journal" title={<>Moments of <span className="text-brand">Learning</span>, Play, and Growth</>}>
            Stay updated with the latest school news, classroom highlights and educational insights to support your child&apos;s learning journey.
          </SectionHead>
          <FadeInStagger className="grid gap-8 md:grid-cols-3">
            {journal.map((b) => (
              <FadeInItem key={b.h}>
                <article className="card card-hover h-full overflow-hidden p-0">
                  <div className="relative aspect-[16/10] bg-brand-soft">
                    <Image src={b.img} alt={b.h} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wide text-ink-muted">{b.meta}</span>
                    <h3 className="mt-2 text-lg font-bold">{b.h}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{b.p}</p>
                    <Link href="/gallery" className="mt-2 inline-block text-sm font-semibold text-brand">Read More →</Link>
                  </div>
                </article>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <CtaBanner
        title="Ready to Give Your Child the Best Start?"
        text="Book a visit to Granny's Daycare Center in Shell Obili, Yaoundé and see the warm, joyful space where your child will learn, play and grow."
      />
    </>
  );
}
