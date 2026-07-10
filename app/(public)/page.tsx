import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { SectionHead, Colorful } from "@/components/ui";
import { ApproachOrbit } from "@/components/ApproachOrbit";
import { ProgramTabs } from "@/components/ProgramTabs";
import { DetailAccordion } from "@/components/DetailAccordion";
import { HomeContactForm } from "@/components/HomeContactForm";
import { getContent } from "@/lib/content-store";
import { site } from "@/lib/site";

// Two care highlight cards shown just under the hero.
const heroCards = [
  {
    icon: "🏠",
    title: "Full Year Childcare — Open All Year Round",
    text: "Safe, reliable care for babies, toddlers, and young children throughout the school year with a warm environment, caring staff, daily supervision, and fun learning activities.",
  },
  {
    icon: "🧺",
    title: "Flexible Care Plans — Hourly, Daily & Monthly Options",
    text: "Affordable childcare plans designed for every family's needs, with convenient schedules for working parents including short stays, full days, weekly care, and monthly enrollment options.",
  },
];

// Flexible care plans (Full Day / Half Day / Weekly).
const carePlans = [
  { name: "Full Day", img: "/images/gallery/g1.jpg", featured: true, cols: [["Time In", "07:00 AM"], ["Seats", "10"], ["Time out", "1–2 years"]] },
  { name: "Half Day", img: "/images/gallery/g2.jpg", featured: false, cols: [["Time", "09:00 AM"], ["Seats", "13"], ["Age", "3–4 years"]] },
  { name: "Weekly", img: "/images/gallery/g3.jpg", featured: false, cols: [["Day In", "Monday"], ["Seats", "07"], ["Day out", "Friday"]] },
];

// Gallery highlight cards.
const galleryCards = [
  { img: "/images/care.jpg", title: "Secure & Peaceful Environment", text: "Located in a fully fenced and gated apartment building, ensuring maximum safety and protection for every child." },
  { img: "/images/classroom.jpg", title: "Essential Care Facilities", text: "Equipped with a clean toilet, functional kitchen, and a dedicated office space for smooth daily operations." },
  { img: "/images/facility.jpg", title: "Enclosed Veranda Activities", text: "A wide, protected veranda designed for group activities, creativity sessions, and supervised fun." },
  { img: "/images/playground.jpg", title: "Spacious Learning & Play Hall", text: "A large hall thoughtfully organized into sleeping, learning, and play zones to support balanced child development." },
];

// Journal / blog cards.
const journalPosts = [
  { img: "/images/journal1.jpg", title: "Developing independence in children through simple self-care routines", text: "Children learn to tidy up, wash hands, organize belongings, and complete small tasks on their own." },
  { img: "/images/journal2.jpg", title: "Building confidence in young children through guided play activities", text: "Children gain self-esteem as they explore new games, solve simple challenges, and celebrate small achievements each day." },
  { img: "/images/journal3.jpg", title: "Encouraging kindness and sharing through group learning experiences", text: "We teach children how to care for others, share toys, and work together in a friendly environment." },
];

// Petals for the hero photo cluster — each teardrop points toward the centre.
const petals = [
  { src: "/images/care.jpg", alt: "A caregiver helping a child learn", pos: "rounded-[45%_45%_12%_45%]" },
  { src: "/images/classroom.jpg", alt: "Children playing together on the classroom rug", pos: "rounded-[45%_45%_45%_12%]" },
  { src: "/images/playground.jpg", alt: "Children enjoying outdoor play", pos: "rounded-[45%_12%_45%_45%]" },
  { src: "/images/facility.jpg", alt: "A happy child at Granny's Daycare Center", pos: "rounded-[12%_45%_45%_45%]" },
];

