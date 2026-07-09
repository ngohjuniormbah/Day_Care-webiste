import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, SectionHead, AccentCard } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getContent } from "@/lib/content-store";

export default async function Home() {
  const { home, faqs } = await getContent();
  const { hero } = home;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn once direction="right">
            {hero.badge && <span className="eyebrow mb-4">{hero.badge}</span>}
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {hero.title} <span className="text-brand">{hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">{hero.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link href="/contact" className="btn btn-lg">Get in Touch</Link>
              <Link href="/program" className="btn btn-ghost btn-lg">Explore Programs</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-8">
              {hero.stats.map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-ink">{s.n}</div>
                  <div className="text-sm text-ink-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn once direction="left" className="relative">
            <div className="absolute inset-0 m-auto w-[92%] rounded-full bg-gradient-to-br from-brand-soft to-transparent blur-2xl" />
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[40%_40%_46%_46%/46%] bg-brand-soft shadow-soft">
              <Image src="/images/hero.jpg" alt="A caregiver with happy children at Granny's Daycare Center" fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
            </div>
            {/* Clean text-only floating labels (no icons) */}
            <div className="absolute left-0 top-[10%] animate-floaty rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-card">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent-green" />Outdoor Learning</span>
              <span className="mt-0.5 block text-xs font-normal text-ink-muted">Fresh air &amp; play every day</span>
            </div>
            <div className="absolute -right-2 bottom-[16%] animate-floaty rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-card [animation-delay:1.4s]">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" />Full Childcare</span>
              <span className="mt-0.5 block text-xs font-normal text-ink-muted">Open all year round</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our approach" title={<>Our Unique <span className="text-brand">Learning Approach</span> for Young Minds</>}>
            A caring approach and thoughtfully designed programmes set us apart, with small age steps that ensure precious attention for every child.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.approach.map((a) => (
              <FadeInItem key={a.title}><AccentCard title={a.title} text={a.text} /></FadeInItem>
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

      {/* DAILY RHYTHM */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Daily rhythm" title={<>A Typical Day at <span className="text-brand">Granny&apos;s</span></>}>
            A gentle, predictable routine that helps children feel safe, settled and ready to learn and play.
          </SectionHead>
          <FadeInStagger className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {home.schedule.map((s) => (
              <FadeInItem key={s.time}>
                <div className="card flex items-start gap-4">
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-brand" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand">{s.time}</span>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-soft">{s.text}</p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Programmes" title={<>Our Amazing <span className="text-brand">Programs</span></>}>
            Our caring approach and thoughtfully designed programmes set us apart, with small age steps that ensure precious attention for every child.
          </SectionHead>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <FadeIn direction="right">
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl2 bg-brand-soft shadow-soft">
                <Image src="/images/classroom.jpg" alt="Toddlers exploring during a play-based learning session" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <span className="mb-2 inline-block rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold text-brand-dark">2 classes daily</span>
              <h3 className="text-2xl font-bold">Learning Through Play</h3>
              <p className="mt-2 text-ink-soft">
                Our infant &amp; toddler programme is designed to provide loving care, comfort and a safe, warm space for
                the little ones — right from the start. Through gentle play, sensory activities and a climate of respect,
                we help children safely explore their world while soaking in trust, comfort and confidence.
              </p>
              <ul className="my-4 grid grid-cols-2 gap-y-2 text-sm text-ink-soft">
                {["Fun Free Days", "Creative learning", "Part-Time Care", "Age-based groups", "Overnight Naps", "Creative play"].map((x) => (
                  <li key={x} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand before:content-['']">{x}</li>
                ))}
              </ul>
              <Link href="/program" className="btn">Explore Programs</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHY PARENTS CHOOSE US */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <FadeIn direction="right">
            <span className="eyebrow mb-3">Why families trust us</span>
            <h2 className="text-3xl font-extrabold">{home.why.title}</h2>
            <p className="mt-3 text-ink-soft">{home.why.text}</p>
            <ul className="my-5 space-y-3">
              {home.why.bullets.map((x) => (
                <li key={x} className="relative pl-7 text-ink-soft before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-brand before:content-['']">{x}</li>
              ))}
            </ul>
            <Link href="/about" className="btn">Learn More About Us</Link>
          </FadeIn>
          <FadeIn direction="left">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl2 bg-brand-soft shadow-soft">
              <Image src="/images/about-story.jpg" alt="Granny's Daycare Center premises in Shell Obili" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[["100%", "Safe & secure"], ["1:5", "Care ratio"], ["5.0", "Parent rating"]].map(([n, l]) => (
                <div key={l} className="card py-4">
                  <div className="text-xl font-bold text-brand">{n}</div>
                  <div className="text-xs text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HEALTH & SAFETY */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Health & safety" title={<>Your Child&apos;s Safety Comes <span className="text-brand">First</span></>}>
            Peace of mind for parents — every detail is designed to keep your little one safe, healthy and happy.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.safety.map((s) => (
              <FadeInItem key={s.title}><AccentCard title={s.title} text={s.text} center /></FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our team" title={<>Meet Our <span className="text-brand">Caring Team</span></>}>
            Warm, patient and qualified educators who love what they do — and love your children.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.team.map((m) => (
              <FadeInItem key={m.name}>
                <div className="card card-hover h-full text-center">
                  <span className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-brand-soft text-2xl font-bold text-brand">
                    {m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <h3 className="font-bold">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-brand">{m.role}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Loved by families" title={<>What <span className="text-brand">Parents</span> Say</>} />
          <FadeInStagger className="grid gap-6 md:grid-cols-3">
            {home.testimonials.map((t) => (
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

      {/* FAQ */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Good to know" title={<>Frequently Asked <span className="text-brand">Questions</span></>}>
            Everything you need to know before your child joins the Granny&apos;s family.
          </SectionHead>
          <FadeIn><Faq items={faqs} /></FadeIn>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Our journal" title={<>Moments of <span className="text-brand">Learning</span>, Play, and Growth</>}>
            Stay updated with the latest school news, classroom highlights and educational insights to support your child&apos;s learning journey.
          </SectionHead>
          <FadeInStagger className="grid gap-8 md:grid-cols-3">
            {home.journal.map((b) => (
              <FadeInItem key={b.title}>
                <article className="card card-hover h-full overflow-hidden p-0">
                  <div className="relative aspect-[16/10] bg-brand-soft">
                    <Image src={b.img} alt={b.title} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wide text-ink-muted">{b.meta}</span>
                    <h3 className="mt-2 text-lg font-bold">{b.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{b.text}</p>
                    <Link href="/gallery" className="mt-2 inline-block text-sm font-semibold text-brand">Read More →</Link>
                  </div>
                </article>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section bg-cream pt-0">
        <div className="container-x">
          <FadeIn>
            <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand to-brand-dark p-10 text-center text-white sm:p-12">
              <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10" />
              <h2 className="relative text-2xl font-extrabold sm:text-3xl">Stay in the Loop</h2>
              <p className="relative mx-auto mt-2 max-w-xl text-white/85">
                Join our newsletter for parenting tips, centre news and early-learning ideas — straight to your inbox.
              </p>
              <div className="relative mt-6"><NewsletterForm /></div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBanner
        title="Ready to Give Your Child the Best Start?"
        text="Book a visit to Granny's Daycare Center in Shell Obili, Yaoundé and see the warm, joyful space where your child will learn, play and grow."
      />
    </>
  );
}
