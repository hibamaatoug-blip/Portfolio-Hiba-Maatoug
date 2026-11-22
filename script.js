// ========================= 1. SMOOTH SCROLLING =========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(event) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========================= 2. SCROLL REVEAL ANIMATION =========================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .contact-section').forEach(section => {
  section.classList.add('reveal');
  observer.observe(section);
});

// ========================= 3. IMAGE SLIDER FOR PROJECTS =========================
const sliderIndices = {};

function slideProject(sliderId, direction) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const totalSlides = slider.querySelectorAll('img').length;
  if (totalSlides <= 1) return;

  // Initialize index if not set
  if (sliderIndices[sliderId] === undefined) {
    sliderIndices[sliderId] = 0;
  }

  // Update index with wrap-around
  sliderIndices[sliderId] += direction;
  if (sliderIndices[sliderId] < 0) {
    sliderIndices[sliderId] = totalSlides - 1;
  } else if (sliderIndices[sliderId] >= totalSlides) {
    sliderIndices[sliderId] = 0;
  }

  // Move the slides
  const offset = sliderIndices[sliderId] * 100;
  slider.style.transform = `translateX(-${offset}%)`;
}
