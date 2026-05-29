# Vatsal Jha Portfolio

Static personal website for GitHub Pages or any static host.

## Editable files

- `index.html` - page shell, styles, fonts, metadata, and script loading
- `site.jsx` - portfolio content and React components
- `tweaks-panel.jsx` - local tweak controls used by the page
- `assets/portrait.jpg` - hero portrait
- `assets/Vatsal_Jha_Resume.pdf` - hosted resume link

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Recommended hosting setup

Use GitHub Pages plus a custom domain. GitHub Pages gives recruiters a familiar source-backed deployment, and the custom domain gives you the most professional URL.

Good target URLs:

- `vatsaljha.com`, if available
- `vatsaljha.dev`, if available
- `vatsaljha.me`, if the first two are taken

The GitHub Pages URL alone is fine as a fallback, but `https://vatsaljha.com` or `https://vatsaljha.dev` looks cleaner on a resume, LinkedIn, email signature, and job applications.

## Deploy on GitHub Pages

1. Create a public repo named `Vatsal-Jha256.github.io`.
2. Commit these files at the repo root.
3. Push to `main`.
4. In GitHub, go to Settings -> Pages.
5. Set Source to `Deploy from a branch`, Branch to `main`, Folder to `/root`.
6. Visit `https://Vatsal-Jha256.github.io` after the Pages build finishes.

For a custom domain, add the domain in Settings -> Pages, then add DNS records at your domain registrar. If you use a domain, keep the GitHub Pages repo public and verify the domain in GitHub.
