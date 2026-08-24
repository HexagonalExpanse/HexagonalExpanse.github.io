const LAST_UPDATED = "2026-08-24";
document.querySelectorAll(".last-updated").forEach(el => {
  el.textContent = LAST_UPDATED;
});

// Which file are we on? e.g. "research.html" (falls back to index.html at "/")
const currentPage = window.location.pathname.split("/").pop() || "index.html";

const navLinks = [
  { href: "index.html",      label: "Home" },
  {
    href: "research.html",   label: "Research",
    children: [
      { href: "jiabin.html", label: "Jiabin Group" },
      { href: "schleife.html", label: "Schleife Group" },
      { href: "ekuma.html", label: "Ekuma Group" },
    ],
  },
  { href: "coursework.html", label: "Coursework" },
  { href: "cv.html",         label: "CV" },
  { href: "index.html#contact", label: "Contact" },
];

const navHTML = navLinks.map(link => {
  if (link.children) {
    // active if we're on the Research page OR any of its sub-pages
    const selfActive  = link.href.split("#")[0] === currentPage;
    const childActive = link.children.some(c => c.href.split("#")[0] === currentPage);
    const cls = (selfActive || childActive) ? ' class="active"' : "";
    const items = link.children
      .map(c => `<a href="${c.href}">${c.label}</a>`)
      .join("");
    return `<div class="dropdown">` +
             `<button class="dropdown-trigger"${cls} aria-expanded="false">${link.label} ▾</button>` +
             `<div class="dropdown-menu">${items}</div>` +
           `</div>`;
  }
  const isActive = link.href.split("#")[0] === currentPage;
  const cls = isActive ? ' class="active"' : "";
  return `<a href="${link.href}"${cls}>${link.label}</a>`;
}).join("");

document.querySelectorAll(".navigation_setup").forEach(el => {
  el.innerHTML = navHTML;
});

// --- Dropdown toggle (attach AFTER nav is injected) ---
document.querySelectorAll('.dropdown-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const menu = btn.nextElementSibling;
    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!open));
  });
});

// Close when clicking outside any dropdown
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
  }
});
