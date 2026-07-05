import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'daycare.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// --- Schema -----------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS programs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        TEXT UNIQUE NOT NULL,
    name        TEXT NOT NULL,
    age_range   TEXT NOT NULL,
    ratio       TEXT NOT NULL,
    price       TEXT NOT NULL,
    description TEXT NOT NULL,
    icon        TEXT NOT NULL,
    features    TEXT NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_name  TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT NOT NULL,
    child_name   TEXT NOT NULL,
    child_age    TEXT NOT NULL,
    program      TEXT NOT NULL,
    start_date   TEXT,
    message      TEXT,
    created_at   TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT,
    message    TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export default db;
