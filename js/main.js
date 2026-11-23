/* =========================================================
   HNL Engineering — site behavior
   You normally don't need to edit this file. It powers:
   - the navigation bar (shadow on scroll, mobile menu)
   - fade-in animations as you scroll
   - project filter buttons on the homepage
   - the photo lightbox on project pages
   - the 3D viewer buttons
   - smooth fades between pages
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Nav: darken after scrolling ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Nav: mobile menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---- Project filters (homepage) ----
     Each card has data-category="cad robotics" etc.
     Each button has data-filter="cad" (or "all"). */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card[data-category]");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      cards.forEach((c) => {
        const show = f === "all" || c.dataset.category.split(" ").includes(f);
        c.classList.toggle("hidden", !show);
      });
    })
  );

  /* ---- Lightbox (project gallery) ---- */
  const galleryButtons = Array.from(document.querySelectorAll(".gallery button"));
  if (galleryButtons.length) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `
      <button class="lb-close" aria-label="Close">×</button>
      <button class="lb-prev" aria-label="Previous photo">‹</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="lb-next" aria-label="Next photo">›</button>`;
    document.body.appendChild(lb);
    const img = lb.querySelector("img");
    const cap = lb.querySelector("figcaption");
    let index = 0;

    const show = (i) => {
      index = (i + galleryButtons.length) % galleryButtons.length;
      const thumb = galleryButtons[index].querySelector("img");
      img.src = thumb.dataset.full || thumb.src;
      img.alt = thumb.alt;
      const fc = galleryButtons[index].querySelector("figcaption");
      cap.textContent = fc ? fc.textContent : thumb.alt;
    };
    const open = (i) => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };

    galleryButtons.forEach((b, i) => b.addEventListener("click", () => open(i)));
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* ---- 3D viewer buttons ---- */
  document.querySelectorAll(".viewer").forEach((wrap) => {
    const mv = wrap.querySelector("model-viewer");
    if (!mv) return;
    const spin = wrap.querySelector("[data-action='spin']");
    const reset = wrap.querySelector("[data-action='reset']");
    if (spin) spin.addEventListener("click", () => {
      if (mv.hasAttribute("auto-rotate")) { mv.removeAttribute("auto-rotate"); spin.textContent = "Auto-rotate: off"; }
      else { mv.setAttribute("auto-rotate", ""); spin.textContent = "Auto-rotate: on"; }
    });
    if (reset) reset.addEventListener("click", () => {
      mv.cameraOrbit = mv.getAttribute("camera-orbit") || "auto auto auto";
      mv.fieldOfView = "auto";
      mv.jumpCameraToGoal && mv.jumpCameraToGoal();
    });
  });

  /* ---- Project page: highlight the section you're reading ---- */
  const tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const sec = document.querySelector(a.getAttribute("href"));
      if (sec) map.set(sec, a);
    });
    const so = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove("active"));
          map.get(e.target).classList.add("active");
        }
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, sec) => so.observe(sec));
  }

  /* ---- Smooth fade when moving between pages ---- */
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    const internal = href && !href.startsWith("#") && !href.startsWith("http") &&
      !href.startsWith("mailto:") && !href.startsWith("tel:") && !a.hasAttribute("download") && a.target !== "_blank";
    if (!internal) return;
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => (window.location.href = a.href), 220);
    });
  });
});

/* If someone presses the browser's Back button, make sure the page isn't stuck faded out */
window.addEventListener("pageshow", () => document.body.classList.remove("page-leaving"));
