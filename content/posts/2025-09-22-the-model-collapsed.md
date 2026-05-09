---
title: "The Model Collapsed at 4pm on a Thursday"
date: 2025-09-22
type: story

section: code
tags: [code, architecture]
byline: "By Our Code Correspondent"
size: h2
description: "On corrupted Revit files, recovery workflows, and the specific dread of a red journal file."
---

The model collapsed at 4pm on a Thursday. Not a gradual failure — one moment it was open, the next it was not, replaced by the specific Revit error message that architects of a certain vintage have memorised the way others memorise poetry. The journal file was red. The backup was from 10am. Six hours of work, four people, one catastrophic sync.

The recovery protocol for a corrupted Revit central model is well documented and mostly useless. You follow it anyway because there is nothing else to do. You open the backup. You audit the journal. You try the recovery wizard. The recovery wizard produces a model that opens but has lost the structural coordination layer, which is the layer that three engineers spent the morning updating. You note this and keep going because there is still a deadline.

What the Thursday afternoon taught me, again, is that the backup interval the project team agreed on at project start — a number chosen because it sounded reasonable, not because anyone had done the arithmetic on what six hours of four people's work actually costs — is wrong. The number is wrong on every project it is agreed upon, because it is always agreed upon before anyone has experienced losing that many hours of work, and people are systematically bad at estimating the value of time they have not yet lost.

The project moved the backup interval to two hours the following Monday. There was a brief discussion about whether this would cause performance issues. It does not cause performance issues that are noticeable relative to the performance issues already present in a model of this scale. The discussion happened anyway because the new interval needed to be justified to people who had not been in the building at 4pm on Thursday.

We recovered most of it. The structural coordination layer was reconstructed from exported IFC backups the engineers had maintained independently, which is a workflow nobody had formally agreed on and which turned out to be the thing that saved the day. It saved the day not because anyone planned for it but because the engineers had been burned before and had quietly implemented their own backup discipline without asking whether the project required it. This is the correct response to working in a field where the official backup protocol is insufficient.
