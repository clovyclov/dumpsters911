/**
 * Dumpsters 911 - Client-Side JavaScript
 * Handles navigation, interactive accordions, testimonial slider, and quote form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initTestimonialsSlider();
  initQuoteForm();
  initQuoteModal();
});

/* ----------------------------------------------------
   1. Mobile Menu & Navigation
   ---------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    });

    // Mobile dropdown toggle
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown-menu');

      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
          }
        });
      }
    });

    // Close menu on link click
    document.querySelectorAll('.dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
      });
    });
  }
}

/* ----------------------------------------------------
   2. FAQ Accordion Component
   ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items (optional: accordion behavior)
        // faqItems.forEach(other => other.classList.remove('active'));

        if (!isOpen) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

/* ----------------------------------------------------
   3. Testimonials Carousel / Slider
   ---------------------------------------------------- */
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonialsSlider');
  if (!slider) return;

  const cards = slider.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, totalCards - getCardsPerView());
  }

  function updateSlider() {
    if (!cards.length) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 30; // 30px gap in CSS
    const moveAmount = (cardWidth + gap) * currentIndex;

    slider.style.transform = `translateX(-${moveAmount}px)`;
  }

  function startAutoSlide() {
    return setInterval(() => {
      const max = maxIndex();
      if (max <= 0) return;
      if (currentIndex < max) {
        currentIndex++;
      } else {
        currentIndex = 0; // Infinite loop back to start
      }
      updateSlider();
    }, 3500);
  }

  let autoSlideTimer = startAutoSlide();

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
  slider.addEventListener('mouseleave', () => {
    clearInterval(autoSlideTimer);
    autoSlideTimer = startAutoSlide();
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (currentIndex > maxIndex()) currentIndex = maxIndex();
    updateSlider();
  });

  updateSlider();
}

/* ----------------------------------------------------
   4. Quote & Contact Form Submission Handler
   ---------------------------------------------------- */
function initQuoteForm() {
  const forms = document.querySelectorAll('form');
  const webhookUrl = 'https://services.leadconnectorhq.com/hooks/ht4KYwXpeV0GErKr9iiD/webhook-trigger/64dadd6b-e55f-4d11-8768-64ed9bda6274';

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting...';
      }

      // Collect form data flexibly across all form variations
      const nameInput = form.querySelector('input[id*="name"], input[name*="name"]') || form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"], input[id*="email"], input[name*="email"]');
      const phoneInput = form.querySelector('input[type="tel"], input[id*="phone"], input[name*="phone"]');
      const cityInput = form.querySelector('input[id*="city"], input[name*="city"]');
      
      const sizeInput = form.querySelector('input[name*="dumpster_size"]:checked, input[name*="size"]:checked') || form.querySelector('select[name*="dumpster_size"], select[name*="size"]');
      const soonInput = form.querySelector('input[name*="how_soon"]:checked, input[name*="soon"]:checked, input[name*="timeline"]:checked');

      const nameVal = nameInput?.value.trim() || '';
      const emailVal = emailInput?.value.trim() || '';
      const phoneVal = phoneInput?.value.trim() || '';
      const cityVal = cityInput?.value.trim() || '';
      const sizeVal = sizeInput?.value || '';
      const soonVal = soonInput?.value || '';

      const nameParts = nameVal.split(/\s+/).filter(Boolean);
      const firstName = nameParts[0] || nameVal;
      const lastName = nameParts.slice(1).join(' ') || '';

      const payload = {
        name: nameVal,
        first_name: firstName,
        last_name: lastName,
        email: emailVal,
        phone: phoneVal,
        city: cityVal,
        dumpster_size: sizeVal,
        delivery_timeline: soonVal,
        source_url: window.location.href,
        submitted_at: new Date().toISOString()
      };

      const doRedirect = () => {
        const currentUrl = window.location.href.toLowerCase();

        if (currentUrl.includes('book-online-mi')) {
          window.location.href = '../thank-you-mi/';
          return;
        }
        if (currentUrl.includes('book-now')) {
          window.location.href = '../thank-you/';
          return;
        }
        if (currentUrl.includes('dumpster-rental-mi')) {
          window.location.href = '../book-online-mi/';
          return;
        }

        let targetUrl = 'book-now/';
        const currentPath = window.location.pathname.toLowerCase();

        if (currentPath.includes('/residential-dumpster-rentals/') ||
            currentPath.includes('/commercial-dumpster-rentals/') ||
            currentPath.includes('/construction-debris-removal/') ||
            currentPath.includes('/yard-debris-dumpster-rental/') ||
            currentPath.includes('/junk-removal-dumpsters/') ||
            currentPath.includes('/pricing-and-sizes/') ||
            currentPath.includes('/services/')) {
          targetUrl = '../book-now/';
        }

        window.location.href = targetUrl;
      };

      let redirectDone = false;
      const safeRedirect = () => {
        if (!redirectDone) {
          redirectDone = true;
          doRedirect();
        }
      };

      // Validation Safety Guard: Do not send blank webhook if contact info is missing
      if (!nameVal && !emailVal && !phoneVal) {
        console.warn('Empty lead submission detected. Skipping webhook payload.');
        safeRedirect();
        return;
      }

      // 2.5s fallback redirect safety net
      const fallbackTimer = setTimeout(safeRedirect, 2500);

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error('Webhook POST error:', err);
      } finally {
        clearTimeout(fallbackTimer);
        safeRedirect();
      }
    });
  });
}

/* ----------------------------------------------------
   5. Quote Modal Trigger & Auto-Select Handler
   ---------------------------------------------------- */
function initQuoteModal() {
  const modalOverlay = document.getElementById('quoteModalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openBtns = document.querySelectorAll('.open-quote-modal-btn');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const requestedSize = btn.getAttribute('data-size');
      
      // Auto-select corresponding radio button in modal
      if (requestedSize) {
        const modalRadios = modalOverlay.querySelectorAll('input[type="radio"]');
        modalRadios.forEach(radio => {
          if (radio.value === requestedSize) {
            radio.checked = true;
          }
        });
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
