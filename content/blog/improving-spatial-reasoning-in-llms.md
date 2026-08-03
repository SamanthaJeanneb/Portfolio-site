---
title: Can LLMs learn to reason about space?
date: 2026-06-28
---

I recently met Hokin Deng, one of the authors behind [A Very Big Video Reasoning Suite](https://video-reason.com/), and we got into one of my favorite questions: is it actually possible to improve the spatial reasoning of LLMs, or is it a fundamental limitation of models trained mostly on text?

It is a great thought experiment. Language models are astonishing at manipulating symbols, but space is not a symbol. It is something you occupy. When you ask a model to rotate an object in its head, pack boxes into a trunk, or track where a camera has been in a room, you are asking it to do something the training data mostly describes rather than demonstrates. Text flattens space, and models inherit the flattening.

The interesting thing about 2026 is that the research community stopped treating this as a fixed ceiling and started treating it as an engineering problem. Three threads stand out to me.

## Give the model a scratchpad

One line of work argues that models fail at spatial reasoning partly because they never practice constructing space, only reading about it. [Learning to Draw ASCII Improves Spatial Reasoning in Language Models](https://arxiv.org/abs/2604.14641) (Huang et al., 2026) found what the authors call a read-write asymmetry: LLMs can interpret ASCII layouts reasonably well but struggle to produce them from a text description. When they trained models to draw layouts, spatial reasoning improved, and the gains held even when the model was not asked to draw anything at inference time. Learning to construct an explicit layout seems to instill spatial understanding that outlives the format. That resonates with how humans work. You understand a floor plan better after you have sketched one.

## Translate space into language

A second thread accepts that these models live in text and leans into it. [TRACE](https://arxiv.org/abs/2603.23404) (Hua et al., 2026) has multimodal models generate textual representations of a 3D environment, including camera trajectories and object descriptions, as intermediate reasoning traces before answering spatial questions about egocentric video. It produced consistent gains across model families on spatial benchmarks like VSI-Bench. The lesson I take from it: the bottleneck is not only what the model knows about space, it is whether the model is given a representation it can reason over.

## Learn space from video, at scale

The third thread is the one Hokin works on, and I think it is the most ambitious. [A Very Big Video Reasoning Suite](https://arxiv.org/abs/2602.20159) (2026) treats video reasoning as the next paradigm after language reasoning. The team built procedural data engines spanning spatiality, transformation, physics, and perception, over a million video clips, roughly three orders of magnitude larger than existing video reasoning datasets, plus a verifiable evaluation framework that does not rely on model-based judging. The finding that stuck with me: in their scaling studies they saw early signs of emergent generalization to reasoning tasks the model was never trained on. Space might be learnable the way language was, if the data actually contains it.

## Where I land

Talking with Hokin, what struck me is that these threads are not really competing. The scratchpad work and TRACE show that representation matters: models reason about space better when they build an explicit intermediate structure instead of jumping to an answer. The video work asks whether enough of the right data can make that structure emerge on its own. My bet is that the answer looks like both. Text taught models to think in symbols. Video, and eventually interaction, will teach them what those symbols are anchored to.

I do not think spatial reasoning is a wall. I think it is where language reasoning was a few years ago: waiting for the right data, the right representations, and a community that has decided to measure it honestly. I am very glad people like Hokin are building the measuring sticks.

## References

- Wang, M., et al. (2026). [A Very Big Video Reasoning Suite](https://arxiv.org/abs/2602.20159). arXiv:2602.20159. Project page: [video-reason.com](https://video-reason.com/)
- Huang, S., Liu, L., He, J., Gilpin, L. H. (2026). [Learning to Draw ASCII Improves Spatial Reasoning in Language Models](https://arxiv.org/abs/2604.14641). arXiv:2604.14641
- Hua, J., Yin, Y., Wu, Y., Wang, T., Huang, Y., Liu, M. (2026). [Unleashing Spatial Reasoning in Multimodal Large Language Models via Textual Representation Guided Reasoning](https://arxiv.org/abs/2603.23404). arXiv:2603.23404
