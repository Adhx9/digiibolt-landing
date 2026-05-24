// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el) => revealObserver.observe(el));

// ===== FLOATING CTA =====
const floatingCta = document.getElementById('floating-cta');

const floatingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('hero');
if (heroSection) {
  floatingObserver.observe(heroSection);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = prefix + current.toLocaleString('en-IN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Observe hero stats for counter animation
const heroStats = document.querySelectorAll('.hero-stat-value[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const target = parseInt(entry.target.dataset.target);
      const prefix = entry.target.dataset.prefix || '';
      const suffix = entry.target.dataset.suffix || '';
      animateCounter(entry.target, target, 2200, prefix, suffix);
    }
  });
}, { threshold: 0.5 });

heroStats.forEach((stat) => counterObserver.observe(stat));

// ===== PARALLAX SUBTLE EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.15}px)`;
    hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
  }
});

// ===== TILT EFFECT ON PRODUCT CARDS =====
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== MAGNETIC EFFECT ON CTA BUTTONS =====
const ctaButtons = document.querySelectorAll('.btn-primary');

ctaButtons.forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translateY(-3px) translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== STAGGER ANIMATION FOR FEATURE ITEMS =====
const featureItems = document.querySelectorAll('.feature-item');
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.feature-item');
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 80);
      });
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

productCards.forEach((card) => featureObserver.observe(card));

// ===== HIGHLIGHT ITEMS STAGGER =====
const highlightItems = document.querySelectorAll('.highlight-item');
const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const items = entry.target.parentElement.querySelectorAll('.highlight-item');
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        }, index * 120);
      });
    }
  });
}, { threshold: 0.3 });

highlightItems.forEach((item) => highlightObserver.observe(item));

// ===== TYPING EFFECT ON HERO BADGE =====
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
  const originalText = heroBadge.innerHTML;
  heroBadge.style.opacity = '0';
  setTimeout(() => {
    heroBadge.style.transition = 'opacity 0.6s ease';
    heroBadge.style.opacity = '1';
  }, 300);
}

console.log('🚀 digiibolt.co — Digital Product Mastery Bundle Landing Page loaded!');
