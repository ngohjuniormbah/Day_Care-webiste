import Image from "next/image";
import type { CSSProperties } from "react";

type Icon = "puzzle" | "palette" | "sun" | "monitor";
type Tint = "green" | "orange" | "yellow" | "sky";

type Feature = {
  title: string;
  text: string;
  icon: Icon;
  tint: Tint;
  side: "left" | "right";
  coord: CSSProperties; // desktop absolute position
};

// Nine feature cards arranged around the central photo, matching the mockup.
const features: Feature[] = [
  { title: "Playful Learning", text: "Fun, play-based activities that make learning engaging and innovative.", icon: "puzzle", tint: "green", side: "left", coord: { top: 8, left: 0 } },
  { title: "Enriching Activities", text: "Creative experiences that support learning and development.", icon: "palette", tint: "orange", side: "left", coord: { top: 196, left: 40 } },
  { title: "Creative Discovery", text: "Hands-on activities that inspire curiosity, imagination, and joyful learning every day.", icon: "puzzle", tint: "green", side: "left", coord: { top: 392, left: 4 } },
  { title: "Safe Exploration", text: "Fun experiences designed to help children learn confidently in a secure environment.", icon: "palette", tint: "orange", side: "left", coord: { top: 580, left: 40 } },
  { title: "Outdoor Learning", text: "Hands-on outdoor play that builds curiosity and physical skills.", icon: "sun", tint: "yellow", side: "right", coord: { top: 100, right: 0 } },
  { title: "Modern Resources", text: "Age-appropriate tools that enhance interactive learning.", icon: "monitor", tint: "sky", side: "right", coord: { top: 288, right: 32 } },
  { title: "Active Playtime", text: "Movement-based games that support healthy growth, balance, and coordination.", icon: "sun", tint: "yellow", side: "right", coord: { top: 462, right: 16 } },
  { title: "Smart Steps", text: "Simple learning experiences that strengthen thinking and problem-solving skills.", icon: "monitor", tint: "sky", side: "right", coord: { top: 616, right: 40 } },
  { title: "Bright Beginnings", text: "Early learning programs that prepare children for future academic success.", icon: "monitor", tint: "sky", side: "left", coord: { top: 690, left: "50%", marginLeft: -120 } },
];

const tintClass: Record<Tint, string> = {
  green: "bg-[#e2f6ec] text-[#2f8c63]",
  orange: "bg-[#ffe6d6] text-[#e07a2c]",
  yellow: "bg-[#fff2cf] text-[#e0a400]",
  sky: "bg-[#e2f0fb] text-[#3a86c8]",
};

function Glyph({ icon }: { icon: Icon }) {
  const s = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "sun")
    return (
      <svg {...s} aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    );
  if (icon === "monitor")
    return (
      <svg {...s} aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
    );
  if (icon === "palette")
    return (
      <svg {...s} aria-hidden="true"><path d="M12 3a9 9 0 0 0 0 18c1 0 1.5-.8 1.5-1.5 0-.5-.3-.9-.3-1.4 0-.6.5-1.1 1.1-1.1H16a5 5 0 0 0 5-5c0-4.4-4-9-9-9Z" /><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none" /></svg>
    );
  return (
    <svg {...s} aria-hidden="true"><path d="M10 3v2.5a1.5 1.5 0 1 0 3 0V3h4v4h-1.5a1.5 1.5 0 1 0 0 3H21v4h-4v-1.5a1.5 1.5 0 1 0-3 0V17h-4v-4H8.5a1.5 1.5 0 1 0 0-3H10" /></svg>
  );
}

function CardInner({ f }: { f: Feature }) {
  return (
    <div className={`flex items-start gap-3 ${f.side === "left" ? "flex-row-reverse text-right" : ""}`}>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tintClass[f.tint]}`}>
        <Glyph icon={f.icon} />
      </span>
      <div>
        <h3 className="text-[0.95rem] font-bold text-ink">{f.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{f.text}</p>
      </div>
    </div>
  );
}

export function ApproachOrbit() {
  return (
    <>
      {/* Desktop: orbital layout (absolute positions via inline styles) */}
      <div className="relative mx-auto hidden h-[760px] w-full max-w-5xl lg:block">
        {/* Orbit rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-[10px] border-peach/70" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-brand/20" />

        {/* Center photo */}
        <div className="absolute left-1/2 top-6 h-[640px] w-[300px] -translate-x-1/2 overflow-hidden rounded-[9rem_9rem_2.5rem_2.5rem] bg-brand-soft shadow-soft ring-4 ring-white">
          <Image src="/images/approach-center.jpg" alt="Granny with a child at the daycare" fill sizes="300px" className="object-cover object-top" />
        </div>

        {features.map((f, i) => (
          <div
            key={f.title}
            className="absolute w-[15rem] animate-floaty rounded-2xl bg-white p-4 shadow-soft [animation-duration:6s]"
            style={{ ...f.coord, animationDelay: `${(i % 4) * 0.5}s` }}
          >
            <CardInner f={f} />
          </div>
        ))}
      </div>

      {/* Mobile / tablet: photo + card grid */}
      <div className="lg:hidden">
        <div className="mx-auto mb-8 h-[380px] w-[220px] overflow-hidden rounded-[6rem_6rem_2rem_2rem] bg-brand-soft shadow-soft ring-4 ring-white">
          <Image src="/images/approach-center.jpg" alt="Granny with a child at the daycare" width={440} height={920} className="h-full w-full object-cover object-top" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-start gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tintClass[f.tint]}`}>
                  <Glyph icon={f.icon} />
                </span>
                <div>
                  <h3 className="text-[0.95rem] font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
