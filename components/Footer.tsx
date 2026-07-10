import Link from "next/link";
import { site as siteDefaults } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { FooterNewsletter } from "@/components/FooterNewsletter";

type Info = { tagline: string; address: string; phones: string[]; email: string; name: string };

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Our Programs", href: "/program" },
      { label: "Gallery", href: "/gallery" },
      { label: "About Us", href: "/about" },
      { label: "Classes & Lessons", href: "/program" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Parenting Tips", href: "/about" },
      { label: "Our Approach", href: "/about" },
      { label: "Safety & Care", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Enrollment Info", href: "/contact" },
      { label: "Parent Support", href: "/contact" },
      { label: "FAQs", href: "/contact" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "#", bg: "bg-cream", fg: "text-brand", glyph: "f" },
  { label: "Twitter", href: "#", bg: "bg-accent-lime", fg: "text-white", glyph: "𝕏" },
  { label: "Instagram", href: "#", bg: "bg-brand", fg: "text-white", glyph: "◎" },
  { label: "LinkedIn", href: "#", bg: "bg-peach", fg: "text-ink", glyph: "in" },
];

export function Footer({ info }: { info?: Info }) {
  const site = { ...siteDefaults, ...info };
  return (
    <footer className="bg-lilac text-ink">
      <div className="container-x py-14">
        {/* Top row: logo · pitch · newsletter */}
        <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <Logo subtitleClass="text-ink" />
          <p className="text-center font-bold text-ink lg:px-6">
            Trusted programs for your child&apos;s growth and confidence.
          </p>
          <div className="flex justify-center lg:justify-end">
            <FooterNewsletter />
          </div>
        </div>

        <hr className="my-10 border-white/40" />

        {/* Link columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3.5 py-1.5 text-xs font-semibold text-ink">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-accent-green text-[9px] text-white">✓</span>
              Trusted Early Learning
            </span>
            <p className="mt-5 max-w-[14rem] text-2xl font-extrabold leading-snug text-ink">
              Nurturing Young Minds for a Brighter Future
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 font-bold text-ink">{col.heading}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-ink/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social 2x2 grid */}
          <div className="grid h-fit w-[7.5rem] grid-cols-2 gap-1.5 overflow-hidden rounded-2xl bg-white/40 p-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`grid h-14 w-14 place-items-center rounded-xl text-lg font-bold transition-transform hover:scale-95 ${s.bg} ${s.fg}`}
              >
                {s.glyph}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/40">
        <div className="container-x flex flex-col items-center gap-3 py-5 text-sm text-ink/80 md:flex-row md:justify-between">
          <span>All rights reserved © {site.name} · {new Date().getFullYear()}</span>
          <span className="font-semibold text-ink">Shell Nsimeyong, Road going to Effoulan</span>
          <span className="flex gap-4">
            <Link href="/about" className="hover:text-white">Terms of Use</Link>
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
            <Link href="/gallery" className="hover:text-white">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
