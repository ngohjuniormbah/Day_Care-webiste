/* =====================================================================
   Granny's Daycare Center — front-end behaviour
   Mobile nav • scroll-reveal animations • dynamic year • forms • programs
   ===================================================================== */

(() => {
  'use strict';

  /* ---------- Mobile navigation ----------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  /* ---------- Scroll-reveal animations ---------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Animated stat counters ------------------------------ */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let cur = 0;
          const step = target / 40;
          const tick = () => {
            cur += step;
            if (cur >= target) {
              el.textContent = target + suffix;
            } else {
              el.textContent = Math.round(cur) + suffix;
              requestAnimationFrame(tick);
            }
          };
          tick();
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- Current year in footer ------------------------------ */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Dynamic programs (if a mount point exists) ---------- */
  const programMount = document.querySelector('[data-programs]');
  if (programMount) {
    fetch('/api/programs')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((programs) => renderPrograms(programMount, programs))
      .catch(() => { /* static fallback content stays in place */ });
  }

  function renderPrograms(mount, programs) {
    if (!Array.isArray(programs) || !programs.length) return;
    mount.innerHTML = programs
      .map(
        (p, i) => `
      <article class="program-detail reveal ${i % 2 ? 'd1' : ''}">
        <div class="media">
          ${illustration(p.icon)}
          <div class="tag-badge">${p.age_range}</div>
        </div>
        <div>
          <span class="duration-pill">⏱ ${p.ratio}</span>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <ul class="act-grid">
            ${(p.features || []).map((f) => `<li>${f}</li>`).join('')}
          </ul>
          <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
            <span class="plan-price" style="font-size:1.4rem">${p.price}</span>
            <a class="btn" href="/contact.html">Enroll Now</a>
          </div>
        </div>
      </article>`
      )
      .join('');
    // re-observe newly injected reveals
    mount.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  function illustration(icon) {
    const palettes = {
      infant: ['#ffe6e1', '#ff7a6b'],
      toddler: ['#efeafe', '#7c5cff'],
      preschool: ['#e2f6ec', '#4fbf8b'],
      pre_k: ['#e2f0fb', '#6fb7e8'],
      kinder: ['#fff2cf', '#e0a800'],
    };
    const [bg, fg] = palettes[icon] || palettes.toddler;
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Program illustration">
      <rect width="400" height="300" fill="${bg}"/>
      <circle cx="200" cy="130" r="60" fill="${fg}" opacity=".9"/>
      <circle cx="185" cy="120" r="7" fill="#fff"/><circle cx="215" cy="120" r="7" fill="#fff"/>
      <path d="M180 150 q20 22 40 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="120" y="210" width="160" height="60" rx="18" fill="${fg}" opacity=".25"/>
    </svg>`;
  }

  /* ---------- AJAX form handling ---------------------------------- */
  document.querySelectorAll('form[data-endpoint]').forEach((form) => {
    const note = form.querySelector('.form-note');
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (note) { note.className = 'form-note'; note.textContent = ''; }

      const payload = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch(form.dataset.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          if (note) { note.className = 'form-note ok'; note.textContent = data.message; }
          form.reset();
        } else {
          if (note) { note.className = 'form-note err'; note.textContent = data.error || 'Something went wrong. Please try again.'; }
        }
      } catch {
        if (note) { note.className = 'form-note err'; note.textContent = 'Network error. Please check your connection and try again.'; }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = original; }
      }
    });
  });
})();
