const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

menuButton?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
    backToTop?.classList.toggle("visible", window.scrollY > 600);
});

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Hero slideshow
const slides = [...document.querySelectorAll(".slide")];
const dotsContainer = document.getElementById("sliderDots");
let currentSlide = 0;
let slideTimer;

slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer?.appendChild(dot);
});

const dots = [...document.querySelectorAll(".slider-dot")];

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    restartSlider();
}

function restartSlider() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => showSlide(currentSlide + 1), 6000);
}

document.getElementById("previousSlide")?.addEventListener("click", () => showSlide(currentSlide - 1));
document.getElementById("nextSlide")?.addEventListener("click", () => showSlide(currentSlide + 1));
if (slides.length) showSlide(0);

// Reveal animation
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.querySelectorAll("#year").forEach(year => year.textContent = new Date().getFullYear());
