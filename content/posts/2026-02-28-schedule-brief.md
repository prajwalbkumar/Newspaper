---
title: "The Schedule That Lied"
date: 2026-02-28
type: brief

section: code
tags: [code]
description: "A brief on Revit schedules and the particular ways they can be correct and wrong simultaneously."
---

**The Schedule That Lied —** The door schedule was correct. Every door was in it. The counts matched. The spec section references were populated. The review passed. Three weeks later: the fire doors on level four are shown as achieving a 60-minute rating. The specification requires 90 minutes. The parameter existed in the families. It was populated in some families and missing in others. The schedule showed the field; it did not show the absence of a value as an error — it showed it as a blank, which looks like a value that happens to be blank, not like a value that is dangerously missing. This is not a bug. It is how schedules work. The lesson: blank is not the same as correct. Validate presence, not just content.
