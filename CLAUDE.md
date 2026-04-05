# THE IRREGULAR — Technical Specification v2
## Build Reference for Claude Code
### Drop this file in the project root as `CLAUDE.md`

---

## 0. OVERVIEW

A statically-generated personal newspaper site. Content is written in Markdown with YAML frontmatter. A single config file controls all site-wide settings — title, colours, social links, location. Eleventy compiles everything to plain HTML/CSS/JS. Live data (weather, GitHub) is fetched client-side and cached. SEO is treated as a first-class concern: every page has correct meta tags, Open Graph, and JSON-LD structured data.

**Mockup reference:** `newspaper-v9.html`  
**Stack:** Eleventy (11ty) v3 · Nunjucks · Vanilla JS · Cloudflare Pages

---

## 1. THE CONFIG FILE

One file to rule everything. Located at the project root as `the-irregular.config.js`. Eleventy reads it via `_data/config.js`. Every template, stylesheet, and JS module derives its values from here.

```javascript
// the-irregular.config.js
module.exports = {

  // ── Site Identity ───────────────────────────────────────────
  site: {
    title:       "The Irregular",
    tagline:     "Reporting on the interior life of one person · Published irregularly · Read by whoever finds it",
    description: "A personal newspaper by Prajwal — dispatches on architecture, BIM automation, travel, code, and making things properly. Based in Dubai.",
    url:         "https://theirregular.com",      // No trailing slash
    author:      "Prajwal",
    lang:        "en",
    issueNumber: "XXIV",
    volume:      "I",
    established: "Jan 2026",
  },

  // ── Contact + Socials ───────────────────────────────────────
  social: {
    email:     "hello@prajwal.com",
    github:    "https://github.com/prajwalsingh",
    linkedin:  "https://linkedin.com/in/prajwalsingh",
    instagram: "https://instagram.com/prajwalsingh",
  },

  // ── Location ────────────────────────────────────────────────
  // Used for: weather API, live clock, dateline display.
  location: {
    city:      "Dubai",
    country:   "UAE",
    timezone:  "Asia/Dubai",          // IANA timezone string
    latitude:  25.2048,               // For Open-Meteo weather API
    longitude: 55.2708,
    display:   "Dubai, UAE",
  },

  // ── Colour Scheme ───────────────────────────────────────────
  // Written into a <style> block as CSS custom properties.
  // Change the palette here — never touch main.css for colour changes.
  colors: {
    light: {
      paper:    "#f2ead8",
      paperD:   "#e6dcca",
      paperDD:  "#d9cfba",
      ink:      "#0f0d0a",
      inkM:     "#2e2b25",
      inkL:     "#5a554c",
      muted:    "#8a826e",
      accent:   "#8b1a0e",
      hi:       "rgba(240,208,80,0.55)",
    },
    dark: {
      paper:    "#17150d",
      paperD:   "#1f1c12",
      paperDD:  "#262216",
      ink:      "#e8e0cc",
      inkM:     "#b8b0a0",
      inkL:     "#888078",
      muted:    "#585048",
      accent:   "#d46050",
      hi:       "rgba(200,160,40,0.4)",
    },
  },

  // ── GitHub Integration ──────────────────────────────────────
  github: {
    username:   "prajwalsingh",
    showStats:  true,
    usePagesFn: false,  // true = use Cloudflare Pages Function for rich stats
  },

  // ── Weather Integration ─────────────────────────────────────
  weather: {
    enabled:  true,
    cacheTTL: 3600000,  // 1 hour in ms
  },

  // ── Content Settings ────────────────────────────────────────
  content: {
    postsPerSection: 9,
    sectionDividers: [
      { after: "2026-03-01", label: "On the Record" },
      { after: "2026-01-01", label: "From the Stacks" },
      { after: "2025-10-01", label: "The Archive" },
    ],
  },

  // ── SEO ─────────────────────────────────────────────────────
  seo: {
    defaultOGImage: "/assets/images/og-default.png",  // 1200×630px
    twitterCard: "summary_large_image",
  },

};
```

