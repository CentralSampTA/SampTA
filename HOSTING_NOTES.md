# SampTA Website — Hosting & Deployment Notes

## Two options

There are two versions of the site ready to go:
1. **Plain HTML** - Just raw HTML/CSS/JS across 7 pages. No dependencies. You just upload the folder somewhere and it works.
2. **Hugo** - It's the exact same site, but the content lives in Markdown files. Much easier for non-technical people to edit in the long run.

Both look identical. The Hugo one is just a lot nicer to maintain.

---

## Domain

- `sampta.org`

from cloudflare

---

## Where to host it

Good news: we can host this for free pretty much anywhere.

- **Vercel or Netlify (Free / Low effort)**: The best choice if we go with the Hugo version. It'll automatically build and deploy every time someone updates a markdown file.

**Bottom line:** Hosting is basically free across the board. We just need to pay the ~€10/yr for the domain name.

---

## Setup recommendations

**Netlify + Hugo - *Recommended***
Push the Hugo version to a **Public** repository in your GitHub Organization. (Netlify and Vercel both charge money if the Organization repository is Private, but they are 100% free if the repository is Public). Connect it to a free Netlify account. When someone wants to update the site, they just log into the `/admin` CMS portal, and Netlify automatically deploys the changes.

---

## Some design notes

- **Zero backend** - It's just static files, so it can't really break and will run forever.
- **No framework lock-in** - The plain HTML version literally needs zero tools installed to work.
- **Fast & Responsive** - Works perfectly on phones/tablets. Under 1MB total. 
- **Easy to hand off** - Lots of comments in the code and a README so whoever takes this over won't be lost.
- **Data sources** - Grabbed the "about" text and all 15 past conference details straight from Wikipedia.

---

## Missing stuff

We still need some real info before this goes live:
- An actual contact email (using `sampta@example.org` currently) and webmaster email
- A logo and favicon — the site is already wired up for these, just drop the files into `images/` (plain HTML) or `static/images/` (Hugo):
  - `logo.svg` or `logo.png` → appears in the navbar
  - `favicon.ico` or `favicon.svg` → browser tab icon
  - If the files aren't there, nothing shows and nothing breaks

---

## Things to figure out at the meeting

1. New email for contact info and webmaster on our domain.
2. Note on Broken Links: Several official links found on Wikipedia are actually dead. We should see if anyone has better web archives for them:
   - 2013 Bremen: The Wikipedia URL (`www.univie.ac.at/nuhag-php/event_NEW/...`) is broken. *We manually fixed this on our site to use `nuhagphp.univie.ac.at/event_NEW/...`*
   - 2003 Strobl: `nuhag-old.univie.ac.at/SampTA03/` is totally offline.
   - 1997 Aveiro: `www.ieeta.pt/~pjf/Sampta97/sampta97.html` is offline.
   - 1995 Riga: `www.ciel.pl/projects/BENEFIT/Sampta95-Latvia.html` is offline.
