---
title: "Everything a Post Can Be: A Field Test of Rich Content"
date: 2026-05-08
type: longread

deck: "Images. Video. Tables. Code. Callouts. Quotes. Lists. Redactions. Every format this newspaper can render, in one dispatch from the test bench."
byline: "By Our Technical Correspondent · Filed from Dubai · May 2026"
dateline: "DUBAI"
section: dispatch
tags: [dispatch, code]
size: h1

description: "A comprehensive test of every content type the site supports — from YouTube embeds to redacted text, gallery grids to comparison tables."
photo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80"
---

This is a test document. It exists to prove that the renderer can handle anything you throw at it — because a newspaper that can only print words in a single weight, on a single column, in a single tone, is not really a newspaper at all. What follows is the full inventory.

## Images

A single image with a caption. Click it to open the lightbox.

<figure>
  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" alt="Looking up at a glass curtain wall, Dubai">
  <figcaption>The curtain wall of a tower in DIFC, caught at 7am before the city woke up.</figcaption>
</figure>

Images in the body span the full column width and are lightbox-enabled on click. The border gives them print weight.

## Gallery Grid

Three images side-by-side, all lightbox-enabled individually.

<div class="gallery">
  <figure>
    <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80" alt="City skyline at dusk">
    <figcaption>Skyline</figcaption>
  </figure>
  <figure>
    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" alt="Dubai Marina at night">
    <figcaption>Marina, night</figcaption>
  </figure>
  <figure>
    <img src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80" alt="Desert landscape, UAE">
    <figcaption>Hatta road</figcaption>
  </figure>
</div>

Gallery items use `aspect-ratio: 4/3` and `object-fit: cover` — they always fill their cell cleanly regardless of source dimensions.

## Video Embed

A YouTube embed, wrapped in `.video-wrap` for 16:9 responsive scaling. The iframe fills its container at any viewport width.

<div class="video-wrap">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Test video embed" allowfullscreen></iframe>
</div>

The wrapper uses `padding-bottom: 56.25%` (the 16:9 ratio) with absolute positioning on the iframe — a classic technique that keeps the embed from breaking the layout at any width.

## Blockquote

> The details are not the details. They make the design.
>
> — Charles Eames

Blockquotes get a left accent border in the site's red. In dark mode, the color shifts to the softer dark-mode accent. Use them for attributed quotations or for isolating a passage that deserves more weight than surrounding text.

## Callout Boxes

<div class="callout note">
<span class="callout-label">Note</span>
This is a note callout. Use it for supplementary context — things the reader should know but that don't interrupt the main argument.
</div>

<div class="callout tip">
<span class="callout-label">Tip</span>
This is a tip callout. Use it for actionable suggestions. In BIM documentation this would be the place for best-practice shortcuts.
</div>

<div class="callout warning">
<span class="callout-label">Warning</span>
This is a warning callout. Use it when something is about to go wrong if the reader doesn't pay attention. Revit families, IFC exports, anything with destructive defaults.
</div>

<div class="callout important">
<span class="callout-label">Important</span>
This is an important callout. The accent color matches the site's primary red — reserve it for the thing that genuinely cannot be missed.
</div>

## Code Block

A Python snippet from a real pyRevit script. Full syntax, monospaced, with a left accent rule to mark it as code.

```python
# Filter elements by shared parameter value
from Autodesk.Revit.DB import FilteredElementCollector, BuiltInCategory

doc   = __revit__.ActiveUIDocument.Document
rooms = FilteredElementCollector(doc)\
          .OfCategory(BuiltInCategory.OST_Rooms)\
          .WhereElementIsNotElementType()\
          .ToElements()

target = "Zone A"
matched = [r for r in rooms if r.LookupParameter("Zone")
                                 and r.LookupParameter("Zone").AsString() == target]

print(f"Found {len(matched)} rooms in {target}")
```

And inline code: `FilteredElementCollector` is Revit's primary way to query the model database. It is fast when filtered early; it is slow when you call `.ToElements()` on everything and filter in Python.

## Table

A comparison of three BIM coordination platforms. Tables span the full column width and include alternating row tints for readability.

| Platform | Clash Detection | IFC Support | Scripting | Price |
|---|---|---|---|---|
| Navisworks Manage | ✓ Excellent | ✓ Full | NWC API | $$$ |
| BIM 360 Coordinate | ✓ Good | ✓ Partial | Limited | $$$$ |
| Solibri | ✓ Excellent | ✓ Full | Rules engine | $$$ |
| FreeCAD + IfcOpenShell | △ Basic | ✓ Native | Full Python | Free |

The table header uses the monospace font family at a small tracking size — consistent with the newspaper's utility-label aesthetic. Data rows use the body serif.

## Lists

An unordered list. Markers are rendered as em-dashes in the accent color:

- The model is always wrong. The question is how wrong, and in which direction.
- Clash detection finds the problems. Coordination meetings decide which ones get fixed.
- BIM Level 2 is a process, not a software version. The software is just evidence.
- pyRevit makes Revit scriptable. It does not make Revit predictable.
- IFC is the lingua franca. Learn to read it even if you never write it.

An ordered list. Numbers use the monospace font in the muted color:

1. Export IFC from Revit with shared coordinates enabled.
2. Open in Navisworks. Append all discipline models.
3. Run clash detection: hard clashes first, clearance clashes second.
4. Export clash report as BCF.
5. Open BCF in model authoring tools for issue resolution.
6. Repeat from step 1 until the list is empty. It never becomes empty.

## Horizontal Rule

A section break using the tripartite rule — thick line, dot, thin line — consistent with the newspaper's visual grammar.

---

Text after the rule. The rule is rendered entirely in CSS using `::before` and `::after` pseudo-elements. No image, no SVG, no extra markup.

## Heading Hierarchy

### H3: A Sub-Section Heading

In italic serif, at a size that clearly belongs below H2 but above body text. Good for grouping related paragraphs within a section.

#### H4: A Label Heading

Monospace, small-caps treatment, with a subtle bottom border. Use this for field labels, categories, and technical sub-categories within an H3 section.

##### H5: A Fine-Print Label

Even smaller. Use sparingly — mostly for technical documentation where you genuinely need five levels.

## Redaction

Some information in this newspaper is [deliberately withheld]{redact} because the story isn't ready, the person involved [hasn't consented to being named]{redact}, or because the writer [thought better of it at the last moment]{redact} and decided that discretion was more interesting than disclosure.

Click any redacted passage to reveal it. Click again to re-redact. The mechanic is handled client-side via `redaction.js` — no server involvement, no state persistence. Each page load resets all redactions.

## Mixed Content Block

What follows is a paragraph that contains **bold text**, *italic text*, `inline code`, and a [link to something that would be external](https://theirregular.com). All inline formatting should coexist cleanly with the body typeface and line height.

The Crimson Pro typeface, at 16px and 1.72 line height inside popups, gives the text a proper reading color: long enough lines to feel expansive, short enough columns to maintain eye tracking. The monospace elements (DM Mono) are sized at roughly 0.78em relative to the surrounding text — just small enough to feel technical, not so small as to require squinting.

## Conclusion

Every element on this page was rendered from Markdown plus HTML passthrough. The newspaper supports: images with captions, gallery grids, YouTube embeds, blockquotes, four callout types, fenced code blocks, inline code, tables, ordered and unordered lists, horizontal rules, five heading levels, redaction syntax, and all standard inline formatting.

If something is not listed here, it probably works anyway — the popup injects raw HTML via `innerHTML`, so anything the browser can render, the newspaper can show.
