import Database from "better-sqlite3";
import { join } from "path";
import { mkdirSync } from "fs";
import { programSeed } from "./programs";

// --- Singleton -------------------------------------------------------------
// Next.js reloads modules on every request in dev, so we cache the connection
// on globalThis to avoid opening a new handle (and re-seeding) each time.
const g = globalThis as unknown as { __gdc_db?: Database.Database };

function create(): Database.Database {
  const dir = join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });
  const db = new Database(join(dir, "daycare.db"));
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      age_range TEXT NOT NULL,
      schedule TEXT NOT NULL,
      price TEXT NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL,
      features TEXT NOT NULL DEFAULT '[]'
    );
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      child_name TEXT NOT NULL,
      child_age TEXT NOT NULL,
      program TEXT NOT NULL,
      start_date TEXT,
      message TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed programmes once so the API is never empty.
  const count = (db.prepare("SELECT COUNT(*) AS c FROM programs").get() as { c: number }).c;
  if (count === 0) {
    const insert = db.prepare(
      `INSERT INTO programs (slug, name, age_range, schedule, price, icon, description, features)
       VALUES (@slug, @name, @age_range, @schedule, @price, @icon, @description, @features)`
    );
    const tx = db.transaction(() => {
      for (const p of programSeed) {
        insert.run({ ...p, features: JSON.stringify(p.features) });
      }
    });
    tx();
  }

  return db;
}

const db = g.__gdc_db ?? (g.__gdc_db = create());
export default db;
