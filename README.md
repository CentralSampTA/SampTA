# SampTA — Central Website

This is the source code for the official **SampTA** (Sampling Theory and Applications) conference series website. 

The project uses a **Decoupled Hugo Architecture** to strictly isolate conference content from the main website infrastructure.

## 🏗 Project Architecture

The website is split into two independent GitHub repositories:

1.  **Main Website (`SampTA`)**: Contains the Hugo engine, themes, layouts, and core pages (About, Committee, etc.).
2.  **Upcoming Content (`site-upcoming-content`)**: A dedicated repository for the "Upcoming Conference" text and images. This allows conference organizers to edit their content without ever touching the main site code. Keep this as a separate sibling clone at `/Users/deprave/Documents/site-upcoming-content`, not inside the main website repo.

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
Whenever an organizer clicks "Publish" in their isolated CMS, GitHub sends a **Webhook** signal to the main Netlify site. This forces the main site to rebuild instantly and fetch the new text from the content repository.

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
