// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hide');
  }, 800);
});

// ===== Sticky Header =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 300);
});

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ===== Typed Text Effect =====
const words = ['Web Developer', 'Designer', 'Freelancer', 'Programmer'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.querySelector('.typed-text');

function type() {
  const currentWord = words[wordIndex];
  typedEl.textContent = isDeleting
    ? currentWord.substring(0, charIndex--)
    : currentWord.substring(0, charIndex++);

  let speed = isDeleting ? 80 : 150;

  if (!isDeleting && charIndex === currentWord.length + 1) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }
  setTimeout(type, speed);
}
type();

// ===== Skill Bar Animation on Scroll =====
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    document.querySelectorAll('.skill-progress').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
    skillsAnimated = true;
  }
}
window.addEventListener('scroll', animateSkills);

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
  '.hero-text, .hero-image, .about-image, .about-text, .service-card, .info-box, .contact-form'
);
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.8s ease';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// ===== Contact Form =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you! Your message has been sent successfully.');
  e.target.reset();
});