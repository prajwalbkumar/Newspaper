# The Irregular

A statically-generated personal newspaper. Content is Markdown with YAML frontmatter. One config file controls everything — site identity, colours, social links, and location. Eleventy compiles it to plain HTML/CSS/JS and deploys to Cloudflare Pages in ~30 seconds.

**Stack:** Eleventy 3 · Nunjucks · Vanilla JS · Cloudflare Pages

---

## Quick Start

```bash
# Install dependencies
npm install

# Develop — live reload at localhost:3000
npm start

# Production build → dist/
npm run build

# Wipe build output
npm run clean
```

---

## Project Structure

```
the-irregular/
│
├── the-irregular.config.js   ← THE config file. Start here.
├── .eleventy.js              ← Collections, filters, markdown plugin
│
└── src/
    ├── _data/
    │   ├── config.js         ← Re-exports the-irregular.config.js
    │   ├── site.js           ← Re-exports config.site
    │   ├── strip.json        ← Notices, Projects, Hobbies, Bucket List, Toys
    │   └── now.json          ← "Now" block content
    ├── _includes/
    │   ├── layouts/          ← base.njk (HTML shell), post.njk (standalone page)
    │   └── components/       ← masthead, front-page, story-card, strip, morgue, etc.
    ├── assets/
    │   ├── css/main.css
    │   └── js/
    │       ├── main.js       ← Popup, filter, search, dark mode, clock, fold
    │       ├── live-data.js  ← Weather + GitHub stats
    │       └── redaction.js  ← [text]{redact} mechanic
    └── content/
        └── posts/            ← All Markdown posts live here
            ├── _template-story.md
            ├── _template-lead.md
            ├── _template-brief.md
            ├── _template-longform.md
            └── _template-morgue.md
```

---

## Configuration

Everything is controlled from `the-irregular.config.js`. You should never need to edit a template or CSS file for site identity, colours, or location.

### Site identity

```javascript
site: {
  title:       "The Irregular",
  tagline:     "Reporting on the interior life of one person · Published irregularly",
  url:         "https://theirregular.com",   // No trailing slash
  author:      "Prajwal",
  issueNumber: "XXIV",
  volume:      "I",
  established: "Jan 2026",
},
```

### Social links

```javascript
social: {
  email:     "hello@prajwal.com",
  github:    "https://github.com/prajwalbkumar",
  linkedin:  "https://linkedin.com/in/prajwalbkumar",
  instagram: "https://instagram.com/prajwalbkumar",
},
```

### Location

Controls the live clock timezone, weather API coordinates, and dateline display.

```javascript
location: {
  city:      "Dubai",
  country:   "UAE",
  timezone:  "Asia/Dubai",   // IANA timezone string
  latitude:  25.2048,
  longitude: 55.2708,
  display:   "Dubai, UAE",
},
```

To move cities: change `location`. The clock, weather, and all datelines update automatically on next build.

### Colours

```javascript
colors: {
  light: {
    paper:   "#f2ead8",   // Page background
    paperD:  "#e6dcca",   // Slightly darker background (hover states, etc.)
    paperDD: "#d9cfba",   // Darkest background variant
    ink:     "#0f0d0a",   // Primary text
    inkM:    "#2e2b25",   // Secondary text
    inkL:    "#5a554c",   // Tertiary text
    muted:   "#8a826e",   // Labels, metadata
    accent:  "#8b1a0e",   // Red — section markers, blockquote borders, callouts
    hi:      "rgba(240,208,80,0.55)",  // Search highlight
  },
  dark: { ... },          // Same keys, dark values
},
```

To change the palette: edit `colors`. CSS custom properties are generated from this object at build time. Never edit `main.css` for colour changes.

### Section dividers

Controls the date-range labels that divide the column sections on the home page.

```javascript
content: {
  sectionDividers: [
    { after: "2026-03-01", label: "On the Record" },
    { after: "2026-01-01", label: "From the Stacks" },
    { after: "2025-10-01", label: "The Archive" },
  ],
},
```

Posts dated after the first divider appear at the top with no label. Each subsequent group gets its label from the divider above it.

