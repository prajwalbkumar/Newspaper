---
title: "I Audited Every Script I've Written in Three Years. Here Is What I Found."
date: 2026-03-28
type: story

section: code
deck: "Thirty-one pyRevit scripts. Eleven are still running. Seven were replaced by better scripts. Six were written for problems that no longer exist. The remaining seven are a monument to premature optimisation."
byline: "By Our Code Correspondent"
size: h2
description: "An honest audit of three years of BIM automation scripts — what survived, what didn't, and what it reveals about how I approached automation."
---

At some point you accumulate enough code that you stop knowing what you have. The scripts folder was 2.3GB. The count was thirty-one files. The last time I had looked at some of them was [eighteen months ago, which means I had been relying on them without understanding them]{redact}, which is a specific category of technical debt.

I spent a week auditing them. Not refactoring — just reading and classifying. The results were educational.

## The Categories

**Still running and still correct (11 scripts):** These are the workhorses. The room numbering propagator. The shared parameter exporter. The door mark validator. The clash detection pre-filter. The view template applicator. These work because they were written to solve stable problems — problems whose requirements did not change when the project changed.

```python
# The door mark validator — written March 2024, still running
# Checks that every door has a unique mark within its level
def validate_door_marks(doc):
    doors = FilteredElementCollector(doc)\
        .OfCategory(BuiltInCategory.OST_Doors)\
        .WhereElementIsNotElementType()\
        .ToElements()

    by_level = defaultdict(list)
    for door in doors:
        level_id = door.LevelId
        mark = door.get_Parameter(BuiltInParameter.ALL_MODEL_MARK).AsString()
        by_level[level_id].append((door.Id, mark))

    errors = []
    for level_id, entries in by_level.items():
        marks = [e[1] for e in entries]
        duplicates = [m for m in marks if marks.count(m) > 1]
        if duplicates:
            errors.append(f"Level {level_id}: duplicate marks {set(duplicates)}")
    return errors
```

This script has run on four projects. It has found 847 mark errors across those projects, every one of which would have caused coordination issues downstream. It was worth writing.

**Replaced by better scripts (7 scripts):** The early ones. These worked but were written with a poor understanding of the Revit API. The element filtering used `ToList()` where `ToElements()` is appropriate — a small performance issue that compounds on large models. The error handling was catch-all try/except blocks that swallowed API errors silently. The data structures were lists of tuples instead of dataclasses, which made the logic hard to follow.

I rewrote these properly. The replacements are about 40% shorter and handle edge cases the originals didn't. The investment was worth it for the five scripts that run frequently. The other two I probably should have deleted instead.

**Written for problems that no longer exist (6 scripts):** These are the interesting ones. There was a script for migrating from one shared parameter file format to another — a migration that happened in 2024 and is now complete. There was a script for checking compliance with a client's specific BIM execution plan — a client who moved to a different firm and took their BEP with them. There was a script for exporting to a specific software format that the project team stopped using.

I deleted all six. Keeping code that solves problems you no longer have is [a form of hoarding]{redact}. It looks like resource accumulation but it's actually just weight. The code might be reusable in some future project. It probably won't be. The 40 hours it represents are not recoverable by keeping the files.

**Premature optimisation (7 scripts):** These are the monument I mentioned. Seven scripts written for problems that were real but small, and written with an architecture designed for problems ten times larger. A script for batch-renaming views — correctly, a five-line script — written with a plugin architecture, a configuration file, a logging system, and a progress bar. The progress bar was for a script that runs in 0.4 seconds.

I rewrote four of these as the five-line scripts they should have been. The other three I left, because the over-engineering happened to make them easy to adapt when requirements changed, and the adaptation has happened twice. [Premature optimisation isn't always wrong]{redact}. It's just wrong more often than it seems when you're in the middle of it.

## What the Audit Taught Me

The stable scripts — the ones still running and still correct — share a pattern: they solve problems at the domain level, not at the implementation level. The door mark validator doesn't know anything about my specific project structure. It knows what a door is, what a mark is, and what a duplicate is. This domain-level thinking means the script transfers between projects without modification.

The unstable scripts solved problems at the project level — specific to a client, a phase, a workflow decision that subsequently changed. These were correctly replaced or deleted.

The lesson I draw from this: before writing any automation script, ask whether the problem being solved is structural or situational. Structural problems — anything arising from the nature of Revit models, coordination requirements, or BIM standard compliance — are worth building robust solutions for. Situational problems — anything specific to a current project, client, or workflow — are worth solving with the simplest possible script and no architecture at all.

I wrote six scripts in the last year. Five were structural. One was situational. I spent [the right amount of time]{redact} on each. This is an improvement on the first two years.
