module.exports = {

  // ── Site Identity ───────────────────────────────────────────
  site: {
    title:       "The Irregular",
    tagline:     "Reporting on the interior life of one person · Published irregularly · Read by whoever finds it",
    description: "A personal newspaper by Prajwal — dispatches on architecture, BIM automation, travel, code, and making things properly. Based in Dubai.",
    url:         "https://theirregular.com",
    author:      "Prajwal",
    lang:        "en",
    issueNumber: "XXIV",
    volume:      "I",
    established: "Jan 2026",
  },

  // ── Contact + Socials ───────────────────────────────────────
  social: {
    email:     "hello@prajwal.com",
    github:    "https://github.com/prajwalbkumar",
    linkedin:  "https://linkedin.com/in/prajwalbkumar",
    instagram: "https://instagram.com/prajwalbkumar",
  },

  // ── Location ────────────────────────────────────────────────
  location: {
    city:      "Dubai",
    country:   "UAE",
    timezone:  "Asia/Dubai",
    latitude:  25.2048,
    longitude: 55.2708,
    display:   "Dubai, UAE",
  },

  // ── Colour Scheme ───────────────────────────────────────────
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
    username:   "prajwalbkumar",
    showStats:  true,
    usePagesFn: false,
  },

  // ── Weather Integration ─────────────────────────────────────
  weather: {
    enabled:  true,
    cacheTTL: 3600000,
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
    defaultOGImage: "/assets/images/og-default.png",
    twitterCard: "summary_large_image",
  },

};
