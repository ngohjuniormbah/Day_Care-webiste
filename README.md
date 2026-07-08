# 🏡 Granny's Daycare Center — Full-Stack Website

A warm, modern, responsive **multi-page** website for a childcare center in
**Shell Obili, Yaoundé, Cameroon**, with a working backend for program
listings, enrollment requests, and contact messages.

> **Design & imagery:** The site is built to match the provided design mock-up
> (purple + warm-cream childcare theme). The photo set from the design zip was
> not available in the build environment, so every image is a lightweight inline
> SVG illustration that reads well at any size. **To use real photos**, drop them
> into `public/images/` (and `public/images/gallery/`) using the same filenames
> — e.g. `hero.svg → hero.jpg` and update the `src` in the HTML. Design tokens
> (colours, spacing, radii) live at the top of `public/css/styles.css` under
> `:root`.

## 📄 Pages

The site is built as separate pages, each with its own SEO metadata:

| Page          | File                  | Purpose                                        |
| ------------- | --------------------- | ---------------------------------------------- |
| Home          | `public/index.html`   | Hero, approach, care plans, programs, reviews  |
| About         | `public/about.html`   | Story, mission, values, facility description   |
| Gallery       | `public/gallery.html` | Photo gallery of the center                    |
| Program       | `public/program.html` | Programmes (API-driven) + flexible care plans  |
| Contact Us    | `public/contact.html` | Contact + enrollment forms, Google Map         |

## ✨ Features

- **Fully responsive** multi-page site with a sticky header + mobile nav.
- **Animations:** scroll-reveal on every section, animated hero stat counters,
  floating hero cards, and hover lifts on cards (all respect
  `prefers-reduced-motion`).
- **SEO-ready:** per-page `<title>`/meta description/keywords, canonical URLs,
  Open Graph + Twitter tags, JSON-LD `ChildCare` structured data,
  `robots.txt`, `sitemap.xml`, and a web app manifest.
- **Favicon logo:** a custom SVG house-and-heart mark (`public/images/favicon.svg`).
- **Google Maps** embed pinned to **Shell Obili, Yaoundé, Cameroon** on the
  contact page.
- **Working backend** (Node.js + Express + SQLite): programmes are fetched live
  and enrollment/contact forms submit with validation and inline feedback.

## 🚀 Getting started

```bash
npm install     # install dependencies
npm start       # start the server → http://localhost:3000
```

Then open **http://localhost:3000** in your browser.

```bash
npm run dev     # start with auto-reload (node --watch)
npm run seed    # re-seed the programs table
```

## 🔌 API

- `GET  /api/programs` — list all programme offerings.
- `POST /api/enroll` — submit an enrollment request (validated & stored).
- `POST /api/contact` — submit a contact message (validated & stored).
- `GET  /api/admin/enrollments` — view submissions (Basic Auth protected).
- `GET  /api/admin/contacts` — view messages (Basic Auth protected).
- `GET  /health` — health check.

Data is stored in a local SQLite database at `data/daycare.db`, created and
seeded automatically on first run.

## 🔐 Admin access

The `/api/admin/*` endpoints are protected with HTTP Basic Auth. Defaults:

| Setting  | Env var      | Default      |
| -------- | ------------ | ------------ |
| Username | `ADMIN_USER` | `admin`      |
| Password | `ADMIN_PASS` | `sprouts123` |
| Port     | `PORT`       | `3000`       |

**Change these before deploying.** Example:

```bash
ADMIN_USER=owner ADMIN_PASS='a-strong-secret' PORT=8080 npm start
```

## 🎨 Customizing to match your brand

- **Colors / spacing:** edit the `:root` design tokens in `public/css/styles.css`.
- **Copy & sections:** edit the individual `public/*.html` pages.
- **Programs / pricing:** edit `db/seed.js`, then run `npm run seed`.
- **Contact details / address:** search-and-replace the phone, email and
  "Shell Obili, Yaoundé" address across `public/*.html`.
- **Real photos:** replace the SVGs in `public/images/` with your own images.

## 📄 License

MIT
