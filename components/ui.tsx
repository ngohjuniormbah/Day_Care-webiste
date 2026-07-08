import Link from "next/link";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

export function PageHero({
  crumb,
  title,
  children,
}: {
  crumb: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-gradient-to-b from-brand-tint to-cream py-14 text-center">
      <div className="container-x">
        <FadeIn once>
          <p className="mb-3 text-sm text-ink-muted">
            <Link href="/" className="text-brand">
              Home
            </Link>{" "}
            / {crumb}
          </p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">{children}</p>
        </FadeIn>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
      <span className="eyebrow mb-4">{eyebrow}</span>
      <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-ink-soft">{children}</p>}
    </FadeIn>
  );
}

export function CtaBanner({
  title,
  text,
  cta = "Schedule a Visit",
  href = "/contact",
}: {
  title: string;
  text: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="section bg-cream">
      <div className="container-x">
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand to-brand-dark p-10 text-center text-white sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/10" />
            <h2 className="relative text-3xl font-extrabold sm:text-4xl">{title}</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/85">{text}</p>
            <Link href={href} className="btn btn-light btn-lg relative mt-6">
              {cta}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
