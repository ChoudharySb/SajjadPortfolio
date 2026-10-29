// Theme: saved choice, otherwise follow the system setting
const root = document.documentElement;
const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = saved || (prefersDark ? "dark" : "light");

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

// Typing effect for the hero role line
const typed = document.querySelector(".typed");
const words = typed.dataset.words.split("|");
let wordIndex = 0, charIndex = 0, deleting = false;
function type() {
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex === word.length) {
    deleting = true;
    return setTimeout(type, 1600);
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  charIndex += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 80);
}
type();

// Reveal sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".section .card, .section-title").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();
