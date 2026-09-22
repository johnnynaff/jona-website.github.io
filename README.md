# Academic profile site (GitHub Pages)

A multi-page, no-build site for a mathematics researcher. Each tab is its own HTML
file, so it has its own URL, e.g. `/research.html`, and can be linked to or indexed
by search engines on its own.

## Files

```
index.html          Home (name, featured theorem, latest news)
about.html           About
research.html        Research interests
publications.html    Publications, with filters and BibTeX
talks.html            Talks
teaching.html         Teaching
contact.html          Contact
assets/style.css      Shared styles for every page
assets/site.js        Shared theme toggle + footer year
assets/pubs.js         Publication data + rendering (used only by publications.html)
assets/photo.jpg       Your portrait (add this yourself, optional)
assets/cv.pdf          Your CV (add this yourself)
```

Every page shares the same header, navigation bar and right-hand sidebar
(contact info, profile links, MSC codes, CV button), so visitors always see the
same layout as they move between tabs. The nav bar underlines whichever page
is currently open.

## Publish it in five minutes

1. On GitHub, create a **public** repository named `YOUR-USERNAME.github.io`.
2. Upload all the files above, keeping `assets/` as a folder (drag the whole
   `assets` folder into the GitHub upload box, or use `git push`, see below).
3. Go to **Settings → Pages**. Under *Build and deployment*, choose
   **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/`,
   with the other tabs at `https://YOUR-USERNAME.github.io/research.html`, etc.
5. Replace `USERNAME.github.io` in the `<link rel="canonical">` tag near the
   top of each HTML file with your real address.

### Uploading with git instead of the browser
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
cd YOUR-USERNAME.github.io
# copy all the files from this folder in here, keeping the assets/ subfolder
git add .
git commit -m "Add site"
git push
```

## What to edit

| What | Where |
| --- | --- |
| Name, title, affiliation | `index.html`, and the sidebar in every file (search `Elena Varga`) |
| Featured theorem | The `.theorem` block in `index.html` |
| Profile links, MSC codes | The sidebar markup, repeated near the bottom of every HTML file — edit once per file, or find-and-replace across all files |
| About / Research / Talks / Teaching / Contact text | The matching `.html` file |
| Publications | The `PUBLICATIONS` array in `assets/pubs.js` (shared by `publications.html` only) |
| Colours, fonts, spacing | `assets/style.css`, shared by every page |

Because the sidebar is repeated in each file rather than pulled from one shared
include (GitHub Pages serves plain static files, no server-side includes),
editing your address or links means updating it in all seven `.html` files.
A quick way to do that from a terminal:
```bash
# example: update the email address everywhere
sed -i 's/elena.varga@example.edu/you@example.edu/g' *.html
```

### Adding a paper

Open `assets/pubs.js` and copy one object in the `PUBLICATIONS` array:

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

### Adding another page

1. Copy any existing `.html` file as a starting point.
2. Replace its `<main>` content with the new page's content.
3. Add a matching entry to the nav list (`<ul>...</ul>` in the `<nav>`) in
   **every** HTML file, including an `aria-current="page"` attribute on the
   link inside the new page itself.

## Notes

- Math is typeset with MathJax from cdnjs on the pages that use it (Home,
  Research, Publications). It's easy to add to another page by copying the
  `<script>` block for MathJax from the `<head>` of `research.html`.
- Light and dark themes follow the visitor's system setting, with a manual
  toggle that is remembered across pages (stored in the browser).
- The pages print cleanly (navigation and buttons are hidden).
- The sample content is placeholder text. Replace all of it before publishing.
