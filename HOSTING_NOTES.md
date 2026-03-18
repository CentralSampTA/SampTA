# SampTA Website — Hosting & Deployment Notes

## What we've got right now

There are two versions of the site ready to go:
1. **Plain HTML** - Just raw HTML/CSS/JS across 7 pages. No dependencies. You just upload the folder somewhere and it works.
2. **Hugo** - It's the exact same site, but the content lives in Markdown files. Much easier for non-technical people to edit in the long run.

Both look identical. The Hugo one is just a lot nicer to maintain.

---

## Domains

We should probably grab a custom domain so it looks official. Here are some examples:

- `sampta.org`
- `sampta.net`
- `sampta-conference.org`

(all ~€10/yr)

I'd recommend using Namecheap or Cloudflare to register it since they don't mark up the prices. Honestly, this is the only part that will actually cost money.

---

## Where to host it

Good news: we can host this for free pretty much anywhere. All these support HTTPS and custom domains.

- **GitHub Pages (Free / Low effort)**: Probably the easiest. Just push the repo and click "enable Pages". Anyone can edit by making a commit.
- **Vercel or Netlify (Free / Low effort)**: The best choice if we go with the Hugo version. It'll automatically build and deploy every time someone updates a markdown file.
- **AWS S3 + CloudFront (Free-ish / Medium effort)**: Fits in the free tier forever, but takes a bit more setup. 
- **KU University (Free / ? effort)**: We could use a KU subdomain (like `sampta.ku.dk`). Only catch is they might force us to use their CMS, which could be annoying.

**Bottom line:** Hosting is basically free across the board. We just need to pay the ~€10/yr for the domain name.

---

## Setup recommendations

Here's how I see the options breaking down:

**If we want the absolute simplest setup (GitHub Pages)**
Just make a GitHub repo, toss the plain HTML files in, and tell GitHub to host it. Buy a domain, point it to GitHub, and we're done.

**If we want it to be easy to update later (Vercel + Hugo) - *Recommended***
Push the Hugo version to GitHub, connect it to a free Vercel account, and let it do its thing. When someone wants to update the site, they just edit a Markdown file on GitHub and Vercel automatically deploys the changes.

**If we have to use the university (KU)**
We just dump the plain HTML files onto their server. Zero build steps. Works even if they have a lock-down CMS environment (assuming they actually let us upload raw HTML).

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
- Steering committee names (I just put placeholders for now)
- An actual contact email (using `sampta@example.org` currently) and webmaster email
- A logo and favicon — the site is already wired up for these, just drop the files into `images/` (plain HTML) or `static/images/` (Hugo):
  - `logo.svg` or `logo.png` → appears in the navbar
  - `favicon.ico` or `favicon.svg` → browser tab icon
  - If the files aren't there, nothing shows and nothing breaks
- Organizer names for the next conference

---

## Things to figure out at the meeting

1. Will KU actually let us upload plain HTML files, or do they force everyone into their CMS?
2. Do we want a KU domain (`sampta.ku.dk`) or something independent (`sampta.org`)?
3. Who's actually going to maintain this thing long-term? Should we make a shared GitHub org?
4. Setup needs those steering committee names and the contact email.
5. Vienna 2025 is over — has the next conference been announced yet?
6. Note on Broken Links: Several official links found on Wikipedia are actually dead. We should see if anyone has better web archives for them:
   - 2013 Bremen: The Wikipedia URL (`www.univie.ac.at/nuhag-php/event_NEW/...`) is broken. *We manually fixed this on our site to use `nuhagphp.univie.ac.at/event_NEW/...`*
   - 2003 Strobl: `nuhag-old.univie.ac.at/SampTA03/` is totally offline.
   - 1997 Aveiro: `www.ieeta.pt/~pjf/Sampta97/sampta97.html` is offline.
   - 1995 Riga: `www.ciel.pl/projects/BENEFIT/Sampta95-Latvia.html` is offline.
