// ===== Social links =====
// Add or remove profiles here; every [data-socials] block on the page is filled from this list.
// To add LinkedIn, Facebook or Instagram, put your profile link in "url" (empty ones are hidden).
const SOCIALS = [
  { name: "GitHub", url: "https://github.com/ChoudharySb", fill: true,
    icon: '<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>' },
  { name: "LinkedIn", url: "", fill: true,
    icon: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/>' },
  { name: "Facebook", url: "", fill: true,
    icon: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>' },
  { name: "Instagram", url: "", fill: false,
    icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>' },
  { name: "WhatsApp", url: "https://wa.me/923003407860", fill: true,
    icon: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/>' },
  { name: "Email", url: "mailto:sajjad3407860@gmail.com", fill: false,
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' },
];

document.querySelectorAll("[data-socials]").forEach(box => {
  box.innerHTML = SOCIALS.filter(s => s.url).map(s => {
    const external = s.url.startsWith("http");
    return `<a href="${s.url}" aria-label="${s.name}" title="${s.name}"${external ? ' target="_blank" rel="noopener"' : ""}>
      <svg viewBox="0 0 24 24" class="${s.fill ? "fill" : ""}" aria-hidden="true">${s.icon}</svg></a>`;
  }).join("");
});

// ===== Theme toggle (initial theme is set inline in <head>) =====
const root = document.documentElement;
document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});

// ===== Mobile menu =====
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Typing effect =====
const typed = document.querySelector(".typed");
const words = typed.dataset.words.split("|");
if (reduceMotion) {
  typed.textContent = words[0];
} else {
  let w = 0, c = 0, deleting = false;
  (function type() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1800); }
    if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
    c += deleting ? -1 : 1;
    setTimeout(type, deleting ? 35 : 75);
  })();
}

// ===== Hero terminal =====
const term = document.querySelector("[data-terminal]");
const termLines = [
  ['<span class="p">$</span> whoami', 400],
  ['Sajjad Ali — IT/System Administrator', 300],
  ['<span class="p">$</span> systemctl status skills', 400],
  ['<span class="ok">●</span> sysadmin.service    <span class="ok">active</span>', 180],
  ['<span class="ok">●</span> networking.service  <span class="ok">active</span>', 180],
  ['<span class="ok">●</span> security.service    <span class="ok">active</span>', 180],
  ['<span class="ok">●</span> ai-automation.service <span class="ok">active</span>', 180],
  ['<span class="p">$</span> echo $LOCATION', 400],
  ['Lahore Punjab Pakistan', 300],
  ['<span class="p">$</span> <span class="dim">ready to help_</span>', 0],
];
if (reduceMotion) {
  term.innerHTML = termLines.map(l => l[0]).join("\n");
} else {
  // Start typing only once the terminal scrolls into view
  const termObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    termObserver.disconnect();
    let i = 0;
    (function nextLine() {
      if (i >= termLines.length) return;
      term.innerHTML += (i ? "\n" : "") + termLines[i][0];
      setTimeout(nextLine, termLines[i++][1] + 120);
    })();
  }, { threshold: 0.4 });
  termObserver.observe(term);
}

// ===== Counters =====
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count;
    let n = 0;
    const step = () => { el.textContent = ++n; if (n < end) setTimeout(step, 900 / end); };
    reduceMotion ? (el.textContent = end) : step();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

// ===== Scroll reveal (staggered within each group) =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const siblings = [...e.target.parentElement.children].filter(el => el.classList.contains("reveal"));
    e.target.style.transitionDelay = `${Math.min(siblings.indexOf(e.target), 5) * 80}ms`;
    e.target.classList.add("visible");
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ===== Active nav link =====
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => sectionObserver.observe(s));

// ===== Scroll: progress bar, nav border, back-to-top =====
const progress = document.querySelector(".progress");
const nav = document.querySelector(".nav");
const toTop = document.querySelector(".to-top");
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  nav.classList.toggle("scrolled", scrollY > 10);
  toTop.classList.toggle("show", scrollY > 600);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("year").textContent = new Date().getFullYear();