### The Strip

The dark five-column info strip (Notices · Projects · Hobbies · Bucket List · Toys) is controlled entirely by `src/_data/strip.json` — no posts involved.

```json
{
  "notices":    [{ "label": "Launching", "body": "markedwith.love..." }],
  "projects":   [{ "name": "The Irregular", "url": "/", "status": "active" }],
  "hobbies":    [{ "label": "Photography", "note": "Mostly architectural..." }],
  "bucketList": [{ "item": "Drive the Nürburgring", "done": false }],
  "toys":       [{ "category": "Camera", "name": "Sony A7C", "note": "..." }]
}
```

Project `status` values: `"active"` · `"paused"` · `"shipped"` · `"shelved"`

### GitHub integration

```javascript
github: {
  username:  "prajwalbkumar",
  showStats: true,   // Shows repos · commits (30d) · followers in masthead
},
```

Stats are fetched from the public GitHub API on page load, cached in `localStorage` for 1 hour.

---

## Writing Posts

All posts are `.md` files in `src/content/posts/`. Filename format: `YYYY-MM-DD-slug.md`.

The `layout:` field in frontmatter controls how a post renders. Post bodies support full Markdown plus HTML passthrough — see the Rich Content Elements table below for a reference.

---

### layout: story — Standard Article

Appears in the three-column grid. Body is clipped on the card; full content in the popup.

```yaml
---
title: "The Script Ran in Two Seconds. It Took Two Weeks to Write."
date: 2026-03-10
layout: story

deck: "The honest arithmetic of automation."
byline: "By Our Code Correspondent · Filed from Dubai · Mar 2026"
dateline: "DUBAI"
section: code
tags: [code]

size: h2          # h1 = large feature | h2 = standard | omit for small h3
description: "SEO description."
photo: ""
---
```

→ Template: `src/content/posts/_template-story.md`

---

### layout: lead — Front-Page Hero

Only the most recently dated `lead` post becomes the front-page hero. When publishing a new lead, change the old one's `layout` from `lead` to `story`.

```yaml
---
title: "Builder Continues Despite Not Knowing If the Thing Will Work"
date: 2026-04-03
layout: lead

deck: "markedwith.love enters its fourth week."
pullquote: "The letter should cost something."
byline: "By Our Code Correspondent · Filed from Dubai · Apr 2026"
section: code

description: "SEO description."
photo: ""
---
```

The body renders in the left column with a drop cap. The right column shows: pullquote → byline → "Now" block. Add `body2:` as a multiline frontmatter string for right-column body text.

→ Template: `src/content/posts/_template-lead.md`

---

### layout: brief — Short Note

Compact rendering. No headline on the card — just a date label and the body. Keep it under 100 words.

```yaml
---
title: "IronPython, Tuesday"   # Archive and popup only. Not shown on the card.
date: 2026-02-18
layout: brief
section: code
tags: [code]
description: "A brief note."
---
```

→ Template: `src/content/posts/_template-brief.md`

---

### layout: longform — Extended Essay

Shows a "Long Read" badge. Card shows deck + "Read in full →". Full content only in the popup.

```yaml
---
title: "The City That Forgot What Streets Are For"
date: 2026-01-14
layout: longform

deck: "Dubai builds relentlessly upward. The problem is at ground level."
byline: "By Our Architecture Correspondent · Dubai, Jan 2026"
dateline: "DUBAI"
section: architecture
size: h2

description: "SEO description."
photo: ""
---
```

→ Template: `src/content/posts/_template-longform.md`

---

### layout: morgue — Unpublished / Abandoned

Appears only in The Morgue section at the bottom of the page. Never in the main grid. Automatically `noindex, nofollow` in search engines.

```yaml
---
title: "On Dubai and the Particular Loneliness of Expat Life"
date: 2025-11-25
layout: morgue

morgueStatus: unpublished   # unpublished | abandoned | unfinished
section: opinion
tags: [opinion]
---
```

→ Template: `src/content/posts/_template-morgue.md`

---

### The "Now" Block — not a post

