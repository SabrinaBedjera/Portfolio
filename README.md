# Sabrina Bedjera — portfolio

A static site built on the Volos one-page HTML template. No build step: open it through a local web server
(for example `python3 -m http.server` in the repository root, then visit http://localhost:8000). Opening `index.html`
directly from disk breaks the portfolio pages, which are loaded with AJAX.

## How the code is organised

The Volos template files are treated as read-only. Custom work lives in separate `sb-` files that load after
the template, so a change to one section cannot unexpectedly break another.

| What | Volos template (leave as is) | Custom (edit these) |
|---|---|---|
| Styles | `style.css`, `css/clear.css`, `css/common.css`, plugin CSS | `css/sb-site.css` (colours, navigation, site-wide); `css/sb-hero.css` (homepage hero only) |
| Scripts | `js/main.js`, plugin JS | `js/sb-hero.js` (homepage hero behaviour) |
| Images | `images/` | `images/hero/` (hero-only assets) |
| Designs | — | `design/approved/` (approved mockups, the visual source of truth) |

Rules of thumb:

- Each new section gets its own `css/sb-<section>.css` (and `js/sb-<section>.js` if it needs behaviour),
  linked in `index.html` after the existing custom files.
- New section styles are scoped under that section's class (the home section carries `sb-hero`).
- Colours come from the `--sb-*` variables in `css/sb-site.css`.
- Custom scripts are plain JavaScript and load after `js/main.js`.
