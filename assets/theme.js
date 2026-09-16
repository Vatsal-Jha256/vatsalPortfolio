(function () {
  function effectiveTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function updateButton() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var isDark = effectiveTheme() === "dark";
    btn.textContent = isDark ? "Light" : "Dark";
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    updateButton();
  }
  document.addEventListener("DOMContentLoaded", function () {
    updateButton();
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        setTheme(effectiveTheme() === "dark" ? "light" : "dark");
      });
    }
  });
})();
