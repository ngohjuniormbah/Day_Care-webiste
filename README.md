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
| Backend    | Node.js — Next.js Route Handlers                      |
| Database   | SQLite (`better-sqlite3`)                             |

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

- `GET  /api/programs` — list programmes (seeded on first run).
- `POST /api/enroll` — submit an enrollment request (validated & stored).
- `POST /api/contact` — submit a contact message (validated & stored).
- `GET  /api/health` — health check.

Submissions persist to a local SQLite database at `data/daycare.db`, created
and seeded automatically on first run.

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
