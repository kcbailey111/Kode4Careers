/* Kode4Careers — Global UI behaviors */

document.documentElement.classList.remove("no-js");

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initRevealOnScroll();
  initProfileFallback();
  setCurrentYear();
});

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initProfileFallback() {
  const img = document.querySelector(".profile-img");
  if (!img) return;

  const showPlaceholder = () => {
    const placeholder = document.createElement("div");
    placeholder.className = "profile-placeholder";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", img.alt);
    placeholder.textContent = "K4C";
    img.replaceWith(placeholder);
  };

  if (img.complete && img.naturalWidth === 0) {
    showPlaceholder();
  } else {
    img.addEventListener("error", showPlaceholder, { once: true });
  }
}

function setCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
