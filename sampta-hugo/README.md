# SampTA Conference Series — Hugo Version

This is the [Hugo](https://gohugo.io/) static site generator version of the SampTA website.
It produces the same site as the plain HTML version but is easier to maintain
because content lives in simple Markdown files.

## Prerequisites

Install Hugo: https://gohugo.io/installation/

```bash
# macOS
brew install hugo

# or download from https://github.com/gohugoio/hugo/releases
```

## Running Locally

Because there are two versions of this project, here is how you can run both of them locally on your computer.

### 1. Hugo Version (This Directory)

```bash
# If you aren't already in this directory and are at the root
cd sampta-hugo
hugo server
```
Open `http://localhost:1313/` in your browser. Any changes you make to the files will auto-reload instantly.

### 2. Plain HTML Version (Root Directory)

If you prefer to work with the raw HTML/CSS/JS version, you can simply go to the root folder (up one level) and run a simple local web server:

```bash
cd ..
# Using Python 3 (built into Mac/Linux)
python3 -m http.server 8000

# Or using Node.js / npx
npx serve .
```
Then open `http://localhost:8000` (or `http://localhost:3000`) in your browser. Alternatively, you can just open the root `index.html` file directly in your browser without running a server.

## Build for Production

```bash
hugo --baseURL "https://your-domain.example.org/"
```

Output goes to `public/`. Upload that folder to any static host.

## Deploy to GitHub Pages

1. Push the `sampta-hugo` folder to a GitHub repo
2. Add a GitHub Actions workflow (Hugo's docs: https://gohugo.io/hosting-and-deployment/hosting-on-github/)
3. Or build locally and push the `public/` folder to a `gh-pages` branch

## Editing Content

All content is in `content/` as Markdown files:

| File | Page |
|------|------|
| `_index.md` | Home page body text |
| `about.md` | About SampTA |
| `conferences.md` | Conference archive table |
| `upcoming.md` | Next conference details |
| `committee.md` | Steering committee |
| `resources.md` | Resources & proceedings |
| `contact.md` | Contact information |

### Adding a new conference
1. Open `content/conferences.md`
2. Add a new `<tr>` row at the top of the `<tbody>`
3. Update `content/upcoming.md` and `content/_index.md` home page

### Configuration
- `hugo.toml` — site title, menu items, base URL
- `layouts/_default/baseof.html` — header/nav/footer template
- `layouts/index.html` — home page layout
- `static/css/style.css` — all styles
- `static/js/main.js` — mobile navigation
- `static/images/` — logo and favicon (see below)

## Structure

```
sampta-hugo/
├── hugo.toml              # Site configuration
├── content/               # Markdown content (edit these)
├── layouts/
│   ├── _default/
│   │   ├── baseof.html    # Base template (nav, footer)
│   │   └── single.html    # Generic page template
│   └── index.html         # Home page template
├── static/
│   ├── css/style.css      # Styles
│   ├── js/main.js         # Mobile nav JS
│   └── images/            # Logo & favicon (drop files here)
└── themes/sampta/         # (unused — layouts are project-level)
```

## Logo & Favicon

The site is set up to automatically show a logo and favicon if the files exist, and gracefully hide them if they don't.

- **Logo** — Drop `logo.svg` (or `logo.png`) into `static/images/`. It will appear in the navbar next to "SampTA".
- **Favicon** — Drop `favicon.ico` and/or `favicon.svg` into `static/images/`. Browsers will pick it up automatically.
