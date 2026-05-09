# The Irregular

A statically-generated personal newspaper. Content is Markdown with YAML frontmatter. One config file controls everything — site identity, colours, location, social links, and the dark info strip. Eleventy compiles it to plain HTML/CSS/JS. Live data (weather, GitHub) is fetched client-side and cached in `localStorage`.

**Stack:** Eleventy 3 · Nunjucks · Vanilla JS · Cloudflare Pages

---

## Features

### Newspaper Layout
- Masthead with volume, issue number, edition line, live dual clock, live weather, and a 7-day GitHub activity heatmap
- Lead story hero (3-column left body + 1-column about/now sidebar)
- Three-column story grid with date-range section dividers
- Dark five-column info strip: Notices · Projects · Hobbies · Bucket List · Toys
- The Morgue — a section for unpublished, abandoned, and unfinished drafts

### Reading Experience
- Click any story card to open the full post in an inline popup — body is always clipped on the card
- URL updates via `history.pushState` so every open post has a shareable link
- Prev / Next navigation inside the popup
- Related dispatches block in both the popup and standalone post pages
- Section filter bar (All · Architecture · Code · Travel · Dispatch · Opinion)
- Full-text search with `<mark>` highlight across all post content
- Archive overlay: all posts grouped by year and month, filterable by section
- Clicking a post in the archive opens the popup without leaving the archive

### Post Styling
- Ghost-style single-column body: 16px, 1.72 line-height, paragraph spacing
- Full rich-content support: h2–h6, blockquotes, callouts (info / warning / tip), ordered and unordered lists, tables, inline code, code blocks, horizontal rules
- Image support with captions (`<figure>` / `<figcaption>`)
- Photo gallery grid with click-to-lightbox
- Header photo on individual post pages (set `photo:` in frontmatter)
- Redaction syntax: `[text]{redact}` renders as blacked-out text, revealed on click

### Visual Polish
- Light and dark mode, persisted via `localStorage`
- Edition tint: paper colour shifts subtly by time of day (morning / afternoon / evening / final)
- Grain texture overlay, ink-settle load animation, tripartite section rules
- Responsive at 1080 / 768 / 520 px breakpoints
- Print stylesheet

### Live Data (no API key required)
- **Weather** via Open-Meteo API — current temp and condition shown in masthead, 1-hour cache
- **GitHub stats** via public GitHub API — public repos, 30-day commits, followers; 7-day heatmap in masthead
- **Dual live clock** — publication city (config timezone) + visitor's local time

### SEO
- Full meta tags, Open Graph, and Twitter Card on every page
- JSON-LD structured data: `WebSite` + `Person` on home; `BlogPosting` / `Article` on posts
- Canonical URLs throughout
- `noindex, nofollow` automatically applied to morgue posts
- `/sitemap.xml` with per-type priority weighting
- `/robots.txt` with sitemap pointer

---

## Quick Start

```bash
# Clone
git clone https://github.com/prajwalbkumar/the-irregular.git
cd the-irregular

# Install
npm install

# Develop — live reload at localhost:3000
npm start

# Production build → dist/
npm run build

# Clean build output
npm run clean
```

---

## Project Structure

```
the-irregular/
├── the-irregular.config.js     ← THE config file. Edit this first.
├── .eleventy.js                ← Collections, filters, markdown plugin
├── content/
│   └── posts/                  ← All Markdown posts
│       ├── _template.md        ← Copy this to start a new post
│       └── posts.11tydata.js   ← Sets layout + permalink for all posts
├── src/
│   ├── _data/
│   │   ├── config.js           ← Re-exports the-irregular.config.js
│   │   └── site.js             ← Re-exports config.site
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk        ← Root HTML shell (masthead, popup, archive, lightbox)
│   │   │   └── post.njk        ← Standalone post page (/posts/slug/)
│   │   └── components/         ← masthead, front-page, story-card, strip, morgue, etc.
│   ├── assets/
│   │   ├── css/main.css
│   │   └── js/
│   │       ├── main.js         ← Popup, filter, search, dark mode, clock, fold
│   │       ├── live-data.js    ← Weather + GitHub stats + heatmap
│   │       └── redaction.js    ← [text]{redact} mechanic
│   ├── index.njk               ← Home page
│   ├── sitemap.njk
│   └── robots.njk
└── dist/                       ← Build output (gitignored)
```

