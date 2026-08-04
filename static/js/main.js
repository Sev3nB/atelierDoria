const toggle = document.querySelector(".nav-toggle"),
  nav = document.querySelector(".main-nav");
if (toggle && nav)
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
document.querySelectorAll(".main-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }),
);
document.querySelectorAll(".main-nav a").forEach((link) => {
  if (link.getAttribute("href") === location.pathname)
    link.setAttribute("aria-current", "page");
});
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08, rootMargin: "0px 0px -7%" },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress span");
let ticking = false;
const updateScrollUI = () => {
  const y = window.scrollY;
  header?.classList.toggle("scrolled", y > 24);
  if (progress) {
    const available = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${available > 0 ? y / available : 0})`;
  }
  ticking = false;
};
addEventListener("scroll", () => {
  if (!ticking) requestAnimationFrame(updateScrollUI);
  ticking = true;
}, { passive: true });
updateScrollUI();

const backToTop = document.querySelector(".back-to-top");
const updateBackToTop = () => backToTop?.classList.toggle("visible", window.scrollY > 520);
addEventListener("scroll", updateBackToTop, { passive: true });
backToTop?.addEventListener("click", () => window.scrollTo({
  top: 0,
  behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
}));
updateBackToTop();

const heroVideo = document.querySelector("[data-hero-video]");
if (heroVideo && matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.pause();
  heroVideo.removeAttribute("autoplay");
}
