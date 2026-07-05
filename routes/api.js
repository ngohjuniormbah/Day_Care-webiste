import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// --- Helpers ----------------------------------------------------------------
const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v) => (typeof v === 'string' ? v.trim() : '');

// --- Programs ---------------------------------------------------------------
router.get('/programs', (req, res) => {
  const rows = db.prepare('SELECT * FROM programs ORDER BY id').all();
  const programs = rows.map((p) => ({ ...p, features: JSON.parse(p.features || '[]') }));
  res.json(programs);
});

// --- Enrollment requests ----------------------------------------------------
router.post('/enroll', (req, res) => {
  const b = req.body || {};
  const required = ['parent_name', 'email', 'phone', 'child_name', 'child_age', 'program'];
  const missing = required.filter((f) => !clean(b[f]));
  if (missing.length) {
    return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(', ')}` });
  }
  if (!isEmail(clean(b.email))) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }

  const info = db
    .prepare(
      `INSERT INTO enrollments (parent_name, email, phone, child_name, child_age, program, start_date, message)
       VALUES (@parent_name, @email, @phone, @child_name, @child_age, @program, @start_date, @message)`
    )
    .run({
      parent_name: clean(b.parent_name),
      email: clean(b.email),
      phone: clean(b.phone),
      child_name: clean(b.child_name),
      child_age: clean(b.child_age),
      program: clean(b.program),
      start_date: clean(b.start_date) || null,
      message: clean(b.message) || null,
    });

  res.status(201).json({
    ok: true,
    id: info.lastInsertRowid,
    message: `Thank you, ${clean(b.parent_name)}! We received your enrollment request for ${clean(
      b.child_name
    )} and will be in touch within one business day.`,
  });
});

// --- Contact messages -------------------------------------------------------
router.post('/contact', (req, res) => {
  const b = req.body || {};
  const missing = ['name', 'email', 'message'].filter((f) => !clean(b[f]));
  if (missing.length) {
    return res.status(400).json({ ok: false, error: `Missing required fields: ${missing.join(', ')}` });
  }
  if (!isEmail(clean(b.email))) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }

  const info = db
    .prepare(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES (@name, @email, @subject, @message)`
    )
    .run({
      name: clean(b.name),
      email: clean(b.email),
      subject: clean(b.subject) || null,
      message: clean(b.message),
    });

  res.status(201).json({
    ok: true,
    id: info.lastInsertRowid,
    message: 'Thanks for reaching out! A member of our team will reply soon.',
  });
});

// --- Simple admin view (basic-auth protected) -------------------------------
// Protects the submission lists behind ADMIN_USER / ADMIN_PASS env credentials.
function basicAuth(req, res, next) {
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'sprouts123';
  const header = req.headers.authorization || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    const [u, p] = Buffer.from(encoded, 'base64').toString().split(':');
    if (u === user && p === pass) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Daycare Admin"');
  return res.status(401).json({ ok: false, error: 'Authentication required.' });
}

router.get('/admin/enrollments', basicAuth, (req, res) => {
  res.json(db.prepare('SELECT * FROM enrollments ORDER BY created_at DESC').all());
});

router.get('/admin/contacts', basicAuth, (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all());
});

export default router;
