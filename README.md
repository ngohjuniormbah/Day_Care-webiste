# 🏡 Granny's Daycare Center — Full-Stack Website

A warm, modern, responsive website for a childcare center in
**Shell Obili, Yaoundé, Cameroon**, built with **Next.js (App Router) +
TypeScript + Tailwind CSS**, a **Node.js** backend (Next.js Route Handlers +
SQLite), and smooth **fade-in / fade-out animations** powered by Framer Motion.

> **Design & imagery:** The site matches the provided design mock-up (purple +
> warm-cream childcare theme). The photo set from the design zip was not
> available in the build environment, so every image is a lightweight inline
> **SVG illustration**. To use real photos, drop them into `public/images/`
> (and `public/images/gallery/`) and point the `src` at them. Design tokens
> (colours, fonts, radii, shadows) live in `tailwind.config.ts`.

## 🧱 Tech stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 15 (App Router, React 19)                     |
| Language   | TypeScript                                            |
| Styling    | Tailwind CSS 3                                         |
| Animations | Framer Motion (scroll fade-in/out + page transitions) |
| Backend    | Node.js — Next.js Route Handlers (serverless-ready)   |
| Hosting    | Vercel-ready (no writable-filesystem dependency)      |

## 🎬 Animations

- **Fade in / fade out on scroll** — the `FadeIn` / `FadeInStagger` components
  (`components/motion/FadeIn.tsx`) reveal content as it enters the viewport and
  fade it back out as it leaves (`viewport={{ once: false }}`), with
  directional slide (up/down/left/right) and staggered children.
- **Page-transition fade** — `app/template.tsx` fades every route change.
- **Micro-interactions** — floating hero cards, hover lifts on cards, animated
  mobile menu. All animations respect `prefers-reduced-motion`.

## 📄 Pages (App Router)

| Route       | File                     | Purpose                                       |
| ----------- | ------------------------ | --------------------------------------------- |
| `/`         | `app/page.tsx`           | Hero, approach, care plans, programs, reviews |
| `/about`    | `app/about/page.tsx`     | Story, mission, values, facility description  |
| `/gallery`  | `app/gallery/page.tsx`   | Photo gallery                                 |
| `/program`  | `app/program/page.tsx`   | Programmes (API-driven) + flexible care plans |
| `/contact`  | `app/contact/page.tsx`   | Contact + enrollment forms, Google Map        |

## 🔌 API (Node.js route handlers)

- `GET  /api/programs` — list programmes (from `lib/programs.ts`).
- `POST /api/enroll` — submit an enrollment request (validated).
- `POST /api/contact` — submit a contact message (validated).
- `GET  /api/health` — health check.

Programme data is served from `lib/programs.ts`. Form submissions are validated
and logged (best-effort write to the OS temp dir in `lib/store.ts`) so the app
runs on read-only serverless filesystems like Vercel without any database.
**For durable storage**, wire an email service or a hosted database
(e.g. Vercel Postgres / Turso) into `saveSubmission` in `lib/store.ts`.

## 🔍 SEO

- Per-page `metadata` (title/description/canonical) via the Next.js Metadata API.
- Open Graph + Twitter cards, JSON-LD `ChildCare` structured data.
- Generated `robots.txt` (`app/robots.ts`) and `sitemap.xml` (`app/sitemap.ts`).
- Custom SVG favicon logo (`public/images/favicon.svg`).

## 🗺️ Location

The contact page embeds a Google Map pinned to **Shell Obili, Yaoundé,
Cameroon** (no API key required), with an "Open in Google Maps" link.

## 🚀 Getting started

```bash
npm install       # install dependencies
npm run dev       # dev server → http://localhost:3000
# or
npm run build && npm run start   # production build + serve
```

## 🎨 Customizing

- **Colors / fonts / radii:** edit `tailwind.config.ts` and `app/globals.css`.
- **Site name, address, phone, email, map:** edit `lib/site.ts`.
- **Programmes / pricing:** edit `lib/programs.ts` (re-seeds an empty DB).
- **Copy & sections:** edit the page files under `app/`.
- **Real photos:** replace the SVGs in `public/images/`.

## 📄 License

MIT