---

## Configuration

Everything is in `the-irregular.config.js`. You should never need to touch `main.css` for colour changes or any template file for site identity.

```javascript
module.exports = {
  site: {
    title:       "The Irregular",
    tagline:     "Reporting on the interior life of one person · Published irregularly",
    url:         "https://theirregular.com",   // no trailing slash
    author:      "Prajwal",
    issueNumber: "XXIV",
    volume:      "I",
    established: "Jan 2026",
  },
  social: {
    email:     "hello@prajwal.com",
    github:    "https://github.com/prajwalbkumar",
    linkedin:  "https://linkedin.com/in/prajwalbkumar",
    instagram: "https://instagram.com/prajwalbkumar",
  },
  location: {
    city:      "Dubai",
    country:   "UAE",
    timezone:  "Asia/Dubai",     // IANA string — controls live clock + weather
    latitude:  25.2048,
    longitude: 55.2708,
    display:   "Dubai, UAE",
  },
  colors: {
    light: { paper: "#f2ead8", ink: "#0f0d0a", accent: "#8b1a0e", ... },
    dark:  { paper: "#17150d", ink: "#e8e0cc", accent: "#d46050", ... },
  },
  github: {
    username:  "prajwalbkumar",
    showStats: true,
  },
  content: {
    postsPerSection: 9,
    sectionDividers: [
      { after: "2026-03-01", label: "On the Record" },
      { after: "2026-01-01", label: "From the Stacks" },
      { after: "2025-10-01", label: "The Archive" },
    ],
  },
  strip: {
    notices:    [...],   // Notices column
    projects:   [...],   // Projects with status: active | paused | shipped | shelved
    hobbies:    [...],   // Label + descriptive note
    bucketList: [...],   // Item + done: true/false
    toys:       [...],   // Category, name, note
  },
};
```

**To move cities:** change `location`. Weather, the live clock, and datelines all update automatically.  
**To change colours:** edit `colors`. CSS custom properties are written from this object at build time — never edit `main.css` for palette work.  
**To update the strip:** edit `strip` in the config — all five columns are driven by this data.

---

## Writing Posts

All posts are `.md` files in `content/posts/`. Filename: `YYYY-MM-DD-slug.md`.

The `type:` field in frontmatter controls how a post renders. The directory data file (`posts.11tydata.js`) automatically applies `layout: layouts/post.njk` and sets the permalink to `/posts/slug/`.

---

### `type: story` — Standard Article

Appears in the three-column grid. Body is always clipped on the card; full content shows in the popup.

```yaml
---
title: "The Script Ran in Two Seconds. It Took Two Weeks to Write."
date: 2026-03-10
type: story

deck: "The honest arithmetic of automation."
byline: "By Our Code Correspondent"
dateline: "DUBAI"              # Optional — renders as "DUBAI —" prefix
section: code                  # architecture | code | travel | dispatch | opinion
tags: [code, automation]

size: h2                       # h1 | h2 | h3 (default: h3) — headline size on the card
description: "SEO description."
photo: ""                      # Optional header image URL
---

Body goes here. Full Markdown.

Use `[sensitive text]{redact}` for redactions.
```

---

### `type: lead` — Front-Page Hero

Only the most recent `type: lead` post is used as the hero. When publishing a new lead, change the old one to `type: story`.

```yaml
---
title: "Builder Continues Despite Not Knowing If the Thing Will Work"
date: 2026-04-03
type: lead

deck: "markedwith.love enters its fourth week."
pullquote: "The letter should cost something."
byline: "By Our Code Correspondent · Filed from Dubai · Apr 2026"
section: code
size: h1

description: "SEO description."
photo: ""
---

Left-column body. Gets the drop-cap treatment.
```

The right column renders: pullquote → byline → "Now" block. Add `body2:` as a multiline frontmatter string for right-column body text.

---

### `type: brief` — Short Note

Compact rendering. No headline on the card — just a label and the full body. Keep it under 100 words.

