---
title: "Front Page Headline: Big, Declarative, Present Tense"
date: YYYY-MM-DD
type: lead

deck: "The deck expands on the headline. One sentence. Should work as a standalone summary. Italic on the page."
pullquote: "A sentence pulled from the body for the right column. Should feel important in isolation."
byline: "By Our Correspondent · Filed from Dubai · Month Year"
section: code              # architecture | code | travel | dispatch | opinion
tags: [code]
size: h1

description: "SEO description. One or two sentences. Used in meta tags and Open Graph."
photo: ""                  # URL for the popup/standalone header image. Not shown on the front page lead.

# body2: |
#   Optional right-column body text. Uncomment and write here if you want
#   prose in the right column instead of (or in addition to) the pullquote.
#   HTML passthrough works here too.
---

Opening paragraph. The lead gets a drop cap on its first letter — make the opening sentence worth the treatment. Get into the story in the first line.

Second paragraph. This column is the left two-thirds of the front page hero. It's clipped at roughly 13 lines with a gradient fade. The full content shows in the popup.

Third paragraph. Write for the crop — the most important parts should land in the visible section. The rest rewards readers who open the full story.

Subsequent paragraphs continue in the popup. Use `## Subheadings` for longer leads. Use `[text]{redact}` for redactions.

Closing note. The lead carries more editorial weight than a standard story — the headline, deck, and pullquote do a lot of work before the reader even hits the body. Make sure they're worth it.

---

## WORKFLOW NOTES (delete before publishing)

To publish a new lead:
1. Open the current lead post → change `type: lead` to `type: story`
2. Rename this file: `YYYY-MM-DD-your-slug.md`
3. Set today's date
4. Push — the new lead becomes the front page hero immediately
