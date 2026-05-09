---
title: "What Letters Cost"
date: 2026-03-22
type: story

section: dispatch
tags: [dispatch, code]
byline: "Filed from Dubai · March 2026"
size: h2
description: "On building markedwith.love, and the question of what it means for a letter to cost something."
---

The idea behind markedwith.love is simple enough to fit on a napkin: a letter should cost something. The cost used to be stamps and ships. The letter from London to Calcutta in 1840 cost money, took months, and was written with the knowledge that it would take months. The letter was therefore written accordingly. You did not write a letter that you expected back in twenty minutes. You wrote a letter that was worth the journey.

Email removed the cost. This was presented as progress, and by most measures it is. But the cost was doing something that nobody noticed until it was gone: it was creating intentionality. The sender had decided that this message was worth the cost of sending it. The recipient knew this. The knowledge changed how both parties related to the message.

markedwith.love tries to put the cost back in, not as money but as time and distance. You write a letter. You address it to someone. The delivery time scales with the real geographic distance between you and them. A letter to someone in the same city arrives in hours. A letter to someone on the other side of the world takes days. The letter itself is unchanged. The waiting is the cost.

What I have learned in building this: the waiting does something. People who have tested the early version report that they write differently when they know the letter will not arrive instantly. They take more care. They say things they would not have said in an email because an email is an arrow and a letter is a parcel — it carries more, and you are more aware of what you are putting in it. Whether this effect is real or whether testers are being polite is impossible to determine at this scale. It feels real.

The technical problem I did not anticipate is timezone display. When you are in Dubai and you send a letter to someone in São Paulo, the delivery countdown is trivial to compute. What is not trivial is displaying it in a way that feels like distance and not like a countdown timer. A countdown timer is anxious. Distance should feel like distance — like a thing that is happening in the world, not a thing that is being waited for. The UI work is the hardest part of the project. The algorithm took a weekend. The feeling has taken three weeks and is not finished.
