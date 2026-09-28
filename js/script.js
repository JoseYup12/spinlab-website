// ===== Preloader =====
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('done'), 350);
});

// ===== Year =====
document.getElementById('slYear').textContent = new Date().getFullYear();

// ===== Navbar scroll state =====
const nav = document.getElementById('slNav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll);
onScroll();

// ===== Mobile menu =====
const burger = document.getElementById('slBurger');
const menuMobile = document.getElementById('slMenuMobile');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menuMobile.classList.toggle('open');
});
menuMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    menuMobile.classList.remove('open');
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Services accordion =====
document.querySelectorAll('.sl-service-head').forEach((head) => {
  head.addEventListener('click', () => {
    const row = head.closest('.sl-service-row');
    const wasActive = row.classList.contains('active');
    document.querySelectorAll('.sl-service-row').forEach(r => r.classList.remove('active'));
    if (!wasActive) row.classList.add('active');
  });
});

// ===== About media carousel =====
const carousel = document.getElementById('slCarousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.sl-carousel-slide')];
  const dots = [...carousel.querySelectorAll('.sl-carousel-dot')];
  let current = 0;
  let timer = null;

  const goTo = (index) => {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  };

  const next = () => goTo((current + 1) % slides.length);

  const startAutoplay = () => {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i !== current) goTo(i);
      startAutoplay();
    });
  });

  if (slides.length > 1) startAutoplay();
}

// ===== Stat counters =====
const stats = document.querySelectorAll('.sl-stat-num[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const useThousands = el.getAttribute('data-format') === 'thousands';
  const duration = 1300;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = useThousands ? value.toLocaleString('es-GT') : value;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
stats.forEach(el => statObserver.observe(el));

// ===== Contact form (client-side only) =====
const form = document.getElementById('slContactForm');
const formNote = document.getElementById('slFormNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Gracias por tu mensaje. Te contactaremos pronto.';
  form.reset();
});
