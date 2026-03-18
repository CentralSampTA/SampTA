# SampTA Conference Series — Website

Central website for the **SampTA** (Sampling Theory and Applications) conference series.

## Structure

```
├── index.html          Home page
├── about.html          About the conference series
├── conferences.html    Archive of all meetings (1995–present)
├── upcoming.html       Next conference details
├── committee.html      Steering committee members
├── resources.html      Proceedings and related resources
├── contact.html        Contact information
├── css/style.css       All styles
├── js/main.js          Mobile navigation
├── images/             Logo & favicon (drop files here)
└── README.md           This file
```

## Running Locally

Because there are two versions of this project, here is how you can run both of them locally on your computer.

### 1. Plain HTML Version (Root Directory)
Since this is a set of static files, you can simply double-click `index.html` to open it directly in your web browser.

However, to ensure all links work exactly as they will on a live server, it is recommended to run a simple local web server in the root folder:

```bash
# Using Python 3 (built into Mac/Linux)
python3 -m http.server 8000

# Or using Node.js / npx
npx serve .
```
Then open `http://localhost:8000` (or `http://localhost:3000`) in your browser.

### 2. Hugo Version (`sampta-hugo/` Directory)
The Hugo version generates the exact same site, but allows you to edit content using Markdown instead of raw HTML.

First, ensure you have [Hugo installed](https://gohugo.io/installation/). Then run:

```bash
cd sampta-hugo
hugo server
```
Open `http://localhost:1313/` in your browser. Any changes you make to the files will auto-reload instantly.

---

## Hosting

This is a **static website** — no build step, no server, no database.

### GitHub Pages
1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Source → Deploy from branch (`main`, root `/`)
3. The site will be available at `https://<username>.github.io/<repo>/`

### Any web server
Upload all files to the web root. It works with any static hosting.

## Editing Content

### Placeholders
Search for `<!-- PLACEHOLDER` in the HTML files to find all locations where
real content needs to be inserted. Key placeholders include:

- **Committee names** — `committee.html`
- **Contact emails** — `contact.html` (replace `sampta@example.org`)
- **Webmaster email** — `contact.html` (replace `webmaster@example.org`)
- **Organizer names** — `upcoming.html`
- **About text** — `about.html` (expand descriptions)

### Logo & Favicon

The site is set up to automatically show a logo and favicon if the files exist, and gracefully hide them if they don't (no broken images).

- **Logo** — Drop `logo.svg` (or `logo.png`) into the `images/` folder. It will appear in the navbar next to the "SampTA" text.
- **Favicon** — Drop `favicon.ico` and/or `favicon.svg` into `images/`. Browsers will pick it up automatically.

For the Hugo version, place files in `sampta-hugo/static/images/` instead.

### Adding a new conference
1. Open `conferences.html`
2. Copy a `<tr>` block in the table
3. Paste it as the first row in `<tbody>` (newest first)
4. Update year, dates, location, website URL, and notes

### Updating the "Upcoming Conference" page
1. Open `upcoming.html`
2. Replace all dates, venue, URL, and organizer details
3. Update the announcement banner in `index.html`

### Updating the home page announcement
Edit the `<div class="announcement">` block in `index.html`.

## Design

- **Fonts:** Source Serif 4 (headings) + Source Sans 3 (body) via Google Fonts
- **Colors:** Navy primary (`#1b3a5c`), blue accent (`#2a7ae2`), light background
- **Responsive:** Mobile-first layout with hamburger menu at < 768px
- **No dependencies:** Pure HTML/CSS/JS, no frameworks or build tools
