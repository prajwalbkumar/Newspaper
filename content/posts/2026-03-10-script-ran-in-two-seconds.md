---
title: "The Script Ran in Two Seconds. It Took Two Weeks to Write."
date: 2026-03-10
type: story

section: code
deck: "The honest arithmetic of automation, and why it is always a bet on the future."
byline: "By Our Code Correspondent"
size: h2
description: "An honest look at the arithmetic of automation in BIM workflows."
---

The script does one thing: walks the model, checks every element against a parameter schedule, writes a report. Two seconds. A person doing it manually: forty minutes. Two weeks to write it. The break-even is in about five months. After that it is pure gain. This is the honest arithmetic of automation, and it is why the decision to automate is always a bet on the future.

The two weeks were not two weeks of writing code. They were two weeks of understanding the problem well enough to write code. The first three days produced a script that walked the model and wrote a report. The report was wrong. It was wrong in the way that automated reports are wrong: confidently, consistently, in a way that took four more days to identify because the error was not in the logic but in the assumption the logic was built on.

The assumption: that every element in a family category has the shared parameter in question. It does not. Some families were loaded from a library created before the parameter schema was defined. Some were loaded by a consultant who did not receive the memo about the parameter schema. Some were loaded correctly but from the wrong version of the family, which has the parameter but with a different GUID. None of this is in the documentation because the documentation was written by the person who set up the schema, who knew all of this and therefore did not think to write it down.

The script now handles all three cases. It took another five days. The report is correct. It runs in two seconds. The forty-minute manual check has not been done since January.

Five months until break-even. I believe this is worth it. The belief is a bet on the future — specifically, that the project will still be running in five months, that the team will still be using the parameter schema, and that the problem the script solves will still be the same problem. These are reasonable bets. They are still bets.
