import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
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

export default async function ContactPage() {
  const { site, contact, faqs } = await getContent();

  const info = [
    { h: "Address", v: site.address },
    { h: "Phone", v: site.phones.join(" · ") },
    { h: "Email", v: site.email },
    { h: "Opening Hours", v: site.hours },
  ];

  return (
    <>
      <PageHero crumb="Contact" title={contact.title}>{contact.intro}</PageHero>

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
            <ul className="mt-6 space-y-4">
              {info.map((i) => (
                <li key={i.h} className="border-l-2 border-brand pl-4">
                  <strong className="block text-sm">{i.h}</strong>
                  <span className="text-sm text-ink-soft">{i.v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2.5">
              {["Facebook", "Instagram", "WhatsApp", "X"].map((s) => (
                <a key={s} href="#" className="rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
                  {s}
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="left"><ContactForm /></FadeIn>
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
            <ul className="my-5 space-y-3">
              {["Simple, friendly enrollment process", "Flexible full-day, half-day & weekly plans", "A safe, loving space your child will love"].map((x) => (
                <li key={x} className="relative pl-7 text-ink-soft before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-brand before:content-['']">{x}</li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn direction="left"><EnrollForm /></FadeIn>
        </div>
      </section>

      {/* OPENING HOURS + HOW TO FIND US */}
      <section className="section bg-cream">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <FadeIn direction="right">
            <div className="card h-full">
              <span className="eyebrow mb-3">Opening hours</span>
              <h3 className="text-2xl font-bold">When We&apos;re Open</h3>
              <ul className="mt-4 divide-y divide-brand-soft">
                {contact.hours.map((r) => (
                  <li key={r.day} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-ink-soft">{r.day}</span>
                    <span className="font-semibold text-ink">{r.time}</span>
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
                {contact.findUs.map((x, i) => (
                  <li key={x} className="flex gap-3">
                    <span className="font-bold text-brand">{i + 1}.</span> {x}
                  </li>
                ))}
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

      {/* FAQ */}
      <section className="section bg-cream">
        <div className="container-x">
          <SectionHead eyebrow="Questions" title={<>Frequently Asked <span className="text-brand">Questions</span></>}>
            Can&apos;t find what you&apos;re looking for? Send us a message above and we&apos;ll be happy to help.
          </SectionHead>
          <FadeIn><Faq items={faqs} /></FadeIn>
        </div>
      </section>
    </>
  );
}