### Wiring the config

```javascript
// src/_data/config.js  — available as `config` in all templates
module.exports = require("../../the-irregular.config.js");

// src/_data/site.js  — available as `site` in all templates (convenience)
const config = require("../../the-irregular.config.js");
module.exports = config.site;
```

Config is also injected into the browser as a global before JS runs:

```nunjucks
{# In base.njk, before main.js #}
<script>
window.SITE_CONFIG = {
  github:   { username: "{{ config.github.username }}", showStats: {{ config.github.showStats }}, usePagesFn: {{ config.github.usePagesFn }} },
  weather:  { enabled: {{ config.weather.enabled }}, cacheTTL: {{ config.weather.cacheTTL }}, lat: {{ config.location.latitude }}, lon: {{ config.location.longitude }} },
  location: { city: "{{ config.location.city }}", timezone: "{{ config.location.timezone }}" }
};
</script>
```

---

## 2. PROJECT STRUCTURE

```
the-irregular/
│
├── the-irregular.config.js       ← THE CONFIG FILE. Edit this.
├── CLAUDE.md                     ← This spec file.
├── .eleventy.js
├── package.json
├── .gitignore
│
├── src/
│   ├── _data/
│   │   ├── config.js             ← Re-exports the-irregular.config.js
│   │   ├── site.js               ← Re-exports config.site
│   │   ├── strip.json            ← Strip static data (hobbies, toys, bucket list)
│   │   ├── now.json              ← "Now" block content (edit manually)
│   │   └── navigation.json       ← Section filter labels
│   │
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk          ← Full HTML shell
│   │   │   └── post.njk          ← Standalone post page layout
│   │   └── components/
│   │       ├── head-seo.njk      ← All meta / OG / JSON-LD
│   │       ├── masthead.njk
│   │       ├── front-page.njk    ← Lead (3fr) + About sidebar (1fr)
│   │       ├── story-card.njk    ← Standard + longform stories
│   │       ├── brief-card.njk    ← Compact brief block
│   │       ├── section-rule.njk  ← Thick · dot · thin divider
│   │       ├── cols-grid.njk     ← 3-column grid wrapper
│   │       ├── strip.njk         ← Dark 5-col info strip
│   │       ├── morgue.njk        ← The Morgue section
│   │       ├── archive-overlay.njk
│   │       ├── popup-overlay.njk
│   │       └── footer.njk
│   │
│   ├── content/
│   │   └── posts/
│   │       ├── _template-story.md      ← Copy this to write a new story
│   │       ├── _template-lead.md       ← Copy this to write a new lead
│   │       ├── _template-brief.md
│   │       ├── _template-longform.md
│   │       ├── _template-morgue.md
│   │       └── posts.njk               ← Directory data: sets permalink pattern
│   │
│   ├── assets/
│   │   ├── css/main.css
│   │   ├── js/
│   │   │   ├── main.js           ← UI: popup, filter, search, fold, dark mode
│   │   │   ├── live-data.js      ← Weather + GitHub
│   │   │   └── redaction.js      ← [text]{redact} mechanic
│   │   └── images/
│   │       └── og-default.png    ← 1200×630, default social share image
│   │
│   ├── robots.njk                ← → /robots.txt
│   ├── sitemap.njk               ← → /sitemap.xml
│   └── index.njk                 ← Home page
│
└── dist/                         ← Build output (gitignored)
```

---

## 3. POST SCHEMAS

Every post is a `.md` file in `src/content/posts/`. Filename: `YYYY-MM-DD-slug.md`.

The `layout:` field in frontmatter is the routing key — it determines which template component renders the post and where it appears on the page.

---

### SCHEMA A — `layout: story`
Standard article. Appears in the 3-column grid sections.

