"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-brand/10 bg-cream/90 backdrop-blur-md" : "border-transparent bg-cream/70 backdrop-blur"
      }`}
    >
      <nav className="container-x flex items-center justify-between py-3" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/images/favicon.svg" alt={`${site.name} logo`} width={42} height={42} priority />
          <span className="leading-tight">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Granny&apos;s
            </span>
            <span className="block font-bold text-ink">Daycare Center</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-brand-soft font-semibold text-brand" : "text-ink-soft hover:text-brand"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn hidden sm:inline-flex">
            Get in Touch
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span className={`absolute left-0 h-0.5 w-6 rounded bg-ink transition-all ${open ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-6 rounded bg-ink transition-all ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-6 rounded bg-ink transition-all ${open ? "top-2 -rotate-45" : "top-4"}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-brand-soft bg-cream px-4 md:hidden"
          >
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-4 py-3 font-medium text-ink-soft hover:bg-brand-soft hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link href="/contact" className="btn w-full">
                Get in Touch
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
