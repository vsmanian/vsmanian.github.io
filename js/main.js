/* main.js — When I Wasn't Looking */

// Footer year
document.getElementById('footer-year').textContent = new Date().getFullYear();

// --- Tab navigation -----------------------------------------
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function showSection(id) {
  sections.forEach(s => {
    s.classList.toggle('hidden', s.id !== id);
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
  });
  history.replaceState(null, '', id === 'home' ? '#' : `#${id}`);
  
  // Scroll to top, or to the section header if available
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    const section = document.getElementById(id);
    const header = section?.querySelector('.section-header');
    if (header) {
      const headerTop = header.getBoundingClientRect().top + window.scrollY;
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      window.scrollTo({ top: headerTop - headerHeight - 20, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);
    nav?.classList.remove('open');
    toggle?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Site title link (logo) — go to home
const siteTitle = document.querySelector('.site-title');
siteTitle?.addEventListener('click', e => {
  e.preventDefault();
  showSection('home');
  nav?.classList.remove('open');
  toggle?.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
});

// On load: respect hash or show home
const initialHash = window.location.hash.replace('#', '');
const validIds = Array.from(sections).map(s => s.id);
showSection(validIds.includes(initialHash) ? initialHash : 'home');

// --- Mobile nav toggle --------------------------------------
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.primary-nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
