---
title: "The City That Forgot What Streets Are For"
date: 2026-01-14
layout: longform

deck: "Dubai builds relentlessly upward. The problem is at ground level."
byline: "By Our Architecture Correspondent · Dubai, Jan 2026"
dateline: "DUBAI"
section: architecture
tags: [architecture, opinion]
size: h1

description: "A long read on walkability, ground-level failure, and what Dubai's extraordinary skyline actually costs at street level."
---

<span class="dateline">DUBAI —</span> There are cities designed for walking and cities that merely tolerate it. Dubai, for most of its built area, belongs to the second category — and the consequences of this are visible every day to anyone paying attention at street level rather than skyline level.

Stand at the base of any tower on Sheikh Zayed Road. The building is extraordinary. The surrounding pavement is three metres wide, unshaded, ends abruptly at a car park barrier. There are no benches. There is nowhere to buy water. The assumption encoded into this arrangement is that you will not be here on foot, and if you are, the experience will be uncomfortable enough that you will not return.

## The Arithmetic of Distance

The planning standard used across most of the world is the 400m walkability radius. In environments designed for walking — tree canopy, shade, continuous footpaths, active ground floors, safe crossings — this 400m is achievable. In Dubai, the effective walkable radius is around 140–180m. The difference is infrastructure, not climate.

```
def effective_walkability(origin_pt, radius):
    crossings  = find_crossings(origin_pt, radius)
    shade_pct  = calculate_shade_coverage(origin_pt, radius)
    return radius * (crossings / 10) * shade_pct
```

Running this across the Downtown core produces a map where the theoretical 400m radius collapses to 140–180m for most towers. The difference is the street.

## What Changes

The problem is not structural in the architectural sense. It does not require demolishing what has been built. It requires activating ground floors, adding shade structure between buildings, installing crossings where desire lines already exist, and treating the public realm as an investment rather than a residual cost.

The buildings will always be extraordinary. The test now is what happens between them.
