---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
---

Also on [Google Scholar](https://scholar.google.com/citations?user=o9ErjT4AAAAJ&hl=en). Papers under review are listed in the [CV](/cv/).

<div class="publications">

<h2 class="bibliography">Journal and conference papers</h2>
{% bibliography --group_by none --query @*[pubtype=journal || pubtype=conference] %}

<h2 class="bibliography">Workshop papers</h2>
{% bibliography --group_by none --query @*[pubtype=workshop] %}

<h2 class="bibliography">Patents</h2>
{% bibliography --group_by none --query @*[pubtype=patent] %}

<h2 class="bibliography">Posters</h2>
{% bibliography --group_by none --query @*[pubtype=poster] %}

</div>
