(function () {
  var root = document.documentElement, btn = document.getElementById("theme");
  function current() {
    return root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function label() { if (btn) btn.textContent = current() === "dark" ? "Light theme" : "Dark theme"; }
  if (btn) {
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }
  label();
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
