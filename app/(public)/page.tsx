import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, SectionHead, AccentCard, Colorful } from "@/components/ui";
import { ApproachOrbit } from "@/components/ApproachOrbit";
import { Faq } from "@/components/Faq";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getContent } from "@/lib/content-store";

// Petals for the hero photo cluster — each teardrop points toward the centre.
const petals = [
  { src: "/images/care.jpg", alt: "A caregiver helping a child learn", pos: "rounded-[45%_45%_12%_45%]" },
  { src: "/images/classroom.jpg", alt: "Children playing together on the classroom rug", pos: "rounded-[45%_45%_45%_12%]" },
  { src: "/images/playground.jpg", alt: "Children enjoying outdoor play", pos: "rounded-[45%_12%_45%_45%]" },
  { src: "/images/facility.jpg", alt: "A happy child at Granny's Daycare Center", pos: "rounded-[12%_45%_45%_45%]" },
];

export default async function Home() {
  const { home, faqs } = await getContent();
  const { hero } = home;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-peach/40 py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn once direction="right">
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              <Colorful
                text="A Safe & Loving Place for Your Child to Learn, Play & Grow"
                map={{
                  Safe: "text-accent-lime",
                  Loving: "text-brand",
                  "Your Child": "text-brand",
                  Learn: "text-accent-lime",
                  Grow: "text-accent-lime",
                }}
              />
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/contact" className="btn btn-lg">Get In Touch</Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#ffce4a", "#4fbf8b", "#6fb7e8", "#ff7a6b"].map((c) => (
                    <span key={c} className="h-9 w-9 rounded-full border-2 border-cream" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div>
                  <div className="text-sm text-accent-yellow">★★★★★</div>
                  <div className="text-xs font-semibold text-ink-muted">Happy Kids</div>
                </div>
              </div>
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
            <div className="absolute inset-0 m-auto w-[85%] rounded-full bg-gradient-to-br from-brand-soft to-transparent blur-2xl" />
            <div className="relative mx-auto grid aspect-square w-full max-w-[30rem] grid-cols-2 gap-2.5">
              {petals.map((p) => (
                <div key={p.src} className={`relative overflow-hidden shadow-card ${p.pos}`}>
                  <Image src={p.src} alt={p.alt} fill priority sizes="(max-width: 1024px) 45vw, 20vw" className="object-cover" />
                </div>
              ))}
            </div>
            {/* Floating label card */}
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 animate-floaty items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-yellow/25 text-lg">☀️</span>
              <span className="text-sm">
                <span className="block font-bold text-ink">Outdoor Learning</span>
                <span className="block text-xs text-ink-muted">Hands-on play that builds curiosity</span>
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHead eyebrow="Our approach" title={<Colorful text="Our Unique Learning Approach for Young Minds" map={{ Unique: "text-brand", Approach: "text-accent-lime", Minds: "text-accent-lime" }} />}>
            Our caring approach and thoughtfully designed programs set us apart, with small class sizes that ensure personal attention for every child.
          </SectionHead>
          <FadeIn><ApproachOrbit /></FadeIn>
        </div>
      </section>

      {/* CARE PLANS */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Flexible care" title={<Colorful text="Flexible Care Options — Easy Drop-Off & Pick-Up for Every Family" map={{ Flexible: "text-brand", Options: "text-accent-lime", "Drop-Off": "text-brand", "Every Family": "text-accent-lime" }} />}>
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
          <SectionHead eyebrow="Programmes" title={<Colorful text="Our Amazing Programs" map={{ Amazing: "text-brand" }} />}>
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
              <Image src="/images/about-story.jpg" alt="Granny's Daycare Center premises in Shell Nsimeyong" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
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
      <section id="faq" className="section scroll-mt-24 bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Good to know" title={<Colorful text="Frequently Asked Questions" map={{ Questions: "text-brand" }} />}>
            Everything you need to know before your child joins the Granny&apos;s family.
          </SectionHead>
          <FadeIn><Faq items={faqs} /></FadeIn>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Our journal" title={<Colorful text="Moments of Learning, Play, and Growth" map={{ Moments: "text-brand", "and Growth": "text-accent-lime" }} />}>
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
        text="Book a visit to Granny's Daycare Center in Shell Nsimeyong, Yaoundé and see the warm, joyful space where your child will learn, play and grow."
      />
    </>
  );
}
