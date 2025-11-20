document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      mobileToggle.setAttribute("aria-expanded", String(!isHidden));
      mobileToggle.innerHTML = isHidden
        ? '<i class="fas fa-bars text-lg"></i>'
        : '<i class="fas fa-times text-lg"></i>';
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu && mobileToggle && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.innerHTML = '<i class="fas fa-bars text-lg"></i>';
      }
    });
  });

  // Reveal on scroll
  const animatedSections = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedSections.forEach((section) => {
      section.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-6");
      observer.observe(section);
    });
  }

  // Handle contact form submission
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simple front-end "success" message
      formStatus.textContent = "Thank you for reaching out. We’ll get back to you soon.";
      formStatus.style.color = "#059669"; // green
      contactForm.reset();
    });
  }
});