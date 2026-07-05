import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import apiRouter from './routes/api.js';
import db from './db/database.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use('/api', apiRouter);

// Static frontend
app.use(express.static(join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Auto-seed programs on first boot so the site is never empty.
const count = db.prepare('SELECT COUNT(*) AS c FROM programs').get().c;
if (count === 0) {
  await import('./db/seed.js');
}

app.listen(PORT, () => {
  console.log(`🌱 Little Sprouts Daycare running at http://localhost:${PORT}`);
});
