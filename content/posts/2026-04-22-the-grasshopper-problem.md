---
title: "Grasshopper Taught Me to Think in Graphs Before I Knew What Graphs Were"
date: 2026-04-22
type: story

section: code
deck: "Before I learned to write code, I was already doing functional programming in a visual editor. The gap between Grasshopper and proper code is smaller than it looks and larger than it feels."
byline: "By Our Code Correspondent"
size: h2
description: "On the relationship between Grasshopper parametric design and programming — and what architecture school teaches you about computation without naming it."
---

I learned to program twice. The first time was in architecture school, using Grasshopper for Rhino. The second time was recently, learning JavaScript properly. Between the two I wrote five years of pyRevit scripts and a lot of Python that worked without me fully understanding why.

What I understand now, looking back: Grasshopper was teaching me graph-based functional programming from the very first component I dragged onto the canvas. I didn't have the vocabulary for it. No one in the studio did. We called it "parametric design" and talked about it as a modelling technique. It was actually a programming environment with a visual syntax.

## The Graph Is the Program

In Grasshopper, a definition is a directed graph. Nodes are functions. Edges are data flows. The left side of each component takes inputs; the right side produces outputs. There are no side effects in a correctly-written definition — each component takes data in, transforms it, returns data out. The order of execution is determined by the graph topology, not by the order you placed components.

This is functional programming. Not because it looks like Haskell or because someone made an architectural decision to make it functional — it is functional because the visual metaphor of wires carrying data between components maps directly onto function composition. You cannot modify state in a Grasshopper component. You can only transform data. This means everything you build is referentially transparent: given the same inputs, you always get the same outputs.

```python
# This is what a Grasshopper tree operation looks like in Python
import Rhino.Geometry as rg

def offset_curves(curves, distances):
    """What Grasshopper's Offset Curve component does implicitly."""
    results = []
    for crv, dist in zip(curves, distances):
        offset = crv.Offset(
            rg.Plane.WorldXY,
            dist,
            0.001,
            rg.CurveOffsetCornerStyle.Sharp
        )
        results.extend(offset)
    return results
```

I wrote hundreds of Grasshopper definitions before I knew what a list was. I knew what Grasshopper called a "list" and what it called a "tree" — which is a nested list, a list of lists — but I understood these as modelling concepts, not programming concepts. The moment I started learning Python properly and encountered lists and nested lists, I had this strange experience of recognising something I already knew from a different angle. The knowledge was already there. The vocabulary was new.

## What Grasshopper Gets Right That Textual Code Gets Wrong

The visual representation of data flow is, for spatial reasoning people, vastly better than textual code. You can see where data comes from and where it goes. You can see which components are connected. You can see, at a glance, whether your definition has parallel branches or sequential dependencies.

What you can't easily see: what happens inside a component. The components in Grasshopper are black boxes. You know the interface — inputs, outputs, data types — but not the implementation. For a long time I thought this was fine, because the implementations were written by McNeel engineers and were presumably correct. The problem is that you cannot debug a black box. When a definition produces wrong results, you can trace the data flow, but you cannot step into a component and see what it's doing.

This is where textual code is better. You can read the implementation. You can step through it line by line. You can insert print statements. The debugging affordance of textual code is, for any non-trivial problem, superior to the visual debugging of a graph.

The ideal tool probably sits between these two: visual for the graph structure, readable for the component implementations. This is roughly what pyRevit's panel system does, and roughly what Speckle is attempting at a larger scale. [Nobody has solved it cleanly yet]{redact}.

## The Transfer

When I started writing Python properly — not pyRevit scripts, but Python with tests and a proper understanding of what I was doing — I found that the hard concepts came easily. Functions as first-class objects: I already understood this from Grasshopper's component model. Recursion: harder, and Grasshopper didn't help with this. List comprehensions: immediately legible once I understood that they were a terse version of the loop-and-accumulate pattern I had been doing in Grasshopper trees for years.

What didn't transfer: the mental model of imperative code. Grasshopper has no loops, no conditions evaluated sequentially, no mutation. Python has all of these, and learning to think imperatively after years of purely functional visual programming was genuinely uncomfortable. I kept wanting to express things as data transformations when the correct expression was a loop with an accumulator.

The discomfort resolved after about two months. I now think in both modes depending on the problem. Some things are naturally functional — transformation pipelines, data cleaning, mapping. Some things are naturally imperative — state machines, UI event handling, anything with side effects. Knowing which mode to apply when is a skill that Grasshopper partly taught me, without either of us knowing that's what was happening.

Architecture school is [better at teaching programming than it knows it is]{redact}. It just doesn't call it that.
