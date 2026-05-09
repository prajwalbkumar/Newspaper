---
title: "The Weight of Distance Is the Whole Point"
date: 2026-05-09
type: lead

section: code
deck: "Six weeks into building markedwith.love, the distance mechanic is working. The question now is whether the thing I've built is the thing people need — or just the thing I needed to build."
pullquote: "A letter that arrives instantly is an email with delusions of grandeur. The delay is not a bug. It is the entire product."
byline: "By Our Code Correspondent · Filed from Dubai · May 9, 2026"
size: h1
description: "On building markedwith.love — a letter app where distance shapes delivery — and the strange act of making something for strangers."
---

Six weeks ago I committed the first line of code for markedwith.love. The idea was simple enough to fit on a napkin: a letter app where the time it takes your letter to arrive maps to the real geographic distance between you and the person you're writing to. A letter across the city: a few hours. A letter to someone on the other side of the world: weeks.

Simple enough to explain. Considerably less simple to build correctly.

The distance calculation was the first thing I got wrong. The [naïve implementation]{redact} used straight-line distance — the crow-fly distance between two coordinates. What it should use, and what it now uses, is great-circle distance: the shortest path between two points on the surface of a sphere. The difference is small at city scale and material at continental scale. A letter from Dubai to São Paulo via straight-line distance: wrong by about 400 kilometres. The great-circle correction is four lines of trigonometry. The four lines took half a day to find and verify, because the internet is full of implementations that are almost correct.

The second thing I got wrong was the delivery window calculation. My first instinct was to express distance as a linear function of time: 1 kilometre equals 1 minute of delay, capped at a maximum. This felt clean. It was wrong. The problem is that linear scaling makes short distances indistinguishable — a letter to someone in your building and a letter to someone across your city both arrive in minutes. The emotional gradient disappears. The thing that makes the mechanic meaningful is that the difference between nearby and far is felt, not just measured.

The current implementation uses a logarithmic curve. A letter within 50km: 10 minutes to 2 hours. A letter at 500km: 6 to 18 hours. A letter at 5,000km: two to seven days. A letter from Dubai to the furthest reachable point on earth, roughly 19,500km: up to three weeks. The logarithm compresses the large numbers and spreads the small ones. The emotional gradient is present. The thing feels right in a way the linear version didn't.

```javascript
function deliveryHours(distanceKm) {
  const BASE_HOURS = 0.25;          // 15 min floor
  const MAX_HOURS  = 504;           // 3 weeks ceiling
  const SCALE      = 80;            // controls curve steepness
  const raw = BASE_HOURS + Math.log1p(distanceKm / SCALE) * 40;
  return Math.min(raw, MAX_HOURS);
}
```

What I notice, watching people interact with the prototype: they lean in when they first understand it. There is a particular moment — usually about thirty seconds in — when someone reads the delivery estimate on their letter and the number lands. *Three days. Because she's in Toronto and I'm in Dubai and that's how far that actually is.* The app is not telling them something they didn't know. They know the distance. The app is making them feel it.

This is, I think, what [most technology spends enormous effort trying to eliminate]{redact}. The friction. The waiting. The weight. markedwith.love is deliberately adding it back, on the theory that the weight is what makes the gesture meaningful. A letter that arrives instantly is an email with delusions of grandeur. The delay is not a bug. It is the entire product.

The next six weeks will determine whether this is a thing people want or a thing I wanted to build. Both are valid outcomes. The building has already changed how I think about latency, distance, and what we lose when everything is instantaneous. Whether anyone else arrives at the other end of the same thought is, as with all letters, a question for later.
