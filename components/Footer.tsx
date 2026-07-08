import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

const socials = [
  { label: "Facebook", icon: "f" },
  { label: "Instagram", icon: "◎" },
  { label: "WhatsApp", icon: "✆" },
  { label: "X", icon: "✕" },
];

export function Footer() {
  return (
    <footer className="bg-[#241d38] pt-16 text-[#cfc8e0]">
      <div className="container-x grid gap-8 pb-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/favicon.svg" alt="" width={42} height={42} />
            <span className="leading-tight">
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9d95b8]">
                Granny&apos;s
              </span>
              <span className="block font-bold text-white">Daycare Center</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-[#b8b0cc]">
            {site.tagline} — a safe, loving space where children learn, play and grow in Yaoundé, Cameroon.
          </p>
          <div className="mt-4 flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-brand"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[#b8b0cc] transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Programs</h4>
          <ul className="space-y-2 text-sm">
            {["Full Day Care", "Half Day Care", "Weekly Care", "Learning Through Play"].map((p) => (
              <li key={p}>
                <Link href="/program" className="text-[#b8b0cc] transition-colors hover:text-white">
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-[#b8b0cc]">
            <li>📍 {site.address}</li>
            {site.phones.map((ph) => (
              <li key={ph}>
                <a href={`tel:${ph.replace(/\s/g, "")}`} className="hover:text-white">
                  📞 {ph}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                ✉ {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-8 border-t border-white/10 py-6 text-center text-sm text-[#9d95b8]">
        © {new Date().getFullYear()} {site.name} · {site.address}. All rights reserved.
      </div>
    </footer>
  );
}
