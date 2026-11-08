(function () {
  var root = document.documentElement;

  function lang() {
    return root.lang === "en" ? "en" : "es";
  }

  function theme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function applySlots() {
    var current = lang();
    var title = document.querySelector("title");
    if (title) {
      var nextTitle = title.getAttribute("data-" + current);
      if (nextTitle) title.textContent = nextTitle;
    }
    document.querySelectorAll("meta[data-es]").forEach(function (el) {
      var value = el.getAttribute("data-" + current);
      if (value) el.setAttribute("content", value);
    });
    document.querySelectorAll("[data-label-es]").forEach(function (el) {
      var label = el.getAttribute("data-label-" + current);
      if (label) el.setAttribute("aria-label", label);
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-set-lang") === current ? "true" : "false");
    });
    document.querySelectorAll("[data-set-theme]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-set-theme") === theme() ? "true" : "false");
    });
  }

  function setLang(next) {
    root.lang = next;
    try {
      localStorage.setItem("sh-lang", next);
    } catch (error) {}
    applySlots();
  }

  function setTheme(next) {
    root.dataset.theme = next;
    try {
      localStorage.setItem("sh-theme", next);
    } catch (error) {}
    var color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute("content", next === "light" ? "#FAF8FF" : "#0B131C");
    applySlots();
  }

  document.addEventListener("click", function (event) {
    var langButton = event.target.closest("[data-set-lang]");
    if (langButton) setLang(langButton.getAttribute("data-set-lang"));
    var themeButton = event.target.closest("[data-set-theme]");
    if (themeButton) setTheme(themeButton.getAttribute("data-set-theme"));
  });

  window.addEventListener("hashchange", function () {
    if (location.hash.indexOf("#en-") === 0) setLang("en");
    if (location.hash.indexOf("#es-") === 0) setLang("es");
  });

  applySlots();
})();
