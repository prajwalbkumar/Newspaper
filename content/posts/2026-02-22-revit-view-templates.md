---
title: "Revit's View Templates Are a Solved Problem Nobody Solved"
date: 2026-02-22
type: story

section: architecture
byline: "By Our Code Correspondent"
size: h2
description: "View templates should work like stylesheets. They do not."
---

View templates should work like stylesheets. One source of truth, cascading logic, inheritance where sensible. A change to the master propagates down. Overrides are explicit and documented. This is not a radical idea — it is how CSS has worked since 1996.

They do not work like this. They work like a bureaucracy that accumulated rules over fifteen years without anyone auditing whether the rules still made sense. Each template is a self-contained island. Changes do not cascade. Overrides are silent. The relationship between a template and a view is a one-way push with no memory.

The project lost four hours last week to a view template override nobody remembered setting. The override was on crop region visibility, set to "Show crop region" on a view that had subsequently been templated with "Hide crop region," but the override survived the template application because Revit treats certain properties as view-owned rather than template-owned — and the documentation on which properties fall into which category is incomplete. I am told this is normal.

It is normal. That is the problem.

The solution I want: a view template system that works the way a design system works. A token hierarchy. A component has a default. The default can be overridden. The override is visible in the UI. The lineage is traceable. You can ask any view: where is this setting coming from? And get a clear answer.

The solution that exists: export to Excel, audit manually, import back, cross your fingers. We run this audit quarterly now. It takes a day. It should take a query.
