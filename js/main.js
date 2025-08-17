// ====== Typing animation ======
const jobContainer = document.querySelector('.job');
const jobText = jobContainer ? jobContainer.querySelector('span') : null;
const words = jobContainer ? JSON.parse(jobContainer.getAttribute('data-words')) : null;
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect(){
  if(!jobContainer || !jobText || !words) return;
  const current = words[wordIndex];
  jobText.textContent = current.substring(0, charIndex);
  jobText.style.borderRight = (charIndex === current.length && !isDeleting) ? 'none' : '2px solid var(--text)';
  isDeleting ? charIndex-- : charIndex++;
  let speed = isDeleting ? 60 : 100;
  if(!isDeleting && charIndex === current.length + 1){ isDeleting = true; speed = 1400; }
  else if(isDeleting && charIndex === 0){ isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
  setTimeout(typeEffect, speed);
}
if(jobContainer && jobText && words){ typeEffect(); }

// ====== AOS init ======
window.addEventListener('DOMContentLoaded', () => {
  if(typeof AOS !== 'undefined'){ AOS.init({ duration: 900, once: true }); }

  // Back to top button
  const btn = document.getElementById('btnTopo');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300){ btn?.classList.add('show'); } else { btn?.classList.remove('show'); }
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth anchor scroll (in-page)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(id && id !== '#'){
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Intersection Observer for reveal
  const animated = document.querySelectorAll('.animated-section, .animated-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { threshold: 0.12 });
  animated.forEach(el => io.observe(el));
});
