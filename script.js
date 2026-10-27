'use strict';

// Optional entrance effects. The page and navigation work without JavaScript.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    observer.observe(element);
    element.addEventListener('animationend', () => {
      element.classList.remove('is-entering');
    }, { once: true });
  });

  preference.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.is-entering').forEach((element) => {
      element.classList.remove('is-entering');
    });
  });
})();
