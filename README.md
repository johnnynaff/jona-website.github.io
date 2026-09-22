# Academic profile site (GitHub Pages)

A single-page, no-build site for a mathematics researcher. Everything lives in `index.html`.

## Publish it in five minutes

1. On GitHub, create a **public** repository named `YOUR-USERNAME.github.io`
   (or any name, if you prefer `YOUR-USERNAME.github.io/project-name`).
2. Upload `index.html` and `README.md`. Create a folder `assets/` and add:
   - `photo.jpg` (portrait, ideally 4:5, at least 400 px wide). Optional.
   - `cv.pdf`
3. Go to **Settings → Pages**. Under *Build and deployment*, choose
   **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/`.
5. Replace `USERNAME.github.io` in the `<link rel="canonical">` and the JSON-LD block
   near the top of `index.html` with your real address.

### Custom domain (optional)
In **Settings → Pages → Custom domain**, enter your domain, then add the DNS records
GitHub shows you. Tick **Enforce HTTPS** once it becomes available.

## What to edit

| What | Where in `index.html` |
| --- | --- |
| Name, title, affiliation | Search for `Elena Varga` and `University of Example` |
| Featured theorem | The `.theorem` block under the hero |
| Profile links (arXiv, ORCID, Scholar, MathSciNet, zbMATH, GitHub) | The `Profiles` list in the right margin |
| MSC codes | The `Subjects (MSC 2020)` list in the right margin |
| Publications | The `PUBLICATIONS` array in the `<script>` at the bottom |
| Talks, teaching, contact | Plain HTML lists in their sections |

### Adding a paper

Copy one object in `PUBLICATIONS` and change the fields:

```js
{
  year: 2026, status: "published",          // or "preprint"
  title: "Your title with $\\LaTeX$ if needed",
  authors: ["Lastname, Firstname", "Other, Author"],
  venue: "Journal name", volume: "12", pages: "1–30",
  doi: "10.xxxx/xxxxx", arxiv: "2601.00000",
  abstract: "Optional abstract, LaTeX allowed."
}
```

The title link, arXiv/DOI links and the BibTeX entry are generated for you.
In a JavaScript string, write each LaTeX backslash twice (`\\mathbb{Z}`).

## Notes

- Math is typeset with MathJax from cdnjs. Use `$...$` for inline and `$$...$$` for display math.
- Light and dark themes follow the visitor's system setting, with a manual toggle.
- The page prints cleanly (navigation and buttons are hidden).
- The sample content (name, papers, talks, the Sylow theorem) is placeholder text. Replace all of it before publishing.
