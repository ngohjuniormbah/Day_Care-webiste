"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Program } from "@/lib/programs";

const art: Record<string, string> = {
  infant: "/images/care.svg",
  toddler: "/images/classroom.svg",
  preschool: "/images/playground.svg",
  pre_k: "/images/facility.svg",
  kinder: "/images/about-story.svg",
};

export function ProgramList({ initial }: { initial: Program[] }) {
  const [programs, setPrograms] = useState<Program[]>(initial);

  useEffect(() => {
    // Re-fetch client-side so the list stays live even if the page was cached.
    fetch("/api/programs")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Program[]) => Array.isArray(data) && data.length && setPrograms(data))
      .catch(() => {});
  }, []);

  return (
    <div className="grid gap-8">
      {programs.map((p, i) => (
        <FadeIn key={p.slug} direction={i % 2 ? "left" : "right"}>
          <article className="grid items-center gap-8 rounded-xl2 bg-white p-6 shadow-card md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-soft">
              <Image
                src={art[p.icon] ?? "/images/classroom.svg"}
                alt={`${p.name} programme`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-xl bg-white px-3 py-2 text-sm font-bold shadow-card">
                {p.age_range}
              </span>
            </div>
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1 text-xs font-semibold text-brand-dark">
                ⏱ {p.schedule}
              </span>
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-ink-soft">{p.description}</p>
              <ul className="my-4 grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-ink-soft">
                {p.features.map((f) => (
                  <li key={f} className="relative pl-6 before:absolute before:left-0 before:text-accent-yellow before:content-['★']">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xl font-bold text-brand">{p.price}</span>
                <Link href="/contact" className="btn">
                  Enroll Now
                </Link>
              </div>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
