// script.js — minimal, no dependencies
// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Auto year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();



// Tabs — Pregúntale a la Doc
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) { panel.classList.add('active'); panel.hidden = false; }
  });
});




// Before/after sliders — Casos de Éxito
document.querySelectorAll('.case-slider').forEach(slider => {
  const range = slider.querySelector('.case-range');
  if (!range) return;
  const update = () => slider.style.setProperty('--pos', range.value + '%');
  range.addEventListener('input', update);
  update();
});

// Treatment filter — Casos de Éxito
const filterButtons = document.querySelectorAll('.filter-btn');
const caseCards = document.querySelectorAll('.case-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    caseCards.forEach(card => {
      const match = filter === 'all' || card.dataset.treatment === filter;
      card.hidden = !match;
    });
  });
});




// Agenda — form success + date range
const agendaForm = document.getElementById('agenda-form');
const agendaSuccess = document.getElementById('agenda-success');
const agendaReset = document.getElementById('agenda-reset');
const fechaInput = document.getElementById('fecha');

if (agendaForm && agendaSuccess) {
  agendaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    agendaForm.hidden = true;
    agendaSuccess.hidden = false;
    agendaSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

if (agendaReset) {
  agendaReset.addEventListener('click', () => {
    agendaForm.reset();
    agendaForm.hidden = false;
    agendaSuccess.hidden = true;
    agendaForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

if (fechaInput) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const max = new Date(today);
  max.setDate(max.getDate() + 30);
  fechaInput.min = tomorrow.toISOString().split('T')[0];
  fechaInput.max = max.toISOString().split('T')[0];
}