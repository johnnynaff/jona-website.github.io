/* =========================================================
   PUBLICATIONS  (sample entries: replace with your own)
   status: "preprint" or "published"
   authors: "Last, First"
   Fields used for published papers: venue, volume, pages, doi
   Fields used for preprints: arxiv (e.g. "2501.01234")
   Titles and abstracts may contain LaTeX between $ ... $
   ========================================================= */
const PUBLICATIONS = [
  {
    year: 2025, status: "preprint",
    title: "Derived equivalences for blocks with cyclic defect groups over $p$-adic rings",
    authors: ["Varga, Elena", "Okafor, Jonas"],
    arxiv: "2501.01234",
    abstract: "We construct tilting complexes realising derived equivalences between blocks with cyclic defect groups over the ring of $p$-adic integers, and use them to compare their centres."
  },
  {
    year: 2024, status: "published",
    title: "Weights and $p$-local structure of finite groups of Lie type",
    authors: ["Varga, Elena"],
    venue: "Journal of Representation Theory and Applications", volume: "52", pages: "112–148",
    doi: "10.0000/jrta.2024.001", arxiv: "2311.04567",
    abstract: "We describe the weights of finite groups of Lie type in non-defining characteristic and verify a conjecture of Alperin in several new families."
  },
  {
    year: 2023, status: "published",
    title: "A character-theoretic criterion for blocks of defect one",
    authors: ["Lindqvist, Sara", "Varga, Elena"],
    venue: "Algebra and Number Theory Letters", volume: "18", pages: "877–901",
    doi: "10.0000/antl.2023.017",
    abstract: "We give a criterion in terms of character values that decides when a block has defect one, and apply it to the sporadic simple groups."
  },
  {
    year: 2021, status: "published",
    title: "Fusion systems and Sylow-type theorems for saturated categories",
    authors: ["Varga, Elena", "Novak, Peter"],
    venue: "Journal of Group Theory and Its Applications", volume: "9", pages: "301–334",
    doi: "10.0000/jgta.2021.042", arxiv: "2004.09876"
  }
];

/* ---------- rendering (no need to edit below) ---------- */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function displayName(a) {
  const [last, first] = a.split(",").map(x => x.trim());
  return first ? `${first} ${last}` : last;
}
function joinAuthors(list) {
  const names = list.map(displayName);
  return names.length < 2 ? names.join("") : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
}
function bibKey(p) {
  const last = p.authors[0].split(",")[0].trim().toLowerCase().replace(/[^a-z]/g, "");
  const word = p.title.replace(/\$[^$]*\$/g, "").split(/\s+/).find(w => w.length > 3) || "paper";
  return `${last}${p.year}${word.toLowerCase().replace(/[^a-z]/g, "")}`;
}
function bibtex(p) {
  const f = [
    ["author", p.authors.join(" and ")],
    ["title", p.title],
  ];
  if (p.status === "published") {
    f.push(["journal", p.venue], ["year", p.year]);
    if (p.volume) f.push(["volume", p.volume]);
    if (p.pages) f.push(["pages", p.pages.replace("–", "--")]);
    if (p.doi) f.push(["doi", p.doi]);
  } else {
    f.push(["year", p.year]);
    if (p.arxiv) f.push(["eprint", p.arxiv], ["archivePrefix", "arXiv"]);
  }
  const type = p.status === "published" ? "article" : "misc";
  return `@${type}{${bibKey(p)},\n` + f.map(([k, v]) => `  ${k.padEnd(13)}= {${v}}`).join(",\n") + "\n}";
}

let filter = "all";

function pubHTML(p) {
  const href = p.doi ? `https://doi.org/${p.doi}` : p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : null;
  const title = href ? `<a href="${esc(href)}">${esc(p.title)}</a>` : esc(p.title);
  const venue = p.status === "published"
    ? `<em>${esc(p.venue)}</em>${p.volume ? ", " + esc(p.volume) : ""}${p.pages ? ", " + esc(p.pages) : ""}`
    : `Preprint${p.arxiv ? ", arXiv:" + esc(p.arxiv) : ""}`;
  const links = [
    p.arxiv ? `<a href="https://arxiv.org/abs/${esc(p.arxiv)}">arXiv</a>` : "",
    p.doi ? `<a href="https://doi.org/${esc(p.doi)}">DOI</a>` : "",
    p.pdf ? `<a href="${esc(p.pdf)}">PDF</a>` : ""
  ].filter(Boolean).join("");
  return `
    <li class="pub">
      <p class="pt">${title}</p>
      <p class="pa">${esc(joinAuthors(p.authors))}</p>
      <p class="pv">${venue}</p>
      ${links ? `<p class="pl">${links}</p>` : ""}
      <details>
        <summary>${p.abstract ? "Abstract and BibTeX" : "BibTeX"}</summary>
        ${p.abstract ? `<p class="abs">${esc(p.abstract)}</p>` : ""}
        <pre><code>${esc(bibtex(p))}</code></pre>
        <button class="copy" type="button">Copy BibTeX</button>
      </details>
    </li>`;
}

function render() {
  const list = PUBLICATIONS
    .filter(p => filter === "all" || p.status === filter)
    .sort((a, b) => b.year - a.year);
  const years = [...new Set(list.map(p => p.year))];
  $("#pub-list").innerHTML = years.map(y => `
    <h3 class="year">${y}</h3>
    <ol class="pubs">${list.filter(p => p.year === y).map(pubHTML).join("")}</ol>`).join("");
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([$("#pub-list")]);
}

function renderFilters() {
  const count = s => s === "all" ? PUBLICATIONS.length : PUBLICATIONS.filter(p => p.status === s).length;
  const defs = [["all", "All"], ["published", "Journal articles"], ["preprint", "Preprints"]];
  $("#filters").innerHTML = defs
    .filter(([k]) => count(k) > 0)
    .map(([k, label]) => `<button type="button" data-f="${k}" aria-pressed="${k === filter}">${label} (${count(k)})</button>`)
    .join("");
}

$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button[data-f]");
  if (!b) return;
  filter = b.dataset.f;
  renderFilters();
  render();
});

$("#pub-list").addEventListener("click", async e => {
  const btn = e.target.closest(".copy");
  if (!btn) return;
  const text = btn.parentElement.querySelector("code").textContent;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = "Copied";
  } catch (_) {
    const r = document.createRange();
    r.selectNodeContents(btn.parentElement.querySelector("code"));
    getSelection().removeAllRanges(); getSelection().addRange(r);
    btn.textContent = "Selected. Press Ctrl+C";
  }
  setTimeout(() => (btn.textContent = "Copy BibTeX"), 1800);
});

renderFilters();
render();
