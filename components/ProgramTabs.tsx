"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Tab = {
  label: string;
  color: string; // pill background
  img: string;
  duration: string;
  desc: string;
  activities: { label: string; dot: string }[];
};

const tabs: Tab[] = [
  {
    label: "Infants (0–12 months)",
    color: "#f47b2a",
    img: "/images/programs-duration.jpg",
    duration: "0–1 year",
    desc: "Our Infants Program is designed to provide loving care, comfort, and joyful early experiences for your little one right from the start. Through gentle play, sensory activities, and attentive support, we help babies safely explore their world while building trust, curiosity, and confidence in a rainbow of fun and learning.",
    activities: [
      { label: "Full-Time Care", dot: "#f47b2a" },
      { label: "Part-Time Care", dot: "#4fbf8b" },
      { label: "Overnight Stay Available", dot: "#ffce4a" },
      { label: "Creative Learning", dot: "#3ba9a0" },
      { label: "Kids Growth", dot: "#7c5cff" },
      { label: "Creative Play", dot: "#e5559c" },
    ],
  },
  {
    label: "Toddlers (1–3 years)",
    color: "#6fb7e8",
    img: "/images/classroom.jpg",
    duration: "1–3 years",
    desc: "Curious toddlers explore, move and discover through guided play that builds language, motor skills and early independence in a joyful, secure setting where every small win is celebrated.",
    activities: [
      { label: "Guided Play & Discovery", dot: "#f47b2a" },
      { label: "Story Time & Songs", dot: "#4fbf8b" },
      { label: "Motor-Skill Activities", dot: "#ffce4a" },
      { label: "Outdoor Play Daily", dot: "#3ba9a0" },
      { label: "Creative Learning", dot: "#7c5cff" },
      { label: "Creative Play", dot: "#e5559c" },
    ],
  },
  {
    label: "Preschool (3–4 years)",
    color: "#ffce4a",
    img: "/images/playground.jpg",
    duration: "3–4 years",
    desc: "A playful, structured programme building early literacy, numeracy, social skills and school readiness so children grow curious, capable and confident every single day.",
    activities: [
      { label: "Early Literacy & Numeracy", dot: "#f47b2a" },
      { label: "Numbers, Shapes & Colours", dot: "#4fbf8b" },
      { label: "Group Projects & Sharing", dot: "#ffce4a" },
      { label: "Nature & Outdoor Learning", dot: "#3ba9a0" },
      { label: "Creative Learning", dot: "#7c5cff" },
      { label: "Creative Play", dot: "#e5559c" },
    ],
  },
  {
    label: "Early Learners (5–6 years)",
    color: "#7c5cff",
    img: "/images/facility.jpg",
    duration: "5–6 years",
    desc: "Our school-prep year sharpens reading, writing and problem-solving with a structured yet joyful daily routine that builds focus, resilience and confidence for the classroom ahead.",
    activities: [
      { label: "Reading & Writing Foundations", dot: "#f47b2a" },
      { label: "Numbers & Logic Games", dot: "#4fbf8b" },
      { label: "Confidence & Focus Building", dot: "#ffce4a" },
      { label: "Smooth School Transition", dot: "#3ba9a0" },
      { label: "Creative Learning", dot: "#7c5cff" },
      { label: "Creative Play", dot: "#e5559c" },
    ],
  },
  {
    label: "After-School Kids",
    color: "#9caa2c",
    img: "/images/care.jpg",
    duration: "6+ years",
    desc: "A safe, warm space after school for homework help, enrichment activities and plenty of free play with friends until pick-up — the perfect balance of support and fun.",
    activities: [
      { label: "Homework Help & Support", dot: "#f47b2a" },
      { label: "Arts, Games & Activities", dot: "#4fbf8b" },
      { label: "Healthy Afternoon Snacks", dot: "#ffce4a" },
      { label: "Flexible Pick-Up Times", dot: "#3ba9a0" },
      { label: "Creative Learning", dot: "#7c5cff" },
      { label: "Creative Play", dot: "#e5559c" },
    ],
  },
];

export function ProgramTabs() {
  const [active, setActive] = useState(0);
  const t = tabs[active];

  return (
    <div>
      {/* Tab pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition-all ${i === active ? "shadow-card ring-2 ring-black/10" : "opacity-80 hover:opacity-100"}`}
            style={{ backgroundColor: tab.color }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active program detail */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-brand-soft shadow-soft">
          <Image src={t.img} alt={t.label} fill sizes="(max-width: 768px) 90vw, 45vw" className="object-cover" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-black/45 px-4 py-2 text-white backdrop-blur-sm">
            <div className="text-xl font-extrabold">100%</div>
            <div className="text-xs">Safety compliance record</div>
          </div>
        </div>
        <div>
          <h3 className="flex items-baseline gap-2 text-3xl font-extrabold text-ink">
            Duration <span className="text-sm font-medium text-ink-muted">{t.duration}</span>
          </h3>
          <p className="mt-3 text-ink-soft">{t.desc}</p>
          <p className="mt-5 font-bold text-ink">Key Activities Include:</p>
          <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-ink-soft sm:grid-cols-2">
            {t.activities.map((a) => (
              <li key={a.label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: a.dot }} />
                {a.label}
              </li>
            ))}
          </ul>
          <Link href="/program" className="mt-6 inline-flex items-center gap-1 font-semibold text-accent-orange">
            Explore Programs <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
