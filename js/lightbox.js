/* lightbox.js — When I Wasn't Looking */

(function () {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn  = document.querySelector('.lightbox-prev');
  const nextBtn  = document.querySelector('.lightbox-next');
  if (!lightbox) return;

  const photos = Array.from(document.querySelectorAll('.photo-link'));
  let current  = 0;

  function open(idx) {
    current = idx;
    const link  = photos[current];
    const img   = link.querySelector('img');
    lbImg.src   = link.href;
    lbImg.alt   = img?.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    photos[current]?.focus();
  }

  function prev() { open((current - 1 + photos.length) % photos.length); }
  function next() { open((current + 1) % photos.length); }

  photos.forEach((link, idx) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      open(idx);
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
})();
