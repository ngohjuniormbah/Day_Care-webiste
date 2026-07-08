import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { CtaBanner, SectionHead } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getContent } from "@/lib/content-store";

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

const schedule = [
  { t: "07:00 – 08:30", ic: "🌅", h: "Warm Welcome & Free Play", p: "Gentle drop-off, hugs and open play as friends arrive." },
  { t: "08:30 – 09:00", ic: "🍎", h: "Morning Snack", p: "A healthy snack to fuel a busy morning of learning." },
  { t: "09:00 – 10:30", ic: "📚", h: "Learning Circle", p: "Stories, songs, letters, numbers and show-and-tell." },
  { t: "10:30 – 12:00", ic: "🎨", h: "Creative & Outdoor Play", p: "Arts, crafts and fresh-air play in the enclosed yard." },
  { t: "12:00 – 13:00", ic: "🍽️", h: "Lunch Time", p: "A warm, nutritious meal shared together." },
  { t: "13:00 – 15:00", ic: "😴", h: "Rest & Nap", p: "Quiet, cosy nap time in our dedicated rest area." },
  { t: "15:00 – 16:30", ic: "🧩", h: "Discovery & Games", p: "Puzzles, building blocks and small-group activities." },
  { t: "16:30 – 18:00", ic: "👋", h: "Wind-down & Pick-up", p: "Calm play, a daily recap and happy goodbyes." },
];

const safety = [
  { ic: "🔒", tint: "tint-purple", h: "Secure Access", p: "Gated premises with controlled entry and constant supervision." },
  { ic: "🧼", tint: "tint-green", h: "Clean & Hygienic", p: "Daily cleaning routines and healthy hygiene habits for all." },
  { ic: "⛑️", tint: "tint-coral", h: "First-Aid Ready", p: "Staff trained in child first-aid and emergency procedures." },
  { ic: "🍏", tint: "tint-yellow", h: "Balanced Nutrition", p: "Freshly prepared, balanced meals and allergy-aware menus." },
];

const team = [
  { av: "N", tint: "tint-purple", name: "Granny Hancy", role: "Founder & Lead Caregiver" },
  { av: "M", tint: "tint-green", name: "Mama Rose", role: "Toddler Room Teacher" },
  { av: "E", tint: "tint-coral", name: "Aunty Estelle", role: "Preschool Teacher" },
  { av: "B", tint: "tint-sky", name: "Aunty Brenda", role: "Infant Care Specialist" },
];

const journal = [
  { img: "/images/gallery/g4.jpg", meta: "Development · Mar 2026", h: "Developing independence through simple self-care routines", p: "Small daily habits build confidence and self-reliance in young children." },
  { img: "/images/gallery/g5.jpg", meta: "Play · Mar 2026", h: "Building confidence in young children through guided play", p: "How structured play helps children take healthy social and emotional risks." },
  { img: "/images/gallery/g6.jpg", meta: "Values · Mar 2026", h: "Encouraging kindness and sharing through group experiences", p: "Everyday moments that nurture empathy and cooperation in early years." },
];