export default async function Home() {
  const { home } = await getContent();
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

      {/* HERO CARDS */}
      <section className="bg-peach/40 pb-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {heroCards.map((c) => (
            <FadeIn key={c.title} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-[1.75rem] bg-white p-6 shadow-card">
                <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-brand-soft text-2xl">{c.icon}</span>
                <div>
                  <h3 className="font-bold text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{c.text}</p>
                  <Link href="/program" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-orange">
                    Explore Activities <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
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
            Our programs are carefully structured to support children&apos;s growth, learning ability, and confidence based on their developmental stage.
          </SectionHead>
          <FadeInStagger className="grid gap-8 md:grid-cols-3">
            {carePlans.map((pl) => (
              <FadeInItem key={pl.name}>
                <div className={`card card-hover h-full text-center ${pl.featured ? "ring-2 ring-brand" : ""}`}>
                  <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-brand-soft shadow-card">
                    <Image src={pl.img} alt={pl.name} fill sizes="160px" className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">{pl.name}</h3>
                  <div className="my-5 flex justify-around border-y border-brand-soft py-4">
                    {pl.cols.map(([l, v], i) => (
                      <div key={l} className={i === 2 ? "font-bold" : ""}>
                        <div className="text-xs text-ink-muted">{l}</div>
                        <strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className={`btn w-full ${pl.featured ? "" : "btn-ghost"}`}>Book Now</Link>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map((d) => (
              <span key={d} className={`h-2.5 rounded-full transition-all ${d === 0 ? "w-6 bg-brand" : "w-2.5 bg-brand/25"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Programmes" title={<Colorful text="Our Amazing Programs" map={{ Amazing: "text-brand" }} />}>
            Our caring approach and thoughtfully designed programs set us apart, with small class sizes that ensure personal attention for every child.
          </SectionHead>
          <FadeIn><ProgramTabs /></FadeIn>
        </div>
      </section>

      {/* DETAILED DESCRIPTION */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Who we are" title={<Colorful text="Detailed Description of Granny's Daycare Center" map={{ Detailed: "text-brand", "Granny's": "text-accent-lime", Center: "text-accent-lime" }} />}>
            Join thousands of families who are discovering that when learning feels like play, anything is possible.
          </SectionHead>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <FadeIn direction="right">
              <div className="relative rounded-[2rem] bg-white p-8 shadow-soft">
                <span className="absolute right-8 top-8 text-4xl text-accent-coral">&rdquo;</span>
                <div className="flex items-center gap-2">
                  <span className="text-accent-yellow">★★★★★</span>
                  <strong className="text-lg">5.0</strong>
                  <span className="text-sm text-ink-muted">out of 5</span>
                </div>
                <p className="mt-5 text-lg font-semibold leading-relaxed text-ink">
                  Granny&apos;s Daycare Center is located in a secure gated apartment with a toilet, kitchen, office,
                  spacious hall, enclosed veranda, and grass yard. The hall includes sleeping, storage, dining, indoor
                  play, and study areas for children&apos;s comfort daily.
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <strong className="block">Kwenti Nancy</strong>
                    <span className="text-sm text-ink-muted">Founder | Owner</span>
                  </div>
                  <div className="flex -space-x-3">
                    {["/images/care.jpg", "/images/classroom.jpg"].map((s) => (
                      <span key={s} className="relative h-12 w-16 overflow-hidden rounded-xl ring-2 ring-white">
                        <Image src={s} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                {[0, 1, 2].map((d) => (
                  <span key={d} className={`h-2.5 rounded-full ${d === 0 ? "w-6 bg-brand" : "w-2.5 bg-brand/25"}`} />
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="left"><DetailAccordion /></FadeIn>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section bg-peach/40">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="eyebrow mb-4">📷 Our memories</span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              <Colorful text="Granny's Daycare Center Gallery" map={{ "Granny's": "text-brand", Center: "text-brand", Gallery: "text-accent-lime" }} />
            </h2>
            <p className="mt-3 text-ink-soft">
              A safe, warm, and thoughtfully designed early childhood environment where every child is nurtured, cared for, and guided through joyful learning experiences.
            </p>
          </div>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryCards.map((g) => (
              <FadeInItem key={g.title}>
                <article className="card card-hover h-full overflow-hidden p-0">
                  <div className="relative aspect-[4/3] bg-brand-soft">
                    <Image src={g.img} alt={g.title} fill sizes="(max-width: 768px) 90vw, 22vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink">{g.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-soft">{g.text}</p>
                  </div>
                </article>
              </FadeInItem>
            ))}
          </FadeInStagger>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHead eyebrow="Our journal" title={<Colorful text="Moments of Learning, Play, and Growth" map={{ Moments: "text-brand", "and Growth": "text-accent-lime" }} />}>
            Stay updated with the latest school news, classroom highlights and educational insights to support your child&apos;s learning journey.
          </SectionHead>
          <FadeInStagger className="grid gap-8 md:grid-cols-3">
            {journalPosts.map((b) => (
              <FadeInItem key={b.title}>
                <article className="h-full">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-brand-soft shadow-card">
                    <Image src={b.img} alt={b.title} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-ink-muted">
                    <span>Activities</span>
                    <span>Feb 02, 2023</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{b.text}</p>
                  <Link href="/gallery" className="mt-3 inline-block text-sm font-semibold text-ink">Read More →</Link>
                </article>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section scroll-mt-24 bg-cream">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              <Colorful text="Contact us — we'd love to hear from you." map={{ "we'd love": "text-brand", "to hear": "text-accent-lime" }} />
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                { c: "bg-accent-sky/20 text-accent-sky", n: "677 172 979" },
                { c: "bg-accent-green/20 text-accent-green", n: "654 448 959" },
                { c: "bg-accent-yellow/25 text-[#d19b00]", n: "620 492 158" },
              ].map((p) => (
                <li key={p.n} className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-full ${p.c}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1Z" fill="currentColor"/></svg>
                  </span>
                  <a href={`tel:+237${p.n.replace(/\s/g, "")}`} className="text-lg font-semibold text-ink hover:text-brand">{p.n}</a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="text-sm text-ink-muted">Address</div>
              <div className="font-semibold text-brand">Shell Nsimeyong, Road going to Effoulan</div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-ink-muted">Email</div>
              <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-brand">{site.email}</a>
            </div>
            <div className="mt-6 flex gap-2.5">
              {["f", "in", "◎", "✕"].map((s, i) => (
                <a key={i} href="#" aria-label="social link" className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-card transition-colors hover:bg-brand hover:text-white">{s}</a>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="left"><HomeContactForm /></FadeIn>
        </div>
      </section>

      {/* CTA */}
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
    </>
  );
}
