---
layout: about
title: about
permalink: /
subtitle: Research engineer · Bangalore

profile:
  align: right
  image:
  image_circular: false
  more_info:

selected_papers: true
social: true

announcements:
  enabled: true
  scrollable: false
  limit: 4

latest_posts:
  enabled: false
---

I'm a research engineer. I work on machine learning that has to decide with limited capacity: which clients to train on, which patients to check, which answers to verify. I also work on whether the results we report about such systems hold up.

My work follows three questions:

<ol class="research-questions">
<li id="comparison"><strong>Does the improvement survive a fair comparison?</strong> Many gains shrink once a method is compared at matched cost, against the simplest reasonable baseline, with enough runs to tell. I build evaluations that can return "equivalent" or "inconclusive", and that judge a model by the decision it supports. <a href="/publications/#jha2026ranking">Ranking Is Not Valuation</a> shows a carbon model that ranks products well but overstates the savings it reports. <a href="/publications/#jha2026adaptivecarearena">AdaptiveCareArena</a> asks whether differences between patient models still matter once measurement and clinician attention are scarce.</li>
<li id="scarcity"><strong>Who gets observed and served when capacity is scarce?</strong> When only some clients, patients or sites can be observed, the allocation policy decides what gets learned and who benefits. <a href="/publications/#jha2026behaviorflmt">BehaviorFL-MT</a> finds the few vehicles that can label a rare task and samples them 5.8&times; more often for the same communication budget.</li>
<li id="systems"><strong>Do guarantees checked in isolation hold once AI acts inside a real system?</strong> At Samsung Research I built multi-agent root-cause analysis for distributed services, kept diagnosis-only because a wrong automatic fix costs more than a slow one. <a href="/publications/#jain2025homa">HOMA</a> runs smart-home commands with small on-device models, and <a href="/publications/#jha2025caamfa">CA-AMFA</a> adapts home authentication online.</li>
</ol>

I've also built multilingual audio-deepfake detection at testAIng. I do research with Dr. B. Ashok at VIT, where I finished a B.Tech in Computer Science in 2026.
