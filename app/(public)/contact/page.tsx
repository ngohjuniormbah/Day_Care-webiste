import type { Metadata } from "next";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { PageHero, SectionHead } from "@/components/ui";
import { ContactForm, EnrollForm } from "@/components/Forms";
import { Faq } from "@/components/Faq";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Granny's Daycare Center in Shell Obili, Yaoundé, Cameroon. Call, email or send a message to book a visit or enroll your child. Find us on the map.",
  alternates: { canonical: "/contact" },
};

const hoursTable = [
  { d: "Monday – Friday", h: "07:00 – 18:00" },
  { d: "Saturday", h: "By appointment" },
  { d: "Sunday & public holidays", h: "Closed" },
];

const socials = [
  { label: "Facebook", icon: "f" },
  { label: "Instagram", icon: "◎" },
  { label: "WhatsApp", icon: "✆" },
  { label: "X", icon: "✕" },
];

export default async function ContactPage() {
  const { site, faqs } = await getContent();

  const info = [
    { ic: "📍", tint: "tint-purple", h: "Address", v: site.address },
    { ic: "📞", tint: "tint-green", h: "Phone", v: site.phones.join(" · ") },
    { ic: "✉️", tint: "tint-sky", h: "Email", v: site.email },
    { ic: "🕑", tint: "tint-yellow", h: "Opening Hours", v: site.hours },
  ];

  return (
    <>
      <PageHero crumb="Contact" title={<>Contact Us — <span className="text-brand">We&apos;d Love to Hear From You</span></>}>
        Have a question or ready to enroll your child? Reach out and a member of our team will get back to you promptly.
      </PageHero>

      {/* CONTACT + MESSAGE FORM */}
      <section className="section bg-cream">
        <div className="container-x grid items-start gap-10 md:grid-cols-[1fr_1.1fr]">
          <FadeIn direction="right">
            <span className="eyebrow mb-3">Get in touch</span>
            <h2 className="text-3xl font-extrabold">Visit Granny&apos;s Daycare Center</h2>
            <p className="mt-3 text-ink-soft">
              We&apos;re located in a secure, gated home in {site.address}. Drop by for a tour, or contact us any time
              during opening hours.
            </p>
            <ul className="mt-6 space-y-5">
              {info.map((i) => (
                <li key={i.h} className="flex items-start gap-4">
                  <span className={`icon-chip ${i.tint} h-11 w-11 flex-none text-lg`}>{i.ic}</span>
                  <div>
                    <strong className="block">{i.h}</strong>
                    <span className="text-sm text-ink-soft">{i.v}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand transition hover:bg-brand hover:text-white">
                  {s.icon}
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* ENROLLMENT */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x grid items-start gap-10 md:grid-cols-[1fr_1.1fr]">
          <FadeIn direction="right">
            <span className="eyebrow mb-3">Enrollment</span>
            <h2 className="text-3xl font-extrabold">Enroll Your Child Today</h2>
            <p className="mt-3 text-ink-soft">
              Ready to give your child the best start? Fill in the enrollment request and we&apos;ll be in touch within one
              business day to confirm availability and next steps.
            </p>
            <ul className="my-5 space-y-2">
              {["Simple, friendly enrollment process", "Flexible full-day, half-day & weekly plans", "A safe, loving space your child will love"].map((x) => (
                <li key={x} className="relative pl-8 text-ink-soft before:absolute before:left-0 before:top-0.5 before:grid before:h-5 before:w-5 before:place-items-center before:rounded-full before:bg-brand-soft before:text-xs before:font-bold before:text-brand before:content-['✓']">
                  {x}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn direction="left">
            <EnrollForm />
          </FadeIn>
        </div>
      </section>

      {/* NEW: OPENING HOURS + HOW TO FIND US */}
      <section className="section bg-cream">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <FadeIn direction="right">
            <div className="card h-full">
              <span className="eyebrow mb-3">Opening hours</span>
              <h3 className="text-2xl font-bold">When We&apos;re Open</h3>
              <ul className="mt-4 divide-y divide-brand-soft">
                {hoursTable.map((r) => (
                  <li key={r.d} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-ink-soft">{r.d}</span>
                    <span className="font-semibold text-ink">{r.h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div className="card h-full">
              <span className="eyebrow mb-3">How to find us</span>
              <h3 className="text-2xl font-bold">Getting Here</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                <li className="flex gap-3"><span className="text-brand">①</span> We&apos;re located near Shell Obili, easy to reach from across Yaoundé.</li>
                <li className="flex gap-3"><span className="text-brand">②</span> Look out for our secure, gated premises with the Granny&apos;s sign.</li>
                <li className="flex gap-3"><span className="text-brand">③</span> Free, safe drop-off and pick-up right at the entrance.</li>
                <li className="flex gap-3"><span className="text-brand">④</span> Call us on arrival and a caregiver will welcome you in.</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MAP */}
      <section className="section bg-gradient-to-b from-white to-brand-tint">
        <div className="container-x">
          <SectionHead eyebrow="Find us" title={<>We&apos;re in <span className="text-brand">Shell Obili, Yaoundé</span></>}>
            Located near Shell Obili in Yaoundé, Cameroon — easy to reach for families across the city.
          </SectionHead>
          <FadeIn>
            <div className="overflow-hidden rounded-xl2 border-[6px] border-white shadow-soft">
              <iframe
                title="Map of Granny's Daycare Center — Shell Obili, Yaoundé, Cameroon"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[360px] w-full border-0"
              />
            </div>
            <p className="mt-5 text-center">
              <a className="btn btn-ghost" href={site.mapLink} target="_blank" rel="noopener noreferrer">
                Open in Google Maps ↗
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* NEW: FAQ */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Questions" title={<>Frequently Asked <span className="text-brand">Questions</span></>}>
            Can&apos;t find what you&apos;re looking for? Send us a message above and we&apos;ll be happy to help.
          </SectionHead>
          <FadeIn>
            <Faq items={faqs} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
