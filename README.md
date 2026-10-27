# vatsaljha.dev

Personal site, built with [al-folio](https://github.com/alshedivat/al-folio) (Jekyll) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

Where things live:

| What | File |
| --- | --- |
| Bio, homepage | `_pages/about.md` |
| News | `_news/*.md` |
| Publications | `_bibliography/papers.bib` (`selected = {true}` puts a paper on the homepage) |
| CV | replace `assets/pdf/Vatsal_Jha_Academic_Research_CV.pdf` |
| Links / socials | `_data/socials.yml` |
| Profile photo | add `assets/img/prof_pic.jpg` and set `profile.image: prof_pic.jpg` in `_pages/about.md` |

Local preview:

```bash
docker run --rm -it -p 4000:4000 -v "$PWD":/srv/jekyll -w /srv/jekyll ruby:3.3.5 \
  bash -c 'bundle install && bundle exec jekyll serve --host 0.0.0.0'
```

Then open http://localhost:4000.
