/* Little Sprouts Daycare — front-end behavior */

// --- Mobile nav toggle -------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// --- Current year in footer --------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// --- Load programs from the API ----------------------------------------------
const programGrid = document.getElementById('programGrid');
const programSelect = document.getElementById('programSelect');

async function loadPrograms() {
  try {
    const res = await fetch('/api/programs');
    if (!res.ok) throw new Error('Failed to load programs');
    const programs = await res.json();
    renderPrograms(programs);
    fillProgramSelect(programs);
  } catch (err) {
    programGrid.innerHTML =
      '<p class="loading">We couldn\'t load our programs right now. Please refresh or call us at (555) 123-4567.</p>';
    console.error(err);
  }
}

function renderPrograms(programs) {
  programGrid.innerHTML = programs
    .map(
      (p) => `
    <article class="program">
      <div class="program__top">
        <div class="program__icon">${iconFor(p.icon)}</div>
        <h3 class="program__name">${escapeHtml(p.name)}</h3>
        <span class="program__age">${escapeHtml(p.age_range)}</span>
      </div>
      <div class="program__body">
        <p class="program__desc">${escapeHtml(p.description)}</p>
        <ul class="program__features">
          ${p.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
        <div class="program__meta">
          <span>${escapeHtml(p.ratio)}</span>
          <span class="price">${escapeHtml(p.price)}</span>
        </div>
        <a href="#enroll" class="btn btn--ghost" data-program="${escapeHtml(p.name)}">Enroll in ${escapeHtml(p.name)}</a>
      </div>
    </article>`
    )
    .join('');

  // Pre-select a program when its card CTA is clicked.
  programGrid.querySelectorAll('[data-program]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (programSelect) programSelect.value = btn.dataset.program;
    });
  });
}

function fillProgramSelect(programs) {
  if (!programSelect) return;
  const opts = programs
    .map((p) => `<option value="${escapeHtml(p.name)}">${escapeHtml(p.name)} · ${escapeHtml(p.age_range)}</option>`)
    .join('');
  programSelect.insertAdjacentHTML('beforeend', opts);
}

const ICONS = {
  baby: '👶',
  blocks: '🧱',
  palette: '🎨',
  graduation: '🎓',
  backpack: '🎒',
};
function iconFor(name) {
  return ICONS[name] || '⭐';
}

// --- Form submission helper --------------------------------------------------
function handleForm(formId, noteId, endpoint) {
  const form = document.getElementById(formId);
  const note = document.getElementById(noteId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note.textContent = '';
    note.className = 'form__note';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        note.textContent = result.message;
        note.classList.add('ok');
        form.reset();
      } else {
        note.textContent = result.error || 'Something went wrong. Please try again.';
        note.classList.add('err');
      }
    } catch (err) {
      note.textContent = 'Network error — please check your connection and try again.';
      note.classList.add('err');
      console.error(err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// --- Utilities ---------------------------------------------------------------
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// --- Init --------------------------------------------------------------------
loadPrograms();
handleForm('enrollForm', 'enrollNote', '/api/enroll');
handleForm('contactForm', 'contactNote', '/api/contact');
