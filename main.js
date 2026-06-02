/* ============================================================
   RODZ CUSTOM CONSTRUCTION LLC — Main JS
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── Hamburger / Mobile nav ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── Animated counters ─────────────────────────────────────────
function animateCounter(el, target, suffix, duration) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.count;
      if (!raw) return;
      const num = parseInt(raw);
      const suffix = raw.includes('+') ? '+' : raw.includes('%') ? '%' : '';
      animateCounter(el, num, suffix, 1500);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

// ── Contact form handler ──────────────────────────────────────
// ── Contact form handler ──────────────────────────────────────
async function submitForm(event) {
  if (event) event.preventDefault();

  const formInner = document.getElementById('formInner');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.querySelector('.form-submit');

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const service = document.getElementById('service');
  const message = document.getElementById('message');

  const fields = [firstName, email, service, message].filter(Boolean);
  let valid = true;

  fields.forEach(field => {
    if (!field.value || field.value === '') {
      field.style.borderColor = '#c0392b';
      field.style.boxShadow = '0 0 0 3px rgba(192, 57, 43, 0.1)';
      valid = false;
    } else {
      field.style.borderColor = '';
      field.style.boxShadow = '';
    }
  });

  if (!valid) return;

  if (submitBtn) {
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }

  const formData = new FormData();
  formData.append('firstName', firstName.value);
  formData.append('lastName', lastName.value);
  formData.append('email', email.value);
  formData.append('phone', phone.value);
  formData.append('service', service.value);
  formData.append('message', message.value);

  try {
    const response = await fetch('https://formspree.io/f/mnjyaqew', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      if (formInner) formInner.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.add('show');
        formSuccess.style.animation = 'fadeIn 0.6s ease forwards';
      }
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Message failed to send. Check your internet or Formspree link.');
  }

  if (submitBtn) {
    submitBtn.textContent = 'Send My Request';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}

window.submitForm = submitForm;

  // Basic validation
  const firstName = document.getElementById('firstName');
  const email = document.getElementById('email');
  const service = document.getElementById('service');
  const message = document.getElementById('message');

  const fields = [firstName, email, service, message].filter(Boolean);
  let valid = true;

  fields.forEach(field => {
    if (!field.value || field.value === '') {
      field.style.borderColor = '#c0392b';
      field.style.boxShadow = '0 0 0 3px rgba(192, 57, 43, 0.1)';
      valid = false;

      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      }, { once: true });
    }
  });

  if (!valid) return;

  // Simulate submission
  const submitBtn = document.querySelector('.form-submit');
  if (submitBtn) {
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }

  setTimeout(() => {
    if (formInner) formInner.style.display = 'none';
    if (formSuccess) {
      formSuccess.classList.add('show');
      formSuccess.style.animation = 'fadeIn 0.6s ease forwards';
    }
  }, 800);


// Make submitForm globally available
window.submitForm = submitForm;

// ── Gallery hover tilt effect ─────────────────────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    item.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.02)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
    item.style.transition = 'transform 0.4s ease';
    setTimeout(() => { item.style.transition = ''; }, 400);
  });
});

// ── Smooth anchor scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link ───────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

// ── Page load animation ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

// ===== Pool Deck Slider =====

const poolDeckImages = [
    "Images/pooldeck/pooldeck1.jpg",
    "Images/pooldeck/pooldeck2.jpg",
    "Images/pooldeck/pooldeck3.jpg",
    "Images/pooldeck/pooldeck4.jpg",
    "Images/pooldeck/pooldeck5.jpg"
];

let currentPoolImage = 0;

setInterval(() => {
    currentPoolImage++;

    if (currentPoolImage >= poolDeckImages.length) {
        currentPoolImage = 0;
    }

    const poolImg = document.getElementById("poolDeckImage");

    if (poolImg) {
        poolImg.src = poolDeckImages[currentPoolImage];
    }

}, 3000);


// ===== Greenhouse Slider =====

const greenhouseImages = [
    "Images/greenhouse/Greenhouse1.jpg",
    "Images/greenhouse/Greenhouse2.jpg",
    "Images/greenhouse/Greenhouse3.jpg"
];

let currentgreenhouseImage = 0;

setInterval(() => {
    currentgreenhouseImage++;

    if (currentgreenhouseImage >= greenhouseImages.length) {
        currentgreenhouseImage = 0;
    }

    const greenhouseImg = document.getElementById("greenhouseImage");

    if (greenhouseImg) {
        greenhouseImg.src = greenhouseImages[currentgreenhouseImage];
    }

}, 3000);

// ===== Outdoor Kitchen Slider =====

const outdoorKitchenImages = [
    "Images/Outdoor Kitchens/outdoorkitchen0.jpg",
    "Images/Outdoor Kitchens/outdoorkitchen1.jpg",
    "Images/Outdoor Kitchens/outdoorkitchen2.jpg"
];

let currentOutdoorKitchenImage = 0;

setInterval(() => {
    currentOutdoorKitchenImage++;

    if (currentOutdoorKitchenImage >= outdoorKitchenImages.length) {
        currentOutdoorKitchenImage = 0;
    }

    const outdoorKitchenImg =
        document.getElementById("outdoorkitchen");

    if (outdoorKitchenImg) {
        outdoorKitchenImg.src =
            outdoorKitchenImages[currentOutdoorKitchenImage];
    }

}, 3000);