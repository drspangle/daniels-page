# CV Source

This directory contains the LaTeX source used to generate Daniel Smullen's CV.

- `main.tex` is the primary ModernCV source.
- `publications.bib` mirrors the refereed publication list on the public website and includes DOI metadata where available.
- The public site currently serves the generated PDF from `resources/Daniel_Smullen_CV.pdf`.

Once a TeX distribution with `moderncv`, `tikz`, and `IEEEtran.bst` is available, build from this directory and copy the rendered PDF to `../resources/Daniel_Smullen_CV.pdf`.

The local preview build was generated with XeLaTeX:

```powershell
xelatex -interaction=nonstopmode -halt-on-error -output-directory=_build main.tex
bibtex _build\main
xelatex -interaction=nonstopmode -halt-on-error -output-directory=_build main.tex
xelatex -interaction=nonstopmode -halt-on-error -output-directory=_build main.tex
```

Preview PDFs and LaTeX byproducts are written to `_build/` and are intentionally ignored by Git.
