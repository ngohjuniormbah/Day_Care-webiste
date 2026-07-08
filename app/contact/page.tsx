import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, SectionHead } from "@/components/ui";
import { ContactForm, EnrollForm } from "@/components/Forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Granny's Daycare Center in Shell Obili, Yaoundé, Cameroon. Call, email or send a message to book a visit or enroll your child. Find us on the map.",
  alternates: { canonical: "/contact" },
};

const info = [
  { ic: "📍", tint: "tint-purple", h: "Address", v: site.address },
  { ic: "📞", tint: "tint-green", h: "Phone", v: site.phones.join(" · ") },
  { ic: "✉️", tint: "tint-sky", h: "Email", v: site.email },
  { ic: "🕑", tint: "tint-yellow", h: "Opening Hours", v: site.hours },
];

export default function ContactPage() {
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
              We&apos;re located in a secure, gated home in Shell Obili, Yaoundé. Drop by for a tour, or contact us any time
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

      {/* MAP */}
      <section className="section bg-cream">
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
    </>
  );
}
