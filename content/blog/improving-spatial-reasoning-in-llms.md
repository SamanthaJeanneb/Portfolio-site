---
title: Can LLMs learn to reason about space?
date: 2026-06-28
---

I met Hokin Deng a few weeks ago. He is one of the authors behind [A Very Big Video Reasoning Suite](https://video-reason.com/), and we ended up stuck on a question I have not been able to put down since: can you actually make LLMs better at spatial reasoning, or is that just what happens when you train something on text?

Here is why I think it is such a fun thought experiment. Ask a model to rotate a shape in its head, pack boxes into a trunk, or keep track of where a camera has been in a room, and it will usually fumble. Not because it is dumb. The same model can write you a compiler. It fumbles because nearly everything it knows about space came from people describing space in words, and words are a lossy container for it. I could describe my apartment to you for ten minutes and you still would not know it the way you would after walking through it once.

So, stuck or not stuck? Reading the papers coming out this year, I think not stuck. A few results changed my mind.

The first one sounds almost silly: teach the model to draw. [Huang et al.](https://arxiv.org/abs/2604.14641) noticed that models can read ASCII maps just fine but are weirdly bad at producing them from a description. They call it a read-write asymmetry. Train the model to actually draw the layout and its spatial reasoning improves. The part I love is that the improvement sticks around even when you stop asking it to draw at test time. Sketching the floor plan changes something upstream. Very human, honestly. You know a room better after you have drawn it.

Second: if the model lives in text, meet it there. [TRACE](https://arxiv.org/abs/2603.23404) has multimodal models write out a description of the 3D scene, the camera path, the objects, all of it, as an intermediate step before answering questions about egocentric video. Consistent gains across model families. Which tells me a lot of the failure was never missing knowledge. The models were skipping straight to the answer without building anything to reason over first.

The third is Hokin's, and it is the ambitious one. [VBVR](https://arxiv.org/abs/2602.20159) treats video reasoning as the thing that comes after language reasoning. Two hundred tasks, over a million procedurally generated clips, roughly a thousand times bigger than anything that existed, scored with rules instead of asking another model to grade. Buried in the scaling studies is the result that got me: early signs of generalization to reasoning tasks the model never saw in training. Maybe space is learnable the same way language was. The data just has to actually contain it.

What I took away from talking with Hokin is that these are not competing bets. The first two say representation matters, that models do better when they build the scene before answering instead of jumping to the answer. The video work asks whether enough of the right data makes that structure show up on its own. My guess is both. Text taught models to think in symbols. Video will teach them what the symbols are attached to.

I do not think spatial reasoning is a wall. It looks a lot like language reasoning did a few years ago, waiting on the right data and someone willing to measure it honestly. Glad people like Hokin are doing the measuring.

## References

- Wang, M., et al. (2026). [A Very Big Video Reasoning Suite](https://arxiv.org/abs/2602.20159). arXiv:2602.20159. Project page: [video-reason.com](https://video-reason.com/)
- Huang, S., Liu, L., He, J., Gilpin, L. H. (2026). [Learning to Draw ASCII Improves Spatial Reasoning in Language Models](https://arxiv.org/abs/2604.14641). arXiv:2604.14641
- Hua, J., Yin, Y., Wu, Y., Wang, T., Huang, Y., Liu, M. (2026). [Unleashing Spatial Reasoning in Multimodal Large Language Models via Textual Representation Guided Reasoning](https://arxiv.org/abs/2603.23404). arXiv:2603.23404
