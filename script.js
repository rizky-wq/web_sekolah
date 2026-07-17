const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-target]");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let current = "";
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  hamburger.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((el) => observer.observe(el));

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = Math.ceil(target / 80);

  const updateCounter = () => {
    count += increment;
    if (count < target) {
      counter.innerText = count;
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
      entry.target.classList.add("counted");
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.7 });

counters.forEach((counter) => counterObserver.observe(counter));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  }
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Pesan berhasil dikirim! Terima kasih telah menghubungi kami.");
  contactForm.reset();
});

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});
