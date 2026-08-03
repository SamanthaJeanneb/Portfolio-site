---
title: Can LLMs learn to reason about space?
date: 2026-06-28
---

I met Hokin Deng a few weeks ago, one of the authors behind [A Very Big Video Reasoning Suite](https://video-reason.com/), and we got stuck on a question I still haven't put down: can LLMs actually get better at spatial reasoning, or is this just what you get when you train something on text and nothing else?

Ask a model to rotate a shape in its head or pack boxes into a trunk and it fumbles. The same model can write you a compiler, so it's not that it's dumb. It's that basically everything it knows about space came from people describing space in words, and words are a lossy container for space. I could describe my apartment to you for ten minutes straight and you still wouldn't know it the way you'd know it after walking through once. That gap is the whole question.

It makes for a great thought experiment because both answers feel plausible. Maybe spatial sense needs a body, needs walking around in the world, and no amount of clever training gets you there from text. Or maybe it's just another capability waiting on the right data, and we're early. A year ago I'd have shrugged. The stuff coming out this year is pulling me toward the second answer.

The result that moved me most is honestly the silliest sounding one: teach the model to draw. [Huang et al.](https://arxiv.org/abs/2604.14641) noticed models can read ASCII maps fine but they're weirdly bad at producing them from a description, a read-write asymmetry. So they trained models to draw the layout, and spatial reasoning improved. And here's the part I keep thinking about, the improvement sticks around even after you stop asking for drawings at test time. Something changed upstream. You know a room better after you've sketched it, same thing apparently.

[TRACE](https://arxiv.org/abs/2603.23404) is a different angle on the same idea. If the model lives in text, meet it there. They have multimodal models write out the scene first, the camera path, the objects, where things sit relative to each other, then answer questions about egocentric video. Consistent gains across model families. So a lot of the failure was never missing knowledge. The models were jumping straight to answers without building anything to reason over. Which, fair, I do that too when I'm tired.

Then there's Hokin's, the ambitious one. [VBVR](https://arxiv.org/abs/2602.20159) treats video reasoning as the thing that comes after language reasoning. Two hundred tasks, over a million procedurally generated clips, roughly a thousand times bigger than any prior video reasoning dataset, scored with rules instead of asking some other model to grade. Buried in the scaling studies is the bit that got me: early signs of generalization to reasoning tasks the model never saw in training. Maybe space is learnable the way language was, and the data just never contained enough of it before.

I walked away thinking these aren't competing bets. Two of them say representation matters, that models do better when they build the scene before answering. The other asks whether enough of the right data makes the scene-building emerge on its own. Probably both? Text taught models to think in symbols. Video teaches them what the symbols are attached to.

So no, I don't think spatial reasoning is a wall. It looks like language reasoning a few years ago, waiting on data and on people willing to measure it honestly. Glad Hokin's one of the people doing the measuring.

## References

- Wang, M., et al. (2026). [A Very Big Video Reasoning Suite](https://arxiv.org/abs/2602.20159). arXiv:2602.20159. Project page: [video-reason.com](https://video-reason.com/)
- Huang, S., Liu, L., He, J., Gilpin, L. H. (2026). [Learning to Draw ASCII Improves Spatial Reasoning in Language Models](https://arxiv.org/abs/2604.14641). arXiv:2604.14641
- Hua, J., Yin, Y., Wu, Y., Wang, T., Huang, Y., Liu, M. (2026). [Unleashing Spatial Reasoning in Multimodal Large Language Models via Textual Representation Guided Reasoning](https://arxiv.org/abs/2603.23404). arXiv:2603.23404
