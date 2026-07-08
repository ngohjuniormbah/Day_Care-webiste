"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: "🏠" },
  { href: "/admin/content", label: "Site Content", icon: "✏️" },
  { href: "/admin/submissions", label: "Submissions", icon: "📩" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Top bar (mobile) */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <span className="flex items-center gap-2 font-bold">
          <Image src="/images/favicon.svg" alt="" width={28} height={28} /> Admin
        </span>
        <button onClick={() => setOpen((v) => !v)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm">
          Menu
        </button>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        {/* Sidebar */}
        <aside
          className={`${open ? "block" : "hidden"} md:block w-full md:w-60 md:flex-none`}
        >
          <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Link href="/admin" className="mb-5 flex items-center gap-2.5 px-2">
              <Image src="/images/favicon.svg" alt="" width={36} height={36} />
              <span className="leading-tight">
                <span className="block text-[0.6rem] font-semibold uppercase tracking-widest text-slate-400">Granny&apos;s</span>
                <span className="block font-bold">Admin Panel</span>
              </span>
            </Link>
            <nav className="space-y-1">
              {links.map((l) => {
                const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active ? "bg-brand text-white shadow" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{l.icon}</span>
                    {l.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-5 space-y-1 border-t border-slate-100 pt-4">
              <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
                <span>🌐</span> View live site ↗
              </Link>
              <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">
                <span>🚪</span> Log out
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
