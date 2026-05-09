const siteConfig = require("./the-irregular.config.js");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // ── Markdown with {redact} plugin ──────────────────────────
  const md = require("markdown-it")({ html: true, typographer: true });
  md.core.ruler.push("redact", state => {
    for (const token of state.tokens) {
      if (token.type === "inline" && token.children) {
        token.children.forEach(child => {
          if (child.type === "text") {
            child.content = child.content.replace(
              /\[([^\]]+)\]\{redact\}/g,
              "<redact>$1</redact>"
            );
          }
        });
      }
    }
  });
  eleventyConfig.setLibrary("md", md);

  // ── Collections ────────────────────────────────────────────
  const allPosts = col =>
    col.getFilteredByGlob("content/posts/*.md")
      .filter(p => !p.fileSlug.startsWith("_"))
      .sort((a, b) => b.date - a.date);

  eleventyConfig.addCollection("posts", col =>
    allPosts(col).filter(p =>
      p.data.type !== "morgue" && p.data.type !== "lead" && p.data.type !== "now"
    )
  );

  eleventyConfig.addCollection("leadPost", col =>
    allPosts(col).filter(p => p.data.type === "lead").slice(0, 1)
  );

  eleventyConfig.addCollection("nowPost", col =>
    allPosts(col).filter(p => p.data.type === "now").slice(0, 1)
  );

  eleventyConfig.addCollection("morgue", col =>
    allPosts(col).filter(p => p.data.type === "morgue")
  );

  eleventyConfig.addCollection("allPosts", col => allPosts(col));

  // Derives unique section labels from published non-special posts
  eleventyConfig.addCollection("sections", col => {
    const posts = allPosts(col).filter(p =>
      p.data.type !== "morgue" && p.data.type !== "lead" && p.data.type !== "now"
    );
    const seen = new Set();
    posts.forEach(p => { if (p.data.section) seen.add(p.data.section); });
    const order = siteConfig.content.sectionOrder;
    return [...seen].sort((a, b) => {
      const ia = order.indexOf(a), ib = order.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  });

  // ── Filters ────────────────────────────────────────────────
  eleventyConfig.addFilter("isoDate",   d => new Date(d).toISOString().split("T")[0]);
  eleventyConfig.addFilter("dateShort", d => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }));
  eleventyConfig.addFilter("dateMD",    d => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
  eleventyConfig.addFilter("dateYear",  d => new Date(d).getFullYear());
  eleventyConfig.addFilter("dateMonth", d => new Date(d).toLocaleDateString("en-GB", { month: "long" }));
  eleventyConfig.addFilter("absoluteUrl", p => `${siteConfig.site.url}${p}`);
  eleventyConfig.addFilter("dump", v => JSON.stringify(v));

  eleventyConfig.addFilter("groupInto3", arr => {
    const cols = [[], [], []];
    arr.forEach((item, i) => cols[i % 3].push(item));
    return cols;
  });

  eleventyConfig.addFilter("dateRange", (posts, from, to) => {
    const f = from ? new Date(from) : new Date(0);
    const t = to   ? new Date(to)   : new Date();
    return posts.filter(p => { const d = new Date(p.date); return d >= f && d < t; });
  });

  eleventyConfig.addFilter("groupByYearMonth", posts => {
    const yearMap = new Map();
    for (const post of posts) {
      const d = new Date(post.date);
      const year = d.getFullYear();
      const month = d.toLocaleDateString("en-GB", { month: "long" });
      if (!yearMap.has(year)) yearMap.set(year, new Map());
      const monthMap = yearMap.get(year);
      if (!monthMap.has(month)) monthMap.set(month, []);
      monthMap.get(month).push(post);
    }
    return [...yearMap.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, monthMap]) => ({
        year,
        months: [...monthMap.entries()].map(([month, posts]) => ({ month, posts }))
      }));
  });

  // ── Color tokens shortcode ─────────────────────────────────
  eleventyConfig.addShortcode("colorTokens", () => {
    const l = siteConfig.colors.light, d = siteConfig.colors.dark;
    return `<style>:root{--paper:${l.paper};--paper-d:${l.paperD};--paper-dd:${l.paperDD};--ink:${l.ink};--ink-m:${l.inkM};--ink-l:${l.inkL};--muted:${l.muted};--accent:${l.accent};--hi:${l.hi}}body.dark{--paper:${d.paper};--paper-d:${d.paperD};--paper-dd:${d.paperDD};--ink:${d.ink};--ink-m:${d.inkM};--ink-l:${d.inkL};--muted:${d.muted};--accent:${d.accent};--hi:${d.hi}}</style>`;
  });

  eleventyConfig.setServerOptions({
    port: 3000,
    watch: ["src/assets/**", "the-irregular.config.js", "content/**"]
  });

  return {
    dir: { input: ".", output: "dist", includes: "src/_includes", data: "src/_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