export default async function Home() {
  const { hero, plans, testimonials, faqs } = await getContent();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn once direction="right">
            <span className="eyebrow mb-4">{hero.badge}</span>
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
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Most popular</span>
                  )}
                  <div className={`icon-chip ${pl.tint} mx-auto mb-3 h-16 w-16 rounded-full text-2xl`}>{pl.ic}</div>
                  <h3 className="text-2xl font-bold">{pl.name}</h3>
                  <div className="my-1 text-3xl font-bold text-brand">
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

      {/* NEW: A DAY AT GRANNY'S */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Daily rhythm" title={<>A Typical Day at <span className="text-brand">Granny&apos;s</span></>}>
            A gentle, predictable routine that helps children feel safe, settled and ready to learn and play.
          </SectionHead>
          <FadeInStagger className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {schedule.map((s) => (
              <FadeInItem key={s.t}>
                <div className="card flex items-start gap-4">
                  <span className="icon-chip tint-purple h-12 w-12 flex-none text-xl">{s.ic}</span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand">{s.t}</span>
                    <h3 className="font-bold">{s.h}</h3>
                    <p className="mt-0.5 text-sm text-ink-soft">{s.p}</p>
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

      {/* NEW: WHY PARENTS CHOOSE US */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x grid items-center gap-12 md:grid-cols-2">
          <FadeIn direction="right">
            <span className="eyebrow mb-3">Why families trust us</span>
            <h2 className="text-3xl font-extrabold">Why Parents Choose <span className="text-brand">Granny&apos;s</span></h2>
            <p className="mt-3 text-ink-soft">
              For years, families across Yaoundé have trusted us with their most precious little ones. Here&apos;s what
              makes Granny&apos;s different.
            </p>
            <ul className="my-5 space-y-3">
              {[
                "Warm, loving care that treats every child like family",
                "Small groups for real, personal attention",
                "A safe, secure and spotless environment",
                "Daily updates so you always know how your child is doing",
                "Flexible plans that fit around your work and budget",
              ].map((x) => (
                <li key={x} className="relative pl-8 text-ink-soft before:absolute before:left-0 before:top-0.5 before:grid before:h-5 before:w-5 before:place-items-center before:rounded-full before:bg-brand-soft before:text-xs before:font-bold before:text-brand before:content-['✓']">{x}</li>
              ))}
            </ul>
            <Link href="/about" className="btn">Learn More About Us</Link>
          </FadeIn>
          <FadeIn direction="left">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl2 bg-brand-soft shadow-soft">
              <Image src="/images/about-story.jpg" alt="Granny's Daycare Center premises in Shell Obili" fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[["100%", "Safe & secure"], ["1:5", "Care ratio"], ["★ 5.0", "Parent rating"]].map(([n, l]) => (
                <div key={l} className="card py-4">
                  <div className="text-xl font-bold text-brand">{n}</div>
                  <div className="text-xs text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* NEW: HEALTH & SAFETY */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Health & safety" title={<>Your Child&apos;s Safety Comes <span className="text-brand">First</span></>}>
            Peace of mind for parents — every detail is designed to keep your little one safe, healthy and happy.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {safety.map((s) => (
              <FadeInItem key={s.h}>
                <div className="card card-hover h-full text-center">
                  <span className={`icon-chip ${s.tint} mx-auto mb-4 h-14 w-14`}>{s.ic}</span>
                  <h3 className="font-bold">{s.h}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{s.p}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* NEW: MEET THE TEAM */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Our team" title={<>Meet Our <span className="text-brand">Caring Team</span></>}>
            Warm, patient and qualified educators who love what they do — and love your children.
          </SectionHead>
          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <FadeInItem key={m.name}>
                <div className="card card-hover h-full text-center">
                  <span className={`icon-chip ${m.tint} mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full text-2xl font-bold`}>{m.av}</span>
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

      {/* NEW: FAQ */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Good to know" title={<>Frequently Asked <span className="text-brand">Questions</span></>}>
            Everything you need to know before your child joins the Granny&apos;s family.
          </SectionHead>
          <FadeIn>
            <Faq items={faqs} />
          </FadeIn>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="section bg-cream">
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

      {/* NEW: NEWSLETTER */}
      <section className="section bg-cream pt-0">
        <div className="container-x">
          <FadeIn>
            <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand to-brand-dark p-10 text-center text-white sm:p-12">
              <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10" />
              <h2 className="relative text-2xl font-extrabold sm:text-3xl">Stay in the Loop</h2>
              <p className="relative mx-auto mt-2 max-w-xl text-white/85">
                Join our newsletter for parenting tips, centre news and early-learning ideas — straight to your inbox.
              </p>
              <div className="relative mt-6">
                <NewsletterForm />
              </div>
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
