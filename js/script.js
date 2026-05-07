const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link, .footer-col a, .logo");

function closeMenu() {
  navToggle?.classList.remove("is-open");
  navMenu?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    closeMenu();

    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

window.addEventListener("scroll", () => {
  const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
  let currentId = "home";
  const trackedTargets = Array.from(document.querySelectorAll(".main-nav .nav-link"))
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .map((href) => document.querySelector(href))
    .filter(Boolean);

  trackedTargets.forEach((target) => {
    const sectionTop = target.offsetTop - headerHeight - 80;

    if (window.scrollY >= sectionTop) {
      currentId = target.id;
    }
  });

  document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
});

document.addEventListener("click", (event) => {
  const isClickInsideMenu = navMenu?.contains(event.target);
  const isClickOnToggle = navToggle?.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    closeMenu();
  }
});
