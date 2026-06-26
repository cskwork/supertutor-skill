/*
  TEACH book layout (no dependencies).
  Turns a vertical lesson into a left-to-right "book": a left table of contents
  plus one section per page, flipped with prev/next, arrow keys, swipe, or a TOC
  click. Pairs with the .book / .toc / .pages / .pager styles in lesson.css.

  Expected markup (lesson-book.js builds the TOC and pager itself):
    <main class="book">
      <aside class="toc"></aside>
      <div class="pages"><div class="pages-track">
        <section id="intro" data-title="시작">…</section>
        <section id="terms" data-title="핵심 용어">…</section>
      </div></div>
      <nav class="pager"></nav>
    </main>
  Each section needs an id (hash links) and data-title (TOC label; falls back to
  its first heading). Accessible: TOC buttons, aria-current, keyboard, focus.
*/
(function () {
  "use strict";
  var book = document.querySelector("main.book");
  if (!book) return;
  var track = book.querySelector(".pages-track");
  var toc = book.querySelector(".toc");
  var pager = book.querySelector(".pager");
  if (!track || !toc || !pager) return;

  var sections = Array.prototype.slice.call(track.children).filter(function (n) {
    return n.tagName === "SECTION";
  });
  if (!sections.length) return;

  var index = 0;

  function titleOf(sec, i) {
    if (sec.dataset.title) return sec.dataset.title;
    var h = sec.querySelector("h1, h2, h3");
    return h ? h.textContent.trim() : "페이지 " + (i + 1);
  }

  // --- build TOC ---
  var tocList = document.createElement("ol");
  var heading = document.createElement("p");
  heading.className = "toc-title";
  heading.textContent = "목차";
  toc.appendChild(heading);
  toc.appendChild(tocList);

  var tocButtons = sections.map(function (sec, i) {
    if (!sec.id) sec.id = "page-" + (i + 1);
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = titleOf(sec, i);
    btn.addEventListener("click", function () { go(i); });
    li.appendChild(btn);
    tocList.appendChild(li);
    return btn;
  });

  // --- build pager ---
  var prev = document.createElement("button");
  prev.type = "button"; prev.textContent = "← 이전"; prev.setAttribute("aria-label", "이전 페이지");
  var next = document.createElement("button");
  next.type = "button"; next.textContent = "다음 →"; next.setAttribute("aria-label", "다음 페이지");
  var progress = document.createElement("div");
  progress.className = "progress"; progress.innerHTML = "<span></span>";
  var bar = progress.firstChild;
  var indicator = document.createElement("span");
  indicator.className = "indicator";
  prev.addEventListener("click", function () { go(index - 1); });
  next.addEventListener("click", function () { go(index + 1); });
  pager.append(prev, progress, indicator, next);

  var pages = book.querySelector(".pages");

  function layout() {
    // pin every page to exactly the viewport width in px, so the slide offset
    // never depends on flex-basis/% resolution (the source of earlier drift)
    var w = pages.clientWidth;
    track.style.width = (w * sections.length) + "px";
    sections.forEach(function (s) {
      s.style.flex = "0 0 " + w + "px";
      s.style.width = w + "px";
      s.style.minWidth = w + "px";
      s.style.maxWidth = w + "px";
    });
    return w;
  }

  function render() {
    var w = layout();
    track.style.transform = "translateX(" + (-index * w) + "px)";
    indicator.textContent = (index + 1) + " / " + sections.length;
    bar.style.width = ((index + 1) / sections.length * 100) + "%";
    prev.disabled = index === 0;
    next.disabled = index === sections.length - 1;
    tocButtons.forEach(function (b, i) {
      b.setAttribute("aria-current", i === index ? "true" : "false");
    });
    sections.forEach(function (s, i) { s.setAttribute("aria-hidden", i === index ? "false" : "true"); });
  }

  function go(i, skipHash) {
    index = Math.max(0, Math.min(sections.length - 1, i));
    render();
    sections[index].scrollTop = 0;
    if (!skipHash && sections[index].id) {
      history.replaceState(null, "", "#" + sections[index].id);
    }
  }

  // keyboard: arrows flip pages, but never while typing in the simulator inputs
  document.addEventListener("keydown", function (e) {
    var t = document.activeElement;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { go(index + 1); e.preventDefault(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { go(index - 1); e.preventDefault(); }
    else if (e.key === "Home") { go(0); e.preventDefault(); }
    else if (e.key === "End") { go(sections.length - 1); e.preventDefault(); }
  });

  // keep the offset correct when the viewport resizes (px-based transform)
  var raf = null;
  window.addEventListener("resize", function () {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; render(); });
  });

  // touch swipe (horizontal only; ignores vertical scrolling inside a page)
  var x0 = null, y0 = null;
  pages.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  pages.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { go(index + (dx < 0 ? 1 : -1)); }
    x0 = y0 = null;
  }, { passive: true });

  // open to the section named in the URL hash, if any - without an entry slide
  var start = sections.findIndex(function (s) { return "#" + s.id === location.hash; });
  track.style.transition = "none";
  go(start >= 0 ? start : 0, true);
  void track.offsetWidth; // force reflow so the restored transition only applies to later flips
  track.style.transition = "";
})();
