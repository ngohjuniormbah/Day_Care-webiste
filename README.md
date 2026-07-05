# 🌱 Little Sprouts Daycare — Full-Stack Website

A warm, modern, responsive website for a childcare center, with a working
backend for program listings, enrollment requests, and contact messages.

> **Note on the design:** The original Figma file for this project is private
> (the shared link returns `403 Forbidden` without a Figma account/API token),
> so this site was built as a polished, best-practices daycare design. Swap in
> your Figma colors, copy, and imagery by editing
> `public/css/styles.css` (design tokens live at the top under `:root`) and
> `public/index.html`.

## ✨ Features

**Frontend** (`public/`)
- Fully responsive single-page site: hero, about, programs, daily schedule,
  teachers, gallery, testimonials, enrollment, and contact sections.
- Mobile nav, smooth scrolling, animated hero, hand-drawn SVG art (no external
  image dependencies).
- Programs are fetched live from the API; enrollment & contact forms submit to
  the backend with validation and inline success/error feedback.

**Backend** (Node.js + Express + SQLite via `better-sqlite3`)
- `GET  /api/programs` — list all program offerings.
- `POST /api/enroll` — submit an enrollment request (validated & stored).
- `POST /api/contact` — submit a contact message (validated & stored).
- `GET  /api/admin/enrollments` — view submissions (Basic Auth protected).
- `GET  /api/admin/contacts` — view messages (Basic Auth protected).
- `GET  /health` — health check.

Data is stored in a local SQLite database at `data/daycare.db`, created and
seeded automatically on first run.

## 🚀 Getting started

```bash
npm install     # install dependencies
npm start       # start the server → http://localhost:3000
```

Then open **http://localhost:3000** in your browser.

Useful scripts:

```bash
npm run dev     # start with auto-reload (node --watch)
npm run seed    # re-seed the programs table
```

## 🔐 Admin access

The `/api/admin/*` endpoints are protected with HTTP Basic Auth. Defaults:

| Setting      | Env var       | Default        |
| ------------ | ------------- | -------------- |
| Username     | `ADMIN_USER`  | `admin`        |
| Password     | `ADMIN_PASS`  | `sprouts123`   |
| Port         | `PORT`        | `3000`         |

**Change these before deploying.** Example:

```bash
ADMIN_USER=owner ADMIN_PASS='a-strong-secret' PORT=8080 npm start
```

View submissions:

```bash
curl -u admin:sprouts123 http://localhost:3000/api/admin/enrollments
```

## 🗂 Project structure

```
.
├── server.js            # Express app entry point
├── routes/api.js        # REST API routes + validation
├── db/
│   ├── database.js      # SQLite connection + schema
│   └── seed.js          # Program seed data
├── data/                # SQLite database file (gitignored)
└── public/              # Frontend (served statically)
    ├── index.html
    ├── css/styles.css
    ├── js/main.js
    └── images/          # SVG art
```

## 🎨 Customizing to match your brand

- **Colors:** edit the `:root` design tokens in `public/css/styles.css`.
- **Copy & sections:** edit `public/index.html`.
- **Programs / pricing:** edit `db/seed.js`, then run `npm run seed`.
- **Center name / contact info:** search-and-replace “Little Sprouts” and the
  address/phone/email in `public/index.html`.

## 📄 License

MIT
