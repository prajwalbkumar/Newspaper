---
title: "Learning CSS Properly, Which Means Starting Over"
date: 2026-04-20
type: story

section: code
tags: [code]
byline: "By Our Code Correspondent"
size: h2
description: "On The Odin Project, the gap between knowing CSS and understanding it, and why both are real."
---

I have been writing CSS for three years. I have been learning CSS for six weeks. These are different activities. Writing CSS is navigating by feel — you know roughly where things are, you know which properties tend to produce which effects, you know when to Google and you know what to search for. Learning CSS is understanding why the box model works the way it works, why floats cleared the way they cleared, why flexbox solved the problems it solved and what problems it left to grid. The first is a skill. The second is a foundation.

The Odin Project teaches the second. It does this by making you build everything from scratch — no framework, no library, no shortcut. You implement the card layout yourself. You implement the navigation yourself. You discover personally, not through documentation, that inline-block elements create whitespace from the line breaks in your HTML. You discover that `width: 100%` on a flex child does not behave the same as `flex: 1`. You discover that stacking contexts are real and `z-index` only works within them, which explains a family of bugs I have been working around for two years without understanding.

The gap between knowing CSS and understanding it is exactly the size of all the things I was confidently wrong about. I knew that `position: relative` was the parent you needed to position a child absolutely. I did not know that it also creates a stacking context, or that `transform` creates one, or that `will-change: transform` creates one speculatively. This newspaper's archive popup was broken because of a stacking context created by a CSS transform, and I fixed it by moving the popup outside the transformed element, which is the correct fix — but I reached it by intuition and trial, not by understanding. Now I understand it.

What I would tell a designer considering the same path: the investment is real and the payoff is real. The investment is approximately sixty hours to complete the relevant sections of the curriculum, assuming you work at it seriously. The payoff is that the code you write after does what you intend it to do, and when it doesn't, you understand why, which means the debugging process is thirty minutes instead of a day. The compounding value of understanding over knowing is high in any technical domain. In CSS it is particularly high because CSS is one of those disciplines where you can produce acceptable results with minimal understanding for a long time, which means the gap between the floor and the ceiling is vast and the gap remains invisible until the day it isn't.

The newspaper is partly the result of this. I built it while learning. The parts I understood I built correctly. The parts I didn't I built by feel, and some of them are quietly wrong in ways I will fix when I understand them well enough to see the wrongness. This is the accurate description of most software written by most people, and being honest about it is more useful than pretending otherwise.
