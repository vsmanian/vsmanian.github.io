/* search.js — When I Wasn't Looking
   Lightweight client-side search across all [data-searchable] elements.
   No dependencies. */

(function () {
  const input   = document.getElementById('site-search');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  // Build search index from DOM at load time
  const index = [];

  document.querySelectorAll('[data-searchable]').forEach(el => {
    const title    = el.querySelector('.card-title')?.textContent?.trim() || '';
    const excerpt  = el.querySelector('.card-excerpt')?.textContent?.trim() || '';
    const fulltext = el.querySelector('.card-search-text')?.textContent?.trim() || '';
    const section  = el.closest('.section')?.querySelector('h1')?.textContent?.trim() || '';
    const link     = el.querySelector('a')?.getAttribute('href') || '#';
    const tags     = el.dataset.tags || '';

    if (title) {
      index.push({ title, excerpt, fulltext, section, link, tags });
    }
  });

  // Also index photo alt text
  document.querySelectorAll('.photo-item[data-searchable]').forEach(el => {
    const alt     = el.querySelector('img')?.getAttribute('alt') || '';
    const link    = el.querySelector('.photo-link')?.getAttribute('href') || '#';
    const caption = el.querySelector('.photo-caption')?.textContent?.trim() || '';
    if (alt || caption) {
      index.push({ title: alt || '(Photo)', excerpt: caption, fulltext: '', section: 'Untitled', link, tags: 'photo' });
    }
  });

  function query(term) {
    if (!term || term.length < 2) return [];
    const t = term.toLowerCase();
    return index.filter(item =>
      item.title.toLowerCase().includes(t) ||
      item.excerpt.toLowerCase().includes(t) ||
      (item.fulltext || '').toLowerCase().includes(t) ||
      item.section.toLowerCase().includes(t) ||
      item.tags.toLowerCase().includes(t)
    ).slice(0, 8);
  }

  function render(matches, term) {
    results.innerHTML = '';
    if (!matches.length) {
      results.innerHTML = `<p class="search-result-item" style="cursor:default;color:var(--ink-light)">No results for "${term}"</p>`;
      results.classList.add('open');
      return;
    }
    matches.forEach(m => {
      const li = document.createElement('a');
      li.href = m.link;
      li.className = 'search-result-item';
      li.setAttribute('role', 'option');
      li.innerHTML = `${escHtml(m.title)}<span>${escHtml(m.section)}</span>`;
      li.addEventListener('click', () => {
        results.classList.remove('open');
        input.value = '';
      });
      results.appendChild(li);
    });
    results.classList.add('open');
  }

  function escHtml(str) {
    return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const term = input.value.trim();
      if (!term) { results.classList.remove('open'); return; }
      render(query(term), term);
    }, 180);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      results.classList.remove('open');
      input.value = '';
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) results.classList.remove('open');
  });
})();