```yaml
---
title: "The Script Ran in Two Seconds. It Took Two Weeks to Write."
date: 2026-03-10
layout: story

# Content
deck: "The honest arithmetic of automation, and why it is always a bet on the future."
byline: "By Our Code Correspondent"
dateline: "DUBAI"
section: code               # architecture | code | travel | dispatch | opinion
tags: [code, automation]

# Display
size: h2                    # h1 | h2 | h3. Default: h3
clip: true                  # true = body clipped, shows "Continued →" link

# SEO
description: "An honest look at the arithmetic of automation in BIM workflows."
photo: ""                   # URL for popup header image + OG image
---

Body goes here. Full Markdown. Use `[text]{redact}` for redactions.
```

**Appears:** In date-sorted column sections on the home page. Also at `/posts/[slug]/`.

---

### SCHEMA B — `layout: lead`
Front-page hero. Renders the full 3fr+1fr layout. Only the most recent `lead` post is used as the hero.

```yaml
---
title: "Builder Continues Despite Not Knowing If the Thing Will Work"
date: 2026-04-03
layout: lead

deck: "markedwith.love enters its fourth week. The distance-based mechanic is confirmed."
pullquote: "The letter should cost something. The cost used to be stamps and ships."
byline: "By Our Code Correspondent · Filed from Dubai · Apr 3, 2026"
section: code
tags: [code]

description: "markedwith.love enters its fourth week — building a letter app where delivery speed maps to real geographic distance."
photo: ""
---

This is the **left-column body** (gets the drop cap treatment).

The right column shows: pullquote → byline. If you need right-column body text,
add a `body2:` multiline string in frontmatter.
```

**When publishing a new lead:** change the previous lead's `layout:` from `lead` to `story`.

---

### SCHEMA C — `layout: brief`
Short note. No headline shown in the card. Compact rendering.

```yaml
---
title: "IronPython, Tuesday"      # Used in archive/popup only, not shown in card
date: 2026-02-18
layout: brief
section: code
tags: [code]

description: "A brief note on IronPython List[ElementId] interop."
---

**IronPython, Tuesday —** One hour. A TypeError. `List[ElementId]` vs a plain
Python list. Fix: five characters. Understanding: the whole thing.
```

**Appears:** Inline in column sections. Renders without headline, just label + body.

---

### SCHEMA D — `layout: longform`
Extended essay. Shows "Long Read" badge. Card body is always clipped to deck + "Read in full →". Full article renders in popup only.

```yaml
---
title: "The City That Forgot What Streets Are For"
date: 2026-01-14
layout: longform

deck: "Dubai builds relentlessly upward. The problem is at ground level."
byline: "By Our Architecture Correspondent · Dubai, Jan 2026"
dateline: "DUBAI"
section: architecture
tags: [architecture, opinion]
size: h2

description: "A long read on walkability, ground-level failure, and what Dubai's extraordinary skyline actually costs at street level."
photo: ""
---

Full body here. Can be as long as needed — it only appears in the popup.
Use `## Subheadings` for internal structure.
Code blocks, HTML passthrough, `[text]{redact}` — all work.
```

**Appears:** In column sections with deck + "Read in full →". Full content popup-only.

---

### SCHEMA E — `layout: morgue`
Unpublished, abandoned, or unfinished work.

```yaml
---
title: "On Dubai and the Particular Loneliness of Expat Life"
date: 2025-11-25
layout: morgue

morgueStatus: unpublished   # unpublished | abandoned | unfinished
section: opinion
tags: [opinion]

# No description needed — morgue posts are automatically noindex
---

