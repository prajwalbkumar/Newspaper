---
title: "The Parameter Problem Is a People Problem"
date: 2026-01-08
type: story

section: code
tags: [code, architecture]
byline: "By Our Code Correspondent"
size: h2
description: "Why BIM parameter schemas fail, and why the failure is never about the parameters."
---

Every BIM project of sufficient complexity eventually develops a parameter problem. The parameter problem manifests as: nobody can agree what a thing is called, and therefore nobody can query it reliably, and therefore the data in the model means nothing to the person trying to use the data. The parameter problem is presented as a technical problem. It is a social problem with a technical surface.

The technical surface is real. Shared parameters, project parameters, family parameters — three types, each with distinct behaviour, each with their own scope of applicability and their own inheritance rules. A shared parameter GUID is globally unique but the GUID is invisible in the UI. A project parameter lives in the project and cannot be shared across projects without migration. A family parameter lives in the family and cannot be reported in a schedule without promotion. Understanding these distinctions takes about a week of serious study, and most people never take that week because they are already on the project.

The social problem is worse. The parameter schema is designed by one person or one team, typically during project setup, when every decision that needs to be made is being made at the same time and nobody has the bandwidth to think carefully about parameter naming conventions. The schema is then inherited by everyone who joins the project subsequently. The people who join subsequently have opinions about naming, opinions formed on previous projects that had different conventions, and no compelling reason to abandon their opinions in favour of the schema because the schema was never explained to them and nobody is enforcing it.

What happens over eighteen months is: the schema has twenty agreed parameters and sixty that were added by whoever needed something and could not find the right agreed parameter to use. The sixty ad-hoc parameters are not documented. They are not included in the schedule templates. They are not consistent across families. They contain some of the most important data on the project, entered by people who were trying to solve a problem and did what worked, and the data is now structurally inaccessible.

The only fix is people: a standards owner with the authority to enforce the schema, a process for requesting new parameters that doesn't default to just adding them, and a quarterly audit that has real consequences for non-compliance. The technical tooling to support this exists. The organisational will to implement it exists less reliably. The projects that solve the parameter problem are the ones where someone decided that solving it was worth the friction it would cause. Most projects decide it is not worth the friction. Most projects regret this.
