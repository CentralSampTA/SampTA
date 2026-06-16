# SampTA — Central Website

This is the source code for the official **SampTA** (Sampling Theory and Applications) conference series website. 

The project uses a **Decoupled Hugo Architecture** to strictly isolate conference content from the main website infrastructure.

> **Full technical reference:** see [ARCHITECTURE.md](ARCHITECTURE.md) for the complete stack, content-fetch mechanism, both CMS panels, the deploy webhook, hosting/DNS, and security. This README is the quick-start.

## 🏗 Project Architecture

The website is split into two independent GitHub repositories under the `CentralSampTA` org:

1.  **Main Website (`SampTA`)**: Contains the Hugo engine (no external theme — custom layouts), core pages (About, Committee, etc.), and the **master admin** CMS at `sampta.org/admin` (review-based editorial workflow, for maintainers). Hosted on Netlify at `sampta.org`.
2.  **Upcoming Content (`site-upcoming-content`)**: A dedicated repository for the "Upcoming Conference" text and images, plus the **organizers' CMS** at `upcoming.sampta.org/admin` (immediate publish, for editors with access). This lets conference organizers edit content without ever touching the main site code. Keep it as a separate sibling clone (e.g. `/Users/deprave/Documents/site-upcoming-content`), **not** nested inside the main website repo.

Both CMS panels are **Decap CMS** with a GitHub backend; editors sign in via a GitHub OAuth app brokered by Netlify's OAuth endpoint (configured in Netlify → Site configuration → Access & security → OAuth). The homepage and `/upcoming/` page fetch the upcoming content **at build time** from the content repo (see ARCHITECTURE.md §3).

---

## 🚀 How to Go Live (Developer Workflow)

To save on Netlify build credits, all development work happens on the **`dev`** branch with the `[skip ci]` flag. When you are ready to publish changes to the public:

### 1. Merge and Deploy
```bash
# Switch to the live branch
git checkout main

# Pull your latest dev work
git merge dev

# Push to trigger the live build (NO skip-ci flag here!)
git push origin main

# Return to dev to continue working
git checkout dev
```

### 2. The Content Webhook
Whenever an organizer clicks "Publish" in their isolated CMS, Decap pushes to the content repo's `main` branch. A GitHub Action (`trigger-sampta-rebuild.yml`) then pings a **Netlify build hook** (stored as the `NETLIFY_SAMPTA_BUILD_HOOK` secret) for the main site, forcing it to rebuild and refetch the new content. Freshness is guaranteed by `hugo.toml`'s disabled `getresource` cache (`maxAge = 0`), so each rebuild pulls the latest state.

---

## 🛠 Running Locally

### 1. Main Website
```bash
cd sampta-hugo
hugo server -D
```
Open `http://localhost:1313`. Note that the "Upcoming" section will pull from the **live** content repo via `resources.GetRemote`.

### 2. Content CMS Portal
```bash
cd ../site-upcoming-content
python3 -m http.server 8080
```
Open `http://localhost:8080/admin/` to test the CMS locally.

---
