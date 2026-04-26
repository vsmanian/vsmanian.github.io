/* archives.js — When I Wasn't Looking
   Filters .archive-entry rows by year and type selects. */

(function () {
  const yearSelect = document.getElementById('archive-filter-year');
  const typeSelect = document.getElementById('archive-filter-type');
  const list       = document.getElementById('archive-list');
  if (!list) return;

  function filter() {
    const year = yearSelect?.value || '';
    const type = typeSelect?.value || '';
    list.querySelectorAll('.archive-entry').forEach(entry => {
      const matchYear = !year || entry.dataset.year === year;
      const matchType = !type || entry.dataset.type === type;
      entry.hidden = !(matchYear && matchType);
    });
  }

  yearSelect?.addEventListener('change', filter);
  typeSelect?.addEventListener('change', filter);
})();
