# When I Wasn't Looking

A personal site for writings and photographs, built for GitHub Pages.

## File Structure

```
when-i-wasnt-looking/
├── index.html              ← Main single-page site (all sections)
├── sitemap.xml             ← For search engine indexing
├── robots.txt
├── css/
│   ├── style.css           ← Main stylesheet
│   └── piece.css           ← Styles for individual writing pages
├── js/
│   ├── main.js             ← Nav, scroll, footer year
│   ├── search.js           ← Client-side search
│   ├── lightbox.js         ← Photo lightbox
│   └── archives.js         ← Archive filtering
├── sections/
│   └── muses-entry-01.html ← Template for individual writing pieces
├── photos/
│   ├── thumbnails/         ← Compressed thumbnails (used in grid)
│   └── *.jpg               ← Full-size photos (opened in lightbox)
└── assets/
    └── og-cover.jpg        ← Social sharing image (1200×630px)
```

## Before You Deploy

1. **Replace all `vsmanian`** with your GitHub username in:
   - `index.html` (canonical, og:url, LD+JSON)
   - `sitemap.xml`
   - `robots.txt`
   - Each piece HTML file

2. **Replace `VS Manian`** throughout.

3. **Add your `og-cover.jpg`** to `assets/` (recommended: 1200×630px).

## Adding a New Writing Piece

1. Duplicate `sections/muses-entry-01.html` and rename it.
2. Fill in the title, date, section name, and body text.
3. Add a `<article class="writing-card">` block in `index.html` under the correct section.
4. Add an `<li class="archive-entry">` in the `#archives` section.
5. Add a `<url>` entry to `sitemap.xml`.

## Adding Photos

1. Put the full-size image in `photos/` and a thumbnail in `photos/thumbnails/`.
2. Duplicate the `<figure class="photo-item">` block in the `#untitled` section.
3. Set the `src`, `alt`, and `href` values.
4. A good `alt` text is both accessible and SEO-friendly — describe what's in the photo.

## Deploying to GitHub Pages

```bash
# One-time setup
git init
git remote add origin https://github.com/vsmanian.git

# Deploy
git add .
git commit -m "initial publish"
git push -u origin main
```

Then in your GitHub repo: **Settings → Pages → Source → main branch → / (root)**.

Your site will be live at `https://vsmanian.github.io/`.

## SEO Checklist

- [ ] `<title>` and `<meta name="description">` on every page
- [ ] `<link rel="canonical">` on every page
- [ ] `og:image` set to a real image
- [ ] All photo `alt` attributes filled in
- [ ] `sitemap.xml` updated with all pages
- [ ] `vsmanian` replaced everywhere