The third paragraph said something true about belonging that
[I wasn't ready to have attached to my name]{redact}. Filed here. Maybe someday.
```

**Appears:** Only in The Morgue section and the Morgue group in the Archive overlay. Never in column sections. SEO: `noindex, nofollow` automatically applied.

---

### "NOW" BLOCK — not a post
The "Now · April 2026" block in the About sidebar is not a post. Edit `src/_data/now.json`:

```json
{
  "month": "April 2026",
  "body": "Building markedwith.love. Learning HTML & CSS through The Odin Project — properly, by hand. Dubai is getting hot again. Researching sporty coupes in the 110–125k AED range. Finding it difficult to justify. Continuing anyway.",
  "updatedAt": "2026-04-03"
}
```

---

## 4. THE STRIP — `src/_data/strip.json`

The dark 5-column strip (Notices · Projects · Hobbies · Bucket List · Toys) is driven entirely by this file. No posts involved.

```json
{
  "notices": [
    { "label": "Launching", "body": "markedwith.love. A letter app where distance shapes delivery." },
    { "label": "Available", "body": "BIM coordination & automation consulting. Dubai. Revit, pyRevit, IFC." },
    { "label": "Reading",   "body": "The Odin Project curriculum. Slowly. On purpose." },
    { "label": "Wanted",    "body": "Collaborators who think before they build." }
  ],

  "projects": [
    { "name": "markedwith.love",        "url": "https://markedwith.love",          "status": "active"  },
    { "name": "The Irregular",           "url": "/",                                 "status": "active"  },
    { "name": "BIM Automation Scripts",  "url": "https://github.com/prajwalsingh",  "status": "active"  },
    { "name": "CloudYourKitchen",        "url": null,                                "status": "paused"  },
    { "name": "BIM Health Dashboard",    "url": null,                                "status": "shipped" },
    { "name": "Rhino Parametric Studies","url": null,                                "status": "shelved" },
    { "name": "Point Cloud Pipeline",    "url": null,                                "status": "shelved" }
  ],

  "hobbies": [
    { "label": "Photography",           "note": "Mostly architectural. Mostly before 8am when the light is right and the city is quieter than it should be." },
    { "label": "Cars",                  "note": "Specifically the ones over-engineered for the roads they'll actually drive on. Currently: BMW 440i Gran Coupé M-Sport." },
    { "label": "Watches",               "note": "A slow accumulation of interest that has not yet reached acquisition. The research stage is where it currently lives." },
    { "label": "Travel",                "note": "Preferably slow and loose from day three. The first two days can be structured." },
    { "label": "Computational Design",  "note": "The part of architecture that is secretly software. Grasshopper, Rhino, pyRevit." },
    { "label": "Web Development",       "note": "The Odin Project curriculum, by hand. This newspaper is partly the result." },
    { "label": "Architecture Criticism","note": "Dubai provides a great deal of material." }
  ],

  "bucketList": [
    { "item": "Drive the Nürburgring Nordschleife", "done": false },
    { "item": "See the Northern Lights",            "done": false },
    { "item": "Build something people use every day","done": false },
    { "item": "Publish a piece of long-form writing","done": false },
    { "item": "Learn to surf — properly",           "done": false },
    { "item": "Sri Lanka south coast",              "done": true  },
    { "item": "Sleep under stars in the Empty Quarter", "done": false },
    { "item": "Road trip: Coast of Portugal",       "done": false },
    { "item": "Spend a month somewhere with no plan","done": false }
  ],

  "toys": [
    { "category": "Camera",         "name": "Sony A7C",                   "note": "Full-frame mirrorless. Mostly pointed at buildings.",         "italic": false },
    { "category": "Car (research)", "name": "BMW 440i Gran Coupé M-Sport","note": "Budget does not support this. Research continues.",           "italic": false },
    { "category": "Watch",          "name": "Undecided — shortlist: growing.", "note": "The first sign of a problem.",                           "italic": true  },
    { "category": "Fitness",        "name": "Whoop 4.0",                  "note": "Tells me I sleep badly. I knew this.",                        "italic": false },
    { "category": "Machine",        "name": "MacBook Pro M3",             "note": "Runs everything. No complaints.",                             "italic": false }
  ]
}
```

---

## 5. SEO STRUCTURE

### 5.1 Meta tags — `src/_includes/components/head-seo.njk`

Every page gets the full set. Variables are resolved in `base.njk` before this component is called.

```nunjucks
<title>{% if pageTitle != site.title %}{{ pageTitle }} — {{ site.title }}{% else %}{{ site.title }}{% endif %}</title>
<meta name="description" content="{{ pageDesc }}">
<link rel="canonical" href="{{ pageUrl }}">
{% if noIndex %}<meta name="robots" content="noindex, nofollow">
{% else %}<meta name="robots" content="index, follow">{% endif %}
<meta name="author" content="{{ site.author }}">

{# Open Graph #}
<meta property="og:type"         content="{{ pageType | default('website') }}">
<meta property="og:title"        content="{{ pageTitle }}">
<meta property="og:description"  content="{{ pageDesc }}">
<meta property="og:url"          content="{{ pageUrl }}">
<meta property="og:image"        content="{{ pageImage }}">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name"    content="{{ site.title }}">
<meta property="og:locale"       content="en_GB">
{% if publishedAt %}
<meta property="article:published_time" content="{{ publishedAt }}">
<meta property="article:modified_time"  content="{{ publishedAt }}">
<meta property="article:author"         content="{{ site.author }}">
<meta property="article:section"        content="{{ post.data.section | capitalize }}">
{% for tag in post.data.tags %}<meta property="article:tag" content="{{ tag }}">{% endfor %}
{% endif %}

{# Twitter Card #}
<meta name="twitter:card"        content="{{ config.seo.twitterCard }}">
<meta name="twitter:title"       content="{{ pageTitle }}">
<meta name="twitter:description" content="{{ pageDesc }}">
<meta name="twitter:image"       content="{{ pageImage }}">
```

### 5.2 JSON-LD

```nunjucks
{# Home page: WebSite + Person #}
{% if page.url == "/" %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "{{ config.site.url }}/#website",
      "url": "{{ config.site.url }}",
      "name": "{{ site.title }}",
      "description": "{{ site.description }}",
      "inLanguage": "{{ site.lang }}"
    },
    {
      "@type": "Person",
      "@id": "{{ config.site.url }}/#person",
      "name": "{{ site.author }}",
      "url": "{{ config.site.url }}",
      "sameAs": ["{{ config.social.github }}", "{{ config.social.linkedin }}", "{{ config.social.instagram }}"],
      "jobTitle": "Architect & BIM Professional",
      "address": { "@type": "PostalAddress", "addressLocality": "{{ config.location.city }}", "addressCountry": "{{ config.location.country }}" }
    }
  ]
}
</script>
{% endif %}

{# All published story/longform/lead posts: BlogPosting or Article #}
{% if post.data.layout in ["story", "longform", "lead"] %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{% if post.data.layout == 'longform' %}Article{% else %}BlogPosting{% endif %}",
  "headline": {{ post.data.title | dump | safe }},
  "description": {{ post.data.description | default(post.data.deck) | dump | safe }},
  "url": "{{ pageUrl }}",
  "datePublished": "{{ post.date | isoDate }}",
  "dateModified":  "{{ post.date | isoDate }}",
  "author": { "@type": "Person", "@id": "{{ config.site.url }}/#person", "name": "{{ site.author }}" },
  "publisher": { "@type": "Person", "@id": "{{ config.site.url }}/#person" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{{ pageUrl }}" },
  "inLanguage": "{{ site.lang }}",
  "articleSection": "{{ post.data.section | capitalize }}"
  {% if post.data.photo %}, "image": { "@type": "ImageObject", "url": "{{ post.data.photo }}" }{% endif %}
}
</script>
{% endif %}
```

### 5.3 Sitemap and robots

```nunjucks
{# sitemap.njk → /sitemap.xml #}
{# Excludes morgue. Priority: lead=0.9, longform=0.8, story/brief=0.7 #}

{# robots.njk → /robots.txt #}
{# User-agent: * · Allow: / · Disallow: /assets/ · Sitemap: [url]/sitemap.xml #}
```

### 5.4 Heading hierarchy

- One `<h1>` per page — the masthead "The Irregular" publication name.
- Story headlines in cards: `<h2>` or `<h3>` via `size:` frontmatter.
- Popup headline: `<h1>` within the popup's own scoped context.
- Longform subheadings: `<h2>` inside the popup body.
- Never skip a heading level.

---

## 6. INDIVIDUAL POST PAGES

Each post generates a standalone URL at `/posts/[slug]/` for canonical SEO and direct sharing.

```nunjucks
{# src/content/posts/posts.njk — directory data applied to all posts #}
---
layout: layouts/post.njk
permalink: "posts/{{ page.fileSlug }}/"
---
```

The popup JS uses `history.pushState` to update the browser URL when a post is opened inline, so copying the URL from the address bar always gives the canonical post URL.

---

## 7. ELEVENTY CONFIG (`.eleventy.js`)

```javascript
const siteConfig = require("./the-irregular.config.js");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");

  // Markdown with {redact} plugin
  const md = require("markdown-it")({ html: true, typographer: true });
  md.core.ruler.push("redact", state => {
    for (const token of state.tokens) {
      if (token.type === "inline" && token.children) {
        token.children.forEach(child => {
          if (child.type === "text") {
            child.content = child.content.replace(/\[([^\]]+)\]\{redact\}/g, "<redact>$1</redact>");
          }
        });
      }
    }
  });
  eleventyConfig.setLibrary("md", md);

  // Collections
  eleventyConfig.addCollection("posts", col =>
    col.getFilteredByGlob("src/content/posts/*.md")
      .filter(p => p.data.layout !== "morgue")
      .sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("leadPost", col =>
    col.getFilteredByGlob("src/content/posts/*.md")
      .filter(p => p.data.layout === "lead")
      .sort((a, b) => b.date - a.date).slice(0, 1)
  );
  eleventyConfig.addCollection("morgue", col =>
    col.getFilteredByGlob("src/content/posts/*.md")
      .filter(p => p.data.layout === "morgue")
      .sort((a, b) => b.date - a.date)
  );

  // Filters
  eleventyConfig.addFilter("isoDate",    d => new Date(d).toISOString().split("T")[0]);
  eleventyConfig.addFilter("dateShort",  d => new Date(d).toLocaleDateString("en-GB", {day:"numeric",month:"short",year:"numeric"}));
  eleventyConfig.addFilter("dateMD",     d => new Date(d).toLocaleDateString("en-GB", {day:"numeric",month:"short"}));
  eleventyConfig.addFilter("dateYear",   d => new Date(d).getFullYear());
  eleventyConfig.addFilter("dateMonth",  d => new Date(d).toLocaleDateString("en-GB", {month:"long"}));
  eleventyConfig.addFilter("absoluteUrl",p => `${siteConfig.site.url}${p}`);
  eleventyConfig.addFilter("dump",       v => JSON.stringify(v));
  eleventyConfig.addFilter("groupInto3", arr => {
    const cols = [[],[],[]];
    arr.forEach((item, i) => cols[i % 3].push(item));
    return cols;
  });
  eleventyConfig.addFilter("dateRange", (posts, from, to) => {
    const f = from ? new Date(from) : new Date(0);
    const t = to   ? new Date(to)   : new Date();
    return posts.filter(p => { const d = new Date(p.date); return d >= f && d <= t; });
  });

  // Inject colour tokens as a <style> block from config
  eleventyConfig.addShortcode("colorTokens", () => {
    const l = siteConfig.colors.light, d = siteConfig.colors.dark;
    return `<style>:root{--paper:${l.paper};--paper-d:${l.paperD};--paper-dd:${l.paperDD};--ink:${l.ink};--ink-m:${l.inkM};--ink-l:${l.inkL};--muted:${l.muted};--accent:${l.accent};--hi:${l.hi}}body.dark{--paper:${d.paper};--paper-d:${d.paperD};--paper-dd:${d.paperDD};--ink:${d.ink};--ink-m:${d.inkM};--ink-l:${d.inkL};--muted:${d.muted};--accent:${d.accent};--hi:${d.hi}}</style>`;
  });

  eleventyConfig.setServerOptions({ port: 3000, watch: ["src/assets/**", "the-irregular.config.js"] });

  return {
    dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
```

---

## 8. LIVE DATA

### Weather — Open-Meteo (no API key)

```javascript
// live-data.js — reads from window.SITE_CONFIG set at build time
const WMO_MAP = {
  0:["Clear","☀️"], 1:["Mostly clear","🌤️"], 2:["Partly cloudy","⛅"],
  3:["Overcast","☁️"], 45:["Foggy","🌫️"], 51:["Drizzle","🌦️"],
  61:["Rain","🌧️"], 71:["Light snow","🌨️"], 80:["Showers","🌦️"], 95:["Thunderstorm","⛈️"]
};

async function fetchWeather() {
  const { lat, lon, cacheTTL } = window.SITE_CONFIG.weather;
  const KEY = "irregular_weather";
  const cached = JSON.parse(localStorage.getItem(KEY) || "null");
  if (cached && Date.now() - cached.ts < cacheTTL) return cached.data;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,apparent_temperature&timezone=${encodeURIComponent(window.SITE_CONFIG.location.timezone)}&forecast_days=1`;
  const json = await (await fetch(url)).json();
  const data = { temp: Math.round(json.current.temperature_2m), code: json.current.weathercode };
  localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

async function initWeather() {
  if (!window.SITE_CONFIG.weather.enabled) return;
  try {
    const w = await fetchWeather();
    const [label, icon] = WMO_MAP[w.code] || ["—",""];
    const el = document.getElementById("weather-display");
    if (el) el.textContent = `${window.SITE_CONFIG.location.city} ${w.temp}°C · ${label} ${icon}`;
  } catch (_) {}
}
```

### GitHub Stats — Public API (no token needed for basic stats)

```javascript
async function fetchGitHubStats() {
  const { username, showStats, cacheTTL } = window.SITE_CONFIG.github;
  if (!showStats) return null;
  const KEY = `irregular_gh_${username}`;
  const cached = JSON.parse(localStorage.getItem(KEY) || "null");
  if (cached && Date.now() - cached.ts < (cacheTTL || 3600000)) return cached.data;

  const [user, events] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`).then(r => r.json())
  ]);
  const thirtyAgo  = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const commits30d = events
    .filter(e => e.type === "PushEvent" && new Date(e.created_at).getTime() > thirtyAgo)
    .reduce((n, e) => n + (e.payload?.commits?.length || 0), 0);

  const data = { publicRepos: user.public_repos, followers: user.followers, commits30d };
  localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

async function initGitHubStats() {
  try {
    const g = await fetchGitHubStats();
    const el = document.getElementById("gh-stats");
    if (el && g) el.textContent = `${g.publicRepos} repos · ${g.commits30d} commits (30d) · ${g.followers} followers`;
  } catch (_) {}
}

document.addEventListener("DOMContentLoaded", () => { initWeather(); initGitHubStats(); });
```

### GitHub heatmap chart (in archive overlay)

```html
<img src="https://ghchart.rshah.org/{{ config.github.username }}"
     alt="GitHub contribution chart"
     onerror="this.alt='Chart unavailable'">
```

Dark mode inversion: `body.dark #gh-chart-box img { filter: invert(1) hue-rotate(180deg) saturate(.55); }`

---

## 9. CONTENT WORKFLOW

```bash
# New post
cp src/content/posts/_template-story.md src/content/posts/2026-05-01-my-title.md
# Edit frontmatter + write body
npm start           # Preview at localhost:3000
git add . && git commit -m "post: my title"
git push            # Cloudflare Pages deploys in ~30s

# New lead (promotes post to front page hero)
# 1. Change old lead post: layout: lead → layout: story
# 2. Create new post with layout: lead
# 3. Push

# Update Now block
# Edit src/_data/now.json → push

# Update strip (projects, toys, bucket list)
# Edit src/_data/strip.json → push

# Change colour scheme
# Edit the-irregular.config.js → colors → push

# Change location (e.g. move to a new city)
# Edit the-irregular.config.js → location → push
# (weather API + clock automatically use new coords/timezone)
```

---

## 10. BUILD + DEPLOY

```json
{
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@11ty/eleventy": "^3.0.0",
    "markdown-it": "^14.0.0"
  }
}
```

**Cloudflare Pages settings:**

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output | `dist` |
| Node version | `20` |
| Env var (optional) | `GITHUB_TOKEN` — only needed if using Pages Function for rich stats |

---

## 11. FEATURE → IMPLEMENTATION MAP

| Feature | File | Notes |
|---|---|---|
| Config-driven CSS tokens | `.eleventy.js` `colorTokens` shortcode | Writes `<style>` block from `config.colors` into `<head>` |
| Config-driven social links | `config.js` → `masthead.njk` | `{{ config.social.github }}` etc. |
| Config-driven location | `config.js` → `window.SITE_CONFIG` | Weather coords + timezone in browser |
| SEO meta + OG + Twitter Card | `head-seo.njk` | Full set on every page |
| JSON-LD structured data | `head-seo.njk` | WebSite+Person (home); BlogPosting/Article (posts) |
| Canonical URLs | `head-seo.njk` | Uses `config.site.url` + `page.url` |
| Sitemap | `sitemap.njk` | Excludes morgue; varying priorities |
| Robots.txt | `robots.njk` | Blocks /assets/, points to sitemap |
| noindex on morgue | `head-seo.njk` | Auto when `layout: morgue` |
| Standalone post pages | `posts.njk` directory data | `/posts/[slug]/` |
| URL push on popup open | `main.js` | `history.pushState` to post URL |
| Lead layout | `front-page.njk` | 3fr lead + 1fr about sidebar |
| Story card | `story-card.njk` | Handles story, longform, brief via layout field |
| Morgue section | `morgue.njk` + `collections.morgue` | Posts with `layout: morgue` |
| Strip | `strip.njk` + `_data/strip.json` | All five columns from JSON |
| Now block | `front-page.njk` + `_data/now.json` | One JSON file, no post needed |
| Redaction syntax | `.eleventy.js` md plugin + `redaction.js` | `[text]{redact}` in Markdown |
| Section filter | `main.js` | `data-tags` attribute on every card |
| Full-text search | `main.js` | TreeWalker + `<mark>` highlight |
| Story popup | `popup-overlay.njk` + `main.js` | JSON island pattern for body content |
| Two-column popup body | CSS `column-count: 2` | Degrades to 1-col on mobile |
| Tripartite rule | CSS `.lead-rule` / `.pp-rule` | thick div + dot + thin div |
| Grain texture | CSS `body::after` | SVG fractalNoise data URI, mix-blend-mode |
| Load animation | CSS `@keyframes ink-settle` | Staggered delays on masthead, lead, cols |
| Edition tint | `main.js` `setEdition()` | Time-based class on `<body>` |
| Live dual clock | `main.js` | Dubai (config timezone) + visitor timezone |
| Live weather | `live-data.js` | Open-Meteo, no key, 1hr cache |
| GitHub stats in masthead | `live-data.js` | Public API, 1hr cache |
| GitHub heatmap | `archive-overlay.njk` | `ghchart.rshah.org/[username]` |
| Archive overlay | `archive-overlay.njk` + `main.js` | Fold animation, year/month grouping |
| Dark mode | `main.js` + `localStorage` | Persists; both palettes from config |
| Print view | CSS `@media print` | Strips chrome |
| Responsive | CSS three breakpoints | 1080 / 768 / 520px |

---

*End of spec. Start with: `npm init -y && npm install @11ty/eleventy markdown-it`*