The "Now · April 2026" block in the about sidebar is not a post. Edit `src/_data/now.json` directly:

```json
{
  "month": "April 2026",
  "body": "Building markedwith.love. Dubai is getting hot again.",
  "updatedAt": "2026-04-03"
}
```

---

## Rich Content Elements

| Element | Syntax |
|---|---|
| Section heading | `## Heading` |
| Blockquote | `> Text` |
| Note callout | `<div class="callout note">` |
| Tip callout | `<div class="callout tip">` |
| Warning callout | `<div class="callout warning">` |
| Important callout | `<div class="callout important">` |
| Code block | ` ```python ` |
| Inline code | `` `code` `` |
| Image with caption | `<figure><img ...><figcaption>...</figcaption></figure>` |
| Gallery grid | `<div class="gallery"><figure>...</figure></div>` |
| YouTube embed | `<div class="video-wrap"><iframe src="..."></iframe></div>` |
| Table | `\| Col \| Col \|` standard markdown |
| Redaction | `[text]{redact}` |

---

## Content Workflow

```bash
# New post
cp src/content/posts/_template-story.md src/content/posts/2026-05-01-my-slug.md
# Edit the frontmatter and body
npm start                              # Preview at localhost:3000
git add src/content/posts/2026-05-01-my-slug.md
git commit -m "post: my slug"
git push                               # Deploys in ~30s

# Promote a post to front-page lead
# 1. Open the current lead → layout: lead → layout: story
# 2. cp src/content/posts/_template-lead.md src/content/posts/2026-05-01-new-lead.md
# 3. Fill in the frontmatter and body, push

# Update the Now block
# Edit src/_data/now.json → push

# Update the strip (projects, toys, bucket list, notices)
# Edit src/_data/strip.json → push

# Change colours
# Edit the-irregular.config.js → colors → push

# Move to a new city
# Edit the-irregular.config.js → location → push
# Weather, clock, and datelines update automatically
```

---

## Features

### Layout
- Sticky masthead with live dual clock, live weather, 7-day GitHub heatmap, section filter, and full-text search
- Lead story hero (3-column body + 1-column about/now sidebar)
- Three-column story grid with configurable date-range section dividers
- Dark five-column info strip: Notices · Projects · Hobbies · Bucket List · Toys
- The Morgue — preserved drafts at the bottom of the page

### Reading Experience
- Story cards are always clipped — click any card to open the full post in a popup
- URL updates to `/posts/slug/` via `history.pushState` for sharing
- Prev / Next navigation and Related Dispatches inside the popup
- Every post also has a standalone page at `/posts/slug/`
- Archive overlay: all posts grouped by year and month, filterable by section
- Keyboard shortcut: `Esc` closes popup / archive / lightbox

### Visual
- Light and dark mode, persisted via `localStorage`, respects `prefers-color-scheme` on first visit
- Edition tint: paper colour shifts subtly by time of day
- Grain texture, ink-settle load animation, tripartite section rules
- Responsive at 900 / 768 / 520 px breakpoints
- Print stylesheet

### Live Data (no API key required)
- **Weather** — Open-Meteo API, current temp + condition, 1-hour `localStorage` cache
- **GitHub stats** — public API, repos / 30-day commits / followers, 7-day heatmap
- **Dual clock** — site timezone (from config) + visitor's local timezone

### SEO
- Full meta tags, Open Graph, and Twitter Card on every page
- JSON-LD structured data: `WebSite + Person` on home; `BlogPosting / Article` on posts
- Canonical URLs throughout
- Morgue posts: `noindex, nofollow` automatically
- `/sitemap.xml` with per-layout priorities · `/robots.txt`

---

## Deployment (Vercel)

`vercel.json` is already configured at the project root. Two ways to deploy:

**Dashboard**

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo
3. Vercel picks up `vercel.json` automatically — no settings to change
4. Deploy. Every push to `main` redeploys automatically

**CLI**

```bash
npm i -g vercel
vercel        # first deploy + links the project
vercel --prod # promote to production
```

---

## License

[MIT](LICENSE)
