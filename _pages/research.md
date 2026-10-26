---
layout: page
title: research
permalink: /research/
nav: true
nav_order: 1
description: Three questions that run through my work.
---

### Does the improvement survive a fair comparison?

A new model or method often looks better until it is compared at matched cost, against the simplest reasonable baseline, with enough runs to tell. I build evaluations that can return "equivalent" or "inconclusive", and that score a model on the decision it is used for rather than on aggregate accuracy.

<div class="publications">{% bibliography --group_by none --query @*[theme=comparison] %}</div>

### Who gets observed, verified and served when capacity is scarce?

When only some clients can be sampled, some patients contacted or some sites simulated, the allocation policy decides what gets learned and who benefits. I study these budgets in public settings: healthcare, mobility, energy and climate.

<div class="publications">{% bibliography --group_by none --query @*[theme=scarcity] %}</div>

### Do guarantees checked in isolation hold once AI acts inside a real system?

AI now operates infrastructure and acts on people's behalf, and models need infrastructure of their own to run reliably. I work on both sides.

<div class="publications">{% bibliography --group_by none --query @*[theme=systems] %}</div>

- **Root-cause analysis agents** _(Samsung Research India, 2025)._ Agents collect evidence from metrics, traces, logs and Kubernetes, then test hypotheses about what failed. They are diagnosis-only by design, because a wrong automatic fix costs more than a slow one.
- **Deepfake detection in production** _(testAIng, 2026)._ Multilingual audio-deepfake detectors (0.94–0.96 AUC) taken from research code to autoscaled Kubernetes inference. [Writeup](https://medium.com/@vatsal.jha_28295/one-class-learning-for-audio-deepfake-detection-9a841b79a7bf)
