---
title: "The Write Before You Match Problem"
date: 2026-05-09
type: lead

section: code
deck: "Six weeks into building kindred.date, the essay-first mechanic is working. The question now is whether the thing I've built is the thing people need — or just the thing I needed to build."
pullquote: "A profile that costs nothing to write produces a match worth nothing to keep. The effort is not the barrier. It is the filter."
byline: "By Our Code Correspondent · Filed from Dubai · May 9, 2026"
size: h1
description: "On building kindred.date — a dating site where you write an essay before you match — and the strange act of making something for strangers."
---

Six weeks ago I committed the first line of code for kindred.date. The idea was simple enough to fit on a napkin: a dating site where you write a short essay about yourself before you see anyone else's profile. Not a bio. Not a list of interests. An essay — something that required a decision about what to say and how to say it.

Simple enough to explain. Considerably less simple to build correctly.

The essay prompt was the first thing I got wrong. My [naïve first attempt]{redact} asked: *Tell us about yourself.* This produced exactly the kind of response you would expect from a form field that asks you to tell it about yourself. People wrote job titles and hobbies. The essays were indistinguishable. The matching was useless because there was nothing to match against.

The current prompt is different. It asks three things: what you are trying to build right now, what you find genuinely difficult to explain to people, and what you would do with an unscheduled Tuesday. These questions have no correct answers, which is the point. They surface how a person thinks, not what a person lists. Two people who answer the Tuesday question with something specific and weird are probably more compatible than two people who both list hiking and brunch.

The matching algorithm was the second thing I got wrong. My first instinct was cosine similarity on essay embeddings — a standard NLP approach. This felt technically correct. It was wrong in practice. The problem is that cosine similarity finds people who write like you, which is not the same as people you would want to meet. You do not need someone who thinks identically. You need someone whose thinking engages yours.

The current implementation uses a combination of embedding distance and contrast scoring — it surfaces profiles that share some semantic territory with yours but diverge in interesting ways. The divergence is deliberate. The thing that makes a conversation worth having is not agreement. It is productive difference.

```javascript
function compatibilityScore(essayA, essayB) {
  const similarity  = cosineSimilarity(embed(essayA), embed(essayB));
  const contrastPts = countSemanticDivergence(essayA, essayB);
  return (similarity * 0.4) + (contrastPts * 0.6);   // divergence weighted higher
}
```

What I notice, watching people interact with the prototype: the drop-off is high at the essay step. About 60% of people who start an essay do not finish it. This was alarming for the first two weeks. It is now [the feature I am most confident about]{redact}. The 40% who finish are different. They send longer first messages. They reference specific things from the other person's essay. They ask questions rather than making statements.

This is, I think, what the swipe removed without anyone noticing. The cost of declaring interest. When interest is free to signal, it signals nothing. kindred.date is deliberately making it expensive, on the theory that the expense is what makes it meaningful. A profile that costs nothing to write produces a match worth nothing to keep. The effort is not the barrier. It is the filter.

The next six weeks will determine whether this is a thing people want or a thing I needed to build. Both are valid outcomes. The building has already changed how I think about friction, investment, and what we lose when everything is instantaneous. Whether anyone else arrives at the other end of the same thought is a question for later — which is, I suppose, how all of this starts.
