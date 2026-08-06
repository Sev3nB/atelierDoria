const toggle = document.querySelector(".nav-toggle"),
  nav = document.querySelector(".main-nav");
const setNavigationOpen = (open) => {
  if (!toggle || !nav) return;
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  const label = toggle.querySelector(".sr-only");
  if (label) label.textContent = open ? "Chiudi menu" : "Apri menu";
};
if (toggle && nav) {
  toggle.addEventListener("click", () =>
    setNavigationOpen(!nav.classList.contains("open")),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setNavigationOpen(false);
      toggle.focus();
    }
  });
}
document.querySelectorAll(".main-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    setNavigationOpen(false);
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
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = navigator.connection?.saveData === true;
if (heroVideo && (reducedMotion || saveData)) {
  heroVideo.pause();
  heroVideo.removeAttribute("autoplay");
  heroVideo.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
  heroVideo.load();
} else if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;

  const interactionEvents = ["pointerdown", "touchstart", "keydown"];
  const clearPlaybackFallback = () =>
    interactionEvents.forEach((eventName) =>
      document.removeEventListener(eventName, resumeHeroVideo),
    );
  const resumeHeroVideo = () => {
    const playback = heroVideo.play();
    if (playback?.then) playback.then(clearPlaybackFallback).catch(() => {});
  };
  const enablePlaybackFallback = () =>
    interactionEvents.forEach((eventName) =>
      document.addEventListener(eventName, resumeHeroVideo, {
        once: true,
        passive: true,
      }),
    );
  const playback = heroVideo.play();
  if (playback?.catch) playback.catch(enablePlaybackFallback);

  const videoObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !document.hidden) resumeHeroVideo();
    else heroVideo.pause();
  }, { threshold: 0.05 });
  videoObserver.observe(heroVideo);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) heroVideo.pause();
    else if (heroVideo.getBoundingClientRect().bottom > 0) resumeHeroVideo();
  });
}
