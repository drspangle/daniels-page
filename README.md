# Daniel Smullen Personal Site

This repository contains the static source for [www.daniel-smullen.com](https://www.daniel-smullen.com/).

The site is intentionally simple: hand-maintained HTML, CSS, JavaScript, images, and static resources deployed with GitHub Pages. There is no application server or client-side framework.

## Repository Layout

- `index.html` - primary site content and tab panels.
- `404.html` - custom not-found page.
- `css/` - site styling.
- `js/start.js` - tab navigation, sorting, and small accessibility helpers.
- `img/` - profile, logo, organization, and project images.
- `resources/` - downloadable PDFs, slide decks, posters, and other static files.
- `cv/` - LaTeX source and BibTeX data used to generate the public CV PDF.
- `CNAME` - custom domain configuration for `www.daniel-smullen.com`.
- `.github/workflows/deploy-pages.yml` - GitHub Actions workflow that deploys the static site to GitHub Pages.

## Local Preview

Any static HTTP server can preview the site. From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/
```

Opening `index.html` directly may work for basic viewing, but using a local HTTP server better matches GitHub Pages behavior.

## Deployment

The public site deploys automatically from `master` using GitHub Actions.

On every push to `master`, `.github/workflows/deploy-pages.yml`:

1. Checks out the repository.
2. Configures GitHub Pages.
3. Copies the static site files into `_site`.
4. Uploads the Pages artifact.
5. Deploys the artifact to GitHub Pages.

The deployment target is:

```text
https://www.daniel-smullen.com/
```

The `CNAME` file must remain set to:

```text
www.daniel-smullen.com
```

## Updating Content

Most website content updates happen in `index.html`. Keep related assets in `img/` or `resources/` and use relative links so the site works both locally and on GitHub Pages.

After changes, run:

```powershell
node --check js/start.js
git diff --check
```

For link-heavy edits, also verify that internal hash links still target existing IDs.

## CV

The current downloadable CV is checked in as:

```text
resources/Daniel_Smullen_CV.pdf
```

The source used to generate that PDF is checked in under `cv/`:

- `cv/main.tex` - primary ModernCV source.
- `cv/publications.bib` - BibTeX entries for the refereed publications list.
- `cv/README.md` - build notes for regenerating the PDF.

When updating the CV, rebuild the PDF from `cv/main.tex` and copy the generated output back to `resources/Daniel_Smullen_CV.pdf` so the public download URL remains unchanged.
