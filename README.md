# Lydia Kandula: Personal Portfolio

Responsive, accessible personal portfolio for **Full Stack Development, Assignment 1**
(Stanley College of Engineering & Technology for Women).

**Stack:** HTML5 · CSS3 (Flexbox, Grid, media queries) · Bootstrap 5.3 · JavaScript ES6+

## How to run (Windows, step by step)

1. **Unzip first.** Right-click `portfolio.zip` → *Extract All…*. Do not open `index.html` from inside the zip, because the styles will not load.
2. **Easiest way:** open the extracted `portfolio` folder and double-click `index.html`. It opens in your browser.
3. **Recommended for the demo (VS Code + Live Server):**
   1. Install VS Code, then open it and choose *File → Open Folder…* and pick the `portfolio` folder.
   2. Press `Ctrl+Shift+X`, search for **Live Server** (by Ritwick Dey), click *Install*.
   3. Right-click `index.html` in the left file list → **Open with Live Server**.
   4. Your browser opens `http://127.0.0.1:5500/index.html`. Saving a file refreshes the page automatically.
4. **Without VS Code, if Python is installed:** open a terminal in the folder and run `python -m http.server 8000`, then visit `http://localhost:8000`.

## Add your photo

Save a portrait or square photo (at least 600 x 600 px) in the `images` folder as **`lydia.jpg`** (exact name, lowercase). Refresh the page and it appears in the polaroid frame. Until then the initials "LK" are shown.

## Structure

```
index.html        Page structure (Home, About, Education, Skills, Projects, Certifications, Contact)
css/style.css     Design tokens, light/dark themes, mobile-first media queries
js/data.js        Projects, skills, certifications (edit this to change content)
js/main.js        Interactivity and form validation
images/           Put lydia.jpg here
vendor/           Bootstrap 5.3.3 CSS + JS bundle (works offline)
```

## Features

- Semantic HTML5, Bootstrap navbar with scrollspy, grid, cards, table, forms, alerts
- JavaScript: theme switch (saved), project / skills / certification filters, certification search,
  typing animation, animated counters, scroll reveal, GitHub repo list via the Fetch API (with fallback)
- Contact form with per-field validation, live error messages, success alert
- Accessibility: skip link, focus rings, labels, aria-live regions, reduced-motion support

## Deploy (optional)

Push to GitHub, then **Settings → Pages → Deploy from branch → `main` / root**.