```yaml
---
title: "IronPython, Tuesday"   # Shown in archive + popup only, not the card
date: 2026-02-18
type: brief
section: code
tags: [code]
description: "..."
---

**IronPython, Tuesday —** One hour. A TypeError. Five characters to fix.
Understanding: the whole thing.
```

---

### `type: longread` — Extended Essay

Shows a "Long Read" badge. Card shows deck + "Read in full →". Full content only in the popup and at the standalone URL.

```yaml
---
title: "The City That Forgot What Streets Are For"
date: 2026-01-14
type: longread

deck: "Dubai builds relentlessly upward. The problem is at ground level."
byline: "By Our Architecture Correspondent · Dubai, Jan 2026"
dateline: "DUBAI"
section: architecture
size: h2

description: "..."
photo: ""
---

Full body. Can be as long as needed.
Use `## Subheadings` for internal structure.
```

---

### `type: now` — The "Now" Block

A single post with `type: now` drives the "Now" block in the about sidebar. Update it by editing the post body and changing the `date:` to today.

```yaml
---
title: "Now"
date: 2026-04-03
type: now
---

Building markedwith.love. Learning HTML & CSS properly. Dubai is getting hot again.
```

Only the most recently dated `type: now` post is displayed.

---

### `type: morgue` — Unpublished / Abandoned

Only appears in The Morgue section at the bottom of the page. Never in the main grid. Automatically `noindex, nofollow`.

```yaml
---
title: "On Dubai and the Particular Loneliness of Expat Life"
date: 2025-11-25
type: morgue

morgueStatus: unpublished     # unpublished | abandoned | unfinished
section: opinion
tags: [opinion]
---

The third paragraph said something true [I wasn't ready to publish]{redact}.
```

---

## Rich Content in Post Bodies

The following elements are fully styled in both the popup and standalone post pages.

```markdown
## Section heading

> A blockquote. Rendered with a left border and italic styling.

<div class="callout">A neutral callout box.</div>
<div class="callout callout-warning">A warning callout.</div>
<div class="callout callout-tip">A tip callout.</div>

- Unordered list
- With multiple items

1. Ordered list
2. With numbers

| Column A | Column B |
|----------|----------|
| Cell     | Cell     |

`inline code`

```python
# Fenced code block
def hello(): pass
```

![Alt text](image-url.jpg)

<figure>
  <img src="image-url.jpg" alt="Description">
  <figcaption>Caption text appears below.</figcaption>
</figure>

<div class="gallery">
  <img src="photo-1.jpg" alt="">
  <img src="photo-2.jpg" alt="">
  <img src="photo-3.jpg" alt="">
</div>
```

Images in galleries and the popup body are click-to-expand (lightbox). The header `photo:` image on a post page is also click-to-expand.

---

## Redaction Syntax

```markdown
The meeting was fine. [The client was not]{redact}.
```

Renders as a blacked-out bar in the browser. Click to reveal. The text is still present in the HTML source — this is a cosmetic mechanic, not a security feature.

---

## Deployment (Cloudflare Pages)

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

Push to `main` → Cloudflare Pages builds and deploys in ~30 seconds.

No environment variables required for the default configuration. Optional: set `GITHUB_TOKEN` if you enable `github.usePagesFn: true` in the config for richer GitHub stats via a Cloudflare Pages Function.

---

## Content Workflow

```bash
# New post — copy the template and fill it in
cp content/posts/_template.md content/posts/2026-05-01-my-slug.md
npm start                              # Preview at localhost:3000
git add content/posts/2026-05-01-my-slug.md
git commit -m "post: my slug"
git push                               # Deploys in ~30s

# Promote a post to front-page lead
# 1. Open the current lead post → type: lead → type: story
# 2. Create new post with type: lead
# 3. Push

# Update the "Now" block
# Edit content/posts/YYYY-MM-DD-now.md (or create a new one with type: now)
# Change the date to today, update the body
# Push

# Update the strip (notices, projects, hobbies, bucket list, toys)
# Edit the-irregular.config.js → strip
# Push

# Change the colour scheme
# Edit the-irregular.config.js → colors
# Push

# Relocate to a new city
# Edit the-irregular.config.js → location
# Weather, clock, and datelines update automatically
# Push
```

---

## License

[MIT](LICENSE)
