import Link from "next/link";
import Image from "next/image";

// Per-letter rainbow colours for the "GRANNY'S" wordmark, matching the logo.
const LETTERS: { c: string; color: string }[] = [
  { c: "G", color: "#7c5cff" },
  { c: "R", color: "#e5372b" },
  { c: "A", color: "#2ca24a" },
  { c: "N", color: "#f5b912" },
  { c: "N", color: "#2ca24a" },
  { c: "Y", color: "#3aa0e0" },
  { c: "’", color: "#e5372b" },
  { c: "S", color: "#7c5cff" },
];

export function Logo({
  className = "",
  markSize = 46,
  subtitleClass = "text-ink",
}: {
  className?: string;
  markSize?: number;
  subtitleClass?: string;
}) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Granny's Daycare Center — home">
      <Image
        src="/images/logo-mark.png"
        alt="Granny's Daycare Center logo"
        width={markSize}
        height={markSize}
        priority
        className="shrink-0"
      />
      <span className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight sm:text-2xl" aria-hidden="true">
          {LETTERS.map((l, i) => (
            <span key={i} style={{ color: l.color }}>
              {l.c}
            </span>
          ))}
        </span>
        <span className={`mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${subtitleClass}`}>
          Daycare Center
        </span>
        <span className="sr-only">Granny&apos;s Daycare Center</span>
      </span>
    </Link>
  );
}
