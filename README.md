# The Irregular

A statically-generated personal newspaper site. Content is Markdown. One config file controls everything — title, colours, location, social links. Eleventy compiles it to plain HTML/CSS/JS. Live data (weather, GitHub) is fetched client-side and cached in `localStorage`.

**Live site:** [theirregular.com](https://theirregular.com)  
**Stack:** Eleventy 3 · Nunjucks · Vanilla JS · Cloudflare Pages

---

## Features

### Newspaper Layout
- Masthead with volume, issue, and edition line
- Lead story hero (3-column left + about sidebar right)
- Three-column grid for stories, briefs, and long-reads
- Date-range section dividers ("On the Record", "From the Stacks", "The Archive")
- Dark five-column info strip: Notices · Projects · Hobbies · Bucket List · Toys
- The Morgue — a section for unpublished / abandoned drafts

### Reading Experience
- Click any story card to open the full post in an inline popup
- URL updates via `history.pushState` — links are always shareable
- Prev/next navigation and related posts inside the popup
- Section filter bar (All / Architecture / Code / Travel / Dispatch / Opinion)
- Full-text search with `<mark>` highlight
- Archive overlay: all posts grouped by year and month, with a GitHub contribution chart

### Visual Polish
- Light and dark mode (persists via `localStorage`)
- Edition tint: paper colour shifts by time of day (morning / afternoon / evening / final)
- Grain texture overlay, ink-settle load animation, tripartite section rules
- Redaction syntax: `[text]{redact}` renders as obscured, reveal-on-hover text
- Responsive at 1080 / 768 / 520 px breakpoints
- Print stylesheet

### Live Data
- **Weather** via Open-Meteo (no API key) — shown in masthead, 1-hour cache
- **GitHub stats** via public GitHub API — repos, 30-day commits, followers
- **Dual live clock** — Dubai time (config timezone) + visitor's local time

### SEO — First Class
- Full meta tags, Open Graph, and Twitter Card on every page
- JSON-LD structured data: `WebSite` + `Person` on home; `BlogPosting` / `Article` on posts
- Canonical URLs on all pages
- `noindex, nofollow` automatically applied to morgue posts
- `sitemap.xml` with per-layout priority weighting
- `robots.txt` with sitemap pointer

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/prajwalsingh/the-irregular.git
cd the-irregular

# 2. Install
npm install

# 3. Develop (localhost:3000, live reload)
npm start

# 4. Build
npm run build        # Output → dist/

# 5. Clean
npm run clean
```

---

## Project Structure

```
the-irregular/
├── the-irregular.config.js   ← THE config file. Edit this first.
├── .eleventy.js              ← Eleventy config: collections, filters, plugins
├── content/
│   └── posts/               ← All your Markdown posts live here
│       ├── _template.md     ← Copy this to start a new post
│       └── posts.11tydata.js
├── src/
│   ├── _data/
│   │   ├── config.js        ← Re-exports the-irregular.config.js
│   │   └── site.js          ← Re-exports config.site
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk     ← Root HTML shell
│   │   │   └── post.njk     ← Individual post page layout
│   │   └── components/      ← Masthead, front-page, story-card, strip, etc.
│   ├── assets/
│   │   ├── css/main.css
│   │   └── js/
│   │       ├── main.js      ← Popup, filter, search, dark mode, clock
│   │       ├── live-data.js ← Weather + GitHub stats
│   │       └── redaction.js ← [text]{redact} mechanic
│   ├── index.njk            ← Home page
│   ├── sitemap.njk
│   └── robots.njk
└── dist/                    ← Build output (gitignored)
```

---

## Configuration

Everything lives in `the-irregular.config.js` at the project root. You should never need to touch `main.css` for colour changes or any template for site identity changes.

```javascript
module.exports = {
  site: {
    title:       "The Irregular",
    tagline:     "...",
    url:         "https://theirregular.com",
    author:      "Prajwal",
    issueNumber: "XXIV",
    volume:      "I",
    established: "Jan 2026",
  },
  social: {
    email:     "hello@prajwal.com",
    github:    "https://github.com/prajwalsingh",
    linkedin:  "https://linkedin.com/in/prajwalsingh",
    instagram: "https://instagram.com/prajwalsingh",
  },
  location: {
    city:      "Dubai",
    timezone:  "Asia/Dubai",   // IANA string — controls live clock + weather
    latitude:  25.2048,
    longitude: 55.2708,
  },
  colors: {
    light: { paper: "#f2ead8", ink: "#0f0d0a", accent: "#8b1a0e", ... },
    dark:  { paper: "#17150d", ink: "#e8e0cc", accent: "#d46050", ... },
  },
  github: {
    username: "prajwalsingh",
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
};
```

To move cities: change `location`. Weather, the live clock, and the dateline all update automatically. To change colours: edit `colors`. CSS custom properties are written at build time from that object — never touch `main.css` for palette changes.

---

## Writing Posts

All posts are `.md` files in `content/posts/`. Filename convention: `YYYY-MM-DD-slug.md`. The `type:` field in frontmatter determines how the post renders.

### Standard Story

Appears in the three-column grid sections.

```yaml
---
title: "The Script Ran in Two Seconds. It Took Two Weeks to Write."
date: 2026-03-10
type: story

deck: "The honest arithmetic of automation."
byline: "By Our Code Correspondent"
dateline: "DUBAI"
section: code           # architecture | code | travel | dispatch | opinion
tags: [code, automation]

size: h2                # h1 | h2 | h3 (default: h3)
clip: true              # true = clips body, shows "Continued →"

description: "SEO description here."
photo: ""               # Optional image URL
---

Body goes here. Full Markdown. `[sensitive text]{redact}` for redactions.
```

### Lead Story (Front-Page Hero)

Only the most recent `type: lead` post is used as the hero. When you publish a new lead, change the old one from `type: lead` to `type: story`.

```yaml
---
title: "Builder Continues Despite Not Knowing If the Thing Will Work"
date: 2026-04-03
type: lead

deck: "markedwith.love enters its fourth week."
pullquote: "The letter should cost something."
byline: "By Our Code Correspondent · Filed from Dubai · Apr 3, 2026"
section: code

description: "SEO description."
photo: ""
---

Left-column body here. Gets the drop-cap treatment.
```

The right column shows: pullquote → byline. Add `body2:` multiline frontmatter for right-column body text.

### Brief

Short note. No headline shown in the card — only the label and body.

```yaml
---
title: "IronPython, Tuesday"   # Used in archive/popup only
date: 2026-02-18
type: brief
section: code
tags: [code]
description: "..."
---

**IronPython, Tuesday —** One hour. A TypeError. Five characters to fix.
```

### Long Read

Extended essay. Shows a "Long Read" badge. Card always clips to deck + "Read in full →". Full content only in the popup.

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

Full body. Use `## Subheadings` for internal structure.
```

### Morgue (Unpublished / Abandoned)

Only appears in The Morgue section. Automatically `noindex, nofollow` — never in the main grid.

```yaml
---
title: "On Dubai and the Particular Loneliness of Expat Life"
date: 2025-11-25
type: morgue

morgueStatus: unpublished   # unpublished | abandoned | unfinished
section: opinion
tags: [opinion]
---

The third paragraph said something true [I wasn't ready to publish]{redact}.
```

---

## Updating Static Data

### The "Now" Block

The "Now · April 2026" box in the About sidebar is not a post. Update the `type: now` post in `content/posts/`:

- Change `date:` to today
- Update the body

### The Strip (Notices · Projects · Hobbies · Bucket List · Toys)

The dark five-column strip is driven by frontmatter in a designated post or directly from the config strip data. Edit the config or the relevant data source to update:

- **Notices** — current availability, what you're reading, what you're building
- **Projects** — name, URL, status (`active` / `paused` / `shipped` / `shelved`)
- **Hobbies** — label + descriptive note
- **Bucket List** — item + `done: true/false`
- **Toys** — category, name, note

---

## Redaction Syntax

Wrap any text in `[text]{redact}` in Markdown. It renders as obscured text in the browser. Useful for things you want to preserve in the record without fully publishing.

```markdown
The meeting was fine. [The client was not]{redact}.
```

---

## Deployment (Cloudflare Pages)

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

Push to `main` → Cloudflare Pages builds and deploys in ~30 seconds. No additional environment variables are required for the default configuration.

Optional: set `GITHUB_TOKEN` as an environment variable if you enable `github.usePagesFn: true` in the config for richer GitHub stats via a Cloudflare Pages Function.

---

## Content Workflow Cheatsheet

```bash
# New post
cp content/posts/_template.md content/posts/2026-05-01-my-slug.md
# Edit frontmatter + write body
npm start                           # Preview at localhost:3000
git add content/posts/2026-05-01-my-slug.md
git commit -m "post: my slug"
git push                            # Deploys in ~30s

# Promote a post to front-page lead
# 1. Open old lead → change type: lead → type: story
# 2. Create new post with type: lead
# 3. Push

# Change colour scheme
#    Edit the-irregular.config.js → colors
#    Push

# Relocate (new city)
#    Edit the-irregular.config.js → location
#    Weather, clock, dateline update automatically
#    Push
```

---

## License

[MIT](LICENSE)
