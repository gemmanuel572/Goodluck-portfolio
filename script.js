const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }));
}
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(el => observer.observe(el));
} else revealItems.forEach(el => el.classList.add('visible'));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const card = document.getElementById('tilt-card');
if (card && window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  card.addEventListener('pointermove', event => {
    const r = card.getBoundingClientRect();
    const dx = (event.clientX-r.left)/r.width-.5;
    const dy = (event.clientY-r.top)/r.height-.5;
    card.style.transform = `rotate(5deg) perspective(900px) rotateY(${dx*9}deg) rotateX(${-dy*9}deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = 'rotate(5deg)');
}
