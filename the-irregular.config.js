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
    sectionOrder: ["architecture", "code", "travel", "dispatch", "opinion"],
  },

  // ── SEO ─────────────────────────────────────────────────────
  seo: {
    defaultOGImage: "/assets/images/og-default.png",
    twitterCard: "summary_large_image",
  },

  // ── Strip ────────────────────────────────────────────────────
  // The dark 5-column strip on the home page.
  strip: {
    notices: [
      { label: "Launching", body: "markedwith.love. A letter app where distance shapes delivery." },
      { label: "Available", body: "BIM coordination & automation consulting. Dubai. Revit, pyRevit, IFC." },
      { label: "Reading",   body: "The Odin Project curriculum. Slowly. On purpose." },
      { label: "Wanted",    body: "Collaborators who think before they build." },
    ],

    projects: [
      { name: "markedwith.love",         url: "https://markedwith.love",                  status: "active"  },
      { name: "The Irregular",            url: "/",                                         status: "active"  },
      { name: "BIM Automation Scripts",   url: "https://github.com/prajwalbkumar",         status: "active"  },
      { name: "CloudYourKitchen",         url: null,                                        status: "paused"  },
      { name: "BIM Health Dashboard",     url: null,                                        status: "shipped" },
      { name: "Rhino Parametric Studies", url: null,                                        status: "shelved" },
      { name: "Point Cloud Pipeline",     url: null,                                        status: "shelved" },
    ],

    hobbies: [
      { label: "Photography",            note: "Mostly architectural. Mostly before 8am when the light is right and the city is quieter than it should be." },
      { label: "Cars",                   note: "Specifically the ones over-engineered for the roads they'll actually drive on. Currently: BMW 440i Gran Coupé M-Sport." },
      { label: "Watches",                note: "A slow accumulation of interest that has not yet reached acquisition. The research stage is where it currently lives." },
      { label: "Travel",                 note: "Preferably slow and loose from day three. The first two days can be structured." },
      { label: "Computational Design",   note: "The part of architecture that is secretly software. Grasshopper, Rhino, pyRevit." },
      { label: "Web Development",        note: "The Odin Project curriculum, by hand. This newspaper is partly the result." },
      { label: "Architecture Criticism", note: "Dubai provides a great deal of material." },
    ],

    bucketList: [
      { item: "Drive the Nürburgring Nordschleife",     done: false },
      { item: "See the Northern Lights",                done: false },
      { item: "Build something people use every day",   done: false },
      { item: "Publish a piece of long-form writing",   done: false },
      { item: "Learn to surf — properly",               done: false },
      { item: "Sri Lanka south coast",                  done: true  },
      { item: "Sleep under stars in the Empty Quarter", done: false },
      { item: "Road trip: Coast of Portugal",           done: false },
      { item: "Spend a month somewhere with no plan",   done: false },
    ],

    toys: [
      { category: "Camera",         name: "Sony A7C",                        note: "Full-frame mirrorless. Mostly pointed at buildings.",  italic: false },
      { category: "Car (research)", name: "BMW 440i Gran Coupé M-Sport",     note: "Budget does not support this. Research continues.",    italic: false },
      { category: "Watch",          name: "Undecided — shortlist: growing.", note: "The first sign of a problem.",                         italic: true  },
      { category: "Fitness",        name: "Whoop 4.0",                       note: "Tells me I sleep badly. I knew this.",                 italic: false },
      { category: "Machine",        name: "MacBook Pro M3",                  note: "Runs everything. No complaints.",                      italic: false },
    ],
  },

};
