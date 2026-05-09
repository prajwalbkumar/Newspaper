# The Irregular — Style Reference

A complete inventory of every content element available in post bodies.
Copy any block directly into a post. Everything here is valid Markdown or HTML passthrough.

To see all of this rendered live in the browser, open the post:
`content/posts/2026-05-08-everything-a-post-can-be.md`

---

## HEADINGS

```markdown
## H2 — Section Heading
Serif, heavy. Use for major sections. Spans the full popup width (breaks columns).

### H3 — Sub-Section Heading
Italic serif. Use within a section.

#### H4 — Label Heading
Monospace, small-caps style, with a subtle bottom border.

##### H5 — Fine-Print Label
Smaller monospace. Use sparingly.
```

---

## PARAGRAPH TEXT

Standard body text is automatic — just write. No special markup needed.

```markdown
First paragraph. Crimson Pro, 16px, 1.72 line height.

Second paragraph. A blank line between paragraphs creates the break.
No text-indent on the first paragraph after a heading.

**Bold text.** *Italic text.* `inline code`. Combined: **bold and _italic_**.

A [hyperlink](https://example.com) renders in the body typeface with underline.
```

---

## BLOCKQUOTE

```markdown
> The details are not the details. They make the design.
>
> — Charles Eames
```

Renders with a left border in the accent color. Use for attributed quotes or isolated insights.
In dark mode the border color shifts to the dark-mode accent automatically.

---

## CALLOUT BOXES

Four variants. Each uses an HTML div with a class. Copy the full block.

```html
<!-- Note — blue left border -->
<div class="callout note">
<span class="callout-label">Note</span>
Supplementary context. Use when the reader should know something but it doesn't interrupt the argument.
</div>

<!-- Tip — green left border -->
<div class="callout tip">
<span class="callout-label">Tip</span>
Actionable suggestion. Best-practice shortcuts, recommended approaches.
</div>

<!-- Warning — amber left border -->
<div class="callout warning">
<span class="callout-label">Warning</span>
Something is about to go wrong if the reader doesn't pay attention.
</div>

<!-- Important — red accent border (site's primary accent color) -->
<div class="callout important">
<span class="callout-label">Important</span>
The thing that genuinely cannot be missed. Reserve this for critical information.
</div>
```

---

## CODE

**Inline code** — wrap with backticks:

```markdown
Use `FilteredElementCollector` to query the model database.
```

**Code block** — fenced with triple backticks and optional language hint:

````markdown
```python
from Autodesk.Revit.DB import FilteredElementCollector, BuiltInCategory

rooms = FilteredElementCollector(doc)\
          .OfCategory(BuiltInCategory.OST_Rooms)\
          .WhereElementIsNotElementType()\
          .ToElements()
```
````

Supported language hints: `python`, `javascript`, `bash`, `html`, `css`, `json`, `yaml`, `markdown`.
Code blocks span the full popup width (breaks columns) and are horizontally scrollable if the lines are long.

---

## IMAGES

**Bare image** — spans full column width, click-to-lightbox:

```markdown
![Alt text describing the image](https://example.com/photo.jpg)
```

**Image with caption** — use `<figure>` / `<figcaption>`:

```html
<figure>
  <img src="https://example.com/photo.jpg" alt="Description of what's shown">
  <figcaption>Caption text. Rendered in small monospace below the image.</figcaption>
</figure>
```

---

## GALLERY GRID

Three or more images side-by-side. Each item lightbox-enabled individually.

```html
<div class="gallery">
  <figure>
    <img src="https://example.com/photo-1.jpg" alt="First image">
    <figcaption>First caption</figcaption>
  </figure>
  <figure>
    <img src="https://example.com/photo-2.jpg" alt="Second image">
    <figcaption>Second caption</figcaption>
  </figure>
  <figure>
    <img src="https://example.com/photo-3.jpg" alt="Third image">
    <figcaption>Third caption</figcaption>
  </figure>
</div>
```

Gallery uses `grid-template-columns: repeat(auto-fit, minmax(155px, 1fr))`. 
Images are cropped to `aspect-ratio: 4/3` — source dimensions don't matter.

---

## VIDEO EMBED (YouTube / Vimeo)

Wrap any iframe in `.video-wrap` for responsive 16:9 scaling:

```html
<div class="video-wrap">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title"
    allowfullscreen>
  </iframe>
</div>
```

Replace `VIDEO_ID` with the 11-character ID from the YouTube URL.
For Vimeo: `src="https://player.vimeo.com/video/VIDEO_ID"`.
The wrapper uses `padding-bottom: 56.25%` — exact 16:9 at any width.

---

## TABLE

```markdown
| Column A   | Column B   | Column C   |
|------------|------------|------------|
| Row 1 data | Row 1 data | Row 1 data |
| Row 2 data | Row 2 data | Row 2 data |
| Row 3 data | Row 3 data | Row 3 data |
```

Headers render in monospace small-caps. Alternating row tints applied automatically.
Tables span the full popup width (breaks columns).

---

## LISTS

**Unordered** — markers are em-dashes in the accent color:

```markdown
- First item
- Second item
- Third item
```

**Ordered** — numbers in monospace muted color:

```markdown
1. First step
2. Second step
3. Third step
```

---

## HORIZONTAL RULE

Renders as the newspaper's tripartite rule — thick line, accent dot, thin line:

```markdown
---
```

Spans the full popup width. Use to separate distinct sections.

---

## REDACTION

```markdown
The client was [not pleased with the outcome]{redact}.
The budget was [significantly over]{redact} by completion.
```

Renders as a black bar. Click to reveal, click again to re-redact.
The text is present in the HTML source — this is cosmetic, not a security feature.
Works in all post types including morgue drafts.

---

## INLINE FORMATTING

```markdown
**Bold** for emphasis or key terms.
*Italic* for titles, foreign words, or light stress.
***Bold italic*** for very strong emphasis (use rarely).
`code` for technical names, filenames, commands.
~~Strikethrough~~ for corrected text or irony.

A [link text](https://example.com) in the body.
```

---

## COMBINING ELEMENTS

Elements can be mixed freely. A few patterns that work well together:

**Intro → blockquote → body:**
Lead with an observation, quote someone else on the same theme, then argue your position.

**Callout before a code block:**
Use a `note` or `warning` callout to set up what the reader is about to see in the code.

**Gallery → caption paragraph:**
Show the images, then explain them in prose below.

**H3 → table → paragraph:**
Name the sub-section, show the data, interpret the data.

---

## FRONTMATTER QUICK REFERENCE

```yaml
title: ""            # Required. The headline.
date: YYYY-MM-DD     # Required. Sets position in date-sorted sections.
type: story          # Required. story | lead | brief | longread | morgue | now

deck: ""             # Italic subtitle. Shown on card and in popup.
byline: ""           # Attribution line. Shown below popup headline.
dateline: "DUBAI"    # Renders as "DUBAI —" prefix in certain card types.
section: dispatch    # architecture | code | travel | dispatch | opinion
tags: [dispatch]     # Array. Used for section filtering.

size: h2             # Headline size on the card: h1 | h2 | h3 (default).
pullquote: ""        # type: lead only. Shown in the right column.
morgueStatus: ""     # type: morgue only. unpublished | abandoned | unfinished

description: ""      # SEO meta description. One or two sentences.
photo: ""            # URL. Header image in popup and standalone page.
```
